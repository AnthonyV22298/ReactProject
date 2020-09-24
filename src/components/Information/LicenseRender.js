import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import LicenseRenewalModal from './LicenseRenewalModal';

import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const LicenseRender = ({ information }) => {
    console.log(information);
    const { licenses } = information;

    const generateEndorsementGlossary = (endorsementStr) => {
        let endorsementArr;
        let userEndorsementsJSX = [];
        let nonHeldEndorsementJSX = [];
        if(endorsementStr) {
            endorsementArr = endorsementStr.split(',');
            for(var i in endorsementArr) {
                endorsementArr[i] = endorsementArr[i].trim();
            }
            console.log(endorsementArr);
            for(var index in endorsementArr) {
                userEndorsementsJSX.push(<li className="list-group-item" key={endorsementArr[index]+ "end"}>
                    <strong>{endorsementArr[index]}: </strong>{ENDORSEMENT_DICT[endorsementArr[index]]}
                </li>)
            }
        }
        for(var key in ENDORSEMENT_DICT) {
            if(endorsementArr && endorsementArr.includes(key)) continue;
            else {
                nonHeldEndorsementJSX.push(<li className="list-group-item" key={key + "end"}>
                    <strong>{key}: </strong>{ENDORSEMENT_DICT[key]}
                </li>)
            }
        }
        let endorsementGlossary = (
            <Accordion defaultActiveKey="0" id="endorsementsGlossary">
                {endorsementArr && 
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Your Endorsements
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <ul className="card-body list-group list-group-flush">
                            {userEndorsementsJSX}
                        </ul>
                    </Accordion.Collapse>
                </Card>
                }
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                        Other Endorsements
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <ul className="card-body list-group list-group-flush">
                            {nonHeldEndorsementJSX}
                        </ul>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
            
        )
        return endorsementGlossary;
    }

    const generateRestrictionGLossary = (restrictionStr) => {
        let restrictionArr;
        let userRestrictionsJSX = [];
        let nonHeldRestrictionsJSX = [];
        if(restrictionStr) {
            restrictionArr = restrictionStr.split(',');
            for(var i in restrictionArr){
                restrictionArr[i] = restrictionArr[i].trim();
            }
            for(var index in restrictionArr) {
                userRestrictionsJSX.push(<li className="list-group-item" key={restrictionArr[index] + "res"}>
                    <strong>{restrictionArr[index]}: </strong>{RESTRICTION_DICT[restrictionArr[index]]}
                </li>)
            }
        }
        for(var key in RESTRICTION_DICT) {
            if(restrictionArr && restrictionArr.includes(key)) continue;
            if(key === "K_old" || key === "L_old") continue;//manage adding the tooltip for K and L can be added later
            else {
                nonHeldRestrictionsJSX.push(<li className="list-group-item" key={key + "res"}>
                    <strong>{key}: </strong>{RESTRICTION_DICT[key]}
                </li>)
            }
        }
        let restrictionGlossary = (
            <Accordion defaultActiveKey="0">
                {restrictionArr && 
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Your Restrictions
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <ul className="card-body list-group list-group-flush">
                            {userRestrictionsJSX}
                        </ul>
                    </Accordion.Collapse>
                </Card>
                }
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                    Other Restrictions
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <ul className="card-body list-group list-group-flush">
                            {nonHeldRestrictionsJSX}
                        </ul>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        )
        return restrictionGlossary;

    }

    const generateLicenseTabs = (licenses) => {
        console.log(licenses);
        let licenseTabs = [];
        licenses.map((license)=> {
            let licenseClass = license["dmv_licenseclassupdated@OData.Community.Display.V1.FormattedValue"];
            licenseClass = (license.dmv_ispermit) ? licenseClass + " (Permit)" : licenseClass;
            let isSuspendedText = (license.statecode) ? (<span className="suspended">(Suspended)</span>)
                : (<span className="activated-license">(Active)</span>);//statecode = 0 is falsy and means active in this case
            let endorsements = license["dmv_licenseendorsements@OData.Community.Display.V1.FormattedValue"] ? 
                license["dmv_licenseendorsements@OData.Community.Display.V1.FormattedValue"].replace(/;+/g, ',') : null;
            let restrictions = license["dmv_licenserestrictions@OData.Community.Display.V1.FormattedValue"] ? 
            license["dmv_licenserestrictions@OData.Community.Display.V1.FormattedValue"].replace(/;+/g, ',') : null;
            licenseTabs.push(
                <Tab className="tab-padding" eventKey={license.dmv_name}  key={license.dmv_name} title={license.dmv_name}>
                    <Row>
                        <Col>
                            <h4>License Details</h4>
                            <div className="license-detail-block">
                                <label className="license-label">License #: </label>
                                <p className="colInfo">{license.dmv_name} {isSuspendedText}</p>
                            </div>
                            <div className="license-detail-block">
                                <label className="license-label">License Holder: </label>
                                <p className="colInfo">{license["_dmv_testholdingcontact_value@OData.Community.Display.V1.FormattedValue"]}</p>
                            </div>
                            <div className="license-detail-block">
                                <label className="license-label">License Class: </label>
                                <p className="colInfo">{licenseClass}</p>
                            </div>
                            <div className="license-detail-block">
                                <label className="license-label">License Endorsements: </label>
                                <p className="colInfo">{endorsements ? endorsements : 'None'}</p>
                            </div>
                            <div className="license-detail-block">
                                <label className="license-label">License Restrictions: </label>
                                <p className="colInfo">{restrictions ? restrictions : 'None'}</p>
                            </div>
                            <div className="license-detail-block">
                                <label className="license-label">Issue Date: </label>
                                <p className="colInfo">{license["dmv_licenseissuedate@OData.Community.Display.V1.FormattedValue"]}</p>
                            </div>
                            <div className="license-detail-block">
                                <label className="license-label">Expiration Date: </label>
                                <p className="colInfo">{license["dmv_licenseexpdate@OData.Community.Display.V1.FormattedValue"]}</p>
                            </div>

                            { license["dmv_licenseexpdate@OData.Community.Display.V1.FormattedValue"] &&
                            <React.Fragment>
                                <LicenseRenewalModal id="renewmodal" handleClose={handleClose} show={show}/>
                                <Button variant="info" onClick={() => handleShow()}>Renew your License</Button>
                            </React.Fragment>
                            }
                        </Col>
                        <Col>
                            <h4>Driver Details</h4>
                            <div className="license-detail-block">
                                <label className="license-label">Height (in.): </label>
                                <p className="colInfo">{license.dmv_licenseheight}</p>
                            </div>
                            <div className="license-detail-block">
                                <label className="license-label">Weight (lbs.):</label>
                                <p className="colInfo">{license.dmv_licenseweight}</p>
                            </div>
                            <div className="license-detail-block">
                                <label className="license-label">Eye Color: </label>
                                <p className="colInfo">{license.dmv_licenseeye}</p>
                            </div>
                            <div className="license-detail-block">
                                <label className="license-label">Hair Color: </label>
                                <p className="colInfo">{license.dmv_licensehair}</p>
                            </div>
                            <div className="license-detail-block">
                                <label className="license-label">Issuing State: </label>
                                <p className="colInfo">{license["dmv_usstates@OData.Community.Display.V1.FormattedValue"]}</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>License Endorsement Glossary</h3>
                            { generateEndorsementGlossary(endorsements) }
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h3>License Restriction Glossary</h3>
                            { generateRestrictionGLossary(restrictions) }
                        </Col>
                    </Row>
                    
                </Tab>
            )
            // AK : this needs a better implementation location
            let today = new Date();
            let licExpDate = license["dmv_licenseexpdate@OData.Community.Display.V1.FormattedValue"];
            let licExpDateConvert = new Date(licExpDate);
            //console.log(licExpDate + " " + licExpDateConvert);
            if (licExpDateConvert < today){
                alert("You have an expired license!");
            }
            // AK
        })
        return (
            <Tabs defaultActiveKey={licenseTabs[0].eventKey}>
                {licenseTabs}
            </Tabs>
        )
    }

    const [show, setShow] = useState(false);

    const handleShow = () => { setShow(true) }
    const handleClose = () => { setShow(false) };

    return (
        <section className="main-block text-center">
            <h4 className="display-4">License Information</h4>
            {generateLicenseTabs(licenses)}
        </section>
    );
}

