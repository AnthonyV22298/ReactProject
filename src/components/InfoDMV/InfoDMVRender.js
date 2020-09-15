"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';

const InfoDMVRender = ({ infoDMV, handleRefresh }) => {
  
    function getTableBodyContent() {
      return infoDMV.map(obj => {
  
        // Deep Clone object to avoid adding to it while mapping over it during map
        let newObj = JSON.parse(JSON.stringify(obj))
  
        newObj["view"] = (
          <Button command="View" name={obj.crefc_locationname} entity="crefc_location"
            initialValues={{ ...obj }}>View</Button>
        );
        return newObj;
      });
  
    }
    let data = {
      columns: [
        {
          label: 'Location',
          field: 'crefc_locationname',
          sort: 'asc'
        },
        {
          label: 'Address',
          field: 'crefc_addressline1',
          sort: 'asc'
        },
        {
          label: 'State',
          field: 'crefc_state',
          sort: 'asc'
        },
        {
          label: 'Zipcode',
          field: 'crefc_zipcode',
          sort: 'asc'
        },
        {
          label: 'Phone',
          field: 'crefc_phonenumber',
          sort: 'asc'
        },
        {
          label: 'Fax',
          field: 'crefc_faxnumber',
          sort: 'asc'
        },
        {
          label: 'Email',
          field: 'crefc_primaryemail',
          sort: 'asc'
        },	  
      ],
      rows:
        getTableBodyContent(),  
    }
  
    return (
      <React.Fragment>      
        <div className="mainblock">
        <h1>DMV Locations</h1>
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
  
  InfoDMVRender.propTypes = {
    infoDMV: PropTypes.array,
    handleView: PropTypes.func,
    handleRefresh: PropTypes.func
  };
  
  export default InfoDMVRender;
  
  