// eslint-disable-next-line no-unused-vars
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnline, getMyUser } from "../../../redux/actions/actions";

import defaultImg from "../../../assets/user-default-pfp.png";

import Searchbar from "../Searchbar/Searchbar";

import styles from "./Users.module.css";

const Users = () => {
  const users = useSelector((state) => state.users.users);
  const uid = localStorage.getItem("uid");
  const dispatch = useDispatch();
  console.log(users);

  useEffect(() => {
    dispatch(getOnline());
    dispatch(getMyUser(uid));
  }, []);

  return (
    <div className={styles.connectContainer}>
      <Searchbar />
      <div className={styles.usersContainer}>
        <h3>Find new friends</h3>
        {users.length === 0 ? (
          <p>Users not found</p>
        ) : (
          users.map((user) => (
            <div className={styles.userContainer} key={user.id}>
              <div className={styles.userImgContainer}>
                <img
                  src={typeof user.photo === "string" ? user.photo : defaultImg}
                  alt="default image"
                />
              </div>
              <div className={styles.textContainer}>
                <div className={styles.nameAndVipContainer}>
                  <p>{user.name}</p>
                  <p className={styles.age}>{user.age}</p>
                </div>
                <div className={styles.restPropsContainer}>
                  <p>{user.country}</p>
                  <p>{user.sex}</p>
                  <div className={styles.isOnContainerrr}>
                    {user.isOn ? (
                      < span className={styles.spannn}>
                        🟢
                      </span>
                    ) : (
                      <span className={styles.spannn}>
                        🔴
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Users;
