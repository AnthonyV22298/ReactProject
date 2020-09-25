import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const LicenseRenewalModal = ({ show, handleClose }) => {
    console.log('LRModal')
    
    const handleClick = () => {
        alert('Alert!');
        handleClose();
    }
    return (
        <Modal aria-labelledby="contained-modal-title-vcenter" backdrop='static' centered show={show} closebutton="true" onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Renew your driver&apos;s license!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p></p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="primary" onClick={handleClick}>Renew</Button>
            </Modal.Footer>
        </Modal>
    )
}

LicenseRenewalModal.propTypes = {
    show: PropTypes.bool,
    handleClose: PropTypes.func,
} 

export default LicenseRenewalModal;