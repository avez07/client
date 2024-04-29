"use client"
import React, { useEffect, useState, useMemo } from 'react';
import { MaterialReactTable, createMRTColumnHelper, useMaterialReactTable, } from 'material-react-table';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import { Box, Button, MenuItem, ListItemIcon } from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import Cookies from 'js-cookie';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { GetFetchAPI, UnRetuenFunc } from '@/app/common/serverFunctions';
import { Email_Modal } from '@/app/common/swal'
import { useRouter } from 'next/navigation';
const columnHelper = createMRTColumnHelper();


const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
};

const Seller = () => {
    const [data, setData] = useState([])
    const [active, setActive] = useState(true)
    const [modalShow,setModalShow] = useState(false)
    const [email , setEmail]  = useState()
    const router = useRouter()


    useEffect(() => {
        if (active) {
            const sellerData = async () => {
                const token = Cookies.get('token')
                const res = await GetFetchAPI('seller', token)
                if (res.status == 200) setData(res.data)
            }
            sellerData();
            setActive(false)
        }
    }, [data, active])
    const columns = useMemo(() => [
        columnHelper.accessor('name', { header: 'Name', size: 40, }),
        columnHelper.accessor('email', { header: 'Email', size: 40, }),
        columnHelper.accessor('DOB', { header: 'Date of Birth', size: 120, }),
        columnHelper.accessor('createdAt', { header: 'createdAt', size: 120, }),
        columnHelper.accessor('active', {
            header: 'active',
            size: 120,
            Cell: ({ cell, row }) => {
                if (!cell.getValue()) return <FaThumbsDown onClick={() => handleSellerActive(row.original.loginId,'accActive')} className='fs-5 text-danger' style={{ fill: 'red', cursor: 'pointer' }} />
                return <FaThumbsUp onClick={() => handleSellerActive(row.original.loginId,'accActive')} className='fs-5 text-success' style={{ fill: 'green', cursor: 'pointer' }} />
            }

        }),
        columnHelper.accessor('suspended', {
            header: 'suspended',
            size: 120,
            Cell: ({ cell,row }) => {
                if (!cell.getValue()) return <FaThumbsDown onClick={() => handleSellerActive(row.original.loginId,'accsuspend')} className='fs-5 text-success' style={{ fill: 'green', cursor: 'pointer' }} />
                return <FaThumbsUp className='fs-5 text-danger' onClick={() => handleSellerActive(row.original.loginId,'accsuspend')} style={{ fill: 'red', cursor: 'pointer' }} />
            }
        }),
    ])

    const handleSellerActive = async (id,state) => {
        const token = Cookies.get('token')
        const url = state;
        const body = await JSON.stringify({ id: id })
        await UnRetuenFunc(url, body, token)
        setActive(true)
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
        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <MenuItem key={0} onClick={() => { router.push('/admin/seller/' + row.original.loginId); closeMenu() }} sx={{ m: 0 }}>
                <ListItemIcon><AccountCircle /></ListItemIcon>
                View Profile
            </MenuItem>,
            <MenuItem key={1} onClick={() => {  setModalShow(true); setEmail(row.original.email);closeMenu(); }} sx={{ m: 0 }}>
               
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
                <Email_Modal show={modalShow} email={email}
                    onHide={() => setModalShow(false)} />
            </div>
        </>


    );
};

export default Seller;
