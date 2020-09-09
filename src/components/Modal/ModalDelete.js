import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';

const ModalDelete = (props) => {
    const {
    buttonLabel,
    className,
    targetfee
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} targetfee={targetfee}>
        <ModalHeader toggle={toggle}>Are you sure you want to cancel the appointment</ModalHeader>
        <ModalBody>
            <button>Yes</button>
            <button>No</button>
        </ModalBody>
      </Modal>
    </div>
  );
}

ModalDelete.propTypes = {
    buttonLabel: PropTypes.string,
    className: PropTypes.string,
    targetfee: PropTypes.string
};

export default ModalDelete;