import style from "./Navbar.module.css"

// ICONS
import logo from "../../assets/logo.png";
import chat from "../../assets/svg/chat.svg";
import connect from "../../assets/svg/connect.svg";
import crown from "../../assets/svg/crown.svg";
import logOut from "../../assets/svg/logout.svg";
import group from "../../assets/svg/group.svg";
import report from "../../assets/svg/report.svg";
import star from "../../assets/svg/star.svg"

// TOOLS
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../../firebase-config";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyUser, clearUserDataInLogout } from '../../redux/actions/actions';
import axios from 'axios';
import { API_URL } from "../../firebase-config";
import RateCard from "../RateCard/RateCard";


import React from 'react'

const Navbar = ({ setIsAuth, setRating, rating }) => {
    const [showRate, setShowRate] = useState(false)
    const didRate = useSelector(state => state.users.didRate)
    const vip = useSelector(state => state.users.isVip)
    const admin = useSelector((state) => state.users.isAdmin)
    const [colum, setColumn] = useState(false)
    const userPhoto = useSelector((state) => state.users.photo);
    const dispatch = useDispatch();
    const uid = localStorage.getItem("uid");
    const localStorageUID = localStorage.getItem('uid');
    const cookies = new Cookies();

    const handleLogOut = async () => {
        axios.put(`${API_URL}/geton`, { uid, is: "off" })
        cookies.remove("auth-token");
        localStorage.removeItem("uid");
        localStorage.removeItem("language");
        localStorage.removeItem("languageRead");
        localStorage.removeItem('languageChecked');
        await signOut(auth);
        setIsAuth(false);
        dispatch(clearUserDataInLogout());
    };

    useEffect(() => {
        console.log(uid)
        console.log("is admin" + " " + admin)
        if (!localStorageUID) {
            signOut(auth);
            setIsAuth(false);
        }
        dispatch(getMyUser(localStorageUID));
        console.log('holas')
    }, [uid, didRate]);



    if (admin) {
        return (<>
            {localStorageUID ? (
                <nav className={style.nav}>
                    <Link to="/home">
                        <img src={logo} alt="Home" className={style.logo} />
                    </Link>
                    <div className={style.navBtns}>
                        <Link to='/messages'>
                            <button className={style.chatBtn}><img src={chat} alt="chat" className={style.icon} /></button>
                        </Link>
                        <Link to='/connect'>
                            <button className={style.connectBtn}>
                                <img src={connect} alt="connect" className={style.icon} />
                            </button>
                        </Link>
                        <Link to='/premium'>
                            <button className={style.premium}>
                                <img src={crown} alt="" className={style.icon} />
                            </button>
                        </Link>
                        <img src={userPhoto} alt="" className={style.userPhoto} onClick={() => setColumn(!colum)} />
                        {colum ?
                            <ul className={style.column}>
                                <li className={style.li}>
                                    <Link to={`/profile/${uid}`}>
                                        <div className={style.dropDownDiv}>
                                            <img src={userPhoto} className={style.userPhoto2} />
                                            <span className={style.dropDownSpan}><b>Profile</b></span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={style.li}>
                                    <Link to="/admin">
                                        <div className={style.dropDownDiv}>
                                            <img src={report} className={style.icon} />
                                            <span className={style.dropDownSpan}><b>Admin Panel</b></span>
                                        </div>
                                    </Link>
                                </li>
                                <li className={style.li}>
                                    <Link to='/CreateRoom'>
                                        <div className={style.dropDownDiv}>
                                            <img src={group} className={style.icon} />
                                            <span className={style.dropDownSpan}><b>Create Room</b></span>
                                        </div>
                                    </Link>
                                </li>
                                {!didRate ? <li className={style.li}>
                                    <div className={style.dropDownDiv} onClick={() => setRating(!rating)}>
                                        <img src={star} className={style.icon} />
                                        <span className={style.dropDownSpan}><b>Rate Us</b></span>
                                    </div>
                                </li> : ''}
                                <li className={style.li}>
                                    <div className={style.dropDownDiv} onClick={handleLogOut}>
                                        <img src={logOut} className={style.icon} />
                                        <span className={style.dropDownSpan}><b>Logout</b></span>
                                    </div>
                                </li>
                            </ul> : ''}

                    </div>
                </nav>
            ) : (
                <Navigate to="/" replace={true} />
            )}

        </>
        )
    } else return (
        <>
            {localStorageUID ? (
                <nav className={style.nav}>
                    <Link to="/home">
                        <img src={logo} alt="Home" className={style.logo} />
                    </Link>
                    <div className={style.navBtns}>
                        <Link to='/messages'>
                            <button className={style.chatBtn}><img src={chat} alt="chat" className={style.icon} /></button>
                        </Link>
                        <Link to='/connect'>
                            <button className={style.connectBtn}>
                                <img src={connect} alt="connect" className={style.icon} />
                            </button>
                        </Link>
                        <Link to='/premium'>
                            <button className={style.premium}>
                                <img src={crown} alt="" className={style.icon} />
                            </button>
                        </Link>
                        <img src={userPhoto} alt="" className={style.userPhoto} onClick={() => setColumn(!colum)} />
                        {colum ?
                            <ul className={style.column}>
                                <li className={style.li}>
                                    <Link to={`/profile/${uid}`}>
                                        <div className={style.dropDownDiv}>
                                            <img src={userPhoto} className={style.userPhoto2} />
                                            <span className={style.dropDownSpan}>Profile</span>
                                        </div>
                                    </Link>
                                </li>
                                {vip ?
                                    <li className={style.li}>
                                        <Link to='/CreateRoom'>
                                            <div className={style.dropDownDiv}>
                                                <img src={group} className={style.icon} />
                                                <span className={style.dropDownSpan}>Create Room</span>
                                            </div>
                                        </Link>
                                    </li> : ""}
                                {vip && !didRate ? <li className={style.li}>
                                    <div className={style.dropDownDiv} onClick={() => setRating(!rating)}>
                                        <img src={star} className={style.icon} />
                                        <span className={style.dropDownSpan}><b>Rate Us</b></span>
                                    </div>
                                </li> : ''}
                                <li className={style.li}>
                                    <div className={style.dropDownDiv} onClick={handleLogOut}>
                                        <img src={logOut} className={style.icon} />
                                        <span className={style.dropDownSpan}><b>Logout</b></span>
                                    </div>
                                </li>
                            </ul> : ''}
                    </div>
                </nav>
            ) : (
                <Navigate to="/" replace={true} />
            )}
            {rating ? <RateCard /> : ''}
        </>
    );
}

export default Navbar