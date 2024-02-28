import React from "react";
import { Table } from "reactstrap";

const TableFormat = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Setting Name</th>
          <th>Description</th>
          <th>Note</th>
          <th>Data</th>
        </tr>
      </thead>
      {/* <tbody>
        {console.log(
          "...................settingTable:" + JSON.stringify(settingTable)
        )}
        {settingTable &&
          settingTable.map((row, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
             <td>
            <input
              type="checkbox"
              onChange={() => {
                debugger;
                console.log("Clicked the checkbox");
                handleCheckboxChange(row.id);
              }}
              checked={isRowChecked(row.id)}
            />
          </td> 
              <td>{row.value && row.value.label}</td>
              <td>{row.value && row.value.description}</td>
              <td>{row.value && row.value.comment}</td>
              <td>
                {row.key === "bulkLimit" ? (
                  <Input
                    type="text"
                    name="bulk_limit"
                    placeholder={row.placeholder}
                    onChange={handleChangeSettingValue}
                    value={settings.bulk_limit}
                  />
                ) : row.key === "allowedIps" ? (
                  <Input
                    type="text"
                    name="allowed_ips"
                    placeholder={row.placeholder}
                    onChange={handleChangeSettingValue}
                    value={settings.allowed_ips}
                  />
                ) : (
                  <Input
                    name="enabled_pay_modes"
                    type="select"
                    placeholder={row.placeholder}
                    className="form-select"
                    onChange={handleChangeSettingValue}
                    value={settings.enabled_pay_modes}
                    multiple
                  >
                    <option value="">Select Pay Mode Allowed</option>
                    {row.value &&
                      row.value.data.map((paymode) => (
                        <option key={paymode.id} value={paymode.id}>
                          {paymode.name}
                        </option>
                      ))}
                  </Input>
                )}
              </td>
            </tr>
          ))}
      </tbody> */}
    </Table>
  );
};

export default TableFormat;
