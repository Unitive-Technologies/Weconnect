const inventorystatelist = [
  {
    id: 3,
    name: "Blacklist",
    code: "Blacklist",
    state_type: [4],
    description: "Blacklist",
    status: 1,
    created_at: "2023-11-03 15:31:20",
    updated_at: "2023-11-03 15:31:20",
    created_by: 2,
    updated_by: 2,
    status_lbl: "Active",
    created_by_lbl: "my mso(mso)",
    state_type_lbl: "Blacklist",
  },
  {
    id: 2,
    name: "Faulty",
    code: "Faulty",
    state_type: [3],
    description: "Faulty",
    status: 1,
    created_at: "2023-11-03 15:31:03",
    updated_at: "2023-11-03 15:31:03",
    created_by: 2,
    updated_by: 2,
    status_lbl: "Active",
    created_by_lbl: "my mso(mso)",
    state_type_lbl: "Mark Faulty",
  },
  {
    id: 1,
    name: "Release",
    code: "INVENT",
    state_type: [-1],
    description: "Release",
    status: 1,
    created_at: "2023-05-26 19:52:52",
    updated_at: "2023-11-03 15:30:42",
    created_by: 2,
    updated_by: 2,
    status_lbl: "Active",
    created_by_lbl: "my mso(mso)",
    state_type_lbl: "Release",
  },
];

const inventorystatus = [
  {
    id: -1,
    name: "Release",
  },
  {
    id: 3,
    name: "Mark Faulty",
  },
  {
    id: 4,
    name: "Blacklist",
  },
];

export { inventorystatelist, inventorystatus };