LicenseRender.propTypes = {
    information: PropTypes.object,
}

const ENDORSEMENT_DICT = {
    H: "Permits you to drive a vehicle that transports hazardous materials. This endorsement cannot be transferred from another state or foreign country. You must successfully complete the hazardous materials knowledge exam and background check.",
    N: "Permits you to drive a tank vehicle.",
    P: "Permits you to drive a passenger-carrying vehicle. You must take the road test in the class vehicle you wish to operate.",
    S: "Permits you to drive a school bus. *Individuals required to register with the Sex Offender and Crimes Against Minors Registry (Virginia Code Chapter 9 of Title 9.1) (Registry) will be issued licenses valid for five years. However, they are not eligible for a Virginia commercial driver's license/commercial learner's permit with an \"S\" endorsement during any period in which registration with the Registry is required. Additionally, if they hold a Virginia commercial driver's license/commercial learner's permit with a \"P\" endorsement, they are prohibited from operating a commercial vehicle to transport children to or from school or daycare sponsored activities.",
    T: "Permits you to drive a vehicle towing a double or triple trailer.",
    X: "Permits you to drive a tank vehicle AND a vehicle that transports hazardous materials",
    "*": "Individuals required to register with the Sex Offender and Crimes Against Minors Registry (Virginia Code Chapter 9 of Title 9.1) (Registry) will be issued licenses valid for five years. However, they are not eligible for a Virginia commercial driver's license/commercial learner's permit with an \"S\" endorsement during any period in which registration with the Registry is required. Additionally, if they hold a Virginia commercial driver's license/commercial learner's permit with a \"P\" endorsement, they are prohibited from operating a commercial vehicle to transport children to or from school or daycare sponsored activities.",   
} 

