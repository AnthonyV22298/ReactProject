import React from 'react';
import PropTypes from 'prop-types';
import { INFO_LICENSE, INFO_CITATIONS } from '../../constants/viewNames';

const InformationSecondaryNav = ({ clickFunc }) => {
    return (
        <nav>
            <button type="button" className="btn btn_light" onClick={() => {clickFunc(INFO_LICENSE)}}>License</button>
            <button type="button" className="btn btn_light" onClick={() => {clickFunc(INFO_CITATIONS)}}>Citations</button>
        </nav>
    )
}
InformationSecondaryNav.propTypes={
    clickFunc: PropTypes.func,
}
export default InformationSecondaryNav;