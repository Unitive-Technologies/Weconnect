import { useState, useMemo, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { createMRTColumnHelper } from "material-react-table";
import { useLocation } from "react-router-dom";

import { appConfig } from "../../app.config";
import axiosConfig from "../../axios.config";

// Search Component
import AdvancedSearch from "./AdvancedSearch";
// Top Nav Bar
import ReportsNav from "./ReportsNav";
// Matrial Table Component
import DataTable from "./DataTable";
// Loading Redux
import { setOffLoading, setOnLoading } from "../../features/loadingSlice";

// For Addind Filter Params
import { filterParams } from "./filterParams";

// Components for Adjsut Columns Component
import InputDrag from "../common/InputDrag";
import DialogBox from "../common/DialogBox";

import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { FaDownload } from "react-icons/fa";

export default function ReportIndex({
  reportUrl,
  searchUrl = null,
  fieldParams,
  expandParams,
  reportTitle,
  pathValue,
  columnDefinitions,
  // for CRM module trigger used
  trigger,
  // optional adjust column
  adjustColumns = null,
  // Show Options Like Export
  showOptions = true,
  // Show Top Nav Bar Stuff
  showTopNav = true,
  children,
}) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: appConfig.paginationPageSize,
  });

  //   Filter Params State
  const [filterData, setFilterData] = useState([]);

  // State for Adjust Column
  const [openDialog, setOpenDialog] = useState(false);

  //   GET Table Records
  const fetchData = async () => {
    dispatch(setOnLoading());

    try {
      let url = reportUrl;
      let filterObject = {};

      // console.log(filterData);
      if (filterData && filterData.length > 0)
        filterObject = filterParams(filterData);

      // console.log(filterObject);
      let params = {
        fields: fieldParams ? fieldParams : null,
        expand: expandParams ? expandParams : null,
        page: pagination.pageIndex + 1,
        "per-page": pagination.pageSize,
      };

      if (Object.keys(filterObject).length > 0)
        params = { ...params, ...filterObject };
      params = { ...params, vr: appConfig.webVersion };

      const response = await axiosConfig.get(url, { params });

      setTotalCount(response.headers["x-pagination-total-count"]);

      setUserData(response.data.data);
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

  //   GET search data
  const fetchSearchData = async () => {
    dispatch(setOnLoading());

    const response = await axiosConfig.get(searchUrl, {
      params: { vr: appConfig.webVersion },
    });
    if (response.status === 200) {
      const data = response.data.data;

      let mappedData = [];
      for (const key of Object.keys(data)) {
        let item = data[key];
        item.key = key;
        mappedData.push(item);
      }

      let mandatoryFields = [];
      mappedData.forEach((item, index) => {
        if (item.mandatory && item.mandatory === true)
          mandatoryFields.push({ field: item, index });
      });

      if (!(mandatoryFields.length > 0)) await fetchData();

      setSearchData(response.data.data);
    }
    dispatch(setOffLoading());
  };

  const ref = useRef(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (ref.current === false)
      if (searchUrl) {
        fetchSearchData();
        ref.current = true;
      } else {
        fetchData();
        ref.current = true;
      }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (pagination.pageIndex >= 0 || trigger) fetchData();
  }, [pagination.pageIndex, pagination.pageSize, filterData, trigger]);

  //   For Top Navbar (Reports Nav)
  const location = useLocation();
  const path = location.pathname;
  const parts = path.split(pathValue);
  const truncatedPath = parts[0];
  const finalPath = truncatedPath.slice(1).split("/");

  //   Usememo for handling rendering DOM
  const columnHelper = createMRTColumnHelper();
  const columns = useMemo(
    () => columnDefinitions(columnHelper),
    [columnHelper]
  );

  // Adjust Column Options
  const adjustColumnOptions = convertColumns(adjustColumns);

  const [selected, setSelected] = useState(adjustColumnOptions);

  let submitStructure = {
    isSubmitted: false,
    data: {},
    reportData: {},
  };

  const [submitData, setSubmitData] = useState(submitStructure);

  // Generate Report Function
  async function handleAdjustColumnSubmit() {
    dispatch(setOnLoading());
    try {
      if (selected.length === 0)
        return toast.error("Please Select Atleast One Column");

      let str = "";

      selected.forEach((item, i) => {
        if (selected.length - 1 === i) str += item.value + ":" + item.label;
        else str += item.value + ":" + item.label + ",";
      });

      let params = {
        report_name: reportTitle.replaceAll(" ", "_"),
        attrlbl: str,
        vr: appConfig.webVersion,
      };

      const response = await axiosConfig.get(
        reportUrl.split("?")[0] + "/download",
        {
          params,
        }
      );

      if (response.status === 200) {
        setSubmitData((prev) => ({
          ...prev,
          data: response.data.data,
          isSubmitted: true,
        }));
        dispatch(setOffLoading());
        callReportDownload(response.data.data.report_id);
      }
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  }

  //  Recursive Call To Enable Download Button
  async function callReportDownload(id) {
    const params = {
      expand: "t_count_lbl,status_lbl,created_by_lbl",
      "filter[_id]": id,
      vr: appConfig.webVersion,
    };
    const response = await axiosConfig("report-download", { params });
    if (response.data.data[0].isDone === 1)
      return setSubmitData((prev) => ({
        ...prev,
        reportData: response.data.data[0],
      }));

    // To Stop Calling Function After user Closes The Dialog Box

    // Problem Here
    if (submitData.isSubmitted) return;
    callReportDownload(id);
  }

  return (
    <div className="m-2">
      {showTopNav && (
        <ReportsNav truncatedPath={finalPath} content={reportTitle} />
      )}
      {showTopNav && (
        <div className="mx-2 my-8 flex flex-col gap-5">
          <h1 className="text-3xl">{reportTitle}</h1>
          {children}
        </div>
      )}
      {searchUrl && (
        <AdvancedSearch searchData={searchData} setFilterData={setFilterData} />
      )}

      {adjustColumns && (
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => setOpenDialog(true)}
            className="font-semibold p-1 flex items-center gap-2"
          >
            <FiEdit /> Generate {reportTitle ? reportTitle : "Report"}
          </button>
        </div>
      )}

      <DataTable
        columns={columns}
        userData={userData}
        rowCount={totalCount}
        pagination={pagination}
        setPagination={setPagination}
        fileName={reportTitle}
        fetchData={fetchData}
        exportAllUrl={reportUrl}
        fieldParams={fieldParams}
        expandParams={expandParams}
        showOptions={showOptions}
      />

      {/* Adjust Column Component */}
      {adjustColumns && (
        <DialogBox
          title={`Adjust Columns and Generate ${reportTitle}`}
          open={openDialog}
          setOpen={setOpenDialog}
          doNotClose={true}
        >
          {!submitData.isSubmitted && (
            <div>
              <div className="min-h-[10rem] flex justify-center items-center">
                <div className="w-96">
                  <InputDrag
                    options={adjustColumnOptions}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>
              </div>
              <div className="p-5 flex gap-5 justify-center items-center">
                <button
                  type="button"
                  onClick={handleAdjustColumnSubmit}
                  className="border-2 border-[#242745] text-[#242745] px-3 py-1 rounded hover:bg-[#242745] hover:text-white font-semibold duration-300"
                >
                  Generate
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenDialog(false);
                    setSelected(adjustColumnOptions);
                    setSubmitData(submitStructure);
                  }}
                  className="border-2 border-[#242745] text-[#242745] px-3 py-1 rounded hover:bg-[#242745] hover:text-white font-semibold duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {submitData.isSubmitted && (
            <div>
              <div className="flex justify-between gap-20">
                <h1>{submitData?.data?.msg}</h1>

                <div className="flex gap-5 items-center">
                  <h3>
                    <b>Job ID:</b> <span>{submitData?.data?.report_id}</span>
                  </h3>
                  <h3>
                    <b>Total Count:</b>
                    <span>{submitData?.data?.totalCount}</span>
                  </h3>
                </div>
              </div>

              <div className="mt-5 flex justify-center items-center gap-5">
                {submitData?.reportData?.isDone && (
                  <a
                    className="flex items-center gap-2 border-2 border-[#242745] text-[#242745] px-3 py-1 rounded hover:bg-[#242745] hover:text-white font-semibold duration-300"
                    href={submitData?.reportData?.download_file_path}
                    download
                  >
                    <FaDownload />
                    Download
                  </a>
                )}
                {!submitData?.reportData?.isDone && (
                  <Button name="Processing...">
                    <CircularProgress size={24} />
                  </Button>
                )}
                {/* Go to Download Log Page with response id as ?jid=id */}
                <Button name={"Go to Download Logs"} onClick={() => {}} />
                <Button
                  name={"Close"}
                  onClick={() => {
                    setOpenDialog(false);
                    setSelected(adjustColumnOptions);
                    setSubmitData(submitStructure);
                  }}
                />
              </div>
            </div>
          )}
        </DialogBox>
      )}
    </div>
  );
}

const convertColumns = (columns) => {
  return columns?.map((column) => ({
    label: column.header,
    value: column.accessor,
  }));
};

function Button({ name = "", onClick = () => {}, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 border-2 border-[#242745] text-[#242745] px-3 py-1 rounded hover:bg-[#242745] hover:text-white font-semibold duration-300"
    >
      {children} {name}
    </button>
  );
}
