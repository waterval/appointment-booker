import React from "react";
import { useDispatch } from "react-redux";
import { bookAppointment } from "./appointments-actions";

export default function AppointmentsTimeslot({ timeslots, userId }) {
    const dispatch = useDispatch();
    let timeNotation = `${timeslots.appointmentStartingTime}:00 - ${timeslots.appointmentEndingTime}:00`;
    return (
        <div className="appointment-button-container">
            <button
                className="appointment-book-button"
                onClick={e => dispatch(bookAppointment(timeslots.id, userId))}
            >
                {timeNotation}
            </button>
            <div></div>
        </div>
    );
}
