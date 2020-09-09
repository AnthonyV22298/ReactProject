"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ModalUpdate from '../Modal/ModalUpdate';
import ModalDelete from '../Modal/ModalDelete';

const AppointmentRender = ({ appointments, handleRefresh }) => {

  function getTableBodyContent() {
    return appointments.map(obj => {

      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj))

      newObj["view"] = (
        <Button command="View" name={obj.firstname} entity="dmv_appointment"
          initialValues={{ ...obj }}>View</Button>
      );
      newObj.update = <div>
        <ModalUpdate buttonLabel="Update"/>
        </div>

      newObj.delete = <div>
        <ModalDelete buttonLabel="Delete"/>
        </div>
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
        label: 'Time',
        field: 'dmv_time@OData.Community.Display.V1.FormattedValue',
        sort: 'asc'
      },
      {
        label: 'Location',
        field: '_dmv_appointmentlocation_value@OData.Community.Display.V1.FormattedValue',
        sort: 'asc'
      },
      {
        label: 'Approved',
        field: 'dmv_approved@OData.Community.Display.V1.FormattedValue',
        sort: 'asc'
      },
      {
        label: 'Update',
        field: 'update',
        sort: 'asc'
      },
      {
        label: 'Delete',
        field: 'delete',
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

