
import React from "react";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from 'material-react-table';

const dataRetrive = async () => {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  try {
    const response = await fetch("http://localhost:5500/api/employedata", requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
    throw error; // Rethrow the error for handling elsewhere if needed
  }
};
    const res = await dataRetrive();
// console.log(res); 
const columnHelper = createMRTColumnHelper();
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 40,
  }),
  columnHelper.accessor('title', {
    header: 'title',
    size: 40,
  }),
  columnHelper.accessor('sector', {
    header: 'sector',
    size: 120,
  }),
  columnHelper.accessor('source', {
    header: 'source',
    size: 120,
  }),
  columnHelper.accessor('topic', {
    header: 'topic',
    size: 120,
  }),
  columnHelper.accessor('start_year', {
    header: 'start_year',
    size: 120,
  }),
  columnHelper.accessor('end_year', {
    header: 'end_year',
    size: 120,
  }),
  columnHelper.accessor('intensity', {
    header: 'intensity',
    size: 120,
  }),
  columnHelper.accessor('pestle', {
    header: 'pestle',
    size: 120,
  }),
  columnHelper.accessor('country', {
    header: 'country',
    size: 120,
  }),
  columnHelper.accessor('relevance', {
    header: 'relevance',
    size: 120,
  }),
  columnHelper.accessor('likelihood', {
    header: 'likelihood',
    size: 120,
  }),
  columnHelper.accessor('added', {
    header: 'added',
    size: 120,
  }),
  columnHelper.accessor('published', {
    header: 'published',
    size: 120,
  }),  
];


const data = res.map((items) => ({ ...items }));
// console.log(typeof(data))
export  {columns,data}