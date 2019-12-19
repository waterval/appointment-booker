export default function(state = {}, action) {
    if (action.type == "GET_APPOINTMENTS") {
        state = {
            ...state,
            appointments: action.appointments
        };
    }
    if (action.type == "BOOK_APPOINTMENT") {
        state = {
            ...state,
            appointments: state.appointments.map(appointment => {
                if (
                    appointment.patientId == action.userId &&
                    appointment.id != action.appointmentId
                ) {
                    return {
                        ...appointment,
                        patientId: null
                    };
                }
                if (appointment.id != action.appointmentId) {
                    return appointment;
                }
                return {
                    ...appointment,
                    patientId: action.userId
                };
            })
        };
    }
    if (action.type == "CANCEL_APPOINTMENT") {
        state = {
            ...state,
            appointments: state.appointments.map(appointment => {
                if (appointment.id != action.appointmentId) {
                    return appointment;
                }
                return {
                    ...appointment,
                    patientId: null
                };
            })
        };
    }
    if (action.type == "GET_SCHEDULE") {
        state = {
            ...state,
            patientAppointments: action.patientAppointments
        };
    }
    if (action.type == "CANCEL_PATIENT_APPOINTMENT") {
        state = {
            ...state,
            patientAppointments: state.patientAppointments.map(appointment => {
                if (appointment.id != action.appointmentId) {
                    return appointment;
                }
                return {
                    ...appointment,
                    patientId: null
                };
            })
        };
    }
    return state;
}
