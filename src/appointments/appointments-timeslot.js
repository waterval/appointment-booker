import React from "react";
import { useDispatch } from "react-redux";
import { bookAppointment } from "./appointments-actions";

export default function AppointmentsTimeslot({ timeslots, userId }) {
    const dispatch = useDispatch();
    let timeNotation = `${timeslots.appointmentStart}:00 - ${timeslots.appointmentEnd}:00`;
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
