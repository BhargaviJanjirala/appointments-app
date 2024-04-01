// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onToggleStar} = props
  const {title, id, formattedDate, isFavourite} = appointmentDetails
  const starImgUrl = isFavourite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    onToggleStar(id)
  }

  return (
    <li className="appointment-item">
      <div className="title-icon-container">
        <p className="title">{title}</p>
        <button
          type="button"
          className="starBtn"
          data-testid="star"
          onClick={onClickStar}
        >
          <img className="star-icon" alt="star" src={starImgUrl} />
        </button>
      </div>
      <p className="date">{`Date: ${formattedDate}`}</p>
    </li>
  )
}
export default AppointmentItem