const RESTRICTION_DICT = {
    B: "You must wear corrective lenses when operating a commercial motor vehicle. (As of 7/01/2013)",
    Y: "You must wear corrective lenses when operating a commercial motor vehicle. (Prior to 7/01/2013)",
    C: "Corrective lenses required",
    E: "You may not operate a commercial motor vehicle with a manual transmission.",
    J: "You may only operate a school/activity bus. You may not operate any other type of commercial motor vehicle.",
    K: "You may not operate a commercial motor vehicle outside of Virginia.",
    K_old: 	"Prior to July 1, 2014 - You may not operate a vehicle with Full Air or Air over Hydraulic brakes. If you plan to operate a vehicle with either of these types of air brakes, you must take the air brakes knowledge test. You also must take the road test in a vehicle equipped with Full Air or Air over Hydraulic brakes.",
    L: "You may not operate a vehicle with Full Air or Air over Hydraulic brakes. If you plan to operate a vehicle with either of these types of air brakes, you must take the air brakes knowledge test. You must also take the road test in a vehicle equipped with Full Air or Air over Hydraulic brakes.",  
    L_old: "Prior to July 1, 2014 - You may not operate a commercial motor vehicle outside of Virginia.",
    M: "Operation of a passenger bus restricted to a Class B or Class C passenger vehicle.",
    N: "Operation of a passenger bus restricted to a Class C passenger vehicle.",
    O: "You may not operate a commercial motor vehicle with a tractor-trailer (any combination of vehicles with a gross weight of 26,001 lbs or more if the vehicle(s) being towed have gross weight of more than 10,000 lbs)",
    Q: "Prohibited from operating a commercial motor vehicle to transport children to or from activities sponsored by a school or by a child day care facility licensed, regulated, or approved by the Virginia Department of Social Services.",
    V: "You must have your medical variance documentation when operating a commercial motor vehicle.",
    X: "Prior to July 1, 2013 Corrective lenses required.",
    Z: "You may not operate a vehicle with Full Air brakes. If you plan to take the air brakes knowledge test and take the road test in a vehicle equipped with Air over Hydraulic brakes then you cannot operate a vehicle equipped with Full Air brakes.",
}

export default LicenseRender;