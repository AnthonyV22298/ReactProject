
import React, { Component } from "react";
import axios from 'axios'
import { adalApiFetch } from '../../adalConfig.js';
import PropTypes from 'prop-types';


class LocationsDropdown extends Component {


  constructor(props) {
    super(props)
    this.state = {items: [],value: 0};
    this._onChangeHandler = this._onChangeHandler.bind(this);
  }
  componentDidMount() {
    this.getItems();
  }
  componentWillUnmount() {
  }

  _onChangeHandler(e) {
    e.persist();
    console.log(e.target.value);
    this.setState({value: e.target.value});
    this.props.onChange(e);

    console.log("location = " + e.target.value);
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
              <div className="select">
                <select nameName="slct" id="slct" onChange={this._onChangeHandler} value={this.state.value}>
                    <option selected disabled>Select a location</option>
                    {this.state.items.map((item) => (
                    <option key={item.crefc_locationid} value={item.crefc_locationid}>
                        {item.crefc_locationname + ": " + item.crefc_addressline1 + ", " + item["crefc_state@OData.Community.Display.V1.FormattedValue"]}
                    </option>
                    ))}
                </select>
              </div>
        );
    }
}
LocationsDropdown.propTypes = {
  handleChange: PropTypes.func,
  onChange: PropTypes.func
};
export default LocationsDropdown;
