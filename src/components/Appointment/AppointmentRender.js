"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';

const AppointmentRender = ({ appointments, handleRefresh }) => {

  /* converts month integer into month string */
  function parseMonth(string) {
    var num = parseInt(string);
    switch(num) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "ERROR";
    }
  }
  function formatDate(obj) {
    console.log(obj.dmv_appointment_date);
    const concat = (accumulator, currentValue) => accumulator + currentValue;
    //2020-09-14T04:00:00Z
    let array = Array.from(obj.dmv_appointment_date);
    //09-14-2020 : 04:00AM
    var am = true
    if(array.slice(11,13).reduce(concat) < 12) {
      am = true;
    } else {
      am = false
    }
    var time = "";
    // Parse hours depending on AM or PM
    if(array.slice(11,13).reduce(concat) > 12) {
      time = array.slice(11,13).reduce(concat) - 12 + array.slice(13,16).reduce(concat) + (am ? "AM" : "PM");
    } else {
      time = parseInt(array.slice(11,13).reduce(concat)) + array.slice(13,16).reduce(concat) + (am ? "AM" : "PM");
    }
    // Parse Months
    var month = parseMonth(array.slice(5,7).reduce(concat)); 
    return(month + " " + parseInt(array.slice(8,10).reduce(concat)) + ", " + array.slice(0,4).reduce(concat) + " " + time);
  }
  function getTableBodyContent() {
    return appointments.map(obj => {

      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj));
      newObj.dmv_appointment_date = formatDate(newObj);
      newObj["view"] = (
        <Button command="View" name={obj.firstname} entity="dmv_appointment"
          initialValues={{ ...obj }}>View</Button>
      );
      return newObj;
    });

  }
  let data = {
    columns: [
      {
        label: 'Appointment Type',
        field: 'dmv_app_type@OData.Community.Display.V1.FormattedValue',
        sort: 'asc'
      },
      {
        label: 'Date',
        field: 'dmv_appointment_date',
        sort: 'asc'
      },
      {
        label: 'Approved',
        field: 'dmv_approved@OData.Community.Display.V1.FormattedValue',
        sort: 'asc'
      },
    ],
    rows: getTableBodyContent()


  }
  return (
    <React.Fragment>
      <div className="mainblock">
      <h1>Appointments</h1>
      <Button onClick={() => handleRefresh()}>Refresh Data</Button>{' '}
      <MDBDataTable
        striped
        bordered
        small
        responsive
        data={data}
      />
      </div>
    </React.Fragment>
  );
}

AppointmentRender.propTypes = {
  appointments: PropTypes.array,
  handleView: PropTypes.func,
  handleRefresh: PropTypes.func
};


export default AppointmentRender;

