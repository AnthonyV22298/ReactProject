"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';
import ModalVehicleUpdate from '../Modal/ModalVehicleUpdate';
import ModalVehicleDelete from '../Modal/ModalVehicleDelete';

const VehicleDetailsRender = ({ vehicleDetails, handleRefresh, handleCancel, handleUpdate }) => {
  console.log(localStorage);
  function getTableBodyContent() {
    return vehicleDetails.map(obj => {

      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj))

      newObj["view"] = (
        <Button command="View" name={obj.dmv_vin_number} entity="dmv_vehicles"
          initialValues={{ ...obj }}>View</Button>
      );
      newObj.update = <div>
        <ModalVehicleUpdate buttonLabel="Update" handleRefresh={handleRefresh} handleUpdate={handleUpdate} appointment={newObj}/>
        </div>

      newObj.cancel = <div>
        <ModalVehicleDelete buttonLabel="Delete" handleCancel={handleCancel} handleRefresh={handleRefresh} guid={newObj.dmv_appointmentid}/>
        </div>
      return newObj;
    });

  }
  let data = {
    columns: [
      {
        label: 'VIN',
        field: 'dmv_vin_number',
        sort: 'asc'
      },
      {
        label: 'Make',
        field: 'dmv_make',
        sort: 'asc'
      },
      {
        label: 'Model',
        field: 'dmv_model',
        sort: 'asc'
      },
      {
        label: 'Color',
        field: 'dmv_color',
        sort: 'asc'
      },
      {
        label: 'Year',
        field: 'dmv_year',
        sort: 'asc'
      },
      {
        label: 'Registration Date',
        field: 'dmv_register_date',
        sort: 'asc'
      },
      {
        label: 'Registration Expiration Date',
        field: 'dmv_expiration_date',
        sort: 'asc'
      },
      {
        label: 'Update',
        field: 'update',
        sort: 'asc'
      },
      {
        label: 'Cancel',
        field: 'cancel',
        sort: 'asc'
      },	  
    ],
    rows:
      getTableBodyContent(),  
  }

  return (
    <React.Fragment>
        <div className="mainblock">
        <h1>VehicleDetails</h1>
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

console.log("before proptypes vDetRender.js");

VehicleDetailsRender.propTypes = {
  vehicleDetails: PropTypes.array,
  handleView: PropTypes.func,
  handleRefresh: PropTypes.func,
  handleCancel: PropTypes.func,
  handleUpdate: PropTypes.func,
};

export default VehicleDetailsRender;

