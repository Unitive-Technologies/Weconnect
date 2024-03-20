import React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const SelectField = ({
  labelId,
  id,
  name,
  value,
  onChange,
  disabled = false,
  children,
}) => {
  const baseStyles = {
    color: "white",
    ".MuiOutlinedInput-notchedOutline": {
      borderColor: "#e3e3e3",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e3e3e3",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#e3e3e3",
    },
    ".MuiSvgIcon-root ": {
      fill: "white !important",
    },
  };

  const disabledStyles = {
    color: "white !important",
    opacity: 0.7,
    pointerEvents: "none",
    backgroundColor: "rgb(107 114 128)",
  };

  const mergedStyles = disabled
    ? { ...baseStyles, ...disabledStyles }
    : baseStyles;

  return (
    <FormControl sx={{ height: "30px", minWidth: 230 }} size="small">
      <Select
        labelId={labelId}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        MenuProps={{
          disableScrollLock: true,
        }}
        sx={mergedStyles}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem value="">Select {id}</MenuItem>
        {children}
      </Select>
    </FormControl>
  );
};

export default SelectField;
