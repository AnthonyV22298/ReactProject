"use strict"

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SuccessBanner from '../Helper/SuccessBanner';

class VehicleRegister extends Component {
    constructor(props){
        super(props)

        this.state = {
            make: "",
            model: "",
            color: "",
            year: "",
        }

        this.makeChange = this.makeChange.bind(this); 
        this.modelChange = this.modelChange.bind(this); 
        this.colorChange = this.colorChange.bind(this);
        this.yearChange = this.yearChange.bind(this);
    }

    makeChange(e)
    {
        this.setState({ make : e.target.value })
    }
    
    modelChange(e) 
    {
        this.setState({ model : e.target.value })
    }

    colorChange(e) 
    {
        this.setState({ color : e.target.value })
    }

    yearChange(e)
    {
        this.setState({ year : e.target.value })
    }

    render(){
    return (
        <div className="mainblock" >
            <div>
                <form>
                    <p>Enter the make</p>
                    <input type='text' name='make' onChange={this.makeChange}/>
                    <p>Enter the model</p>
                    <input type='text' name='model' onChange={this.modelChange}/>
                    <p>Enter the color</p>
                    <input type='text' name='color' onChange={this.colorChange}/>
                    <p>Enter the year</p>
                    <input type='text' name='year' onChange={this.yearChange}/>
                </form>
            </div>

            <div style={{justifyContent:"center", paddingBottom:"20px", display:"flex"}}>
                <button className="button" onClick={() => this.props.handleCreate(this.state)} >Register Vehicle</button>
            </div>

            <div>
                {(this.props.postSuccess === true) && (
                    <SuccessBanner>
                        Vehicle Registered!
                    </SuccessBanner>
                )}
            </div>


        </div>
        )
    }
}

VehicleRegister.propTypes = {
    appdates: PropTypes.array,
    handleCreate: PropTypes.func,
    postSuccess: PropTypes.bool,
};

export default VehicleRegister;