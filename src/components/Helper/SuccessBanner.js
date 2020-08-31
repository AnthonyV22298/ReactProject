"use strict"

import React, { useState } from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';


const SuccessBanner = (props) => {

    const [hidden, setHidden] = useState(true);

    return (
        hidden ?
            <div className="alert alert-success" role="alert">
                <Button close onClick={() => setHidden(false)} />
                    {props.children}
            </div >
            : ''
    );
}

SuccessBanner.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default SuccessBanner;

