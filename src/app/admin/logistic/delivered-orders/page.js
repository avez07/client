"use client"
import React from 'react';
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv'; 
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import { columns,data } from '/public/data';
import { FaSquareCheck } from 'react-icons/fa6';

const handleExportRows = (rows) => {
  const rowData = rows.map((row) => row.original);
  const csv = generateCsv(csvConfig)(rowData);
  download(csvConfig)(csv);
};

const DeliveredOrders = () => {
  const handleExportRowsPDF = (rows) => {
    const doc = new jsPDF();
    const tableData = rows.map((row) => Object.values(row.original));
    const tableHeaders = columns.map((c) => c.header);

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
    });

    doc.save('mrt-pdf-example.pdf');
  };

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: true,
    enableColumnOrdering: true,
    enableStickyHeader: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          gap: '16px',
          padding: '8px',
          flexWrap: 'wrap',
          color: 'red'
        }}
      >
        
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRowsPDF(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export  PDF
        </Button>
        <Button
          disabled={
            !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
          }
          //only export selected rows
          onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export EXCEL
        </Button>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
};

export default DeliveredOrders;
