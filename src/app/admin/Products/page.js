"use client"
import React, { useEffect, useState } from "react"
import { BioRhyme } from "next/font/google"
import { Button, Col, Form, Row } from "react-bootstrap"
import Link from "next/link"
import { FaCheck, FaCheckSquare, FaPlus, FaRegSquare, FaSearch, FaSort, FaSquare, FaTimes, FaTrashAlt } from "react-icons/fa"
import { GetFetchAPI, PostApi } from "@/app/common/serverFunctions"
import Cookies from "js-cookie"
import { FadeLoader } from 'react-spinners';




const playball = BioRhyme({ weight: '400', style: 'normal', subsets: ['latin'], display: 'swap', })
const GetAllCategory = () => {
    const [Categorydata, setCategoryData] = useState([])
    const [FilteredData, setFilteredData] = useState([])
    const [searchString, setSearchString] = useState('')
    const [activeFilter, setAactiveFilter] = useState(0)
    const [isDeleted, setIsDeleted] = useState(false)
    const [isloading, setIsloading] = useState(false)


    const token = Cookies.get('token')
    const fetchCategory = async () => {

        const response = await GetFetchAPI('/getAllCategory', token)
        if (response.status == 200) { setCategoryData([...response.data]); setFilteredData([...response.data]) }
    }
    const handleAction = async (action, id) => {
        const body = {
            action: action,
            id: id
        }
        setIsloading(true)
        const response = await PostApi('/CategoryAction', JSON.stringify(body), token)
        if (response.status != 200) return alert(response.message)
        if (action == 'delete') return setIsDeleted(true)
        const result = FilteredData.map(item =>
            item._id === id
                ? {
                    ...item,
                    active: action === 'active' ? !item.active : item.active,
                    approve: action === 'approve' ? !item.approve : item.approve,
                    delete: action === 'delete' ? !item.delete : item.delete,
                }
                : item
        )
        setFilteredData(result)
        setCategoryData(result)
        setIsloading(false)
        return true
    }
    const handleHeighlightString = (text, search = searchString) => {
        let startIndex = text.toLowerCase().indexOf(searchString.toLowerCase());
        if (startIndex === -1) {
            return text;
        }

        let endIndex = startIndex + searchString.length;

        return (
            <span>
                {text.substring(0, startIndex)}
                <span style={{ backgroundColor: 'yellow' }}>
                    {text.substring(startIndex, endIndex)}
                </span>
                {text.substring(endIndex)}
            </span>
        );
    }
    const handleFilter = (action) => {
        let num = 0;
        if (action == 1) {
            num = activeFilter == 0 ? 1 : activeFilter == 1 ? 0 : activeFilter == 2 ? 3 : 0
        }
        if (action == 2) {
            num = activeFilter == 0 ? 2 : activeFilter == 1 ? 3 : activeFilter == 2 ? 0 : 0
        }
        setAactiveFilter(num)

        FilteredData.sort((a, b) => {
            let aValue;
            let bValue;
            if (num === 1) {
                aValue = a.active ? 1 : 0
                bValue = b.active ? 1 : 0
            } else if (num === 2) {
                aValue = a.approve ? 1 : 0
                bValue = b.approve ? 1 : 0
            } else if (num === 3) {
                aValue = a.active === b.active ? (a.approve ? 1 : 0) : (a.active ? 1 : 0);
                bValue = b.active === a.active ? (b.approve ? 1 : 0) : (b.active ? 1 : 0);
            } else {
                aValue = 0;
                bValue = 0
            }
            return bValue - aValue;
            return result
        });


    }
    useEffect(() => {
        setIsloading(true)
        fetchCategory()
        setIsDeleted(false)
        setIsloading(false)
    }, [isDeleted])
    useEffect(() => {
        const search = setTimeout(() => {
            const result = Categorydata.filter(items =>
                Object.keys(items).slice(1, 4).some(key =>
                    items[key].toLowerCase().includes(searchString.toLowerCase())
                )
            );
            setFilteredData(result)
            setAactiveFilter(0)
        }, 700);
        return () => clearTimeout(search)
    }, [searchString])
    return (
        <>
            <div className={`overlap ${!isloading ? 'd-none' : ''}`}><div className="fadeloader"><FadeLoader color="#ccc" /></div></div>
            <Row md={2} className="g-2">
                <Col>
                    <div style={{ position: 'relative' }}>
                        <Form.Control type="text" onChange={(e) => setSearchString(e.target.value)} className="seacrhCategory_input rounded-5" />
                        <span className="searchCategoryIcon"><FaSearch /></span>
                    </div>
                </Col>
                <Col>
                  <Link href='/admin/Products/productCategories'><Button style={{float:'right',background:'#362465',border:'none'}}><FaPlus/> Add Category</Button></Link>
                </Col>

            </Row>

            <div className="d-flex w-50 ms-auto mt-2 justify-content-around fw-semibold">
                <p className="m-0" style={{ cursor: 'pointer' }} onClick={(e) => handleFilter(1)}>Active<FaSort className={activeFilter == 1 || activeFilter == 3 ? 'activeFilter' : 'deactiveFilter'} /></p>
                <p className="m-0" style={{ cursor: 'pointer' }} onClick={(e) => handleFilter(2)}>Approve <FaSort className={activeFilter == 2 || activeFilter == 3 ? 'activeFilter' : 'deactiveFilter'} /></p>
                <p className="m-0">Delete</p>
            </div>
            {FilteredData?.length > 0 && !FilteredData.deleted ? (
                FilteredData.map((items, index) => (
                    <div key={index} className="border rounded-3 px-3 my-3 py-4 d-flex justify-content-between">
                        <Link href={`/admin/Products/productCategories/${items._id}`} className={`${playball.className} text-uppercase text-decoration-none selectCategoroy text-dark m-0 fw-bold fs-5`}>

                            {handleHeighlightString(items.Categories)} &gt;  {handleHeighlightString(items.SubCategories)} &gt;  {handleHeighlightString(items.Products)}
                        </Link>
                        <div className="d-flex w-50 justify-content-around">
                            <div>
                                {items.active ? (
                                    <FaCheck className=" active_Buton " style={{ color: '#6ce36c', fontSize: '30px', cursor: 'pointer' }} onClick={() => handleAction('active', items._id)} />
                                ) : (
                                    <FaTimes className=" deactive_active_Buton " style={{ color: '#ef6262', fontSize: '30px', cursor: 'pointer' }} onClick={() => handleAction('active', items._id)} />
                                )}
                            </div>
                            <div>
                                {items.approve ? (
                                    <FaCheckSquare className=" approve_Buton " style={{ color: '#748ec9d9', fontSize: '28px', cursor: 'pointer' }} onClick={() => handleAction('approve', items._id)} />
                                ) : (
                                    <FaRegSquare className=" Unapprove_Buton " style={{ color: '#e9d887d9', fontSize: '28px', cursor: 'pointer' }} onClick={() => handleAction('approve', items._id)} />
                                )}
                            </div>
                            <div>
                                <FaTrashAlt className=" delete_Buton " style={{ color: '#ef6262', fontSize: '28px', cursor: 'pointer' }} onClick={() => handleAction('delete', items._id)} />
                            </div>

                        </div>
                    </div>
                ))
            ) : (<div className="fs-5 text-muted fw-semibold my-4 mx-3">No Category Found</div>)}
        </>
    )
}

export default GetAllCategory;