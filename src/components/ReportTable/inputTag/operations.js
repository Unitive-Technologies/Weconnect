export const operationData = [
  {
    type: "file_string",
    operations: [
      { key: "equals", label: "equals" }, // filter[key]==val
      { key: "contains", label: "contains" }, // filter[key]=%25val%25
      { key: "starts_with", label: "starts with" }, // filter[key]=val%25
      { key: "ends_with", label: "ends with" }, // filter[key]=%25val
      //   { key: "in", label: "in" }, // filter[key]=
      { key: "in-like", label: "in-like" }, // filter[key]=val
      //   if file_search == true na use this or skip this
      { key: "file_upload", label: "file upload" }, // filter[key]=@FILESEARCH_405 //response after file gets uploaded data._id
    ],
  },
  {
    type: "string",
    operations: [
      // adding string-equals to seperate the other equals (==  =)
      { key: "string-equals", label: "equals" }, // filter[key]==val
      { key: "contains", label: "contains" }, // filter[key]=%25val%25
      { key: "starts_with", label: "starts with" }, // filter[key]=val%25
      { key: "ends_with", label: "ends with" }, // filter[key]=%25val
      // { key: "in", label: "in" }, // filter[key]= // same like equals
      { key: "in-like", label: "in-like" }, // filter[key]=val
    ],
  },
  {
    type: "enum",
    operations: [
      { key: "equals", label: "equals" }, // filter[key]==val
    ],
  },
  {
    type: "file_lookup",
    operations: [
      { key: "equals", label: "equals" }, // filter[key]==val
      //   if file_search == true na use this or skip this
      { key: "file_upload", label: "file upload" }, // filter[key]=@FILESEARCH_405 //response after file gets uploaded data._id
    ],
  },
  {
    type: "lookup",
    operations: [
      { key: "equals", label: "equals" }, // filter[key]==val
    ],
  },
  {
    type: "date_range",
    operations: [
      { key: "between", label: "between" }, // filter[FRM_key]=val1&filter[TO_key]=val2
    ],
  },
  {
    type: "date",
    operations: [
      { key: "equals", label: "equals" }, // filter[key]=val, example: filter[dob]=2024-01-04
    ],
  },
  {
    type: "int_range",
    operations: [
      { key: "between", label: "between" }, // filter[FRM_key]=val1&filter[TO_key]=val2
    ],
  },
];
