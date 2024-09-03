import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../redux/api/user';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { MessageResponse } from '../types/api-types';

const Login = () => {
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [login] = useLoginMutation();
    const loginHandler = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const { user } = await signInWithPopup(auth, provider);
            const userData = {
                name: user.displayName || "Unknown",
                email: user.email || "No email",
                photo: user.photoURL || "No photo",
                role: "user",
                gender: gender || "unspecified",  // You can set this appropriately
                dob: birthDate,  // Set a default or appropriate value
                _id: user.uid,
            };

            const res = await login(userData);
            if ('data' in res) {
                toast.success(res.data ? res.data.message : "Login successful, but no message received");
            } else {
                const err = res.error as FetchBaseQueryError;
                console.error(err);
                // Uncomment and adjust the following line if you need to access a specific error message
                // const message = (err.data as MessageResponse).message;
                // toast.error(message);
            }
        } catch (error) {
            toast.error("Sign in failed");
        }
    };

    return (
        <div className="login">

            <div className="userLogin">
                <h1>Login</h1>
                <div className="userForm">
                    <p>Gender</p>
                    <select
                        name="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="">select</option>
                        <option value="male">male</option>
                        <option value="female">female</option>
                    </select>
                    <p>Date Of Birth</p>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>

                <div>
                    <p>already signed in?</p>
                    <button onClick={loginHandler}>
                        <FcGoogle className='gicon' /> <span> sign in with Google </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;