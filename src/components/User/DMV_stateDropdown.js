
import React, { Component } from "react";
import axios from 'axios'
import { adalApiFetch } from '../../adalConfig.js';
import PropTypes from 'prop-types';

class DMV_stateDropdown extends Component {


  constructor(props) {
    super(props)

    this.state = {optionset: [], value: 100};
    this._onChangeHandler = this._onChangeHandler.bind(this);
  }
  componentDidMount() {
    this.getOptions();
  }
  _onChangeHandler(e) {
    e.persist();
    var index = e.nativeEvent.target.selectedIndex;
    //console.log("index = " + index);
    var currlabel = e.nativeEvent.target[index].text;
    this.setState({value: e.target.value, label: currlabel});
    this.props.onChange(e);
    console.log("label = " + currlabel + ": state = " + e.target.value);
  }
  getOptions() {
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
    adalApiFetch(axios,"https://sstack4.crm.dynamics.com/api/data/v8.2/GlobalOptionSetDefinitions(Name='dmv_states')/Microsoft.Dynamics.CRM.OptionSetMetadata",config)
        .then(results => {
            console.log(results.data.Options);
            this.setState({optionset: results.data.Options});
        },
        function(error) {
            console.log(error.message);
        }
            )
    }
    // {Option.Label.LocalizedLabels[0].Label}
render(){
    return (
            <select onChange={this._onChangeHandler} value={this.state.value} defaultValue={0}>
                <option value = {0} disabled> Choose a U.S. State </option>
                {this.state.optionset.map((Option) => (
                <option key={Option.Value} value={Option.Value}>
                {Option.Label.UserLocalizedLabel.Label}
                </option>
                ))}
            </select>
        );
    }
}


DMV_stateDropdown.propTypes = {
  handleChange: PropTypes.func,
  onChange: PropTypes.func
};

export default DMV_stateDropdown;
