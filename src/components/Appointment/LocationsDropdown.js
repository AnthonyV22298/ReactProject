
import React, { Component } from "react";
import axios from 'axios'
import { adalApiFetch } from '../../adalConfig.js';

class LocationsDropdown extends Component {


  constructor(props) {
    super(props)
    this.state = {items: []};
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
      'Content-Type': 'crefc_locations/json; charset=utf-8', 
      headers: {
          'Prefer': "odata.include-annotations=*"
      }
    }
    //@OData.Community.Display.V1.FormattedValue
    adalApiFetch(axios,"https://sstack4.crm.dynamics.com/api/data/v9.1/crefc_locations?$select=crefc_locationname,crefc_state,crefc_addressline1,crefc_locationid",config)
        .then(results => {
            this.setState({items: results.data.value}),
            console.log(results.data.value)
        }
            )
    }
render(){
    return (
        <React.Fragment>
            
                <select>
                    {this.state.items.map((item) => (
                    <option key={item.crefc_locationid} value={item.crefc_locationid}>
                        {item.crefc_locationname + ": " + item.crefc_addressline1 + ", " + item["crefc_state@OData.Community.Display.V1.FormattedValue"]}
                    </option>
                    ))}
                </select>
        </React.Fragment>
        );
    }
}

export default LocationsDropdown;
