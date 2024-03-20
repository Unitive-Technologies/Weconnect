import { toast } from "react-toastify";

export const filterParams = (filterData) => {
  let filterObject = {};
  console.log(filterData);
  filterData.forEach((item, i) => {
    switch (item.operation) {
      case "file_upload":
      case "equals":
        if (Array.isArray(item.value))
          filterObject[`filter[${item.field}]`] = item.value.join(",");
        else filterObject[`filter[${item.field}]`] = item.value;
        break;
      case "string-equals":
        filterObject[`filter[${item.field}]`] = `=${item.value}`;
        break;

      // (in) is same like string-equals
      // case "in":
      //   filterObject[`filter[${item.field}]`] = `=${item.value}`;
      //   break;
      case "contains":
        filterObject[`filter[${item.field}]`] = `%${item.value}%`;
        break;
      case "starts_with":
        filterObject[`filter[${item.field}]`] = `${item.value}%`;
        break;
      case "ends_with":
        filterObject[`filter[${item.field}]`] = `%${item.value}`;
        break;
      case "in-like":
        filterObject[`filter[${item.field}]`] = `${item.value}`;
        break;
      case "between":
        if (
          item.value[0] == null ||
          undefined ||
          item.value[1] == null ||
          undefined
        )
          return toast.error("Fill all search fields");
        filterObject[`filter[FRM_${item.field}]`] = `${item.value[0]}`;
        filterObject[`filter[TO_${item.field}]`] = `${item.value[1]}`;
        break;
    }
  });
  return filterObject;
};
