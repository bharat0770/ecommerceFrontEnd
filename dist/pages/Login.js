import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import { useLoginMutation } from '../redux/api/user';
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
                gender: gender || "unspecified", // You can set this appropriately
                dob: birthDate, // Set a default or appropriate value
                _id: user.uid,
            };
            const res = await login(userData);
            if ('data' in res) {
                toast.success(res.data ? res.data.message : "Login successful, but no message received");
            }
            else {
                const err = res.error;
                console.error(err);
                // Uncomment and adjust the following line if you need to access a specific error message
                // const message = (err.data as MessageResponse).message;
                // toast.error(message);
            }
        }
        catch (error) {
            toast.error("Sign in failed");
        }
    };
    return (_jsx("div", { className: "login", children: _jsxs("div", { className: "userLogin", children: [_jsx("h1", { children: "Login" }), _jsxs("div", { className: "userForm", children: [_jsx("p", { children: "Gender" }), _jsxs("select", { name: "gender", value: gender, onChange: (e) => setGender(e.target.value), children: [_jsx("option", { value: "", children: "select" }), _jsx("option", { value: "male", children: "male" }), _jsx("option", { value: "female", children: "female" })] }), _jsx("p", { children: "Date Of Birth" }), _jsx("input", { type: "date", value: birthDate, onChange: (e) => setBirthDate(e.target.value) })] }), _jsxs("div", { children: [_jsx("p", { children: "already signed in?" }), _jsxs("button", { onClick: loginHandler, children: [_jsx(FcGoogle, { className: 'gicon' }), " ", _jsx("span", { children: " sign in with Google " })] })] })] }) }));
};
export default Login;
