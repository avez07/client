"use client"
import React, { useContext, useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import { FaDownload, FaUser } from "react-icons/fa"
import { FaEnvelopeOpen } from "react-icons/fa6"
import dynamic from "next/dynamic";
import { AuthContext } from "./auth"
import { GetFetchAPI, PostApi } from "./serverFunctions"
import Cookies from "js-cookie"
import { PulseLoader } from "react-spinners"
const Select = dynamic(() => import('react-select'), { ssr: false })


const ShareCoupen = (props) => {
    const [shareWith, setShareWith] = useState(0)
    const { nightmode } = useContext(AuthContext)
    const [Getuser, setGetuser] = useState([])
    const [email, setemail] = useState([])
    const [isLoading, setIsloading] = useState(false)

    const customStyle = {
        control: (style) => ({ ...style, background: nightmode ? '#0c1220' : null, border: nightmode ? 'currentColor' : '' }),
        input: (style) => ({ ...style, color: nightmode ? '#fff' : '' }),
        singleValue: (style) => ({ ...style, color: nightmode ? '#fff' : null }),
        menuPortal: (base) => ({ ...base, zIndex: 1056 }),
        menu: (style) => ({ ...style, background: nightmode ? '#0c1220' : null, zIndex: 1056 }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                backgroundColor: isFocused ? "#ff0000" : null,
                background: nightmode ? '#0c1220' : '#fff',
                color: nightmode ? '#fcfcfc' : "#333333",

                ':active': {
                    ...styles['.active'],
                    background: '#232836'
                },
                ':hover': {
                    ...styles['.hover'],
                    backgroundColor: nightmode ? '#fff' : '#362465',
                    color: nightmode ? '#000' : '#fff'
                }
            };
        }
    }
    const handleDownload = async () => {
        setIsloading(true)
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_APP_URL+'downloadCoupen', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/pdf',
                },
            });
            if (!response.ok) throw new Error('Network response was not ok');
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'coupon.pdf');
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('There was an error downloading the file:', error);
        }
        setTimeout(() => {
            setIsloading(false)
            props.onHide()
            setShareWith(0)
        }, 700);
    };
    useEffect(() => {
        const token = Cookies.get('token')
        if (Getuser.length > 0) return
        GetFetchAPI('getAllUser', token).then((response) => setGetuser((response.data))).catch(err => console.log('Error while Fetching: ', err))
    }, [])
    // useEffect(() => {
    //     if (shareWith === 1) {
           
    //         setTimeout(() => {
    //             setIsloading(false)
    //             props.onHide()
    //             setShareWith(0)
    //         }, 700);
    //     }
    // }, [shareWith])
    return (
        <>
            <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton><h5>Share Coupens Via:</h5></Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-around text-center shareWith">
                        <div style={{ cursor: 'pointer' }} className={`${shareWith == 1 ? 'active' : ''}`} onClick={(e) => {setShareWith(1),handleDownload(e)}}><span className="shareWith-icon"><FaDownload className="fs-4" /></span><p className="fs-6">Download</p></div>
                        <div style={{ cursor: 'pointer' }} className={`${shareWith == 2 ? 'active' : ''}`} onClick={() => setShareWith(2)}><span className="shareWith-icon"><FaEnvelopeOpen className="fs-4" /></span><p className="fs-6">Email</p></div>
                        <div style={{ cursor: 'pointer' }} className={`${shareWith == 3 ? 'active' : ''}`} onClick={() => setShareWith(3)}><span className="shareWith-icon"><FaUser className="fs-4" /></span><p className="fs-6">Direct</p></div>
                    </div>
                    {shareWith === 2 || shareWith === 3 ? (<div>
                        <Select
                            name="sub categories"
                            isMulti
                            menuPortalTarget={document ? document.body : ''}
                            menuPosition="absolute"
                            value={email}
                            menuPlacement="bottom"
                            onChange={(e) => setemail(e)}
                            className="categoryName"
                            styles={{ ...customStyle, width: '100%', }}
                            options={Getuser.map((items) => ({ label: items.name, value: items.email }))}
                        />
                    </div>):null}
                    {isLoading && (<div className="d-flex justify-content-center mt-3"><PulseLoader color="#ccc" size={10} /></div>)}
                </Modal.Body>
            </Modal>
        </>

    )

}
export default ShareCoupen
