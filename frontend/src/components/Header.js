import headerImage from "../images/header.svg";

function Header(props) {
  return (
    <header className="header">
      <img src={headerImage} alt="Header image" className="header__image" />
      <label className="header__email">{props.email}</label>

      <label onClick={props.handleClick} className="header__link">
        {props.linkText}
      </label>
    </header>
  );
}

export default Header;
