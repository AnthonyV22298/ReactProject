import React, { Component } from "react";
import axios from 'axios'
import { adalApiFetch } from '../../adalConfig.js';
import PropTypes from 'prop-types';

class TimeDropdown extends Component {


  constructor(props) {
    super(props)

    this.state = {optionset: [], value: 0};
    this._onChangeHandler = this._onChangeHandler.bind(this);
  }
  componentDidMount() {
    this.getOptions();
  }
  _onChangeHandler(e) {
    e.persist();
    var index = e.nativeEvent.target.selectedIndex;
    var currlabel = e.nativeEvent.target[index].text;
    this.setState({value: e.target.value, label: currlabel});
    this.props.onChange(e);
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
    adalApiFetch(axios,"https://sstack4.crm.dynamics.com/api/data/v8.2/GlobalOptionSetDefinitions(Name='dmv_work_hours')/Microsoft.Dynamics.CRM.OptionSetMetadata",config)
        .then(results => {
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
            <div className="select">
            <select className="slct" id="slct" onChange={this._onChangeHandler} value={this.state.value}>
                <option value={0} disabled> Choose a Time </option>
                {this.state.optionset.map((Option) => (
                <option key={Option.Value} value={Option.Value}>
                  {Option.Label.UserLocalizedLabel.Label}
                </option>
                ))}
            </select>
            </div>
        );
    }
}


TimeDropdown.propTypes = {
  handleChange: PropTypes.func,
  onChange: PropTypes.func
};

export default TimeDropdown;
