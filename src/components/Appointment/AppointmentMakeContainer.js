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
    const { actions, appdates, requestState } = props;

    const {
        error,
        appdatesPending, appdatesFailed, appdatesSuccess,
        postAppointmentsSuccess, postAppointmentsFailed,
    } = requestState;


    useEffect(() => {
        actions.readDates();
    }, []);

    const renderSuccess = () => {
        return (
            <div className="reactive-margin">

                <AppointmentMake
                    appdates={ appdates }
                    handleCreate={(data) => {
                        actions.postAppointments(data)
                    }}
                    postSuccess={ false }
                />
            </div>
        );
    }

    const postSuccess = () => {
        return (
            <div className="reactive-margin">
                
                <AppointmentMake
                    appdates={ appdates }
                    handleCreate={(data) => {
                        actions.postAppointments(data)
                    }} 
                    postSuccess={ true }
                />
            </div>
        );
    }

    if (appdatesPending) {
        return <LoadingIcon />;
    } else if (appdatesFailed || postAppointmentsFailed) {
        return (
            <ErrorBanner>
                Error while loading appointments!
            </ErrorBanner>
        );
    } else if (appdatesSuccess) {
        return renderSuccess();
    } else if(postAppointmentsSuccess){
        return postSuccess();
    }
    else {
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
       appdates: state.appointmentReducer.appdates,
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
