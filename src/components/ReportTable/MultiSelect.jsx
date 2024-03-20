import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";

import { useDispatch } from "react-redux";
import { setOffLoading, setOnLoading } from "../../features/loadingSlice";

const MultiSelect = ({ data, onChange, multi }) => {
  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // for search
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!Array.isArray(data)) {
      try {
        if (search.length > 2) fetchOptions(data);
      } catch (err) {
        console.log(err);
      }
    } else setOptions(data);
  }, [data, search]);

  async function fetchOptions(data) {
    dispatch(setOnLoading());
    let params = {
      "per-page": 100,
      vr: "web1.0",
    };
    if (search.length > 2) params["filter[name]"] = search;

    const token = JSON.parse(localStorage.getItem("sms.currentUser"));
    const response = await axios.get(data, {
      params,
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });
    if (response.status === 200) {
      // Filter out selected options from the fetched data
      const filteredOptions = response.data.data.filter(
        (option) =>
          !selectedOptions.some((selected) => selected.id === option.id)
      );
      setOptions(filteredOptions);
    }
    dispatch(setOffLoading());
  }

  const handleOnChange = (event, selectedValues) => {
    setSelectedOptions(selectedValues);
    if (!Array.isArray(data)) setOptions([]);
    setSearch("");
    onChange(event, selectedValues);
  };

  return (
    <Autocomplete
      multiple={multi}
      id={multi ? "multiple" : "individual"}
      disablePortal
      options={options}
      getOptionLabel={(option) => option.name}
      onChange={handleOnChange}
      filterSelectedOptions
      freeSolo={!Array.isArray(data)}
      forcePopupIcon={false}
      renderInput={(params) => (
        <TextField
          onChange={(e) => {
            // Delay to handle change
            setTimeout(() => {
              setSearch(e.target.value);
            }, 1500);
          }}
          {...params}
          placeholder={multi ? "Multiple Selection" : "Search Value"}
          sx={{
            input: { color: "white" },
          }}
        />
      )}
      sx={{
        color: "white",
        ".MuiChip-root": {
          backgroundColor: "#3f51b5", // Customize chip background color
          color: "white", // Set chip text color to white
        },
        ".MuiChip-label": {
          fontSize: "0.6rem", // Set chip text size
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
  );
};

export default MultiSelect;
