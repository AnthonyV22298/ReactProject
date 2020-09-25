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
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import NavLink from 'react-bootstrap/NavLink';
import Row from 'react-bootstrap/Row';

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
        actions.switchView(INFO_LICENSE);
        actions.readLicense(loggedInUserId);
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
                    <Container className="info-render">
                        <Card>
                            <Card.Body>
                                <InformationSecondaryNav clickFunc={switchViews}/>
                                {information.licenses ? 
                                    <LicenseRender information={information} />
                                    : createRedirectModal()
                                }
                            </Card.Body>
                        </Card>
                    </Container>
                );
            case INFO_CITATIONS:
                return (
                    <Container>
                        <Card className="info-render">
                            <Card.Body>
                                <InformationSecondaryNav clickFunc={switchViews}/>
                                <CitationsRender information={information} />
                            </Card.Body>
                        </Card>
                    </Container>
                );
            default:
                break;
        }

    }

    if (infoPending) {
        return (
            <Container>
                <Card className="info-render">
                    <Card.Body>
                        <LoadingIcon />
                    </Card.Body>
                </Card>
                
            </Container>
        );
    } else if (infoFailed) {
        return (
            <Container>
                <Row>
                    <InformationSecondaryNav clickFunc={switchViews}/>
                </Row>
                <ErrorBanner>
                    Error while loading contacts!
                </ErrorBanner>
            </Container>
        );
    } else if (infoSuccessful) {
        return renderSuccess();
    } else {
        return (
            <Container>
                <Row>
                    <InformationSecondaryNav clickFunc={switchViews}/>
                </Row>
                <ErrorBanner>
                    {error}
                    Invalid state! This message should never appear.
                </ErrorBanner>
            </Container>
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
