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

const TableActionButtons = ({ tableActions }) => {
  // seperate normal type and dropdown type from the sampleTableActions
  const normalTypeActions = tableActions.filter(
    (action) => action.type === "normal"
  );
  const dropdownTypeActions = tableActions.filter(
    (action) => action.type === "dropdown"
  );

  // dropdownTypedActions will have another property called dropdownName, group the actions by that dropdownName
  const dropdownTypedActions = dropdownTypeActions.reduce((acc, action) => {
    if (acc[action.dropdownName]) {
      acc[action.dropdownName].push(action);
    } else {
      acc[action.dropdownName] = [action];
    }
    return acc;
  }, {});

  return (
    <div>
      <Col sm="12">
        {normalTypeActions.map((action, index) => (
          <Button
            key={index}
            type="button"
            color="primary"
            className="btn me-2"
            mb-2
            onClick={action.action}
          >
            <i className="mdi mdi-plus-circle-outline me-1" />
            {action.name}
          </Button>
        ))}
        {
          // For each of the dropdownNames, create a dropdown with the list of actions in it
          Object.keys(dropdownTypedActions).map((dropdownName, index) => {
            return (
              <UncontrolledDropdown
                className="dropdown d-inline-block me-1"
                key={index}
              >
                <DropdownToggle
                  type="menu"
                  className="btn btn-success"
                  id="dropdownMenuButton1"
                >
                  {dropdownName} &nbsp;
                  <i className="bx bx bx-caret-down"></i>
                </DropdownToggle>
                <DropdownMenu>
                  {dropdownTypedActions[dropdownName].map((action, index) => {
                    return (
                      <li key={index} onClick={action.action}>
                        <DropdownItem href="#">{action.name}</DropdownItem>
                      </li>
                    );
                  })}
                </DropdownMenu>
              </UncontrolledDropdown>
            );
          })
        }
      </Col>
    </div>
  );
};

TableActionButtons.propTypes = {
  tableActions: PropTypes.array,
};

export default TableActionButtons;
