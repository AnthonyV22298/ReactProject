"use strict"


import * as infoDMVActions from '../../actions/infoDMVActions';
import InfoDMVRender from './InfoDMVRender';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from '../Helper/LoadingIcon';
import ErrorBanner from '../Helper/ErrorBanner';

const InfoDMVContainer = (props) => {
    const { actions, infoDMV, requestState } = props;

    const {
        error,
        infoDMVPending, infoDMVFailed, infoDMVSuccess,
    } = requestState;


    useEffect(() => {
        actions.readInfoDMV();
    }, []);

    const renderSuccess = () => {
        return (
            <div className="reactive-margin">
                <InfoDMVRender
                    infoDMV={infoDMV}
                    handleRefresh={() => actions.readInfoDMV()}
                />
            </div>
        );
    }

    if (infoDMVPending) {
        return <LoadingIcon />;
    } else if (infoDMVFailed) {
        return (
            <ErrorBanner>
                Error while loading infoDMV!
            </ErrorBanner>
        );
    } else if (infoDMVSuccess) {
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

InfoDMVContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    const { infoDMVReducer } = state;    
    return {
        infoDMV: state.infoDMVReducer.infoDMV,
        requestState: Object.assign({},
            infoDMVReducer.requestState)
    }  
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(infoDMVActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InfoDMVContainer);

