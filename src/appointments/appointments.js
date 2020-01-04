import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments, cancelAppointment } from "./appointments-actions";
import AppointmentsTimeslot from "./appointments-timeslot";
import { Link } from "react-router-dom";

export default function Appointments({ id: userId }) {
    const dispatch = useDispatch();
    const [startTime, setStartTime] = useState(10);
    const [endTime, setEndTime] = useState(15);
    const [weekday, setWeekDay] = useState("day");
    const [appointmentType, setAppointmentType] = useState(
        "regularAppointment"
    );

    const availableAppointments = useSelector(
        state =>
            state.appointments &&
            state.appointments
                .filter(appointment => appointment.patientId === null)
                .filter(appointment => appointment.weekday.includes(weekday))
                .filter(
                    appointment =>
                        appointment.appointmentStartingTime >= startTime
                )
                .filter(
                    appointment => appointment.appointmentEndingTime <= endTime
                )
                .sort((a, b) => a.id - b.id)
    );

    useEffect(() => {
        dispatch(getAppointments());
    }, []);

    const monthNames = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };

    const sortAppointmentsPerDate = () => {
        let appointments = {};
        for (const item of availableAppointments) {
            const dateHeaderName = `${item.day} ${monthNames[item.month]} ${
                item.year
            }, ${item.weekday}:`;
            if (!appointments[dateHeaderName]) {
                appointments[dateHeaderName] = [];
            }
            appointments[dateHeaderName].push(item);
        }
        return appointments;
    };

    let sortedAppointments;
    if (availableAppointments) {
        sortedAppointments = sortAppointmentsPerDate();
    }

    const userSelectedAppointment = useSelector(
        state =>
            state.appointments &&
            state.appointments
                .filter(appointment => appointment.patientId === userId)
                .shift()
    );

    const generateSelectedAppointmentMessage = () => {
        const appointmentMessage = `${userSelectedAppointment.day} ${
            monthNames[userSelectedAppointment.month]
        }
    ${userSelectedAppointment.year}, ${userSelectedAppointment.weekday} from
    ${userSelectedAppointment.appointmentStartingTime}:00
    until ${
    userSelectedAppointment.appointmentEndingTime
}:00. Please add it to your personal calendar.
    `;
        return appointmentMessage;
    };

    let selectedAppointment;
    if (userSelectedAppointment) {
        selectedAppointment = generateSelectedAppointmentMessage();
    }

    if (!availableAppointments) {
        return <p>Page loading...</p>;
    }

    return (
        <div>
            <h1>Available appointments</h1>
            <p>
                Thank you for using our medical platform to book appointments.
                Start booking with us today to save time on scheduling your
                appointments.
            </p>
            <div className="appointment-status">
                <h2>Your appointment:</h2>
                <p>
                    {selectedAppointment ||
                        "You currently have no appointment. Please click on a timeslot below to book your appointment:"}
                </p>
                {selectedAppointment && (
                    <button
                        className="appointment-cancel-button"
                        onClick={event =>
                            dispatch(
                                cancelAppointment(userSelectedAppointment.id)
                            )
                        }
                    >
                        Cancel appointment
                    </button>
                )}

                {selectedAppointment && appointmentType == "firstAppointment" && (
                    <p>
                        Thank you for booking your first appointment. We would
                        like to provide the best care possible, so please tell
                        us a bit more about yourself on your{" "}
                        <Link to="/user-profile">user profile</Link>.
                    </p>
                )}
            </div>
            {!selectedAppointment && (
                <div className="appointment-options-container">
                    <div>
                        <h4>Weekday:</h4>
                        <select
                            name="preferredDay"
                            onChange={event => setWeekDay(event.target.value)}
                        >
                            <option value="day">All</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                    </div>
                    <div>
                        <h4>From:</h4>
                        <select
                            name="preferredBeginTime"
                            onChange={event => setStartTime(event.target.value)}
                        >
                            <option value="0">Any time</option>
                            <option value="10">10:00</option>
                            <option value="11">11:00</option>
                            <option value="13">13:00</option>
                            <option value="14">14:00</option>
                        </select>
                    </div>
                    <div>
                        <h4>Until:</h4>
                        <select
                            name="preferredEndTime"
                            onChange={event => setEndTime(event.target.value)}
                        >
                            <option value="24">Any time</option>
                            <option value="11">11:00</option>
                            <option value="12">12:00</option>
                            <option value="14">14:00</option>
                            <option value="15">15:00</option>
                        </select>
                    </div>
                    <div>
                        <h4>Type:</h4>
                        <select
                            name="preferredTime"
                            onChange={event =>
                                setAppointmentType(event.target.value)
                            }
                        >
                            <option value="regularAppointment">Regular</option>
                            <option value="firstAppointment">First Time</option>
                            <option value="emergencyAppointment">
                                Emergency
                            </option>
                        </select>
                    </div>
                </div>
            )}
            <div>
                {(appointmentType == "regularAppointment" ||
                    appointmentType == "firstAppointment") &&
                    !selectedAppointment &&
                    Object.keys(sortedAppointments).map(appointment => {
                        const day = sortedAppointments[appointment];
                        return (
                            <div key={appointment}>
                                <h3>{appointment}</h3>
                                <div className="timeslot-container">
                                    {day.map(timeslots => (
                                        <AppointmentsTimeslot
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
            <div>
                {appointmentType == "emergencyAppointment" && (
                    <p className="warning-message">
                        You have chosen an emergency appointment. Are you or
                        someone else in immediate danger? Please call{" "}
                        <a href="callto:112">112</a>. Otherwise please call our
                        number:{" "}
                        <a href="callto:0301575000000">030 1575 000 000</a>.
                    </p>
                )}
            </div>
            <div>
                {!sortedAppointments && (
                    <p>
                        There are no appointments available. Please try other
                        options.
                    </p>
                )}
            </div>
        </div>
    );
}
