import { useState } from "react";
import {auth} from '../../firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth";
const Register = ()=>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async(event)=>{
        event.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Usuario registrado:', user);
        } catch (error) {
            throw Error(error)
        }
    }
    return (
        <form onSubmit={handleRegister}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <hr />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <br />
          <button type="submit">Register</button>
        </form>
      );
};

export default Register