import React from "react";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from 'material-react-table';
const columnHelper = createMRTColumnHelper();
const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    size: 40,
  }),
  columnHelper.accessor('firstName', {
    header: 'First Name',
    size: 120,
  }),
  columnHelper.accessor('lastName', {
    header: 'Last Name',
    size: 120,
  }),
 
  columnHelper.accessor('city', {
    header: 'City',
  }),
  columnHelper.accessor('state', {
    header: 'Country',
    size: 220,
  }),
];


const data = [
  
  {
    ID:1,
      firstName: 'John',
      lastName: 'Doe',
    
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    ID:2,
      firstName: 'Jane',
      lastName: 'Doe',
    
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    ID:3,
      firstName: 'Joe',
      lastName: 'Doe',
    
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    ID:4,
      firstName: 'Kevin',
      lastName: 'Vandy',
    
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    ID:5,
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
  {
    ID:1,
      firstName: 'John',
      lastName: 'Doe',
    
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    ID:2,
      firstName: 'Jane',
      lastName: 'Doe',
    
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    ID:3,
      firstName: 'Joe',
      lastName: 'Doe',
    
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    ID:4,
      firstName: 'Kevin',
      lastName: 'Vandy',
    
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    ID:5,
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
  {
    ID:1,
      firstName: 'John',
      lastName: 'Doe',
    
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    ID:2,
      firstName: 'Jane',
      lastName: 'Doe',
    
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    ID:3,
      firstName: 'Joe',
      lastName: 'Doe',
    
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    ID:4,
      firstName: 'Kevin',
      lastName: 'Vandy',
    
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    ID:5,
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
  {
    ID:1,
      firstName: 'John',
      lastName: 'Doe',
    
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    ID:2,
      firstName: 'Jane',
      lastName: 'Doe',
    
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    ID:3,
      firstName: 'Joe',
      lastName: 'Doe',
    
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    ID:4,
      firstName: 'Kevin',
      lastName: 'Vandy',
    
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    ID:5,
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
  {
    ID:1,
      firstName: 'John',
      lastName: 'Doe',
    
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    ID:2,
      firstName: 'Jane',
      lastName: 'Doe',
    
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    ID:3,
      firstName: 'Joe',
      lastName: 'Doe',
    
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    ID:4,
      firstName: 'Kevin',
      lastName: 'Vandy',
    
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    ID:5,
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
  {
    ID:1,
      firstName: 'John',
      lastName: 'Doe',
    
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    ID:2,
      firstName: 'Jane',
      lastName: 'Doe',
    
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    ID:3,
      firstName: 'Joe',
      lastName: 'Doe',
    
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    ID:4,
      firstName: 'Kevin',
      lastName: 'Vandy',
    
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    ID:5,
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
  {
    ID:1,
      firstName: 'John',
      lastName: 'Doe',
    
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    ID:2,
      firstName: 'Jane',
      lastName: 'Doe',
    
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    ID:3,
      firstName: 'Joe',
      lastName: 'Doe',
    
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    ID:4,
      firstName: 'Kevin',
      lastName: 'Vandy',
    
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    ID:5,
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
  {
    ID:1,
      firstName: 'John',
      lastName: 'Doe',
    
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    ID:2,
      firstName: 'Jane',
      lastName: 'Doe',
    
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    ID:3,
      firstName: 'Joe',
      lastName: 'Doe',
    
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    ID:4,
      firstName: 'Kevin',
      lastName: 'Vandy',
    
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    ID:5,
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
  {
    ID:1,
      firstName: 'John',
      lastName: 'Doe',
    
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    ID:2,
      firstName: 'Jane',
      lastName: 'Doe',
    
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    ID:3,
      firstName: 'Joe',
      lastName: 'Doe',
    
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    ID:4,
      firstName: 'Kevin',
      lastName: 'Vandy',
    
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    ID:5,
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
  {
    ID:1,
      firstName: 'John',
      lastName: 'Doe',
    
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    ID:2,
      firstName: 'Jane',
      lastName: 'Doe',
    
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    ID:3,
      firstName: 'Joe',
      lastName: 'Doe',
    
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    ID:4,
      firstName: 'Kevin',
      lastName: 'Vandy',
    
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    ID:5,
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];
export  {columns,data}