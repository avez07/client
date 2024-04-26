"use client"
import React, { useEffect, useState } from 'react';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable, } from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Box, Button, MenuItem, ListItemIcon } from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import { } from '/public/data.js';
import { useMemo } from 'react';
import Cookies from 'js-cookie';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
const columnHelper = createMRTColumnHelper();


const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
};

const Seller = () => {
    const [data, setData] = useState([])
    const [active, setActive] = useState(true)

    useEffect(() => {
        if (active) {
            fetchSellerData()
            setActive(false)
        }
    }, [data,active])
    const columns = useMemo(() => [
        columnHelper.accessor('name', { header: 'Name', size: 40, }),
        columnHelper.accessor('email', { header: 'Email', size: 40, }),
        columnHelper.accessor('DOB', { header: 'Date of Birth', size: 120, }),
        columnHelper.accessor('createdAt', { header: 'createdAt', size: 120, }),
        columnHelper.accessor('active', {
            header: 'active',
            size: 120,
            Cell: ({ cell,row }) => {
                if (!cell.getValue()) return   <FaThumbsDown onClick={()=>handleSellerActive(row.original.loginId)} className='fs-5 text-danger' style={{ fill: 'red'  ,cursor:'pointer'}} />
                return <FaThumbsUp  onClick={()=>handleSellerActive(row.original.loginId)} className='fs-5 text-success' style={{ fill: 'green',  cursor:'pointer'}} />
            }

        }),
        columnHelper.accessor('suspended', {
            header: 'suspended',
            size: 120,
            Cell: ({ cell }) => {
                if (!cell.getValue()) return <FaThumbsDown  className='fs-5 text-danger' style={{ fill: 'red' , cursor:'pointer'}} />
                return <FaThumbsUp  className='fs-5 text-success' style={{ fill: 'green', cursor:'pointer' }} />
            }
        }),
    ])
    const fetchSellerData = async () => {
        try {
            const token = Cookies.get('token')
            const respose = await fetch(process.env.NEXT_PUBLIC_APP_URL + 'seller', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                }
            })
            if (respose.ok) setData(await (await respose.json()).data)
        } catch (error) {
            console.log('erro While fetch the data', error)
        }
    }
     const handleSellerActive = async (id) => {
        try {
            const token = Cookies.get('token')
            const respose = await fetch(process.env.NEXT_PUBLIC_APP_URL + 'sellerActive', {
                method: 'POST',
                body : JSON.stringify({id:id}),
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + token
                }
            })
            if (respose.ok) setActive(true)
        } catch (error) {
            console.log('erro While fetch the data', error)
        }
    }
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
        enableRowActions: true,
        enableStickyHeader: true,
        enableColumnPinning: true,
        enableColumnOrdering: false,
        enableColumnActions: false,
        enableHiding: false,
        columnFilterDisplayMode: 'popover',
        paginationDisplayMode: 'pages',
        positionToolbarAlertBanner: 'bottom',
        positionActionsColumn: 'last',
        muiPaginationProps: {
            rowsPerPageOptions: [10, 25, 50, 1000]
        },
        renderRowActionMenuItems: ({ closeMenu }) => [
            <MenuItem key={0} onClick={() => { closeMenu(); }} sx={{ m: 0 }}>
                <ListItemIcon><AccountCircle /></ListItemIcon>
                View Profile
            </MenuItem>,
            <MenuItem key={1} onClick={() => { closeMenu(); }} sx={{ m: 0 }}>
                <ListItemIcon><Send /></ListItemIcon>
                Send Email
            </MenuItem>,
        ],
        renderTopToolbarCustomActions: ({ table }) => (
            <Box sx={{ display: 'flex', gap: '16px', padding: '8px', flexWrap: 'wrap', color: 'red' }}>
                <Button disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} onClick={() => handleExportRowsPDF(table.getSelectedRowModel().rows)} startIcon={<FileDownloadIcon />}>Export  PDF</Button>
                <Button disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()} onClick={() => handleExportRows(table.getSelectedRowModel().rows)} startIcon={<FileDownloadIcon />}>Export EXCEL</Button>
            </Box>
        ),
    });
   

    return (
        <>
            <div>
                <MaterialReactTable table={table} />
            </div>
        </>


    );
};

export default Seller;
