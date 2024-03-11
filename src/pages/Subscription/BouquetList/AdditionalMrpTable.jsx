import React, { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TableContainer from "../../../components/Common/TableContainer";
import {
  Card,
  CardBody,
  Input,
  Table,
  Row,
  Button,
  Label,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { getRechargePeriod as onGetRechargePeriod } from "/src/store/actions";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const AdditionalMrpTable = (props) => {
  const {
    isOpen,
    showEditBouquet,
    toggleNcfSwitch,
    ncfdrp,
    ifFixNCF,
    // rechargeperiod,
    additionalLcoRate,
    additionalRates,
    setAdditionalRates,
    additionalLcoDiscount,
    setAdditionalLcoDiscount,
    setAdditionalLcoRate,
    // ncfAdditionaldrp,
    // setNcfAdditionaldrp,
    // ncfAdditionalLcoDiscount,
    // setNcfAdditionalLcoDiscount,
    // ncfAdditionalLcoRate,
    // setNcfAdditionalLcoRate,
    mrp,
    drp,
  } = props;
  const rechargeperiod = [
    { id: 6, name: "1Year", months: 12, days: 0 },
    { id: 5, name: "6months", months: 6, days: 0 },
    { id: 4, name: "3month", months: 3, days: 0 },
    { id: 3, name: "2months", months: 2, days: 0 },
    { id: 2, name: "1month", months: 1, days: 0 },
    { id: 1, name: "1day", months: 0, days: 1 },
  ];
  const [additionalName, setAdditionalName] = useState("");
  const [ncfAdditionaldrp, setNcfAdditionaldrp] = useState(130);
  const [ncfAdditionalLcoDiscount, setNcfAdditionalLcoDiscount] = useState("");
  const [ncfAdditionalLcoRate, setNcfAdditionalLcoRate] = useState("");
  const [newArray1, setNewArray1] = useState(rechargeperiod || []);
  console.log("newArray1111:" + JSON.stringify(newArray1));

  const handleRefundableChange = (e, index) => {
    const updatedPeriodArray = [...newArray1];
    updatedPeriodArray[index].is_refundable = e.target.checked;
    setNewArray1(updatedPeriodArray);
  };

  const handleFreeDaysChange = (e, index) => {
    const updatedPeriodArray = [...newArray1];
    updatedPeriodArray[index].free_days = parseInt(e.target.value) || 0;
    setNewArray1(updatedPeriodArray);
  };

  const updateRate = () => {
    const rateArray = newArray1.map((rateData) => {
      return {
        id: rateData.id,
        period: rateData.name,
        price:
          parseFloat(rateData.months) === 0
            ? additionalLcoRate / 30
            : additionalLcoRate * rateData.months,
        tax:
          parseFloat(rateData.months) === 0
            ? ((additionalLcoRate / 30) * 30.3) / 100
            : (additionalLcoRate * rateData.months * 30.3) / 100,
        rent:
          (parseFloat(rateData.months) === 0
            ? ncfAdditionalLcoRate / 30
            : ncfAdditionalLcoRate * rateData.months) || 0,
        is_refundable: rateData.is_refundable ? 1 : 0,
        free_days: rateData.free_days || 0,
        cashback_amount: 0,
        total_amount: parseFloat(
          (
            parseFloat(
              parseFloat(rateData.months) === 0
                ? additionalLcoRate / 30
                : additionalLcoRate * rateData.months
            ) +
            (parseFloat(
              parseFloat(rateData.months) === 0
                ? additionalLcoRate / 30
                : additionalLcoRate * rateData.months
            ) *
              30.3) /
              100
          ).toFixed(2)
        ),
      };
    });

    const newRateObject = {
      rate_code: additionalName,
      mrp_data: {
        dis_pcc: additionalLcoDiscount,
        lmo_pcc: additionalLcoRate,
        dis_ncf: ncfAdditionalLcoDiscount,
        lmo_ncf: ncfAdditionalLcoRate,
      },
      rate: rateArray,
    };
    console.log("New Added Objectsssssssss: " + JSON.stringify(newRateObject));
    // Append the new object to the existing additionalRates array

    setAdditionalRates((prevRates) => [...prevRates, newRateObject]);
    // setAdditionalRates([...additionalRates, newRateObject]);
    setAdditionalName("");
  };
  console.log(
    "additional Ratessssssssssssss:" + JSON.stringify(additionalRates)
  );

  // useEffect(() => {
  //   setNewArray1(rechargeperiod);
  // }, [rechargeperiod]);

  useEffect(() => {
    const totalNcfAdditionalLcoRate = (ncfdrp * ncfAdditionalLcoDiscount) / 100;

    setNcfAdditionalLcoRate(ncfdrp - totalNcfAdditionalLcoRate);
  }, [ncfdrp, ncfAdditionalLcoDiscount]);
  return (
    <>
      <Row>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Label style={{ marginRight: "10px" }}>Additional Name: </Label>
            <Input
              placeholder="Enter additional name"
              type="text"
              style={{ width: "210px" }}
              value={additionalName}
              onChange={(e) => setAdditionalName(e.target.value)}
            />
          </div>
          {(showEditBouquet || isOpen) && (
            <div>
              <button
                type="button"
                className="btn btn-primary "
                onClick={updateRate}
              >
                + Add Pricing
              </button>
            </div>
          )}
        </div>
      </Row>
      {ifFixNCF === true && (
        <Row className="mb-3 mt-3">
          <Col sm="3">
            {/* <Label>MRP**</Label>
        <Input
          disabled
          defaultValue={0}
          value={parseFloat(mrp).toFixed(2)}
        /> */}
            <h4>FIX NCF</h4>
          </Col>
          <Col sm="3">
            <Label>Rate**</Label>
            <Input
              type="number"
              defaultValue="130"
              disabled
              value={parseFloat(ncfAdditionaldrp).toFixed(2)}
              onChange={(e) => setNcfAdditionaldrp(e.target.value)}
            />
          </Col>
          <Col sm="3">
            <Label>LCO Discount(%)</Label>
            <Input
              type="number"
              defaultValue="20"
              value={ncfAdditionalLcoDiscount}
              onChange={(e) => setNcfAdditionalLcoDiscount(e.target.value)}
            />
          </Col>
          <Col sm="3">
            <Label>LCO Rate**</Label>
            <Input
              type="number"
              // defaultValue={0}
              value={parseFloat(ncfAdditionalLcoRate).toFixed(2)}
              onChange={(e) => setNcfAdditionalLcoRate(e.target.value)}
            />
          </Col>
        </Row>
      )}
      <Row>
        <Col sm="3">
          <Label>MRP**</Label>
          <Input disabled defaultValue={0} value={parseFloat(mrp).toFixed(2)} />
        </Col>
        <Col sm="3">
          <Label>DRP**</Label>
          <Input type="number" disabled value={parseFloat(drp).toFixed(2)} />
        </Col>
        <Col sm="3">
          <Label>LCO Discount(%)</Label>
          <Input
            type="number"
            value={additionalLcoDiscount}
            onChange={(e) => setAdditionalLcoDiscount(e.target.value)}
          />
        </Col>
        <Col sm="3">
          <Label>LCO Rate**</Label>
          <Input
            type="number"
            value={parseFloat(additionalLcoRate).toFixed(2)}
            onChange={(e) => setAdditionalLcoRate(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
        <Card>
          <CardBody>
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Period</th>
                  <th>Pay Channel Rate**</th>
                  {ifFixNCF === true && <th>NCF</th>}
                  <th>Tax</th>
                  <th>Total AMT</th>
                  <th>Refundable</th>
                  <th>Free Days</th>
                </tr>
              </thead>
              <tbody>
                {newArray1 &&
                  newArray1.map((row, i) => (
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
                      {ifFixNCF === true && (
                        <td>
                          <Input
                            name="ncf"
                            type="number"
                            disabled
                            value={parseFloat(
                              parseInt(row.months) === 0
                                ? ncfAdditionalLcoRate / 30
                                : ncfAdditionalLcoRate * row.months
                            ).toFixed(2)}
                          />
                        </td>
                      )}
                      <td>
                        <Input
                          name="tax"
                          type="number"
                          disabled
                          value={
                            ifFixNCF === true
                              ? parseFloat(
                                  parseInt(row.months) === 0
                                    ? ((additionalLcoRate / 30 +
                                        ncfAdditionalLcoRate / 30) *
                                        30.3) /
                                        100
                                    : ((additionalLcoRate * row.months +
                                        ncfAdditionalLcoRate * row.months) *
                                        30.3) /
                                        100
                                ).toFixed(2)
                              : parseFloat(
                                  parseInt(row.months) === 0
                                    ? ((additionalLcoRate / 30) * 30.3) / 100
                                    : (additionalLcoRate * row.months * 30.3) /
                                        100
                                ).toFixed(2)
                          }
                        />
                      </td>
                      <td>
                        <Input
                          name="totalamount"
                          type="number"
                          disabled
                          value={
                            ifFixNCF === true
                              ? parseFloat(
                                  parseInt(row.months) === 0
                                    ? additionalLcoRate / 30 +
                                        ncfAdditionalLcoRate / 30 +
                                        ((additionalLcoRate / 30 +
                                          ncfAdditionalLcoRate / 30) *
                                          30.3) /
                                          100
                                    : additionalLcoRate * row.months +
                                        ncfAdditionalLcoRate * row.months +
                                        ((additionalLcoRate * row.months +
                                          ncfAdditionalLcoRate * row.months) *
                                          30.3) /
                                          100
                                ).toFixed(2)
                              : parseFloat(
                                  parseInt(row.months) === 0
                                    ? additionalLcoRate / 30 +
                                        ((additionalLcoRate / 30) * 30.3) / 100
                                    : additionalLcoRate * row.months +
                                        (additionalLcoRate *
                                          row.months *
                                          30.3) /
                                          100
                                ).toFixed(2)
                          }
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
          </CardBody>
        </Card>
      </Row>
    </>
  );
};

AdditionalMrpTable.propTypes = {
  // toggle: PropTypes.func,
  // isOpen: PropTypes.bool,
  rechargeperiod: PropTypes.array,
};

export default AdditionalMrpTable;
