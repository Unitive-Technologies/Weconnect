import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import { Card, CardBody, Input, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { getRechargePeriod as onGetRechargePeriod } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const PreviewTable = (props) => {
  const { rechargeperiod, lcoRate, ncfLcoRate, rate, setRate } = props;

  const [newArray, setNewArray] = useState([]);
  // console.log("@@@@@@@@@@@@rate value:" + JSON.stringify(rate));
  // console.log("@@@@@@@@@@@@refundable value:" + refundable);
  // console.log("@@@@@@@@@@@@price value:" + price);

  // const dispatch = useDispatch();
  // const selectBouquetState = (state) => state.bouquet;
  // const BouquetProperties = createSelector(selectBouquetState, (bouquet) => ({
  //   periodArray: bouquet.rechargeperiod,
  // }));

  // const { periodArray } = useSelector(BouquetProperties);
  // useEffect(() => {
  //   if (rechargeperiod && !rechargeperiod.length) {
  //     dispatch(onGetRechargePeriod());
  //   }
  // }, [dispatch, rechargeperiod]);

  // For the refundable checkbox
  const handleRefundableChange = (e, index) => {
    const updatedPeriodArray = [...newArray];
    updatedPeriodArray[index].is_refundable = e.target.checked;
    setNewArray(updatedPeriodArray);
  };

  // For the free days input field
  const handleFreeDaysChange = (e, index) => {
    const updatedPeriodArray = [...newArray];
    updatedPeriodArray[index].free_days = parseInt(e.target.value) || 0;
    setNewArray(updatedPeriodArray);
  };

  const updateRate = () => {
    const updatedRate = newArray.map((row, i) => {
      const price =
        parseFloat(row.months) === 0 ? lcoRate / 30 : lcoRate * row.months;
      const totalAmount = price + (price * 30.3) / 100;

      const isRefundable = row.is_refundable || false;

      const freeDays = parseInt(row.free_days) || 0;

      // Calculate cashback amount (assuming it's 0 for now)
      const cashbackAmount = 0;

      return {
        id: row.id,
        price: parseFloat(price.toFixed(2)),
        rent: 0,
        is_refundable: isRefundable ? 1 : 0,
        free_days: freeDays,
        cashback_amount: cashbackAmount,
        total_amount: parseFloat(totalAmount.toFixed(2)),
      };
    });
    // console.log("updatedRateeeeeeeeee: " + JSON.stringify(updatedRate));
    setRate(updatedRate);
  };

  useEffect(() => {
    setNewArray(rechargeperiod);
  }, [rechargeperiod]);

  // console.log("periodArray: " + JSON.stringify(periodArray));
  return (
    <Card>
      <CardBody>
        {/* {console.log("recharge period: ", JSON.stringify(rechargeperiod))}
        {console.log("newArray: ", JSON.stringify(newArray))} */}

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Period</th>
              <th>Pay Channel Rate**</th>
              <th>NCF</th>
              <th>Tax</th>
              <th>Total AMT</th>
              <th>Refundable</th>
              <th>Free Days</th>
            </tr>
          </thead>

          <tbody>
            {newArray &&
              newArray.map((row, i) => (
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
                          ? lcoRate / 30
                          : lcoRate * row.months
                      ).toFixed(2)}
                    />
                  </td>
                  <td>
                    <Input
                      name="ncf"
                      type="number"
                      disabled
                      value={parseFloat(
                        parseInt(row.months) === 0
                          ? ncfLcoRate / 30
                          : ncfLcoRate * row.months
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
                          ? ((lcoRate / 30) * 30.3) / 100
                          : (lcoRate * row.months * 30.3) / 100
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
                          ? lcoRate / 30 + ((lcoRate / 30) * 30.3) / 100
                          : lcoRate * row.months +
                              (lcoRate * row.months * 30.3) / 100
                      ).toFixed(2)}
                    />
                  </td>
                  <td>
                    <Input
                      type="checkbox"
                      checked={row.is_refundable}
                      onChange={(e) => handleRefundableChange(e, i)}
                    />
                  </td>
                  <td>
                    <Input
                      name={`freeDays-${i}`}
                      type="number"
                      value={row.free_days}
                      onChange={(e) => handleFreeDaysChange(e, i)}
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
