"use strict"

import * as vehicleDetailsActions from '../../actions/vehicleDetailsActions';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from '../Helper/LoadingIcon';
import ErrorBanner from '../Helper/ErrorBanner';
import VehicleRegister from './VehicleRegister';

const VehicleMakeContainer = (props) => {
    const { actions, requestState } = props;

    const {
        error,
        vehicleDetailsPending, vehicleDetailsFailed, vehicleDetailsSuccess,
        postVehicleSuccess, postVehicleFailed,
    } = requestState;


    useEffect(() => {
        actions.readVehicleDetails();
    }, []);

    const renderSuccess = () => {
        return (
            <div className="reactive-margin">

                <VehicleRegister
                    handleCreate={(data) => {
                        actions.postVehicle(data)
                    }}
                    postSuccess={ false }
                />
            </div>
        );
    }

    const postSuccess = () => {
        return (
            <div className="reactive-margin">
                
                <VehicleRegister
                    handleCreate={(data) => {
                        actions.postVehicle(data)
                    }} 
                    postSuccess={ true }
                />
            </div>
        );
    }

    if(vehicleDetailsPending){
        return <LoadingIcon />;
    } else if (postVehicleFailed) {
        return (
            <ErrorBanner>
                Error while registering vehicle!
            </ErrorBanner>
        );
    } else if (vehicleDetailsFailed) {
        return (
            <ErrorBanner>
                Error while registering vehicle!
            </ErrorBanner>
        );
    } else if(vehicleDetailsSuccess){
        return renderSuccess();
    } else if(postVehicleSuccess){
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

VehicleMakeContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    const { vehicleDetailsReducer } = state;
    return {
       requestState: Object.assign({},
        vehicleDetailsReducer.requestState)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(vehicleDetailsActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleMakeContainer);