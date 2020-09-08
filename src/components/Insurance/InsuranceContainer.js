import * as InsuranceActions from '../../actions/insuranceActions';
import InsuranceRender from './InsuranceRender';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoadingIcon from '../Helper/LoadingIcon';
import ErrorBanner from '../Helper/ErrorBanner';

const InsuranceContainer = (props) => {
    const {actions, insurance, loggedInUserId, requestState} = props;
    console.log("Insurance Container Test");
    //let test = InsuranceActions.readInsurance(loggedInUserId);
    const {
        error,
        infoPending,
        infoSuccessful,
        infoFailed,
    } = requestState;

    useEffect(() => {
            actions.readInsurance(loggedInUserId);
    }, []);


    const renderSuccess = () => {
        console.log("Insurance Rendered Successfully:");
        console.log(insurance.information.INSURANCE);
        return (
            <div className="container info-container">
                <InsuranceRender insurance={insurance.information.INSURANCE} />
            </div>
            );          
        }

    if (infoPending) {
        return <LoadingIcon />;
    } else if (infoFailed) {
        return (
            <div>

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
                <ErrorBanner>
                    {error}
                    Invalid state! This message should never appear.
                </ErrorBanner>
            </div>
        );
    }
}

InsuranceContainer.proptypes = {
    actions: PropTypes.object,
    insurance: PropTypes.object
}

function mapStateToProps(state) {
    const { insuranceReducer, loginReducer } = state;
    console.log("mapStateToProps:");
    if(insuranceReducer.information === undefined) {
        console.log("insuranceReducer is undefined");
    } else {
        console.log(insuranceReducer);
        console.log(insuranceReducer.information);
        console.log(insuranceReducer.information.INSURANCE);    }

    console.log("...");
    return {
       insurance: insuranceReducer,
       loggedInUserId: loginReducer.userInfo.contactid,
       requestState: Object.assign({},
       insuranceReducer.requestState)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(InsuranceActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InsuranceContainer);