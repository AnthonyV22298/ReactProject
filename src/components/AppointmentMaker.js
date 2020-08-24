"use strict"

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Calendar from "react-calendar";
import LocationsDropdown from "./LocationsDropdown"


class AppointmentMake extends Component {
    constructor(props){ 
        super(props)
        
        this.state = {
            date: new Date(),
            today: new Date(),
            type: "General",
        }
        this.onChange = this.onChange.bind(this);   
    }

    typeChange(newType)
    {
        this.setState({ type : newType.target.value })
    }

    onChange(newdate)
    {
        this.setState({ date : newdate })
    }

    render(){
    return ( 
        <div style={{ justifyContent: "center", textAlign: "center"}}>

            <div style={{ display: "flex", justifyContent: "center" }}>
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
            </div>

            <p style={{ display: "block", paddingTop: "30px", paddingLeft: "40px" }}>{ "Date selected: " + this.state.date.toLocaleDateString() }</p>            

            <h2>Select the appointment type</h2>
            <select onChange={this.typeChange}>
                <option value="general">General</option>
                <option value="permit">Permit Exam</option>
                <option value="driver">Drivers Test</option>
            </select>

            <LocationsDropdown />

            <button onClick={() => this.props.handleCreate(this.state)} >Create New Appointment</button>
            
        </div>
        )
    }
}

AppointmentMake.propTypes = {
    appointments: PropTypes.array,
    handleCreate: PropTypes.func
};

export default AppointmentMake;