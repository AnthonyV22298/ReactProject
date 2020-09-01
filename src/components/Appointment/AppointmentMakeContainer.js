"use strict"

import * as appointmentActions from '../../actions/appointmentActions';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from '../Helper/LoadingIcon';
import ErrorBanner from '../Helper/ErrorBanner';
import AppointmentMake from './AppointmentMaker';

const AppointmentMakeContainer = (props) => {
    const { actions, appointments, requestState } = props;

    const {
        error,
        appointmentsPending, appointmentsFailed, appointmentsSuccess,
        postAppointmentsSuccess, postAppointmentsFailed, 
    } = requestState;


    useEffect(() => {
        actions.readAppointments();
    }, []);

    const renderSuccess = () => {
        return (
            <div className="reactive-margin">
                
                <AppointmentMake
                    appointments={ appointments }
                    handleCreate={(data) => {
                        actions.postAppointments(data)
                    }}
                />
            </div>
        );
    }

    if (appointmentsPending) {
        return <LoadingIcon />;
    } else if (appointmentsFailed || postAppointmentsFailed) {
        return (
            <ErrorBanner>
                Error while loading appointments!
            </ErrorBanner>
        );
    } else if (appointmentsSuccess || postAppointmentsSuccess) {
        return renderSuccess();
    } else {
        return (
            <ErrorBanner>
                {error}
                Invalid state! This message should never appear.
            </ErrorBanner>
        );
    }
}

AppointmentMakeContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    const { appointmentReducer } = state;
    return {
       appointments: state.appointmentReducer.appointments,
       requestState: Object.assign({},
        appointmentReducer.requestState)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(appointmentActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppointmentMakeContainer);