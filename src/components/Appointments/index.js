// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isActiveStarBtn: false,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isFavourite: !eachAppointment.isFavourite}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {title, date} = this.state
    if (title !== '' && date !== '') {
      const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
      const newAppointment = {
        id: uuidv4(),
        title,
        formattedDate,
        isFavourite: false,
      }
      this.setState(prevAppointmentsList => ({
        appointmentsList: [
          ...prevAppointmentsList.appointmentsList,
          newAppointment,
        ],
        title: '',
        date: '',
      }))
    }
  }

  onClickStarredBtn = () => {
    const {isActiveStarBtn, appointmentsList} = this.state
    const starredAppointments = appointmentsList.filter(
      eachAppointment => eachAppointment.isFavourite === true,
    )
    let allAppointments = appointmentsList
    this.setState({
      isActiveStarBtn: !isActiveStarBtn,
    })

    if (!isActiveStarBtn) {
      allAppointments = starredAppointments
      console.log(this.state)
    }
    console.log(this.state)
    this.setState({appointmentsList: allAppointments})
  }

  render() {
    const {title, date, appointmentsList, isActiveStarBtn} = this.state
    const starBtnClassName =
      isActiveStarBtn === true ? 'activeBtn' : 'inActiveBtn'
    return (
      <div className="appointments-app">
        <div className="appointments-content-container">
          <form className="form-container" onSubmit={this.onAddAppointment}>
            <div className="form-elements-container">
              <h1 className="title">Add Appointment</h1>
              <label className="label-element" htmlFor="input-title">
                Title
              </label>
              <input
                type="text"
                value={title}
                className="input-element"
                placeholder="Title"
                id="input-title"
                onChange={this.onChangeTitle}
              />
              <label className="label-element" htmlFor="input-date">
                Date
              </label>
              <input
                type="date"
                value={date}
                className="input-element"
                placeholder="Date"
                id="input-date"
                onChange={this.onChangeDate}
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
            <img
              className="appointment-img"
              alt="appointments"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            />
          </form>
          <hr className="line" />
          <div className="appointments-container">
            <div className="heading-starbtn-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                className={`${starBtnClassName}`}
                type="button"
                onClick={this.onClickStarredBtn}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-items-container">
              {appointmentsList.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  onToggleStar={this.onToggleStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
