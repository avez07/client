'use client'
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import jsPDF from "jspdf";
import { BsPrinterFill } from "react-icons/bs";
import { FaFileExport } from "react-icons/fa";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import "jspdf-autotable";
import { columns, data } from "/public/data";
import "/public/css/datatable.css";
import * as XLSX from "xlsx";

const Product =  () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleChange = (state) => {
    setSelectedRows(state.selectedRows);
  };

  const tableData = {
   coll: columns,
   date: data,
  };

  const handlePrint = () => {
    const doc = new jsPDF();

    const tableColumnNames = columns.map((col) => col.name);
    const tableBody = selectedRows.map((row) =>
      columns.map((col) => (typeof col.selector === "function" ? col.selector(row) : row[col.selector]))
    );

    doc.autoTable({
      head: [tableColumnNames],
      body: tableBody,
    });
    doc.save("selectedRows.pdf");
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(selectedRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
    XLSX.writeFile(workbook, "selectedRows.xlsx");
  };

  return (
    <div className="main">
      <div className="action-icon">
        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-print">Print</Tooltip>}>
          <span style={{ cursor: 'pointer' }} className="me-3" onClick={handlePrint}><BsPrinterFill /></span>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-export">Export .xls</Tooltip>}>
          <span style={{ cursor: 'pointer' }} className="me-3" onClick={handleExportExcel}><FaFileExport /></span>
        </OverlayTrigger>
      </div>
      <div className="table-head">Product Details</div>
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          noHeader
          defaultSortField="id"
          sortIcon={<AddToDriveIcon key="sortIcon" />}
          defaultSortAsc={true}
          pagination
          selectableRows
          selectableRowsHighlight
          selectableRowsRadio
          selectableRowsVisibleOnly
          highlightOnHover
          dense
          sortActive
          onSelectedRowsChange={handleChange}
        />
      </DataTableExtensions>
    </div>
  );
};

export default Product;
