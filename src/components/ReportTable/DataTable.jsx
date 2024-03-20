import React, { useRef, useState } from "react";
import { Box, Button, Pagination } from "@mui/material";
import { FileDownload as FileDownloadIcon } from "@mui/icons-material";
import { IoReloadCircle } from "react-icons/io5";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import * as XLSX from "xlsx";
import { appConfig } from "../../app.config";

// pdf
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

import axiosConfig from "../../axios.config";
import { useDispatch } from "react-redux";
import { setOffLoading, setOnLoading } from "../../features/loadingSlice";

function setDate() {
  return new Date()
    .toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/\//g, "_")
    .replace(/:/g, "_");
}

const DataTable = ({
  columns,
  userData,
  rowCount,
  pagination,
  setPagination,
  fileName,
  fetchData,
  // For Export All Data
  exportAllUrl,
  fieldParams,
  expandParams,
  showOptions = true,
}) => {
  const dispatch = useDispatch();

  const handleExportPdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });

    const rows = table.getRowModel().rows;
    const columns = table.getAllColumns();

    const values = [];
    const tableHeaders = [];

    columns.forEach((column) => {
      if (!column.id.includes("mrt-")) {
        tableHeaders.push(column.columnDef.header);
      }
    });

    rows.forEach((row) => {
      const subValues = [];
      row.getAllCells().map((item) => {
        if (!item.id.includes("mrt-")) {
          if (["smartcardno", "stbno"].includes(item.column.id))
            subValues.push(`'${item.getValue()}`);
          else subValues.push(item.getValue() ? item.getValue() : "'null");
        }
      });
      values.push(subValues);
    });

    autoTable(doc, {
      head: [tableHeaders],
      body: values,
      styles: {
        fontSize: 5,
        cellPadding: 1,
        // halign: "center",
      },
    });

    doc.save(`${fileName} ${setDate()}.pdf`);
  };

  const handleExportXlsx = () => {
    const rows = table.getRowModel().rows;
    const columns = table.getAllColumns();

    const tableHeaders = [];

    const data = [];

    columns.forEach((column) => {
      if (!column.id.includes("mrt-")) {
        tableHeaders.push(column.columnDef.header);
      }
    });

    data.push(tableHeaders);

    rows.forEach((row) => {
      const subValues = [];
      row.getAllCells().map((item) => {
        if (!item.id.includes("mrt-")) {
          if (["smartcardno", "stbno"].includes(item.column.id))
            subValues.push(`'${item.getValue()}`);
          else subValues.push(item.getValue() ? item.getValue() : "'null");
        }
      });
      data.push(subValues);
    });

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Exported Data");

    XLSX.writeFile(workbook, `${fileName} ${setDate()}.xlsx`);
  };

  const handleExportAll = async () => {
    dispatch(setOnLoading());
    try {
      let url = exportAllUrl;
      let index = 0;
      let exportData = [];

      let params = {
        fields: fieldParams ? fieldParams : null,
        expand: expandParams ? expandParams : null,
        page: index++ + 1,
        "per-page": 5000,
      };

      params = { ...params, vr: appConfig.webVersion };

      const response = await axiosConfig.get(url, { params });
      const totalPage = response.headers["x-pagination-page-count"];
      exportData = [...exportData, response.data.data];

      async function callBack(params) {
        console.log(url, { ...params, page: index + 1 });
        params = { ...params, page: index++ + 1 };
        const response = await axiosConfig.get(url, { params });
        exportData = [...exportData, response.data.data];

        if (totalPage > 1 && totalPage !== index) await callBack(params); //check for last iteration
      }

      if (totalPage > 1) await callBack(params);

      let data = [];
      const headerKeys = columns.map((item) => item.header);
      const accessorKeys = columns.map((item) => item.accessorKey);

      data.push(headerKeys);

      if (exportData[0]) {
        exportData[0].map((item) => {
          let arr = [];
          accessorKeys.map((innerItem) => {
            arr.push(item[innerItem] ? item[innerItem] : "");
          });
          data.push(arr);
        });
      }

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(data);

      XLSX.utils.book_append_sheet(wb, ws, "Exported Data");
      XLSX.writeFile(wb, `${fileName} ${setDate()}.xlsx`);
    } catch (err) {
      console.log(err);
    }
    dispatch(setOffLoading());
  };

  const table = useMaterialReactTable({
    columns,
    data: userData,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "top",
    enableColumnOrdering: true,
    enableDensityToggle: false,
    initialState: { density: "compact" },

    // other settings
    defaultDisplayColumn: { enableResizing: true },
    enableColumnResizing: true,
    enableGlobalFilterModes: true,
    // enableColumnPinning: true,
    //
    enableStickyHeader: true,

    getRowId: (row) => row.id,
    enableRowNumbers: true,

    // enableSelectAll: true,
    // enableRowSelection: true,

    // pagination
    manualPagination: true,
    onPaginationChange: setPagination,
    rowCount,
    state: {
      pagination,
    },

    muiPaginationProps: {
      rowsPerPageOptions: appConfig.paginationPageSizes,
    },

    // virtualization
    muiTableContainerProps: { sx: { maxHeight: "500px" } },
    // enableColumnVirtualization: true,
    enableRowVirtualization: true,
    rowVirtualizerOptions: { overscan: 10 }, //optionally customize the row virtualizer
    columnVirtualizerOptions: { overscan: 10 }, //optionally customize the column virtualizer

    renderTopToolbarCustomActions: ({ table }) => (
      <div>
        {showOptions && (
          <Box
            color="primary"
            sx={{
              display: "flex",
              gap: "16px",
              padding: "8px",
              flexWrap: "wrap",
            }}
          >
            <Button onClick={handleExportPdf} startIcon={<FileDownloadIcon />}>
              Export Visible Data .pdf
            </Button>

            <Button onClick={handleExportXlsx} startIcon={<FileDownloadIcon />}>
              Export Visible Data .xlsx
            </Button>

            <Button onClick={handleExportAll} startIcon={<FileDownloadIcon />}>
              Export All Data
            </Button>

            <Button onClick={fetchData} startIcon={<IoReloadCircle />}>
              Reload
            </Button>
          </Box>
        )}
      </div>
    ),
  });

  return (
    <div className="mt-2">
      <MaterialReactTable table={table} />
    </div>
  );
};

export default DataTable;
