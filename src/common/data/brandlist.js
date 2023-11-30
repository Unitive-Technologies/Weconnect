const brandlist = [
  {
    id: 11,
    name: "RACSA044120",
    code: "V00012",
    isHD: 0,
    type: 1,
    cas_id: 1,
    length: 15,
    significant_length: 15,
    char_allowed: 3,
    status: 1,
    created_at: "2023-07-27 16:15:34",
    updated_at: "2023-10-27 14:57:37",
    created_by: 2,
    updated_by: 2,
    status_lbl: "Active",
    created_by_lbl: "my mso(mso)",
    box_type_lbl: "SD",
    brand_type_lbl: "STB",
    char_allowed_lbl: "Alphanumeric",
    cas_lbl: "NSTV",
  },
  {
    id: 10,
    name: "RACHA045170A",
    code: "V00011",
    isHD: 1,
    type: 1,
    cas_id: 1,
    length: 15,
    significant_length: 15,
    char_allowed: 3,
    status: 1,
    created_at: "2023-07-27 16:15:10",
    updated_at: "2023-10-27 14:59:21",
    created_by: 2,
    updated_by: 2,
    status_lbl: "Active",
    created_by_lbl: "my mso(mso)",
    box_type_lbl: "HD",
    brand_type_lbl: "STB",
    char_allowed_lbl: "Alphanumeric",
    cas_lbl: "NSTV",
  },
  {
    id: 9,
    name: "CSA044120",
    code: "V00010",
    isHD: 0,
    type: 1,
    cas_id: 1,
    length: 15,
    significant_length: 15,
    char_allowed: 3,
    status: 1,
    created_at: "2023-07-27 16:14:33",
    updated_at: "2023-10-27 15:03:34",
    created_by: 2,
    updated_by: 2,
    status_lbl: "Active",
    created_by_lbl: "my mso(mso)",
    box_type_lbl: "SD",
    brand_type_lbl: "STB",
    char_allowed_lbl: "Alphanumeric",
    cas_lbl: "NSTV",
  },
  {
    id: 8,
    name: "CHA061170A VC",
    code: "V00009",
    isHD: 0,
    type: 2,
    cas_id: 1,
    length: 16,
    significant_length: 16,
    char_allowed: 3,
    status: 0,
    created_at: "2023-07-27 16:13:21",
    updated_at: "2023-10-07 11:40:21",
    created_by: 2,
    updated_by: 2,
    status_lbl: "In-Active",
    created_by_lbl: "my mso(mso)",
    box_type_lbl: "SD",
    brand_type_lbl: "Smartcard",
    char_allowed_lbl: "Alphanumeric",
    cas_lbl: "NSTV",
  },
  {
    id: 7,
    name: "CHA061170A",
    code: "V00008",
    isHD: 1,
    type: 1,
    cas_id: 1,
    length: 15,
    significant_length: 15,
    char_allowed: 3,
    status: 1,
    created_at: "2023-07-27 16:12:56",
    updated_at: "2023-10-27 14:58:57",
    created_by: 2,
    updated_by: 2,
    status_lbl: "Active",
    created_by_lbl: "my mso(mso)",
    box_type_lbl: "HD",
    brand_type_lbl: "STB",
    char_allowed_lbl: "Alphanumeric",
    cas_lbl: "NSTV",
  },
  {
    id: 6,
    name: "CHA045170A VC",
    code: "V00007",
    isHD: 0,
    type: 2,
    cas_id: 1,
    length: 16,
    significant_length: 16,
    char_allowed: 3,
    status: 0,
    created_at: "2023-07-27 16:12:18",
    updated_at: "2023-10-07 11:40:38",
    created_by: 2,
    updated_by: 2,
    status_lbl: "In-Active",
    created_by_lbl: "my mso(mso)",
    box_type_lbl: "SD",
    brand_type_lbl: "Smartcard",
    char_allowed_lbl: "Alphanumeric",
    cas_lbl: "NSTV",
  },
  {
    id: 5,
    name: "CHA045170A",
    code: "V00006",
    isHD: 1,
    type: 1,
    cas_id: 1,
    length: 15,
    significant_length: 15,
    char_allowed: 3,
    status: 1,
    created_at: "2023-07-27 16:11:40",
    updated_at: "2023-10-27 14:58:06",
    created_by: 2,
    updated_by: 2,
    status_lbl: "Active",
    created_by_lbl: "my mso(mso)",
    box_type_lbl: "HD",
    brand_type_lbl: "STB",
    char_allowed_lbl: "Alphanumeric",
    cas_lbl: "NSTV",
  },
  {
    id: 4,
    name: "NSTV OVT Embedded MPEG4 SMC",
    code: "V00005",
    isHD: 0,
    type: 2,
    cas_id: 1,
    length: 16,
    significant_length: 16,
    char_allowed: 2,
    status: 0,
    created_at: "2023-07-07 15:28:04",
    updated_at: "2023-10-26 21:44:00",
    created_by: 2,
    updated_by: 2,
    status_lbl: "In-Active",
    created_by_lbl: "my mso(mso)",
    box_type_lbl: "SD",
    brand_type_lbl: "Smartcard",
    char_allowed_lbl: "Hexadecimal",
    cas_lbl: "NSTV",
  },
  {
    id: 3,
    name: "NSTV OVT Embedded MPEG4 HD",
    code: "V00004",
    isHD: 1,
    type: 1,
    cas_id: 1,
    length: 15,
    significant_length: 15,
    char_allowed: 0,
    status: 0,
    created_at: "2023-07-07 15:26:55",
    updated_at: "2023-10-07 11:46:24",
    created_by: 2,
    updated_by: 2,
    status_lbl: "In-Active",
    created_by_lbl: "my mso(mso)",
    box_type_lbl: "HD",
    brand_type_lbl: "STB",
    char_allowed_lbl: "Numeric",
    cas_lbl: "NSTV",
  },
  {
    id: 2,
    name: "OVTVC",
    code: "V00003",
    isHD: 0,
    type: 2,
    cas_id: 1,
    length: 16,
    significant_length: 16,
    char_allowed: 3,
    status: 1,
    created_at: "2023-05-26 19:52:20",
    updated_at: "2023-05-27 17:31:42",
    created_by: 2,
    updated_by: 2,
    status_lbl: "Active",
    created_by_lbl: "my mso(mso)",
    box_type_lbl: "SD",
    brand_type_lbl: "Smartcard",
    char_allowed_lbl: "Alphanumeric",
    cas_lbl: "NSTV",
  },
  {
    id: 1,
    name: "OVTSTB",
    code: "V00002",
    isHD: 1,
    type: 1,
    cas_id: 1,
    length: 16,
    significant_length: 16,
    char_allowed: 3,
    status: 0,
    created_at: "2023-05-26 19:51:57",
    updated_at: "2023-10-07 11:46:35",
    created_by: 2,
    updated_by: 2,
    status_lbl: "In-Active",
    created_by_lbl: "my mso(mso)",
    box_type_lbl: "HD",
    brand_type_lbl: "STB",
    char_allowed_lbl: "Alphanumeric",
    cas_lbl: "NSTV",
  },
];

const brandtype = [
  {
    id: 1,
    name: "STB",
  },
  {
    id: 2,
    name: "Smartcard",
  },
];

const charallowed = [
  {
    id: 0,
    name: "Numeric",
  },
  {
    id: 1,
    name: "Alphabets",
  },
  {
    id: 2,
    name: "Hexadecimal",
  },
  {
    id: 3,
    name: "Alphanumeric",
  },
];

export { brandlist, brandtype, charallowed };
