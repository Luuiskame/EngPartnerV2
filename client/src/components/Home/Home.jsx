import style from "./Home.module.css";

//Tools
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";
import { auth } from "../../firebase-config";
import { Link } from "react-router-dom";
import { useState } from "react";

//Renders
import logo from "../../assets/logo-EngPartner.png";
import crown from "../../assets/crown.svg";

import TopicsChat from "../Chats/TopicsChat/TopicsChat";
import TopicChat from '../Chats/TopicChat/TopicChat'

const Home = ({ setIsAuth }) => {
  const uid = auth.currentUser?.uid;
  const [room, setRoom] = useState("global")
  const cookies = new Cookies();
  const handleLogOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
  };
  const setingValueRoom =(value)=>{
    if (value == 'null') {
      setRoom("global") 
    }else{
      setRoom(value)     
    } 
  }

  const user = auth.currentUser?.displayName;

  return (
    <>
      <nav className={style.nav}>
      <img src={logo} className={style.logo}/>
        <div>
          <Link to={`/profile/${uid}`}>
            <button className={style.profileBtn}>Profile</button>
          </Link>
          <Link to='/premium'>
            <button className={style.premium}>
            <img src={crown} alt="" className={style.crown}/>Get VIP
            </button>
          </Link>
          <button onClick={handleLogOut} className={style.signOut}>Log out</button>
          <Link to='/connect'>
            <button className={style.connectBtn}>Connect</button>
          </Link>
        </div>
        <TopicsChat setingValueRoom={setingValueRoom}/>
      </nav>
      <h2 className="">Welcome, {user} !</h2>
      <div className={style.globalChat}>
       
        <TopicChat room={room} setRoom={setRoom}/>
       
      </div>
    </>
  );
};

export default Home;
