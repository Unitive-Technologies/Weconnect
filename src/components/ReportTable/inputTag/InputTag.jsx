import MenuItem from "@mui/material/MenuItem";
import React, { useState, useRef, useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidFileBlank } from "react-icons/bi";
import { ImCross } from "react-icons/im";

// Date Range Picker
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

// Autocomplete
import MultiSelect from "../MultiSelect";

// Date Picker
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// operation data
import { operationData } from "./operations";
import { toast } from "react-toastify";
import axiosConfig from "../../../axios.config";
import SelectField from "../SelectField";
import { useDispatch } from "react-redux";
import { setOffLoading, setOnLoading } from "../../../features/loadingSlice";
import InputField from "../../common/InputField";

function InputTag({ id, options, index, inputs, setInputs, deleteInput }) {
  const dispatch = useDispatch();
  // for file upload
  const [file, setFile] = useState(null);
  const fileInput = useRef(null);
  // console.log("array", index, inputs, id);

  // Date State
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  let oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

  let fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  //

  // for date range
  const navbarRef = useRef(null);

  // To handle field change
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      let updatedInputs = [...prev];
      updatedInputs[index] = {
        ...updatedInputs[index],
        [name]: value,
        operation: "",
        not: "",
        value: "",
      };
      return updatedInputs;
    });
  };

  // To handle operation change
  const handleOperationChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => {
      let updatedInputs = [...prev];
      updatedInputs[index] = {
        ...updatedInputs[index],
        [name]: value,
        not: "",
        value: "",
      };
      return updatedInputs;
    });
  };

  // Function for Date Conversion for case "date" into yyyy-mm-dd format
  const formatDateToYYYYMMDD = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // To handle value change
  // const handleValueChange = (e, value) => {
  //   const { name, value } = e.target;
  //   setInputs((prev) => {
  //     let updatedInputs = [...prev];
  //     updatedInputs[index] = {
  //       ...updatedInputs[index],
  //       [name]: value,
  //       not: "",
  //       value: "",
  //     };
  //     return updatedInputs;
  //   });
  // };

  // for date range
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // component return
  const handleOperationTypeChange = (item) => {
    switch (item.type) {
      case "file_lookup":
        if (item.multi && inputs[index].operation === "equals") {
          return (
            <MultiSelect
              data={item.data}
              onChange={(e, value) => {
                const selectedIds = value.map((item) => item.id);
                setInputs((prev) => {
                  let updatedInputs = [...prev];
                  updatedInputs[index] = {
                    ...updatedInputs[index],
                    value: selectedIds,
                  };
                  return updatedInputs;
                });
                // console.log(value);
              }}
              multi={true}
            />
          );
        } else if (!item.multi && inputs[index].operation === "equals") {
          return (
            <MultiSelect
              data={item.data}
              onChange={(e, value) => {
                const selectedIds = value.map((item) => item.id);
                setInputs((prev) => {
                  let updatedInputs = [...prev];
                  updatedInputs[index] = {
                    ...updatedInputs[index],
                    value: selectedIds,
                  };
                  return updatedInputs;
                });
                // console.log(value);
              }}
              multi={false}
            />
          );
        } else {
          return (
            <form ref={fileInput}>
              <input
                onChange={(e) => handleFileUpload(e, item)}
                type="file"
                name="file"
                id="upload_model"
                style={{ display: "none" }}
              />
              <label
                htmlFor="upload_model"
                className=" text-black cursor-pointer"
                onClick={() => fileInput.current.click()}
              >
                <div className="flex justify-center items-center gap-2 text-xs bg-white rounded py-5 px-2 font-semibold hover:bg-gray-300 duration-300">
                  <BiSolidFileBlank size={40} />
                  Select or Drag and Drop .TXT file
                </div>
              </label>

              {file && (
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-xs">{file.name}</p>
                  <button
                    className="flex justify-center items-center text-xs bg-red-600 rounded-full px-1 py-1 hover:bg-red-800 duration-300"
                    onClick={() => {
                      setInputs((prev) => {
                        let updatedInputs = [...prev];
                        updatedInputs[index] = {
                          ...updatedInputs[index],
                          value: "",
                        };
                        return updatedInputs;
                      });
                      setFile(null);
                    }}
                  >
                    <ImCross size={7} />
                  </button>
                </div>
              )}
            </form>
          );
        }
      case "date_range":
        return (
          <div
            className="flex items-center relative text-black"
            ref={navbarRef}
          >
            <input
              className="bg-[#242745] text-white font-light focus:border-white py-1.5 px-3 rounded border border-[#a7a7a7 placeholder-[#7e7e7e] focus:outline-none "
              onClick={() => setIsOpen(!isOpen)}
              placeholder="Select Date Range"
              value={
                inputs[index].value[0] && inputs[index].value[1]
                  ? `${inputs[index].value[0]} to ${inputs[index].value[1]}`
                  : ""
              }
              readOnly
            />
            {isOpen && (
              <div className="absolute -right-28 top-10 z-10 mt-2 shadow-lg ">
                <DateRangePicker
                  onChange={(item) => {
                    setInputs((prev) => {
                      setState([item.selection]);
                      let updatedInputs = [...prev];
                      updatedInputs[index] = {
                        ...updatedInputs[index],
                        value: [
                          new Date(
                            item.selection.startDate.getTime() -
                              item.selection.startDate.getTimezoneOffset() *
                                60000
                          )
                            .toISOString()
                            .slice(0, 10),
                          new Date(
                            item.selection.endDate.getTime() -
                              item.selection.endDate.getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .slice(0, 10),
                        ],
                      };
                      return updatedInputs;
                    });
                  }}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={state}
                  direction="horizontal"
                  maxDate={oneYearFromNow}
                  minDate={fiveYearsAgo}
                />
              </div>
            )}
          </div>
        );
      // check lookup case
      case "lookup":
      case "enum":
        if (item.multi) {
          return (
            <MultiSelect
              data={item.data}
              onChange={(e, value) => {
                const selectedIds = value.map((item) => item.id);
                setInputs((prev) => {
                  let updatedInputs = [...prev];
                  updatedInputs[index] = {
                    ...updatedInputs[index],
                    value: selectedIds,
                  };
                  return updatedInputs;
                });
              }}
              multi={true}
            />
          );
        } else {
          return (
            <MultiSelect
              data={item.data}
              onChange={(e, value) => {
                setInputs((prev) => {
                  let updatedInputs = [...prev];
                  updatedInputs[index] = {
                    ...updatedInputs[index],
                    value: value ? value.id : "",
                  };
                  return updatedInputs;
                });
              }}
              multi={false}
            />
          );
        }
      case "file_string":
        if (inputs[index].operation === "file_upload") {
          return (
            <form ref={fileInput}>
              <input
                onChange={(e) => handleFileUpload(e, item)}
                type="file"
                name="file"
                id="upload_model"
                style={{ display: "none" }}
              />
              <label
                htmlFor="upload_model"
                className=" text-black cursor-pointer"
                onClick={() => fileInput.current.click()}
              >
                <div className="flex justify-center items-center gap-2 text-xs bg-white rounded py-5 px-2 font-semibold hover:bg-gray-300 duration-300">
                  <BiSolidFileBlank size={40} />
                  Select or Drag and Drop .TXT file
                </div>
              </label>

              {file && (
                <div className="mt-2 flex justify-between items-center">
                  <p className="text-xs">{file.name}</p>
                  <button
                    className="flex justify-center items-center text-xs bg-red-600 rounded-full px-1 py-1 hover:bg-red-800 duration-300"
                    onClick={() => {
                      setInputs((prev) => {
                        let updatedInputs = [...prev];
                        updatedInputs[index] = {
                          ...updatedInputs[index],
                          value: "",
                        };
                        return updatedInputs;
                      });
                      setFile(null);
                    }}
                  >
                    <ImCross size={7} />
                  </button>
                </div>
              )}
            </form>
          );
        } else {
          <div>
            <InputField
              type={"text"}
              name={"value"}
              value={inputs[index].value}
              placeholder={"Enter Search Text "}
              onChangeValue={(e) => {
                setInputs((prev) => {
                  let updatedInputs = [...prev];
                  updatedInputs[index] = {
                    ...updatedInputs[index],
                    value: e.target.value,
                  };
                  return updatedInputs;
                });
              }}
              customStyle="bg-[#242745] text-white font-light focus:border-white"
            />
          </div>;
        }

      case "string":
        return (
          <div>
            <InputField
              type={"text"}
              name={"value"}
              value={inputs[index].value}
              placeholder={"Enter Search Text "}
              onChangeValue={(e) => {
                setInputs((prev) => {
                  let updatedInputs = [...prev];
                  updatedInputs[index] = {
                    ...updatedInputs[index],
                    value: e.target.value,
                  };
                  return updatedInputs;
                });
              }}
              customStyle="bg-[#242745] text-white font-light focus:border-white"
            />
          </div>
        );
      // pending
      case "int_range":
        return (
          <div className="flex gap-3">
            <InputField
              type={"number"}
              name={"value"}
              value={inputs[index].value[0]}
              placeholder={"Lower Limit"}
              onChangeValue={(e) => {
                setInputs((prev) => {
                  let updatedInputs = [...prev];
                  updatedInputs[index] = {
                    ...updatedInputs[index],
                    value: [e.target.value, updatedInputs[index].value[1]],
                  };
                  return updatedInputs;
                });
              }}
              customStyle="bg-[#242745] text-white font-light focus:border-white w-32"
            />
            <InputField
              type={"number"}
              name={"value"}
              value={inputs[index].value[1]}
              placeholder={"Upper Limit "}
              onChangeValue={(e) => {
                setInputs((prev) => {
                  let updatedInputs = [...prev];
                  updatedInputs[index] = {
                    ...updatedInputs[index],
                    value: [updatedInputs[index].value[0], e.target.value],
                  };
                  return updatedInputs;
                });
              }}
              customStyle="bg-[#242745] text-white font-light focus:border-white w-32"
            />
          </div>
        );
      case "date":
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              onChange={(e) => {
                const value = new Date(e);
                setInputs((prev) => {
                  let updatedInputs = [...prev];
                  updatedInputs[index] = {
                    ...updatedInputs[index],
                    value: formatDateToYYYYMMDD(value),
                  };
                  return updatedInputs;
                });
              }}
              sx={{
                input: { color: "white" },
                color: "white",
                ".MuiChip-root": {
                  backgroundColor: "#3f51b5",
                  color: "white",
                },
                ".MuiChip-label": {
                  fontSize: "0.6rem",
                },
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "white !important",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white !important",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white !important",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
                minWidth: 230,
              }}
            />
          </LocalizationProvider>
        );
      default:
        return null;
    }
  };

  // file upload
  const handleFileUpload = async (e, item) => {
    dispatch(setOnLoading());
    try {
      const uploadedFile = e.target.files[0];
      if (
        fileInput.current &&
        uploadedFile &&
        uploadedFile.type === "text/plain"
      ) {
        const formData = new FormData();
        formData.append("searchFile", uploadedFile);
        formData.append("column", item.key);
        formData.append(
          "file_search",
          item.file_search ? item.file_search : null
        );

        const response = await axiosConfig.post("/file-search", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.status == 201) {
          setFile(uploadedFile);
          toast.success(`File ${uploadedFile.name} Uploaded`);
          setInputs((prev) => {
            let updatedInputs = [...prev];
            updatedInputs[index] = {
              ...updatedInputs[index],
              value: `@${response.data.data._id}`,
            };
            return updatedInputs;
          });
        } else toast.error("Something went wrong during upload");
      } else {
        toast.error("Please upload a .txt file");
      }
    } catch (err) {
      if (err.response.status === 422)
        toast.error(err.response.data.data.message.searchFile[0]);
      else {
        console.log(err);
        toast.error("Something Went Wrong");
      }
    }
    dispatch(setOffLoading());
  };

  return (
    <div className="grid grid-cols-7 gap-3 justify-between items-center bg-[#242745] text-stone-50 px-3 pt-2 pb-5">
      <div className="col-span-2">
        {/* Fields */}
        <SelectField
          labelId={"field"}
          id={"field"}
          name={"field"}
          value={inputs[index].field}
          onChange={handleFieldChange}
          disabled={inputs[index].isMandatory}
        >
          {options
            .filter(
              (option) =>
                !inputs.some(
                  (input) =>
                    input.field === option.key &&
                    input.field !== inputs[index].field
                )
            )
            .map((item, i) => {
              return (
                <MenuItem key={i} value={item.key}>
                  {item.label}
                </MenuItem>
              );
            })}
        </SelectField>
      </div>

      {/* Pending */}
      {/* For Not Field */}
      <div></div>

      {inputs[index].field ? (
        <div className="col-span-2">
          {/* Operations */}
          <SelectField
            labelId={"operation"}
            id={"operation"}
            name={"operation"}
            value={inputs[index].operation}
            onChange={handleOperationChange}
          >
            {options
              .filter((item) => item.key === inputs[index].field)
              .map((item) =>
                operationData
                  .filter((innerItem) => item.type === innerItem.type)
                  .map((innerItem) =>
                    innerItem.operations.map((name) => (
                      <MenuItem value={name.key}>{name.label}</MenuItem>
                    ))
                  )
              )}
          </SelectField>
        </div>
      ) : (
        <div className="col-span-2"></div>
      )}
      {inputs[index].operation ? (
        <div className="mt-2">
          {/* Input Type */}
          {inputs[index].field
            ? options.map((item, i) => {
                if (item.key == inputs[index].field)
                  return handleOperationTypeChange(item);
              })
            : null}
        </div>
      ) : (
        <div></div>
      )}
      {inputs[index] && !inputs[index].isMandatory && (
        <div className="ml-24 flex justify-center">
          {/* Delete Button */}
          <button
            onClick={() => {
              deleteInput(id);
            }}
            className="mt-2 w-fit h-fit duration-300 p-1 bg-red-600 hover:bg-red-800 rounded-full"
          >
            <AiFillDelete fontSize={18} />
          </button>
        </div>
      )}
    </div>
  );
}

export default InputTag;
