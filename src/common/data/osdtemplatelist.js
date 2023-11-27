const osdtemplatelist = [
  {
    id: 2,
    name: "Expiring STB",
    template_for: 2,
    template: {
      template_message:
        "Welcome to VDigital Family! Your Account is expiring soon, kindly recharge immediately to avoid service interruption, Kindly contact your cable tv operator to renew your service,Thank You.",
    },
    template_config_id: [
      {
        id: 1,
        name: "OSD",
        cas_code: "NSTV",
      },
    ],
    status: 1,
    created_at: "2023-11-23 10:26:13",
    updated_at: "2023-11-23 16:18:51",
    created_by: 2,
    updated_by: 2,
    status_lbl: "Active",
    created_by_lbl: "my mso(mso)",
    template_for_lbl: "OSD",
    operator_count: 1946,
  },
  {
    id: 1,
    name: "NXT",
    template_for: 2,
    template: {
      template_message: "TESTING VDIGITAL",
    },
    template_config_id: [],
    status: 1,
    created_at: "2023-05-29 16:13:46",
    updated_at: "2023-05-29 16:13:46",
    created_by: 2,
    updated_by: 2,
    status_lbl: "Active",
    created_by_lbl: "my mso(mso)",
    template_for_lbl: "OSD",
    operator_count: 0,
  },
];

const osdtemplatefor = [
  {
    id: 1,
    name: "SMS",
  },
  {
    id: 2,
    name: "OSD",
  },
  {
    id: 3,
    name: "Bmail",
  },
];

export { osdtemplatelist, osdtemplatefor };
