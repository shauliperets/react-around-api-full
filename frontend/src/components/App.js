import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import React from "react";
import { useHistory } from "react-router-dom";
import { api } from "../utils/api";
import { FormValidator } from "../utils/FormValidator";
import { settings } from "../utils/settings";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Route, Switch } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import authorizedImage from "../images/authorized.svg";
import unauthorizedImage from "../images/unauthorized.svg";
import { register, login, checkToken } from "../utils/auth";

function App() {
  const [cards, setCards] = React.useState([]);
  const [isEditAvatarOpen, setIsEditAvatarOpen] = React.useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tooltipOn, setTooltipOn] = React.useState(false);
  const [tooltipMessage, setTooltipMessage] = React.useState("");
  const [isAuthorized, setIsAuthorized] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState("");

  const history = useHistory();

  React.useEffect(() => {
    setTooltipOn(false);
    setTooltipMessage("");
  }, []);

  function initialPage() {
    const token = localStorage.getItem("token");

    if (token) {
      checkToken(token)
        .then((response) => {
          if (response) {
            api.getUserInfo(token).then((response) => {
              setCurrentUser(response.data);

              enableValidation();
            });

            api.getInitialCards(token).then((response) => {
              setCards(response.data);
            });
          } else {
            redirectLogin();
          }
        })
        .catch((error) => {
          console.log("An error occurred: ", error);
        });
    } else {
      redirectLogin();
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlaceOpen(true);
  }

  const handleCardClick = (event) => {
    setIsImagePopupOpen(true);
    setSelectedCard(event.target);
  };

  const handleCreateCardSubmit = (title, link) => {
    setIsLoading(true);

    const token = localStorage.getItem("token");

    api
      .addCard(token, title, link)
      .then((response) => {
        setCards([response.data, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function setCardLikes(card, response) {
    const updateCards = cards.map((item) => {
      if (item._id === card._id) {
        return response;
      } else {
        return item;
      }
    });

    setCards(updateCards);
  }

  const handleEditProfileSubmit = (name, about) => {
    setIsLoading(true);

    const token = localStorage.getItem("token");

    api
      .setUserInfo(token, name, about)
      .then((response) => {
        setCurrentUser({ ...currentUser, name: response.data?.name, about: response.data?.about });
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditAvatarSubmit = (avatar) => {
    setIsLoading(true);

    const token = localStorage.getItem("token");

    api
      .setProfileImage(token, avatar)
      .then((response) => {
        setCurrentUser({ ...currentUser, avatar: response.data?.avatar });
        closeAllPopups();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function closeAllPopups() {
    setIsEditAvatarOpen(false);
    setIsEditProfileOpen(false);
    setIsAddPlaceOpen(false);
    setIsImagePopupOpen(false);
  }

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  const handleLikeClick = (card) => {
    api
      .addRemoveLike(card._id, isLiked(card.likes, currentUser._id))
      .then((response) => {
        setCardLikes(card, response);
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      });
  };

  function isLiked(likes, userId) {
    let result = false;
    let likesIds = [];

    likes.forEach((like) => {
      likesIds.push(like._id);
    });

    if (likesIds.includes(userId)) {
      result = true;
    }

    return result;
  }

  const handleDeleteCard = (cardId) => {
    const token = localStorage.getItem("token");

    api
      .deleteCard(token, cardId)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== cardId));
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
      });
  };

  const formValidators = {};

  function enableValidation() {
    const forms = Array.from(document.querySelectorAll(settings.formSelector));

    forms.forEach(function (form) {
      const validator = new FormValidator(settings, form);

      const formName = form.getAttribute("name");

      formValidators[formName] = validator;

      validator.enableValidation();
    });
  }

  function handleTooltipClose() {
    setTooltipOn(false);
  }

  function handleRegisterSubmit(name, email, password) {
    register(name, email, password)
      .then((data) => {
        if (typeof data.error === "undefined") {
          setIsAuthorized(true);
          setTooltipMessage("Success! You have now been registered");
          history.push("/signin");
        } else {
          setIsAuthorized(false);
          setTooltipMessage(data.error);
        }
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
        setIsAuthorized(false);
        setTooltipMessage(error);
      })
      .finally(setTooltipOn(true));
  }

  function handleLoginSubmit(email, password) {
    login(email, password)
      .then((data) => {
        setIsAuthorized(true);
        setTooltipMessage("Success! You are now login");
        setLoggedIn(true);
        setHeaderEmail(email);
        history.push("/");

        initialPage();
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
        setIsAuthorized(false);
        setTooltipMessage(error);
      })
      .finally(setTooltipOn(true));
  }

  /*
  function tokenCheck() {
    const token = localStorage.getItem("token");

    if (token) {
      checkToken(token)
        .then((response) => {
          if (response) {
            setLoggedIn(true);
            setHeaderEmail(response.data.email);
            history.push("/");
          }
        })
        .catch((error) => {
          console.log("An error occurred: ", error);
        });
    }
  }*/

  function redirectRegister() {
    history.push("/signup");
  }

  function redirectLogin() {
    history.push("/signin");
  }

  function logout() {
    history.push("/signin");
    setHeaderEmail("");
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/signin">
            <Header linkText="Sign up" email={headerEmail} handleClick={redirectRegister} />
            <Login handleSubmit={handleLoginSubmit}></Login>
          </Route>
          <Route path="/signup">
            <Header linkText="Sign in" email={headerEmail} handleClick={redirectLogin} />
            <Register handleSubmit={handleRegisterSubmit}></Register>
          </Route>
          <ProtectedRoute path="/" loggedIn={loggedIn}>
            <Header linkText="Log out" email={headerEmail} handleClick={logout} />
            <Main
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              setCardLikes={setCardLikes}
              setCards={setCards}
              onCardLike={handleLikeClick}
              onCardDelete={handleDeleteCard}
              isLiked={isLiked}
            />
          </ProtectedRoute>
        </Switch>

        <Footer />

        <AddPlacePopup
          isOpen={isAddPlaceOpen}
          onClose={closeAllPopups}
          onSubmit={handleCreateCardSubmit}
          button={isLoading ? "Saving..." : "Save"}
        />

        <EditProfilePopup
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
          onSubmit={handleEditProfileSubmit}
          button={isLoading ? "Saving..." : "Save"}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
          button={isLoading ? "Saving..." : "Save"}
          onSubmit={handleEditAvatarSubmit}
        />

        <ImagePopup isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups}></ImagePopup>

        <InfoTooltip
          isOpen={tooltipOn}
          image={isAuthorized ? authorizedImage : unauthorizedImage}
          title={tooltipMessage}
          onClose={handleTooltipClose}
        ></InfoTooltip>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
