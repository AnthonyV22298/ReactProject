"use strict"

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SuccessBanner from '../Helper/SuccessBanner';

class VehicleRegister extends Component {
    constructor(props){
        super(props)

        this.state = {}
    }

    render(){
    return (
        <div className="mainblock" >
            <div>
                <div style={{padding:"10px", paddingBottom:"40px", paddingRight:"20px"}}>
                <h5>1) Type in the make</h5>
                </div>

                <div style={{padding:"10px", paddingBottom:"40px", paddingRight:"20px"}}>
                    <h5>2) Type in the model</h5>
                </div>

                <div style={{padding:"10px", paddingBottom:"40px", paddingRight:"20px"}}>
                    <h5>3) Type in the color </h5>
                </div>
            </div>

            <div style={{justifyContent:"center", paddingBottom:"20px", display:"flex"}}>
                <button className="button" onClick={() => this.props.handleCreate(this.state)} >Register Vehicle</button>
            </div>

            <div>
                {(this.props.postSuccess === true) && (
                    <SuccessBanner>
                        Appointment Request Created!
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