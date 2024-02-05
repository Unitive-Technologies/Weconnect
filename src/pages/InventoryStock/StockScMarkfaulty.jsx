import React, { useMemo, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import PropTypes from "prop-types";
import TableContainer from "../../components/Common/TableContainer";

function StockScMarkfaulty(props) {
  const { isOpen, toggle, selectedRows } = props;
  const [isChecked, setIsChecked] = useState(true);

  const columns = useMemo(
    () => [
      {
        Header: "*",
        disableFilters: true,
        filterable: true,
        Cell: () => {
          return (
            <input
              type="checkbox"
              checked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
            />
          );
        },
      },
      {
        Header: "#",
        disableFilters: true,
        filterable: true,
        Cell: (cellProps) => {
          const totalRows = cellProps.rows.length;
          const reverseIndex = totalRows - cellProps.row.index;
          return (
            <>
              <h5 className="font-size-14 mb-1">{reverseIndex}</h5>
            </>
          );
        },
      },
      {
        Header: "Smartcard No.",
        accessor: "smartcardno",
        filterable: true,
        Cell: (cellProps) => {
          return (
            <>
              <h5 className="font-size-14 mb-1">
                {cellProps.row.original.smartcardno}
              </h5>
            </>
          );
        },
      },
    ],
    []
  );
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      size="xl"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <ModalHeader toggle={toggle}>Mark Faulty Smartcard</ModalHeader>
      <ModalBody>
        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <TableContainer
                  isPagination={true}
                  columns={columns}
                  data={selectedRows}
                  isShowingPageLength={true}
                  customPageSize={50}
                  tableClass="table align-middle table-nowrap table-hover"
                  theadClass="table-light"
                  paginationDiv="col-sm-12 col-md-7"
                  pagination="pagination pagination-rounded justify-content-end mt-4"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
}

StockScMarkfaulty.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  selectedRows: PropTypes.array,
};

export default StockScMarkfaulty;
