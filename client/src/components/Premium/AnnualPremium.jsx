import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import style from "./premium.module.css";

const AnnualPremium=({isVip,uid})=>{


const stripe  = useStripe()
const elements = useElements()

const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
    });
    if(!error){
        console.log(paymentMethod)
        const {id}= paymentMethod  
        try {
            const {data}=await axios.post('http://localhost:3001/newPremium',{
                id,
                amount:6699,
                description: 'pay for month',
                uid
                
            })
            console.log(data);
        } catch (error) {
            console.log(error);
        }      
    }

}
 return( 
    <div className={style.conainer_form}>
    <form onSubmit={handleSubmit} >
        <h3>PAY FOR UNE YEAR</h3>
        <img src="https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2015/05/ShutUpAndTakeMyMoney.jpg" alt="" width="300px" />
        <p>$66,99</p>
         <CardElement/>
        <button 
        disabled={isVip}
        >
            BUY
        </button>
    </form>

    </div>
 )
}

export default AnnualPremium;