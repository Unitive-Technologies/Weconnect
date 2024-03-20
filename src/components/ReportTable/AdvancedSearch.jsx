import React, { useEffect, useRef, useState } from "react";
import InputTag from "./inputTag/InputTag";
import { toast } from "react-toastify";

import { operationData } from "./inputTag/operations";

const generateUniqueId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

function AdvancedSearch({ searchData, setFilterData }) {
  // Making Object Data (search) into Array
  let mappedData = [];
  for (const key of Object.keys(searchData)) {
    let item = searchData[key];
    item.key = key;
    mappedData.push(item);
  }

  // Checking For Mandatory State
  let mandatoryFields = [];
  mappedData.forEach((item, index) => {
    if (item.mandatory && item.mandatory === true)
      mandatoryFields.push({ field: item, index });
  });

  // For Switch Button State
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  //

  // Tracing Filter Data
  const [inputs, setInputs] = useState([]);

  const isFirstRender = useRef(true);

  // To Handle Mandatory Fields
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (mandatoryFields.length > 0) {
      mandatoryFields.map((item, i) => {
        setInputs((prev) => [
          ...prev,
          {
            id: generateUniqueId(),
            field: item.field.key,
            not: "",
            operation: operationData.filter(
              (innerItem) => innerItem.type === item.field.type
            )[0].operations[0].key,
            value: "",
            isMandatory: true,
          },
        ]);
      });
    } else {
      setInputs([
        {
          id: generateUniqueId(),
          field: "",
          not: "",
          operation: "",
          value: "",
          isMandatory: false,
        },
      ]);
    }
  }, [searchData]);

  // Function To Validate Whether All Mandatory Fields Get Applied

  const validateMandatoryFields = () => {
    if (mandatoryFields.length === 0) return false;
    const mandatoryValues = mandatoryFields.map((item) => item.field.key);
    const mandatoryFieldsFound = inputs.filter((item) =>
      mandatoryValues.includes(item.field)
    );

    return mandatoryFieldsFound.length !== mandatoryFields.length;
  };

  const addInput = () => {
    if (
      inputs.some(
        (input) =>
          (input.value === "" || input.value == []) && input.value !== 0
      )
    )
      toast.error("Fill all search fields");
    else {
      setInputs([
        ...inputs,
        {
          id: generateUniqueId(),
          field: "",
          not: "",
          operation: "",
          value: "",
          isMandatory: false,
        },
      ]);
    }
  };

  const deleteInput = (id) => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    setInputs(updatedInputs);
  };

  return (
    <div className=" m-2 px-5 py-4 border-stone-400 rounded-lg bg-white shadow-md">
      <div className=" flex items-center justify-between px-4">
        <div className=" flex gap-3 items-center">
          <h2 className=" font-semibold text-stone-700">Filters</h2>
          {mandatoryFields.length > 0 && (
            <h2 className=" font-semibold text-stone-700">|</h2>
          )}
          {!mandatoryFields.length > 0 && (
            <label className="flex cursor-pointer select-none items-center">
              <div className="relative ">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <div
                  className={`box block h-7 w-12 rounded-full ${
                    isChecked ? " bg-[#242745] " : " bg-stone-500"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 flex h-5 w-5 items-center justify-center rounded-full transition ${
                    isChecked ? "translate-x-full bg-white" : " bg-white"
                  }`}
                ></div>
              </div>
            </label>
          )}

          {mandatoryFields.length > 0 && (
            <div className="flex gap-2">
              Mandatory Fields:
              <div className="flex gap-2 items-center">
                {mandatoryFields.map((item, i) => {
                  return (
                    <span key={i} className="text-red-600 font-bold">
                      {item.field.label}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className={isChecked ? "" : "hidden"}>
          <h1
            onClick={addInput}
            className=" border border-[#242745]  font-bold bg-[#242745]  text-white pt-0.5 pb-1 text-xl px-[0.7rem] rounded-full hover:bg-white hover:text-[#242745] duration-300 cursor-pointer "
          >
            +
          </h1>
        </div>
      </div>

      <div className={`${isChecked ? "" : "hidden"}`}>
        <div className="grid grid-cols-7 gap-3 justify-center items-center bg-[#242745]  text-stone-50 px-3 py-2 mt-4 rounded-t">
          <div className=" col-span-2">
            <h1 className=" font-semibold">
              Fields <span className="text-red-600">*</span>
            </h1>
          </div>
          <div>
            <h1 className=" font-semibold">Not</h1>
          </div>
          <div className=" col-span-2">
            <h1 className=" font-semibold">
              Operations <span className="text-red-600">*</span>
            </h1>
          </div>
          <div>
            <h1 className=" font-semibold">
              Input Type <span className="text-red-600">*</span>
            </h1>
          </div>
          <div></div>
        </div>
        {inputs.map((item, i) => {
          return (
            <InputTag
              key={item.id}
              id={item.id}
              options={mappedData}
              index={i}
              inputs={inputs}
              setInputs={setInputs}
              deleteInput={deleteInput}
            />
          );
        })}
        <div className="bg-[#242745]  py-5 flex items-center justify-center rounded-b">
          <button
            onClick={() => {
              console.log(inputs);
              if (inputs.length === 0) toast.error("No search fields found");
              else if (
                inputs.some(
                  (input) =>
                    input.value === "" ||
                    (Array.isArray(input.value) && input.value.length === 0)
                )
              )
                toast.error("Fill all search fields");
              else if (validateMandatoryFields())
                toast.error("Please Fill All Mandatory Fields");
              else setFilterData(inputs);
            }}
            className=" py-1 px-4 border border-white bg-white text-stone-700 hover:bg-[#242745] hover:text-white duration-300 font-semibold rounded"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSearch;
