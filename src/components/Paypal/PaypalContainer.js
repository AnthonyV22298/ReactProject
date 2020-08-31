"use strict"
import React, {useEffect} from 'react';
import PaypalRender from './PaypalRender';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as paypalActions from '../../actions/paypalActions';
import LoadingIcon from '../Helper/LoadingIcon';
import ErrorBanner from '../Helper/ErrorBanner';

const PaypalContainer = (props) => {
    const { actions, payment, requestState } = props;

    const {
        error,
        findPayment, paymentNotFound, paymentFound,
    } = requestState;


    useEffect(() => {
        actions.findPayment();
    }, []);


    const renderSuccess = () => {
        return (
            <PaypalRender
            payment={payment}/>
        )
    
    }

    if (findPayment) {
        return <LoadingIcon />;
    } else if (paymentNotFound) {
        return (
            <ErrorBanner>
                Error while loading fees!
            </ErrorBanner>
        );
    } else if (paymentFound) {
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

PaypalContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    const { paypalReducer } = state;
    return {
       payment: state.paypalReducer.payment,
       requestState: Object.assign({},
        paypalReducer.requestState)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(paypalActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PaypalContainer);