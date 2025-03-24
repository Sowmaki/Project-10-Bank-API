import "./Feature.scss"

export const Feature = ({ img, title, text }) => {
  return (
    <div className="feature__item">
      <img src={img} alt="Chat Icon" className="feature__item__icon" />
      <h3 className="feature__item__title">{title}</h3>
      <p>{text}</p>
    </div>
  )
}