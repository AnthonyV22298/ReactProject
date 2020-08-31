"use strict"


import * as contactActions from '../../actions/contactActions';
import ContactRender from './ContactRender';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from '../Helper/LoadingIcon';
import ErrorBanner from '../Helper/ErrorBanner';

const ContactContainer = (props) => {
    const { actions, contacts, requestState } = props;

    const {
        error,
        contactsPending, contactsFailed, contactsSuccess,
    } = requestState;


    useEffect(() => {
        actions.readContacts();
    }, []);

    const renderSuccess = () => {
        return (
            <div className="reactive-margin">
                <ContactRender
                    contacts={contacts}
                    handleRefresh={() => actions.readContacts()}
                />
            </div>
        );
    }

    if (contactsPending) {
        return <LoadingIcon />;
    } else if (contactsFailed) {
        return (
            <ErrorBanner>
                Error while loading contacts!
            </ErrorBanner>
        );
    } else if (contactsSuccess) {
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

ContactContainer.propTypes = {
    actions: PropTypes.object
};

function mapStateToProps(state) {
    const { contactReducer } = state;
    return {
       contacts: state.contactReducer.contacts,
       requestState: Object.assign({},
        contactReducer.requestState)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(contactActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactContainer);

