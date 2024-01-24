import React, { useMemo,useState,useEffect } from "react";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

const OrderTable = () => {
    const columns = useMemo(
        () => [
           
            {
                accessorKey: 'Product',
                header: 'Product',
                Cell: ({ row }) => (
                    <div className="d-flex justify-content-between align-items-center">
                        <img
                            src={row.original.Product}
                            alt={`Product ${row.original.id}`}
                            style={{ width: '40px', height: '45px',borderRadius:'5px',padding:'3px', background:'#ccc' }}
                        />
                        <div style={{wordBreak:"break-all", paddingLeft:'5px', fontWeight:'600', textTransform:'capitalize'}}>{row.original.Name}fjkfkfkflksdflk</div>
                    </div>

                ),
                
            },
            {
                accessorKey: 'Price',
                header: 'Price',
                size: 40,
            },
            {
                accessorKey: 'Quantity',
                header: 'Quantity',
                size: 40,
            },
            {
                accessorKey: 'Discout',
                header: 'Discount',
                size: 40,
            },
            {
                accessorKey: 'total',
                header: 'Total',
                size: 40,
            },
        ],
        []
    );

    const data = [
        { "id": 1, "Name": 'redmi note 7 pro plus max laptop', "Product": "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwesite-logo.743669ea.png&w=384&q=75", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },
        { "id": 1, "Name": 'John Smith', "Product": "http://dummyimage.com/116x100.png/ff4444/ffffff", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },
        { "id": 1, "Name": 'John Smith', "Product": "http://dummyimage.com/116x100.png/ff4444/ffffff", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },
        { "id": 1, "Name": 'John Smith', "Product": "http://dummyimage.com/116x100.png/ff4444/ffffff", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },
        { "id": 1, "Name": 'John Smith', "Product": "http://dummyimage.com/116x100.png/ff4444/ffffff", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },
        { "id": 1, "Name": 'John Smith', "Product": "http://dummyimage.com/116x100.png/ff4444/ffffff", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },
        { "id": 1, "Name": 'John Smith', "Product": "http://dummyimage.com/116x100.png/ff4444/ffffff", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },

    ];
    

    const table = useMaterialReactTable({
        columns,
        data,
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableStickyHeader: true,
        enableTopToolbar: false,
        enableBottomToolbar: false,
        enableColumnActions: false,
        enableSorting: false,
        
    });
   

    return (
        <MaterialReactTable table={table} className='orderTable' />
    );
};

export default OrderTable;
