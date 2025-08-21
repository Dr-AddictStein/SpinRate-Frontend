import React, { useState } from 'react'
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from '../hooks/useLogout.js';
import { toast, Toaster } from "react-hot-toast";
import { X, User, Lock, UserPlus, Users, Phone } from 'lucide-react';
import Loader from './Loader.jsx';
import LoginModal from './LoginModal.jsx';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation.jsx';

const SignupModal = ({ closeModal }) => {
    const { signup } = useSignup();
    const { login } = useLogin();
    const { logout } = useLogout();
    const { t } = useTranslation();

    const [userInfo, setUserInfo] = useState(null);
    const [userSubmissions, setUserSubmissions] = useState(null);
    const [userLoader, setUserLoader] = useState(false);
    const [authLoader, setAuthLoader] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const [signUpData, setSignUpData] = useState({ fullName: '', email: '', phoneNumber: '', password: '' });

    const handleSignup = async (e) => {
        e.preventDefault();
        setAuthLoader(true);
        try {
            const response = await signup(signUpData.fullName, signUpData.email, signUpData.phoneNumber, signUpData.password);
            if (response === "Email already exists.!.") {
                toast.error(t('emailAlreadyExists'));
                setTimeout(() => {
                    setAuthLoader(false);
                }, [1000])
            }
            else if (response === "All fields must be filled...") {
                toast.error(t('allFieldsMustBeFilled'));
                setTimeout(() => {
                    setAuthLoader(false);
                }, [1000])
            }
            else {
                toast.success(t('registrationSuccessful'));
                setAuthLoader(false);
                if (closeModal) closeModal();
            }
        } catch (error) {
            toast.error(error.message);
            setAuthLoader(false);
        }
    };

    const switchToLogin = () => {
        setShowLoginModal(true);
    };

    if (showLoginModal) {
        return <LoginModal closeModal={closeModal} />;
    }

    return (
        <div className="">
            <Toaster 
                position="top-center"
                toastOptions={{
                    style: {
                        background: '#363636',
                        color: '#fff',
                        borderRadius: '8px',
                        fontSize: '14px',
                    },
                }}
            />
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/10 backdrop-blur-md">
                <div className="relative w-full max-w-md mx-4">
                    {authLoader ? (
                        <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center">
                            <Loader text={t('creatingAccount')} />
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header with gradient */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold">{t('createAccount')}</h2>
                                    <Link 
                                        to="/"
                                        onClick={closeModal}
                                        className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                                    >
                                        <X size={20} />
                                    </Link>
                                </div>
                                <p className="mt-1 text-indigo-100 text-sm">{t('joinCommunity')}</p>
                            </div>
                            
                            {/* Form */}
                            <div className="p-6">
                                <form onSubmit={handleSignup} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            <User size={16} className="mr-2 text-indigo-500" />
                                            {t('fullName')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={signUpData.fullName}
                                                onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                placeholder={t('enterFullName')}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            <Users size={16} className="mr-2 text-indigo-500" />
                                            {t('email')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={signUpData.email}
                                                onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                placeholder={t('enterEmail')}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            <Phone size={16} className="mr-2 text-indigo-500" />
                                            {t('phoneNumber')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={signUpData.phoneNumber}
                                                onChange={(e) => setSignUpData({ ...signUpData, phoneNumber: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                placeholder={t('enterPhoneNumber')}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            <Lock size={16} className="mr-2 text-indigo-500" />
                                            {t('password')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={signUpData.password}
                                                onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                placeholder={t('createPassword')}
                                                required
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {t('passwordRequirement')}
                                        </p>
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all mt-6"
                                    >
                                        <UserPlus size={18} className="mr-2" />
                                        {t('createAccount')}
                                    </button>
                                </form>
                                
                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">
                                        {t('alreadyHaveAccount')}{' '}
                                        <button
                                            type="button"
                                            className="text-indigo-600 hover:text-indigo-800 font-medium"
                                            onClick={switchToLogin}
                                        >
                                            {t('signIn')}
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SignupModal
