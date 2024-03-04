import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Input, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { getRechargePeriod as onGetRechargePeriod } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const AdditionalMrpTable = (props) => {
  const {
    rechargeperiod,
    additionalLcoRate,
    additionalRates,
    setAdditionalRates,
    additionalLcoDiscount,
    additionalName,
  } = props;
  const [freeDays, setFreeDays] = useState("");
  const [refundable, setRefundable] = useState("Yes");

  console.log(
    "AAAAAAAAAAAAAAAdditionalrates value:" + JSON.stringify(additionalRates)
  );
  const dispatch = useDispatch();
  const selectBouquetState = (state) => state.bouquet;
  const BouquetProperties = createSelector(selectBouquetState, (bouquet) => ({
    periodArray: bouquet.rechargeperiod,
  }));

  const { periodArray } = useSelector(BouquetProperties);
  useEffect(() => {
    if (rechargeperiod && !rechargeperiod.length) {
      dispatch(onGetRechargePeriod());
    }
  }, [dispatch, rechargeperiod]);

  // Initialize arrays to hold indices of rows with different properties
  const refundableRows = [];
  const freeDaysRows = [];

  const updateRate = () => {
    const updatedRates = periodArray.map((row, i) => {
      const price =
        parseFloat(row.months) === 0
          ? additionalLcoRate / 30
          : additionalLcoRate * row.months;
      const totalAmount = price + (price * 30.3) / 100;

      // Check if the row index is in refundableRows array
      const isRefundable = refundableRows.includes(i + 1);
      // Check if the row index is in freeDaysRows array, set free_days to 10 if included
      const freeDays = freeDaysRows.includes(i + 1) ? freeDays : 0;

      return {
        rate_code: additionalName,
        mrp_data: {
          dis_pcc: additionalLcoDiscount,
          lmo_pcc: additionalLcoRate,
        },
        rate: [
          {
            id: i + 1,
            price: parseFloat(price.toFixed(2)) || 0, // Ensure it defaults to 0 if undefined
            rent: 0,
            is_refundable: isRefundable ? "Yes" : "No", // Convert boolean to string "Yes" or "No"
            free_days: freeDays,
            callback_amount: 0,
            total_amount: parseFloat(totalAmount.toFixed(2)) || 0, // Ensure it defaults to 0 if undefined
          },
        ],
      };
    });

    // Assuming setAdditionalRates is passed as a prop
    setAdditionalRates(updatedRates);
  };

  // console.log("periodArray: " + JSON.stringify(periodArray));
  return (
    <Card>
      <CardBody>
        {/* {console.log("recharge period: ", JSON.stringify(rechargeperiod))} */}

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Period</th>
              <th>Pay Channel Rate**</th>
              <th>Tax</th>
              <th>Total AMT</th>
              <th>Refundable</th>
              <th>Free Days</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>

          {/* <td>
            <input
              type="checkbox"
              onChange={() => {
                debugger;
                console.log("Clicked the checkbox");
                handleCheckboxChange(row.id);
              }}
              checked={isRowChecked(row.id)}
            />
          </td> */}
          <tbody>
            {periodArray &&
              periodArray.map((row, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{row && row.name}</td>
                  <td>
                    <Input
                      name="price"
                      type="number"
                      disabled
                      value={parseFloat(
                        parseInt(row.months) === 0
                          ? additionalLcoRate / 30
                          : additionalLcoRate * row.months
                      ).toFixed(2)}
                    />
                  </td>
                  <td>
                    <Input
                      name="tax"
                      type="number"
                      disabled
                      value={parseFloat(
                        parseInt(row.months) === 0
                          ? ((additionalLcoRate / 30) * 30.3) / 100
                          : (additionalLcoRate * row.months * 30.3) / 100
                      ).toFixed(2)}
                    />
                  </td>
                  <td>
                    <Input
                      name="totalamount"
                      type="number"
                      disabled
                      value={parseFloat(
                        parseInt(row.months) === 0
                          ? additionalLcoRate / 30 +
                              ((additionalLcoRate / 30) * 30.3) / 100
                          : additionalLcoRate * row.months +
                              (additionalLcoRate * row.months * 30.3) / 100
                      ).toFixed(2)}
                    />
                  </td>
                  <td>
                    <Input
                      type="checkbox"
                      checked={refundable[i] === "Yes"}
                      onChange={(e) => {
                        const updatedRefundable = [...refundable];
                        updatedRefundable[i] = e.target.checked ? "Yes" : "No";
                        setRefundable(updatedRefundable);
                      }}
                    />
                  </td>
                  <td>
                    <Input
                      name={`freeDays-${i}`} // Use unique name for each input
                      type="number"
                      value={freeDays[i] || ""}
                      onChange={(e) => {
                        const updatedFreeDays = [...freeDays];
                        updatedFreeDays[i] = e.target.value;
                        setFreeDays(updatedFreeDays);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div className="mb-3">
          <button
            type="button"
            className="btn btn-primary "
            onClick={updateRate}
          >
            <i className="bx bx-right-arrow-alt" style={{ fontSize: 20 }}></i>
          </button>
        </div>
      </CardBody>
    </Card>
  );
};

AdditionalMrpTable.propTypes = {
  // toggle: PropTypes.func,
  // isOpen: PropTypes.bool,
  rechargeperiod: PropTypes.array,
};

export default AdditionalMrpTable;
