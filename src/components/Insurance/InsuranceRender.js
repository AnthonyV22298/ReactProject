import React from 'react';
import PropTypes from 'prop-types';

const InsuranceRender = (information) => {
    console.log("Insurance Render.js");
    console.log(information);
    console.log("Insurance Render testing done");
    const { insurance } = information;
    if(insurance === undefined) {
        return ( <h3> ERROR - NO PROVIDER</h3>)
    } else if(insurance === null) {
        return (
            <section className="info-render">                
                <div className="mainblock"> 
                <h4 className="display-3">No Insurance Found :(</h4>
                </div>
            </section>
        )
    } else {
        return (
            <div className="mainblock">
                <h3 className="display-3">Insurance Information</h3>
                    <div className="row">
                    <div className="col">
                    <h2> {insurance["dmv_policyno"]} </h2>
                        <p><strong>Provider Name: </strong>{insurance["dmv_providername"]} </p>
                        <p><strong>State: </strong>{insurance["dmv_state@OData.Community.Display.V1.FormattedValue"]} </p>
                        <p><strong>Street: </strong>{insurance["dmv_street"]} </p>
                        <p><strong>City: </strong>{insurance["dmv_city"]} </p>
                        <p><strong>Zip Code: </strong>{insurance["dmv_zip_code"]} </p>
                        <p><strong>Description: </strong>{insurance["dmv_description"]} </p>
                    </div>
                </div>
            </div>
        );
    }
}


InsuranceRender.propTypes = {
information: PropTypes.object,
}

export default InsuranceRender;