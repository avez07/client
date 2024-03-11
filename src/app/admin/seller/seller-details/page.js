"use client"
import React from 'react';
import {
    MaterialReactTable,
    createMRTColumnHelper,
    useMaterialReactTable,
} from 'material-react-table';
import { Card } from 'react-bootstrap';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Box, Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import { columns, data } from '/public/data.js';
import { FaClockRotateLeft } from 'react-icons/fa6';
import { FaClock, FaUser } from 'react-icons/fa';
import { RiCheckDoubleLine } from 'react-icons/ri';
import { HiMiniReceiptRefund } from 'react-icons/hi2';
import { MdDangerous } from 'react-icons/md';

console.log(columns);
const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
};

const Example = () => {
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

    return (
        <>
            <div className='mb-5'>
                <Card style={{ width: '100%' }}>
                    <Card.Body className='d-flex justify-content-between py-4'>
                        <div className='orders_statics d-flex'>
                            <div className='order-status-value d-flex flex-column'>
                                <span className='order-track-no'>56</span><span className='order-status text-muted text-capitalize'>pending Payments</span>
                            </div>
                            <div className='order-status-icon'><FaClockRotateLeft /></div>
                        </div>
                        <div className='orders_statics d-flex'>
                            <div className='order-status-value d-flex flex-column'>
                                <span className='order-track-no'>27</span><span className='order-status text-muted text-capitalize'>Unfulfilled</span>
                            </div>
                            <div className='order-status-icon'><MdDangerous /></div>
                        </div>
                        <div className='orders_statics d-flex'>
                            <div className='order-status-value d-flex flex-column'>
                                <span className='order-track-no'>1249</span><span className='order-status text-muted text-capitalize'>Completed</span>
                            </div>
                            <div className='order-status-icon'><RiCheckDoubleLine /></div>
                        </div>
                        <div className='orders_statics d-flex'>
                            <div className='order-status-value d-flex flex-column'>
                                <span className='order-track-no'>13</span><span className='order-status text-muted text-capitalize'>Refunded</span>
                            </div>
                            <div className='order-status-icon'><HiMiniReceiptRefund /></div>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            <div>
                <MaterialReactTable table={table} />
            </div>
        </>


    );
};

export default Example;
