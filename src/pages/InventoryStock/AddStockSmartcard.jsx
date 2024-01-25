import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Modal } from "reactstrap";
import * as Yup from "yup";

function AddStockSmartcard(props) {
  const {
    stocksccastype,
    stockscwarehouse,
    stockscstatetype,
    stockscinventorystate,
    isOpen,
    toggle,
  } = props;

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {},
    validationSchema: Yup.object({}),
    onSubmit: (values) => {
      const newSmartcard = {
        id: Math.floor(Math.random() * (30 - 20)) + 20,
      };
      console.log("New smartcard: " + JSON.stringify(newSmartcard));
      // dispatch(onAddCity(newSmartcard));
      // dispatch(onGetCity());
      validation.resetForm();
      toggle();
    },
    onReset: (values) => {
      validation.setValues(validation.initialValues);
    },
  });

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <div>
        <p>stocksccastype</p>
      </div>
    </Modal>
  );
}

// AddStockSmartcard.propTypes = {
//   toggle: PropTypes.func,
//   isOpen: PropTypes.bool,
//   stocksccastype: PropTypes.array,
//   stockscwarehouse: PropTypes.array,
//   stockscstatetype: PropTypes.array,
//   stockscinventorystate: PropTypes.array,
// };

export default AddStockSmartcard;

// brand_id
// :
// 2
// description
// :
// "Asddffffffffg"
// inv_state_id
// :
// 1
// invoice_date
// :
// "2024-01-25"
// invoice_no
// :
// "aswwee"
// is_embeded
// :
// 0
// po_date
// :
// "2024-01-24"
// po_number
// :
// "aasdfe"
// smartcardno
// :
// "a123456789098678"
// state
// :
// 1
// warehouse_id
// :
// 4
