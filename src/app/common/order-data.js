import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import Image from "next/image";
import websiteImage from '/public/assets/wesite-logo.png'

const CustomOderTable = () => {
    const data = [
        { "id": 1, "Name": 'redmi note 7 pro plus max laptop', "Product": "/assets/wesite-logo.png", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },
        { "id": 1, "Name": 'John Smith', "Product": "/assets/wesite-logo.png", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },
        { "id": 1, "Name": 'John Smith', "Product": "/assets/wesite-logo.png", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },
        { "id": 1, "Name": 'John Smith', "Product": "/assets/wesite-logo.png", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },
        { "id": 1, "Name": 'John Smith', "Product": "/assets/wesite-logo.png", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },
        { "id": 1, "Name": 'John Smith', "Product": "/assets/wesite-logo.png", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },
        { "id": 1, "Name": 'John Smith', "Product": "/assets/wesite-logo.png", "Price": "0", "Quantity": 1, "Discout": 1, "total": "66223" },

    ];
    return (
        <>
            <table className="orderTable">
                <thead>
                    <tr>
                    <th style={{width:'10%'}}>SrNo.</th>
                        <th style={{width:'50%'}}>Product</th>
                        <th style={{width:'10%', textAlign:'center'}}>Price</th>
                        <th style={{width:'10%', textAlign:'center'}}>Quntity</th>
                        <th style={{width:'10%' ,textAlign:'center'}}>Discount</th>
                        <th style={{width:'10%' ,textAlign:'center'}}>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((items,index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>
                                    <div className="d-flex justify-content-start align-items-center">
                                        <Image
                                            src={items.Product}
                                            alt={`Product ${items.id}`}
                                            width={40}
                                            height={45}
                                            style={{borderRadius: '5px', padding: '3px', background: '#ccc' }}
                                        />
                                        <div style={{ wordWrap: "break-word", paddingLeft: '15px', fontWeight: '600', textTransform: 'capitalize' }}>{items.Name}fjkfkfkflksdflk</div>
                                    </div>
                                </td>
                                <td className="text-center">{items.Price}</td>
                                <td className="text-center">{items.Quantity}</td>
                                <td className="text-center">{items.Discout}</td>
                                <td className="text-center">{items.total}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}



export default CustomOderTable;
