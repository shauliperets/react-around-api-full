function InfoTooltip(props) {
  return (
    <div className={`tooltip ${props.isOpen ? "tooltip_open" : ""}`}>
      <div className="tooltip__container">
        <button className="tooltip__close-button" type="button" onClick={props.onClose}></button>
        <img src={props.image} className="tooltip__image" alt="Tooltip image"></img>
        <h2 className="tooltip__title">{props.title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
