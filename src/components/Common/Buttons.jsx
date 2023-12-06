import {
  Table,
  Row,
  Col,
  Button,
  Input,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import React from "react";
import PropTypes from "prop-types";

const Buttons = ({
  handleUserClick,
  handleUploadUser,
  handleBulkUpdateUser,
}) => {
  return (
    <div>
      <Col sm="12">
        <Button
          type="button"
          color="primary"
          className="btn me-2"
          mb-2
          onClick={handleUserClick}
        >
          <i className="mdi mdi-plus-circle-outline me-1" />
          Create New User
        </Button>
        <UncontrolledDropdown className="dropdown d-inline-block me-1">
          <DropdownToggle
            type="menu"
            className="btn btn-success"
            id="dropdownMenuButton1"
          >
            Upload &nbsp;
            <i className="bx bx-upload"></i>
          </DropdownToggle>
          <DropdownMenu>
            <li onClick={handleUploadUser}>
              <DropdownItem href="#">Upload User</DropdownItem>
            </li>
            <li onClick={handleBulkUpdateUser}>
              <DropdownItem href="#">Bulk Update User</DropdownItem>
            </li>
          </DropdownMenu>
        </UncontrolledDropdown>
        <UncontrolledDropdown className="dropdown d-inline-block me-1">
          <DropdownToggle
            type="menu"
            className="btn btn-success"
            id="dropdownMenuButton1"
          >
            Action &nbsp;
            <i className="mdi mdi-dots-vertical"></i>
          </DropdownToggle>
          <DropdownMenu>
            <li onClick={() => setModal4(true)}>
              <DropdownItem href="#">Bulk Active/Inactive User</DropdownItem>
            </li>
            <li onClick={() => setModal5(true)}>
              <DropdownItem href="#">Bulk User Settings</DropdownItem>
            </li>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Col>
    </div>
  );
};

Buttons.propTypes = {
  handleUserClick: PropTypes.func,
  handleUploadUser: PropTypes.func,
  handleBulkUpdateUser: PropTypes.func,
  show: PropTypes.any,
};

export default Buttons;
