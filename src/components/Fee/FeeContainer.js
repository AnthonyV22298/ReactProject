"use strict"

import * as feeActions from '../../actions/feeActions';
import FeeRender from './FeeRender';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from '../Helper/LoadingIcon';
import ErrorBanner from '../Helper/ErrorBanner';

const FeeContainer = (props) => {
    const { actions, fees, requestState } = props;

    const {
        error,
        feesPending, feesFailed, feesSuccess,
    } = requestState;


    useEffect(() => {
        actions.readFees();
    }, []);

    const renderSuccess = () => {
        return (
            <div className="reactive-margin">
                <FeeRender
                    fees={fees}
                    handleRefresh={() => actions.readFees()}
                />
            </div>
        );
    }

    if (feesPending) {
        return <LoadingIcon />;
    } else if (feesFailed) {
        return (
            <ErrorBanner>
                Error while loading fees!
            </ErrorBanner>
        );
    } else if (feesSuccess) {
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

FeeContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    const { feeReducer } = state;
    return {
       fees: state.feeReducer.fees,
       requestState: Object.assign({},
        feeReducer.requestState)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(feeActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FeeContainer);

