import React, { useState } from 'react'
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from '../hooks/useLogout.js';
import { toast, Toaster } from "react-hot-toast";
import { X } from 'lucide-react';
import Loader from './Loader.jsx';

const SignupModal = ({ closeModal }) => {


    const { signup } = useSignup();
    const { login } = useLogin();
    const { logout } = useLogout();

    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

    const [userInfo, setUserInfo] = useState(null);
    const [userSubmissions, setUserSubmissions] = useState(null);
    const [userLoader, setUserLoader] = useState(false);
    const [authLoader, setAuthLoader] = useState(false);

    const [signUpData, setSignUpData] = useState({ fullName: '', userName: '', teamName: "", email: '', password: '' });

    const handleSignup = async (e) => {
        e.preventDefault();
        setAuthLoader(true);
        try {
            // console.log("Logging in with:", signUpData);
            // Simulate API call
            const response = await signup(signUpData.fullName, signUpData.userName, signUpData.teamName, signUpData.email, signUpData.password);
            // console.log("PO", response)
            if (response === "Email already exists.!.") {
                toast.error("Email already exists.!.");
                setTimeout(() => {
                    setAuthLoader(false);
                }, [1000])
            }
            else if (response === "Username already taken.!.") {
                toast.error("Username already taken.!.");
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
                toast.success("Registered.!.");
                setAuthLoader(false);
                setIsSignupModalOpen(false);
            }
        } catch (error) {
            alert(error.message);
        }
    };


    if (authLoader) {
        return (<>
            Loading...
        </>)
    }
    return (
        <div className="">
            <Toaster />
            <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-70 backdrop-blur-md">
                {
                    authLoader ? <Loader text={"Authenticating..."} /> :
                        <div className="bg-slate-800 text-white p-8 rounded-lg shadow-2xl w-96 relative">
                            <h2 className="text-3xl font-bold mb-4 text-center tracking-wide">
                                Sign Up
                            </h2>
                            <form onSubmit={handleSignup}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Full Name</label>
                                    <input
                                        type="text"
                                        value={signUpData.fullName}
                                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                                        className="w-full mt-1 px-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Username</label>
                                    <input
                                        type="text"
                                        value={signUpData.userName}
                                        onChange={(e) => setSignUpData({ ...signUpData, userName: e.target.value })}
                                        className="w-full mt-1 px-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Team name</label>
                                    <input
                                        type="text"
                                        value={signUpData.teamName}
                                        onChange={(e) => setSignUpData({ ...signUpData, teamName: e.target.value })}
                                        className="w-full mt-1 px-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Email</label>
                                    <input
                                        type="text"
                                        value={signUpData.email}
                                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                                        className="w-full mt-1 px-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium">Password</label>
                                    <input
                                        type="password"
                                        value={signUpData.password}
                                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                                        className="w-full mt-1 px-3 py-2 border border-slate-600 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring focus:ring-blue-500"
                                        required
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <button
                                            type="submit"
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
        </div>
    )
}

export default SignupModal
