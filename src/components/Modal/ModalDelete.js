import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from 'prop-types';

const ModalDelete = (props) => {
  const {
    buttonLabel,
    className,
    targetfee,
    handleCancel,
    handleRefresh,
    guid,
  } = props;

  const [modal, setModal] = useState(false);

  function cancel(guid) {
      handleCancel(guid).then(()=>handleRefresh())
  }

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className} targetfee={targetfee}>
        <ModalHeader toggle={toggle} style={{background:"#343a40", color:"white"}}>Are you sure you want to cancel the appointment</ModalHeader>
        <ModalBody>
            <Button color="primary" className="twobuttons" onClick={() => cancel(guid)}>Yes</Button>
            <Button color="danger" className="twobuttons" onClick={() => handleRefresh()}>No</Button>
        </ModalBody>
      </Modal>
    </div>
  );
}

ModalDelete.propTypes = {
    buttonLabel: PropTypes.string,
    className: PropTypes.string,
    targetfee: PropTypes.string,
    handleCancel: PropTypes.func,
    handleRefresh: PropTypes.func,
    guid: PropTypes.string
};

export default ModalDelete;