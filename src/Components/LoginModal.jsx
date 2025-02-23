import React, { useState } from 'react'
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from '../hooks/useLogout.js';
import { toast, Toaster } from "react-hot-toast";
import { X } from 'lucide-react';
import SignupModal from './SignupModal.jsx';
import AuthLoader from './Loader.jsx';
import Loader from './Loader.jsx';

const LoginModal = ({ closeModal }) => {


    const { signup } = useSignup();
    const { login } = useLogin();
    const { logout } = useLogout();

    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

    const [userInfo, setUserInfo] = useState(null);
    const [userSubmissions, setUserSubmissions] = useState(null);
    const [userLoader, setUserLoader] = useState(false);
    const [authLoader, setAuthLoader] = useState(false);

    const [loginData, setLoginData] = useState({ userName: '', password: '' });
    const [signUpData, setSignUpData] = useState({ userName: '', email: '', password: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoader(true);
        try {
            // console.log("Logging in with:", loginData);
            // Simulate API call
            const response = await login(loginData.userName, loginData.password);
            // console.log("PO", response)
            if (response === "Incorrect userName.!.") {
                toast.error("Incorrect userName.!.");
                setTimeout(() => {
                    setAuthLoader(false);
                }, [1000])
            }
            else if (response === "Incorrect password.!.") {
                toast.error("Incorrect password.!.");
                setTimeout(() => {
                    setAuthLoader(false);
                }, [1000])
            }
            else if (response === "All fields must be filled...") {
                toast.error("All fields must be filled...");
                setTimeout(() => {
                    setAuthLoader(false);
                }, [1000])
            }
            else {
                toast.success("Successfully Logged in.!.");
                setAuthLoader(false);
                setUserLoader(true);
                setUserLoader(false);
                setIsSignupModalOpen(false);
            }
        } catch (error) {
            alert(error.message);
        }
    };



    return (
        <div className="">
            <Toaster />
            <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-70 backdrop-blur-md">
                {
                    authLoader ? <Loader text={"Authenticating..."} /> :
                        <div className="bg-slate-800 text-white p-8 rounded-lg shadow-2xl w-96 relative">
                            <h2 className="text-3xl font-bold mb-4 text-center tracking-wide">
                                Log In
                            </h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Username</label>
                                    <input
                                        type="text"
                                        value={loginData.userName}
                                        onChange={(e) => setLoginData({ ...loginData, userName: e.target.value })}
                                        className="w-full mt-1 px-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Password</label>
                                    <input
                                        type="password"
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        className="w-full mt-1 px-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
                                        >
                                            Login
                                        </button>
                                        <button
                                            type="button"
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
                                            onClick={() => {
                                                setIsSignupModalOpen(true);
                                            }}
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </form>
                        </div>
                }
            </div>
            {isSignupModalOpen && (
                <SignupModal closeModal={() => setIsSignupModalOpen(false)} />
            )}
        </div>
    )
}

export default LoginModal
