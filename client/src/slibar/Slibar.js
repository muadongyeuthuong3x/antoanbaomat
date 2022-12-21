import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import './slibar.css'
function Slibar() {


    const logout = () => {
        Cookies.remove("cookielogin")
    }

    // useEffect(()=>{

    // },[role])

    return (
        <div className="dasboard">

            <input type="checkbox" id="sidebar-toggle" />
            <div className="sidebar">
                <div className="sidebar-header">
                    <h3 className="brand">
                        <span className="ti-unlink"></span>
                        <span> KMA</span>
                    </h3>
                    {/* <label for="sidebar-toggle" className="ti-menu-alt"></label> */}
                </div>

                <div className="sidebar-menu">
                    <ul>
                        <li  >
                            <Link to="/list-user">
                                <span className="ti-home"></span>
                                <span>Danh sách user</span>
                            </Link>
                        </li>

                        <li >
                            <Link to="/category">
                                <span className="ti-face-smile"></span>
                                <span>Nhóm bài hát</span>
                            </Link>
                        </li>

                        <li >
                            <Link to="/casi">
                                <span className="ti-face-smile"></span>
                                <span>Ca sĩ</span>
                            </Link>
                        </li>

                        <li onClick={logout}>
                            <Link to="/login">
                                <span className="ti-folder"></span>
                                <span>LogOut</span>

                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Slibar