"use strict"

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Calendar from "react-calendar";
import LocationsDropdown from "./LocationsDropdown"
import { adalApiFetch } from '../../adalConfig.js';
import axios from 'axios'

class AppointmentMake extends Component {
    constructor(props){ 
        super(props)
        
        this.state = {
            date: new Date(),
            today: new Date(),
            type: "Driver's Test",
            items: [],
        }
        this.onChange = this.onChange.bind(this); 
        this.typeChange = this.typeChange.bind(this);   
    }

    componentDidMount() {
        this.getItems();
    }
    
    getItems() {
        let config = {
        method: 'get',
        'OData-MaxVersion': 4.0,
        'OData-Version': 4.0,
        Accept: 'crefc_locations/json',
        'Content-Type': 'dmv_appointment/json; charset=utf-8', 
        headers: {
            'Prefer': "odata.include-annotations=*"
        }
        }
        //@OData.Community.Display.V1.FormattedValue
        adalApiFetch(axios,"https://sstack4.crm.dynamics.com/api/data/v9.1/dmv_appointments?$apply=groupby((dmv_app_type))",config)
            .then(results => {
                this.setState({items: results.data.value}),
                console.log(results.data.value)
            }
                )
    }

    typeChange(newType)
    {
        if(newType.target.value === "Permit Exam"){
            this.setState({ type : 174070000 })
        }
        else if(newType.target.value === "Driver's Test"){
            this.setState({ type : 174070001 })
        }
    }

    onChange(newdate)
    {
        this.setState({ date : newdate })
    }

    render(){
    return ( 
        <div className="mainblock" >
            <div  style={{display:"flex", justifyContent:"center"}}>

            <div>
                <div style={{padding:"10px", paddingBottom:"40px", paddingRight:"20px"}}>
                <React.Fragment>
                <h5>1) Select the appointment type</h5>
                    <select onChange={this.typeChange}>
                        <option>Select Type</option>
                        {this.state.items.map((item) => (
                        <option key={item.dmv_app_type}>
                            {item["dmv_app_type@OData.Community.Display.V1.FormattedValue"]}
                        </option>
                        ))}
                    </select>
                </React.Fragment>
                </div>
            
                <div style={{padding:"10px", paddingBottom:"40px", paddingRight:"20px"}}>
                    <h5>2) Select the location</h5>
                    <LocationsDropdown />
                </div>
            </div>

            <div style={{ width:"30%", justifyContent: "center", textAlign: "left", paddingLeft: "10px"}}>
                <h5>3) Select a Date for your appointment</h5>
                <Calendar 
                    onChange={this.onChange} 
                    calendarType={"US"}
                    tileDisabled={({date }) =>
                    date.getDay()===0 || date.getDay()===6 ||  
                    (date.getMonth() <= this.state.today.getMonth() &&
                    date.getDate() < this.state.today.getDate() &&
                    date.getFullYear() <= this.state.date.getFullYear()) ||
                    (date.getMonth() < this.state.today.getMonth() &&
                    date.getDate() >= this.state.today.getDate() &&
                    date.getFullYear() <= this.state.date.getFullYear())}
                    />
                    <p style={{ display: "block", paddingTop: "30px", paddingLeft: "40px" }}>{ "Date selected: " + this.state.date.toLocaleDateString() }</p>
            </div>
            </div> 

            <div style={{justifyContent:"center", paddingBottom:"20px", display:"flex"}}>
                <button onClick={() => this.props.handleCreate(this.state)} >Create New Appointment</button>
            </div>

            <div style={{ paddingTop:"10px" }}>
                {(this.state.type === 174070000 || this.state.type === 174070001) && (
                    <div>
                        <h4>1) You are required to provide proof of your identity. DMV accepts the documents listed below, please bring one.</h4>
                        <ul>
                            <li>Official birth document issued by a U.S. state, jurisdiction, or territory </li>
                            <li>Valid, unexpired U.S. passport or U.S. passport card</li>
                            <li>Unexpired foreign passport with unexpired or expired U.S. visa and unexpired I-94 or entry stamp</li>
                            <li>Unexpired foreign passport with unexpired I-94W</li>
                            <li>Unexpired foreign passport with unexpired or expired U.S. immigrant visa</li>
                            <li>Unexpired foreign passport with unexpired or expired I-551 stamp</li>
                            <li>Unexpired Employment Authorization Document (I-766)</li>
                            <li>Consular Report of Birth Abroad (FS-240)</li>
                            <li>Certificate of Birth Abroad (FS-545)</li>
                            <li>Certification of Report of Birth of a U.S. Citizen (DS-1350)</li>
                            <li>U.S. Certificate of Naturalization (Form N-550 or Form N-570)</li>
                            <li>U.S. Certificate of Citizenship (Form N-560 or Form N-561)</li>
                            <li>Valid, unexpired permanent resident card (Form I-551)</li>
                            <li>REAL ID compliant driver’s license or ID card</li>
                        </ul>

                        <h4>2) You are required to provide one document as primary proof of your Virginia residency. Bring two of these documents</h4>
                        <ul>
                            <li>Deed, mortgage, monthly mortgage statement or residential rental/lease agreement</li>
                            <li>U.S. Postal Service change of address confirmation form or postmarked U.S. mail with forwarding address label</li>
                            <li>Virginia voter registration card mailed to you by your local registrar</li>
                            <li>Virginia driver’s license, commercial driver’s license, learner’s permit, or DMV-issued ID card displaying the applicants current Virginia address</li>
                            <li>Cancelled check not more than two months old displaying the applicant’s name and address (voided checks are not acceptable)</li>
                            <li>Certified copy of school records/transcript or official report card issued within the last year by a school accredited by a U.S. state, jurisdiction or territory</li>
                            <li>Virginia Department of Education Certificate of Enrollment form</li>
                            <li>Monthly bank or credit card statement not more than two months old</li>
                            <li>Payroll check stub issued by an employer within the last two months</li>
                            <li>U.S. Internal Revenue Service tax reporting W-2 form or 1099 form not more than 18 months old</li>
                            <li>Receipt for personal property taxes or real estate taxes paid within the last year to the Commonwealth of Virginia or a Virginia locality</li>
                            <li>Current homeowners insurance policy or bill</li>
                            <li>Annual social security statement for the current or preceding calendar year</li>
                            <li>Current automobile or life insurance bill (cards or policies are not accepted)</li>
                            <li>Medical or dental bill issued within the last two months</li>
                        </ul>
                        <h6>Active duty military member assigned to a unit based in Virginia may present one of the following:</h6>
                        <ul>
                            <li>Letter from commanding officer on official letterhead with an original signature stating that the applicant resides onboard a ship docked in Virginia or in a barracks located in Virginia</li>
                            <li>Orders from the U.S. military assigning the applicant to a military unit with a Virginia address</li>
                            <li>Leave and Earnings Statement (LES) showing Virginia as the applicant&apos;s home of record</li>
                        </ul>

                        <h4>3) You are required to provide one document as proof of your social security number (SSN) if you have been issued one. Your document must display all nine digits. Select one document that you will bring to DMV.</h4>
                        <ul>
                            <li>Social security card (individual Taxpayer Identification Numbers are not accepted)</li>
                            <li>W-2 form</li>
                            <li>Payroll check stub issued by employer that shows full Social Security Number</li>
                            <li>SSA-1099 form</li>
                            <li>Non-SSA-1099 form</li>
                        </ul>
                    </div>
                )},
            </div>
            
            
        </div>
        )
    }
}

AppointmentMake.propTypes = {
    appointments: PropTypes.array,
    handleCreate: PropTypes.func
};

export default AppointmentMake;