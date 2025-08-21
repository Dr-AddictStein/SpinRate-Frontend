import React, { useState } from 'react'
import { useLogin } from "../hooks/useLogin";
import { toast, Toaster } from "react-hot-toast";
import { X, LogIn, User, Lock, ArrowRight } from 'lucide-react';
import SignupModal from './SignupModal.jsx';
import Loader from './Loader.jsx';
import { useTranslation } from '../hooks/useTranslation.jsx';

const LoginModal = ({ closeModal }) => {
    const { login } = useLogin();
    const { t } = useTranslation();

    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [authLoader, setAuthLoader] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthLoader(true);
        try {
            const response = await login(loginData.email, loginData.password);
            if (response === "Incorrect email.!.") {
                toast.error(t('incorrectEmail'));
                setTimeout(() => {
                    setAuthLoader(false);
                }, [1000])
            }
            else if (response === "Incorrect password.!.") {
                toast.error(t('incorrectPassword'));
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
                toast.success(t('successfullyLoggedIn'));
                setAuthLoader(false);
                setIsSignupModalOpen(false);
                if (closeModal) closeModal();
            }
        } catch (error) {
            toast.error(error.message);
            setAuthLoader(false);
        }
    };

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
                            <Loader text={t('authenticating')} />
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                            {/* Header with gradient */}
                            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-2xl font-bold">{t('welcomeBack')}</h2>
                                    <button 
                                        onClick={closeModal}
                                        className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <p className="mt-1 text-blue-100 text-sm">{t('signInToAccount')}</p>
                            </div>
                            
                            {/* Form */}
                            <div className="p-6">
                                <form onSubmit={handleLogin} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            <User size={16} className="mr-2 text-blue-500" />
                                            {t('email')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={loginData.email}
                                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder={t('enterEmail')}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            <Lock size={16} className="mr-2 text-blue-500" />
                                            {t('password')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="password"
                                                value={loginData.password}
                                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder={t('enterPassword')}
                                                required
                                            />
                                        </div>
                                    </div>
                                    
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                id="remember" 
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="remember" className="ml-2 text-gray-600">
                                                {t('rememberMe')}
                                            </label>
                                        </div>
                                        <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                                            {t('forgotPassword')}
                                        </a>
                                    </div>
                                    
                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all"
                                    >
                                        <LogIn size={18} className="mr-2" />
                                        {t('signIn')}
                                    </button>
                                </form>
                                
                                <div className="mt-6 text-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-300"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-white text-gray-500">
                                                {t('orContinueWith')}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-6">
                                        <p className="text-sm text-gray-600">
                                            {t('dontHaveAccount')}{' '}
                                            <button
                                                type="button"
                                                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                                                onClick={() => setIsSignupModalOpen(true)}
                                            >
                                                {t('signUpNow')}
                                                <ArrowRight size={16} className="ml-1" />
                                            </button>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            
            {isSignupModalOpen && (
                <SignupModal 
                    closeModal={() => setIsSignupModalOpen(false)} 
                    switchToLogin={() => setIsSignupModalOpen(false)}
                />
            )}
        </div>
    )
}

export default LoginModal
