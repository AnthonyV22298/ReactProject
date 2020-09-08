/* "use strict"
import React, {useEffect} from 'react';
import Modal from './ModalRender';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from '../../actions/ModalActions';
import LoadingIcon from '../Helper/LoadingIcon';
import ErrorBanner from '../Helper/ErrorBanner';

const ModalContainer = (props) => {
    const { actions, target, requestState } = props;

    const {showModal, hideModal} = requestState;
} */