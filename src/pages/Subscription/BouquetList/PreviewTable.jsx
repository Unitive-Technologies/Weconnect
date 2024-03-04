import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Input, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { getRechargePeriod as onGetRechargePeriod } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const PreviewTable = (props) => {
  const { rechargeperiod, lcoRate, rate, setRate } = props;
  const [freeDays, setFreeDays] = useState(0);
  const [refundable, setRefundable] = useState("Yes");
  const [price, setPrice] = useState(0);
  const [payChannelRate, setPayChannelRate] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalamount, setTotalAmount] = useState(0);

  console.log("@@@@@@@@@@@@refundable value:" + refundable);
  console.log("@@@@@@@@@@@@price value:" + price);
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

  const updateRate = () => {
    if (!price || !refundable || !freeDays) {
      return;
    }

    const newItem = {
      id: rate.length + 1,
      price: price,
      rent: 0,
      is_refundable: refundable,
      free_days: freeDays,
      callback_amount: 0,
    };

    const updatedData = [...rate, newItem];
    console.log("Updated Data in preview table" + updatedData);
    setRate(updatedData);

    //   setCasSelection("");
    //   setCasCode("");
  };

  console.log("periodArray: " + JSON.stringify(periodArray));
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
                      name="payChannelRate"
                      type="number"
                      disabled
                      value={parseFloat(
                        parseInt(row.months) === 0
                          ? lcoRate / 30
                          : lcoRate * row.months
                      ).toFixed(2)}
                    />
                  </td>
                  {console.log("payChannelRate:" + payChannelRate)}
                  <td>
                    <Input
                      name="tax"
                      type="number"
                      disabled
                      value={parseFloat(
                        parseInt(row.months) === 0
                          ? ((lcoRate / 30) * 30.3) / 100
                          : (lcoRate * row.months * 30.3) / 100
                      ).toFixed(2)}
                    />
                  </td>
                  {console.log("tax:" + tax)}
                  <td>
                    <Input
                      name="totalamount"
                      type="number"
                      disabled
                      value={parseFloat(
                        parseInt(row.months) === 0
                          ? lcoRate / 30 + ((lcoRate / 30) * 30.3) / 100
                          : lcoRate * row.months +
                              (lcoRate * row.months * 30.3) / 100
                      ).toFixed(2)}
                    />
                  </td>
                  {console.log("totalAmount:" + totalamount)}
                  <td>
                    <Input
                      type="checkbox"
                      checked={refundable === "Yes"}
                      onChange={(e) =>
                        setRefundable(e.target.checked ? "Yes" : "No")
                      }
                    />
                  </td>
                  <td>
                    <Input
                      name="freeDays"
                      type="number"
                      value={freeDays}
                      onChange={(e) => setFreeDays(e.target.value)}
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

PreviewTable.propTypes = {
  // toggle: PropTypes.func,
  // isOpen: PropTypes.bool,
  rechargeperiod: PropTypes.array,
};

export default PreviewTable;
