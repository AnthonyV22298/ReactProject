"use strict"

import * as vehicleDetailsActions from '../../actions/vehicleDetailsActions';
import VehicleDetailsRender from './VehicleDetailsRender';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from '../Helper/LoadingIcon';
import ErrorBanner from '../Helper/ErrorBanner';

const VehicleDetailsContainer = (props) => {
    const { actions, vehicleDetails, requestState } = props;

    const {
        error,
        vehicleDetailsPending, vehicleDetailsFailed, vehicleDetailsSuccess,
        deleteVehicleRequest, deleteVehicleSuccess, deleteVehicleFailed,
        updateVehicleRequest, updateVehicleSuccess, updateVehicleFailed,
    } = requestState;


    useEffect(() => {
        actions.readVehicleDetails();
    }, []);

    const renderSuccess = () => {
        console.log("before vDetRender div");
        return (
            <div className="reactive-margin">
                <VehicleDetailsRender
                    vehicleDetails={vehicleDetails}
                    handleRefresh={() => actions.readVehicleDetails()}
                    handleCancel={(guid) => actions.deleteVehicle(guid)}
                    handleUpdate={(data) => actions.updateVehicle(data)}
                />
            </div>
        );
    }

    if (vehicleDetailsPending || deleteVehicleRequest || updateVehicleRequest) {
        return <LoadingIcon />;
    } else if (vehicleDetailsFailed) {
        return (
            <ErrorBanner>
                Error while loading vehicleDetails!
            </ErrorBanner>
        );
    } else if (deleteVehicleFailed) {
        return (
             <ErrorBanner>
                Error while unregistering vehicle!
            </ErrorBanner>
        );
    } else if (updateVehicleFailed) {
        return (
             <ErrorBanner>
                Error while updating vehicle!
            </ErrorBanner>
        );
    } else if (vehicleDetailsSuccess || deleteVehicleSuccess || updateVehicleSuccess) {
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

VehicleDetailsContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    const { vehicleDetailsReducer } = state;    
    return {
        vehicleDetails: state.vehicleDetailsReducer.vehicleDetails,
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
)(VehicleDetailsContainer);

