import { useState } from "react";
import styles from './RateCard.module.css'
import { useDispatch, useSelector } from "react-redux";


import { rated } from "../../redux/actions/actions";

const RateCard = ()=>{
    const dispatch = useDispatch()
    const uid = useSelector(state=> state.users.uid)
    const [currentRating, setCurrentRating] = useState(0)
    const stars = [1,2,3,4,5]

    const handleRating = (value)=>{
        setCurrentRating(value)
      
    }

    const onSubmitRate = (event) => {
        event.preventDefault()
        const userRated = {
            rating: currentRating,
            uid: uid
        }
        
        dispatch(rated(userRated))
    }
    return (
        <form onSubmit={onSubmitRate} className={styles.mainCard}>
          <p>Your rate: {currentRating}</p>
          <div className={styles.starsContainer}>
            {stars.map((value) => (
              <span value={value} className={styles.numberValues} key={value} onClick={() => handleRating(value)}>
                 ⭐️
              </span>
            ))}
          </div>
          <button className={styles.submitRate} type="submit">send</button>
        </form>
      );
}

export default RateCard