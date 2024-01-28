import * as React from 'react';
import {Form} from 'react-bootstrap'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MdDeleteSweep } from "react-icons/md";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const BulkEdiTable = ({jsonData}) => {
  // return console.log(jsonData)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Variant</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Cost</TableCell>
            <TableCell align="right">Margin</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jsonData !== null? jsonData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='left'>
              {row.id}
              </TableCell>
              <TableCell align="right">{row.color}/{row.size}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.cost}</TableCell>
              <TableCell align="right">{row.price - row.cost}</TableCell>
              <TableCell align="right">image</TableCell>
              <TableCell align="center" className='fs-5 text-danger'><MdDeleteSweep /></TableCell>
            </TableRow>
          )):null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default BulkEdiTable;