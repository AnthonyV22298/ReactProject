import { APPOINTMENTS_SUCCESFUL, APPOINTMENTS_PENDING, APPOINTMENTS_FAILURE, POST_APPOINTMENTS_SUCCESFUL, POST_APPOINTMENTS_FAILURE, CANCEL_APPOINTMENT_REQUEST, CANCEL_APPOINTMENT_SUCCESS, CANCEL_APPOINTMENT_FAILED, UPDATE_APPOINTMENT_REQUEST, UPDATE_APPOINTMENT_SUCCESS, UPDATE_APPOINTMENT_FAILED } from '../constants/actionTypes';

export default function appointmentReducer(state = {}, action) {
  switch (action.type) {
    case APPOINTMENTS_SUCCESFUL:
      return {...state, appointments: action.data.value, requestState: {appointmentsSuccess: true, appointmentsPending: false, appointmentsFailed: false, error: null} };
    case APPOINTMENTS_PENDING:
      return {...state, requestState: {appointmentsSuccess: false, appointmentsPending: true, appointmentsFailed: false, error: null} };
    case APPOINTMENTS_FAILURE:  
    return {...state, requestState: {appointmentsSuccess: false, appointmentsPending: false, appointmentsFailed: true, error: action.error} };
    case POST_APPOINTMENTS_SUCCESFUL: {
      let newAppointments = [...state.appointments];
      newAppointments.push(action.data);
      return {...state, appointments: newAppointments, requestState: {postAppointmentsSuccess: true,  postAppointmentsFailed: false, error: null} };
    }
    case POST_APPOINTMENTS_FAILURE:
      return {...state, requestState: {postAppointmentsSuccess: false, postAppointmentsFailed: true, error: action.error} };
    case CANCEL_APPOINTMENT_REQUEST:
      return {...state, updating: true};
    case CANCEL_APPOINTMENT_SUCCESS:
        return {...state, updateSuccess: true, updating: false, userInfo: {...action.userInfo}};
    case CANCEL_APPOINTMENT_FAILED:
        return {...state, updateContactFailed: true, updating: false, userInfo: {...action.userInfo} }
    case UPDATE_APPOINTMENT_REQUEST:
      return {...state, updating: true};
    case UPDATE_APPOINTMENT_SUCCESS:
        return {...state, updateSuccess: true, updating: false, userInfo: {...action.userInfo}};
    case UPDATE_APPOINTMENT_FAILED:
        return {...state, updateContactFailed: true, updating: false, userInfo: {...action.userInfo} }
    default:
      return state;
  }
}
