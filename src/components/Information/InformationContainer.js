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

    const renderSuccess = () => {
        switch(infoView){
            case INFO_LICENSE:
                return (
                    <div className="container info-container">
                        <InformationSecondaryNav clickFunc={switchViews}/>
                        <LicenseRender information={information} />
                    </div>
                );
            case INFO_CITATIONS:
                return (
                    <div className="container info-container">
                        <InformationSecondaryNav clickFunc={switchViews}/>
                        <CitationsRender information={information} />
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