import axios from "../app/axios";

export async function getPatientAppointments() {
    const { data } = await axios.get("/api/schedule");
    return {
        type: "GET_SCHEDULE",
        appointments: data.appointments
    };
}

export async function cancelAppointment(appointmentId) {
    await axios.post(`/api/appointments/cancel/${appointmentId}`);
    return {
        type: "CANCEL_APPOINTMENT",
        appointmentId
    };
}
