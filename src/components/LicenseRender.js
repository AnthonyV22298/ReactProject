import React from 'react';
import PropTypes from 'prop-types';

const LicenseRender = ({ information }) => {
    console.log(information);
    const { license } = information;
    let licenseClass = license["dmv_licenseclassupdated@OData.Community.Display.V1.FormattedValue"];
    licenseClass = (license.dmv_ispermit) ? licenseClass + " (Permit)" : licenseClass;
    let isSuspendedText = (license.statecode) ? (<span className="suspended">(Suspended)</span>)
        : (<span className="activated-license">(Active)</span>);//statecode = 0 is falsy and means active in this case
    //let reActivationDate = (license.statecode) ? (<p><strong>Reactivation Date:</strong>{license["dmv_reactivationdate@OData.Community.Display.V1.FormattedValue"]}</p>)
    return (
        <section className="info-render">
            <h3 className="display-3">License Information</h3>
            <div className="row">
                <div className="col">
                    <h4>License Details</h4>
                    <p><strong>License #: </strong>{license.dmv_name} {isSuspendedText}</p>
                    <p><strong>License Holder: </strong>{license["_dmv_testholdingcontact_value@OData.Community.Display.V1.FormattedValue"]}</p>
                    <p><strong>License Class: </strong>{licenseClass}</p>
                    <p><strong>Issue Date: </strong>{license["dmv_licenseissuedate@OData.Community.Display.V1.FormattedValue"]}</p>
                    <p><strong>Expiration Date: </strong>{license["dmv_licenseexpdate@OData.Community.Display.V1.FormattedValue"]}</p>
                </div>
                <div className="col">
                    <h4>Driver Details</h4>
                    <p><strong>Height (in.): </strong>{license.dmv_licenseheight}</p>
                    <p><strong>Weight (lbs.): </strong>{license.dmv_licenseweight}</p>
                    <p><strong>Eye Color: </strong>{license.dmv_licenseeye}</p>
                    <p><strong>Hair Color: </strong>{license.dmv_licensehair}</p>
                    <p><strong>Issuing State: </strong>{license["dmv_usstates@OData.Community.Display.V1.FormattedValue"]}</p>
                </div>
            </div>
        </section>
    );
}

LicenseRender.propTypes = {
    information: PropTypes.object,
}

export default LicenseRender;