import React, { useState } from 'react'
import { useLogin } from "../hooks/useLogin";
import { toast, Toaster } from "react-hot-toast";
import { X, LogIn, User, Lock, ArrowRight, Mail, KeyRound, ArrowLeft, CheckCircle } from 'lucide-react';
import SignupModal from './SignupModal.jsx';
import Loader from './Loader.jsx';
import { useTranslation } from '../hooks/useTranslation.jsx';

const LoginModal = ({ closeModal }) => {
    const { login } = useLogin();
    const { t } = useTranslation();

    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [authLoader, setAuthLoader] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    // Forgot password multi-step state
    const [isForgotFlow, setIsForgotFlow] = useState(false);
    const [forgotStep, setForgotStep] = useState(0); // 0=email, 1=otp, 2=reset
    const [forgotEmail, setForgotEmail] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [sending, setSending] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [resetting, setResetting] = useState(false);

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

    const resetForgotState = () => {
        setIsForgotFlow(false);
        setForgotStep(0);
        setForgotEmail('');
        setOtpCode('');
        setNewPassword('');
        setConfirmNewPassword('');
        setSending(false);
        setVerifying(false);
        setResetting(false);
    };

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!forgotEmail) return;
        setSending(true);
        try {
            const res = await fetch('https://api.revwheel.fr/api/user/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
            toast.success(t('otpResent'));
            setForgotStep(1);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSending(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        if (!/^\d{6}$/.test(otpCode)) {
            toast.error(t('invalidOtpFormat'));
            return;
        }
        setVerifying(true);
        try {
            const res = await fetch('https://api.revwheel.fr/api/user/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail, otp: otpCode })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.message || 'OTP verification failed');
            toast.success(t('otpVerified'));
            setForgotStep(2);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setVerifying(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            toast.error(t('passwordsDoNotMatch'));
            return;
        }
        setResetting(true);
        try {
            const res = await fetch('https://api.revwheel.fr/api/user/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail, otp: otpCode, newPassword })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.message || 'Password reset failed');
            toast.success(t('passwordResetSuccess'));
            resetForgotState();
        } catch (err) {
            toast.error(err.message);
        } finally {
            setResetting(false);
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
                                    <h2 className="text-2xl font-bold">{isForgotFlow ? t('forgotTitle') : t('welcomeBack')}</h2>
                                    <button 
                                        onClick={() => {
                                            if (isForgotFlow) {
                                                resetForgotState();
                                            } else if (closeModal) {
                                                closeModal();
                                            }
                                        }}
                                        className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <p className="mt-1 text-blue-100 text-sm">{isForgotFlow ? (
                                    forgotStep === 0 ? t('forgotInstruction') : (forgotStep === 1 ? t('otpInstruction') : t('resetInstruction'))
                                ) : t('signInToAccount')}</p>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {!isForgotFlow ? (
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
                                            <button type="button" onClick={() => {
                                                setIsForgotFlow(true);
                                                setForgotEmail(loginData.email || '');
                                            }} className="text-blue-600 hover:text-blue-800 font-medium">
                                                {t('forgotPassword')}
                                            </button>
                                        </div>
                                        
                                        <button
                                            type="submit"
                                            className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all"
                                        >
                                            <LogIn size={18} className="mr-2" />
                                            {t('signIn')}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="space-y-6">
                                        {/* Stepper */}
                                        <div className="flex items-center justify-between text-xs text-gray-600">
                                            <div className={`flex-1 flex items-center ${forgotStep >= 0 ? 'text-blue-600' : ''}`}>
                                                <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${forgotStep >= 0 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                                    <Mail size={14} />
                                                </div>
                                                <span>{t('email')}</span>
                                            </div>
                                            <div className={`flex-1 flex items-center justify-center ${forgotStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                                                <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${forgotStep >= 1 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                                    <KeyRound size={14} />
                                                </div>
                                                <span>OTP</span>
                                            </div>
                                            <div className={`flex-1 flex items-center justify-end ${forgotStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                                                <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${forgotStep >= 2 ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                                    <CheckCircle size={14} />
                                                </div>
                                                <span>{t('resetPassword')}</span>
                                            </div>
                                        </div>

                                        {forgotStep === 0 && (
                                            <form onSubmit={handleSendOTP} className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                                        <User size={16} className="mr-2 text-blue-500" />
                                                        {t('email')}
                                                    </label>
                                                    <input
                                                        type="email"
                                                        value={forgotEmail}
                                                        onChange={(e) => setForgotEmail(e.target.value)}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        placeholder={t('enterEmail')}
                                                        required
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <button type="button" onClick={resetForgotState} className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm">
                                                        <ArrowLeft size={16} className="mr-1" /> {t('backToLogin')}
                                                    </button>
                                                    <button type="submit" disabled={sending} className="py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all">
                                                        {sending ? t('sending') : t('sendOTP')}
                                                    </button>
                                                </div>
                                            </form>
                                        )}

                                        {forgotStep === 1 && (
                                            <form onSubmit={handleVerifyOTP} className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                                        <KeyRound size={16} className="mr-2 text-blue-500" />
                                                        OTP
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={otpCode}
                                                        inputMode="numeric"
                                                        pattern="[0-9]{6}"
                                                        title={t('invalidOtpFormat')}
                                                        maxLength={6}
                                                        onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ''))}
                                                        className="tracking-widest text-center w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        placeholder={t('otpPlaceholder')}
                                                        required
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <button type="button" onClick={() => setForgotStep(0)} className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm">
                                                        <ArrowLeft size={16} className="mr-1" /> {t('email')}
                                                    </button>
                                                    <button type="submit" disabled={verifying} className="py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all">
                                                        {verifying ? t('verifying') : t('verify')}
                                                    </button>
                                                </div>
                                            </form>
                                        )}

                                        {forgotStep === 2 && (
                                            <form onSubmit={handleResetPassword} className="space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                                        <Lock size={16} className="mr-2 text-blue-500" />
                                                        {t('newPassword')}
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        placeholder={t('newPassword')}
                                                        required
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium text-gray-700 flex items-center">
                                                        <Lock size={16} className="mr-2 text-blue-500" />
                                                        {t('confirmNewPassword')}
                                                    </label>
                                                    <input
                                                        type="password"
                                                        value={confirmNewPassword}
                                                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        placeholder={t('confirmNewPassword')}
                                                        required
                                                    />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <button type="button" onClick={() => setForgotStep(1)} className="inline-flex items-center text-gray-600 hover:text-gray-800 text-sm">
                                                        <ArrowLeft size={16} className="mr-1" /> OTP
                                                    </button>
                                                    <button type="submit" disabled={resetting} className="py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md transition-all">
                                                        {resetting ? t('resetting') : t('resetPassword')}
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </div>
                                )}
                                
                                {!isForgotFlow && (
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
                                )}
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
