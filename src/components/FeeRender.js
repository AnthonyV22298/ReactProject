"use strict"

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { MDBDataTable } from 'mdbreact';

const FeeRender = ({ fees, handleRefresh }) => {

  function getTableBodyContent() {
    return fees.map(obj => {

      // Deep Clone object to avoid adding to it while mapping over it during map
      let newObj = JSON.parse(JSON.stringify(obj))

      newObj["view"] = (
        <Button command="View" name={obj.firstname} entity="dmv_fee"
          initialValues={{ ...obj }}>View</Button>
      );
      return newObj;
    });

  }
  let data = {
    columns: [
              {
        label: 'Title',
        field: 'dmv_name',
        sort: 'asc'
      },
      {
        label: 'Fee ID',
        field: 'dmv_feeid',
        sort: 'asc'
      },
      {
        label: 'Contact Lookup GUID',
        field: '_dmv_contact_value',
        sort: 'asc'
      },

      {
        label: 'Cost',
        field: 'dmv_cost',
        sort: 'asc'
      },
      {
        label: 'Reason',
        field: 'dmv_purpose@OData.Community.Display.V1.FormattedValue',
        sort: 'asc'
      },
    ],
    rows: getTableBodyContent()


  }
  return (
    <React.Fragment>
      <h1>Fees</h1>
      <Button onClick={() => handleRefresh()}>Refresh Data</Button>{' '}
      <MDBDataTable
        striped
        bordered
        small
        responsive
        data={data}
      />
    </React.Fragment>
  );
}

FeeRender.propTypes = {
  fees: PropTypes.array,
  handleView: PropTypes.func,
  handleRefresh: PropTypes.func
};


export default FeeRender;

