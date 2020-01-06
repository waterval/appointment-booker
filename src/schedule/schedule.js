import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientAppointments } from "./schedule-actions";
import ScheduleTimeslot from "./schedule-timeslot";
import { sortAppointmentsPerDate } from "../app/utils.js";

export default function Schedule({ id: userId }) {
    const dispatch = useDispatch();

    const scheduledAppointments = useSelector(
        state =>
            state.appointments &&
            state.appointments
                .filter(appointment => appointment.patientId !== null)
                .sort((a, b) => a.id - b.id)
    );

    useEffect(() => {
        dispatch(getPatientAppointments());
    }, []);

    let sortedAppointments;
    if (scheduledAppointments) {
        sortedAppointments = sortAppointmentsPerDate(scheduledAppointments);
    }

    if (!scheduledAppointments) {
        return <p>Page loading...</p>;
    }

    return (
        <div>
            <h1>Schedule (only access by staff)</h1>
            <p>As a doctor, it is important to see who is visiting you:</p>
            <div>
                {sortedAppointments &&
                    Object.keys(sortedAppointments).map(appointment => {
                        const day = sortedAppointments[appointment];
                        return (
                            <div key={appointment}>
                                <h3>{appointment}</h3>
                                <div className="timeslot-container">
                                    {day.map(timeslots => (
                                        <ScheduleTimeslot
                                            key={timeslots.id}
                                            userId={userId}
                                            timeslots={timeslots}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
