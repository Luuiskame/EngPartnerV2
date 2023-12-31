// STYLES
import styles from "./Users.module.css";
import offline from '../../../assets/svg/offline.svg'
import online from '../../../assets/svg/online.svg'

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnline, getMyUser } from "../../../redux/actions/actions";
// import { filterUsersByCountry } from "../../../redux/actions/countriesActions";
import defaultImg from "../../../assets/user-default-pfp.png";

// RENDERS
import Navbar from "../../Navbar/Navbar";
import Searchbar from "../Searchbar/Searchbar";
import GoogleMapComponent from "../../GoogleMap/GoogleMap";

const Users = ({ setIsAuth }) => {
  const users = useSelector((state) => state.users.users);
  const filteredUsers = useSelector((state) => state.countries.filteredUsers);
  const uid = localStorage.getItem("uid");
  const dispatch = useDispatch();
  console.log(users);
  // const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    dispatch(getOnline());
    dispatch(getMyUser(uid));
  }, []);


  return (
    <div className={styles.connectContainer}>
      <Navbar setIsAuth={setIsAuth} />
      <Searchbar />
        <h3 className={styles.connectH3}>Find new friends</h3>
      <div className={styles.usersContainer}>
        {users.length === 0 ? (
          <p>Users not found</p>
        ) : (
          users.map((user) => (
            <Link
              key={user.id}
              className={styles.linkContainer}
              to={`/profile/${user.uid}`}
            >
              <div className={styles.userContainer} key={user.id}>
                <div className={styles.userImgContainer}>
                  <img
                    src={
                      typeof user.photo === "string" ? user.photo : defaultImg
                    }
                    alt="default image"
                  />
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.nameAndVipContainer}>
                    <p>{user.name}</p>
                    <p>({user.user})</p>
                    <p className={styles.age}>{user.age}</p>
                  </div>
                  <div className={styles.restPropsContainer}>
                    <p>{user.country}</p>
                    <p>{user.sex}</p>
                    <div className={styles.isOnContainerrr}>
                      {user.isOn ? (
                        <span className={styles.spannn}><img src={online} alt='🟢' className={styles.onlineOffline} /></span>
                      ) : (
                        <span className={styles.spannn}><img src={offline} alt='🔴' className={styles.onlineOffline} /></span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Users;
