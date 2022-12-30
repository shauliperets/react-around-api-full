//COULD BE IMPROVED

//If it’s interesting for you here is a way to make a special wrapper for any popup with cross button, Escape and overlay listeners inside. You should create component Popup, store it in Popup.js.
//import { useEffect } from "react";

//const Popup = ({ isOpen, name, onClose, children }) => {
// here is `useEffect` for the `Escape` listener
//  useEffect(() => {
// with this we prevent adding the listener if the popup is not opened
//    if (!isOpen) return;
// we should define the handler inside `useEffect`, so that it wouldn’t lose the reference to be able to remove it
//    const closeByEscape = (e) => {
//      if (e.key === 'Escape') {
//        onClose();
//      }
//   }

//    document.addEventListener('keydown', closeByEscape)
// don’t forget to remove the listener in the `clean-up` function
//    return () => document.removeEventListener('keydown', closeByEscape)
// here we watch `isOpen` to add the listener only when it’s opened
//}, [isOpen, onClose])

// here is the overlay handler
//  const handleOverlay = (e) => {
//    if (e.target === e.currentTarget) {
//        onClose();
//    }
//  }

// then we add the main wrapper with class `popup` and `popup_opened`
//  return (
//    <div
//      className={`popup ${isOpen ? "popup_opened" : ""} popup_type_${name}`}
//      onClick={handleOverlay}
//    >
//    {/* the container for the contents */}
//      <div className='popup__container'>
//        {/* here will be anything you add as `children`
//*/}
//        {children}
//        {/* add the close button */}
//       <button
//          className='popup__close'
//          type='button'
//          onClick={onClose}
//        />
//      </div>
//    </div>
//  );
//};

//export default Popup;

//And now you can use Popup for any popup in the project:   ImagePopup,  InfoToolTip and PopupWithForm.

//function PopupWithForm({isOpen, name, onClose, ...props}) {
//  return (
//    <Popup isOpen={isOpen} name={name} onClose={onClose}>
//        <h2 className='popup__title'>{props.title}</h2>

//You can make also Input for inputs and Form for any form in the project.
