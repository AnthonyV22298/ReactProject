import * as informationActions from '../../actions/informationActions';
import LicenseRender from './LicenseRender';
import CitationsRender from './CitationsRender';
import InformationSecondaryNav from './InformationSecondaryNav';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from '../Helper/LoadingIcon';
import ErrorBanner from '../Helper/ErrorBanner';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import NavLink from 'react-bootstrap/NavLink';

import { INFO_LICENSE, INFO_CITATIONS } from '../../constants/viewNames';

const InformationContainer = (props) => {
    const {actions, information, infoView, loggedInUserId, requestState} = props;

    const {
        error,
        infoPending,
        infoSuccessful,
        infoFailed,
    } = requestState;

    useEffect(() => {
        if(!infoView) {
            actions.switchView(INFO_LICENSE);
            actions.readLicense(loggedInUserId);
        }
    }, []);

    const switchViews = (viewname) => {
        actions.switchView(viewname);
        actions.readData(loggedInUserId, viewname);
    }

    const createRedirectModal = () => {
        return (
            <Modal aria-labelledby="contained-modal-title-vcenter" backdrop='static' centered show="true">
                <Modal.Header>
                    <Modal.Title>Sign up for a Learner&apos;s Permit!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>We do not have any licenses for you in our system. Please click the button below to make an appointment for a learner&apos;s permit.</p>
                </Modal.Body>

                <Modal.Footer>
                    <NavLink href="#/CreateAppointment"><Button variant="primary">Create Appointment</Button></NavLink>
                </Modal.Footer>
            </Modal>
        )   
    }

    const renderSuccess = () => {
        switch(infoView){
            case INFO_LICENSE:
                return (
                    <div className="container info-container">
                        <Card>
                            <Card.Body>
                                <InformationSecondaryNav clickFunc={switchViews}/>
                                {information.licenses ? 
                                    <LicenseRender information={information} />
                                    : createRedirectModal()
                                }
                            </Card.Body>
                        </Card>
                    </div>
                );
            case INFO_CITATIONS:
                return (
                    <div className="container info-container">
                        <Card>
                            <Card.Body>
                                <InformationSecondaryNav clickFunc={switchViews}/>
                                <CitationsRender information={information} />
                            </Card.Body>
                        </Card>
                    </div>
                );
            default:
                break;
        }

    }

    if (infoPending) {
        return <LoadingIcon />;
    } else if (infoFailed) {
        return (
            <div>
                <div className="container info-container">
                    <InformationSecondaryNav clickFunc={switchViews}/>
                </div>
                <ErrorBanner>
                    Error while loading contacts!
                </ErrorBanner>

            </div>
        );
    } else if (infoSuccessful) {
        return renderSuccess();
    } else {
        return (
            <div>
                <div className="container info-container">
                    <InformationSecondaryNav clickFunc={switchViews}/>
                </div>
                <ErrorBanner>
                    {error}
                    Invalid state! This message should never appear.
                </ErrorBanner>
            </div>
        );
    }
}

InformationContainer.proptypes = {
    actions: PropTypes.object,
    information: PropTypes.object
}

function mapStateToProps(state) {
    const { informationReducer, loginReducer } = state;
    return {
       information: informationReducer.information,
       infoView: informationReducer.infoView,
       loggedInUserId: loginReducer.userInfo.contactid,
       requestState: Object.assign({},
       informationReducer.requestState)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(informationActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InformationContainer);
