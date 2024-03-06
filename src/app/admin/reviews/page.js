"use client"
import React from 'react';
import dynamic from 'next/dynamic';
const AipexChart = dynamic(() => import('/src/app/common/rewiews-chart'), { ssr: false });
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
import { columns, data } from '/public/data';
import { FaSquareCheck } from 'react-icons/fa6';
import { Row, Card, Col, ProgressBar } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';



const Reviews = () => {

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };
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
      <Row xs={1} md={2} className="g-4 mb-4" style={{width:'100%'}}>
        <Col key={1}>
          <Card>
            <Card.Body>
              <div className='d-flex' style={{ padding: '19px 0' }}>
                <div className='reviews px-3' style={{ borderInlineEnd: '2px solid #ccc', width: '50%' }}>
                  <div className='ratings d-flex'>
                    <span className='pe-2'>4.9</span><span><FaStar /></span>
                  </div>
                  <div className='total-rewis my-2 fw-semibold'>Total 187 reviews</div>
                  <div className='rate-msg my-2'>All reviews are from genuine customers</div>
                  <div className='this-week'>+5 This week</div>
                </div>
                <div className='statistics px-2' style={{ width: '50%', fontSize: '14px' }}>
                  <div className='d-flex align-items-center justify-content-between  text-capitalize'><span>5 star</span><span className='progressbar-span'><ProgressBar now={75} /></span><span style={{ width: '13%', textAlign: 'end' }}>124</span></div>
                  <div className='d-flex align-items-center justify-content-between my-2 text-capitalize'><span>4 star</span><span className='progressbar-span'><ProgressBar now={60} /></span><span style={{ width: '13%', textAlign: 'end' }}>40</span></div>
                  <div className='d-flex align-items-center justify-content-between my-2 text-capitalize'><span>3 star</span><span className='progressbar-span'><ProgressBar now={45} /></span><span style={{ width: '13%', textAlign: 'end' }}>12</span></div>
                  <div className='d-flex align-items-center justify-content-between my-2 text-capitalize'><span>2 star</span><span className='progressbar-span'><ProgressBar now={20} /></span><span style={{ width: '13%', textAlign: 'end' }}>7</span></div>
                  <div className='d-flex align-items-center justify-content-between my-2 text-capitalize'><span>1 star</span><span className='progressbar-span'><ProgressBar now={3} /></span><span style={{ width: '13%', textAlign: 'end' }}>2</span></div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col key={2}>
          <Card>
            <Card.Body>
              <div className='d-flex justify-content-between'>
                <div className='review-statistic'>
                  <div className='d-flex flex-column'>
                    <div className='static'>Reviews statistics</div>
                    <div className='rate-msg my-2'>12 New Reviews</div>
                    <div className='this-week'>+8.4%</div>
                  </div>
                  <div className='d-flex flex-column'>
                    <div><span style={{ color: '#663399' }}>87%</span> Positive Reviews</div>
                    <div style={{ color: '#94909D' }}>Weekly Report</div>
                  </div>
                </div>
                <div className='reviwchart'>
                  <AipexChart />
                </div>
              </div>


            </Card.Body>
          </Card>
        </Col>

      </Row>
      <MaterialReactTable table={table} />
    </>
  );
};

export default Reviews;
