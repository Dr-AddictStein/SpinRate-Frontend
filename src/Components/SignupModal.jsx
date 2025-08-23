import React, { useEffect, useState } from 'react'
import { useSignup } from "../hooks/useSignup";
import { useLogin } from "../hooks/useLogin";
import { useLogout } from '../hooks/useLogout.js';
import { toast, Toaster } from "react-hot-toast";
import { X, User, Lock, UserPlus, Users, Phone, Mail, CheckCircle, RefreshCw } from 'lucide-react';
import Loader from './Loader.jsx';
import LoginModal from './LoginModal.jsx';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation.jsx';

const SignupModal = ({ closeModal, openToVerificationNotice = false, initialEmail = '', initialFullName = '', closeTo = '/' }) => {
    const { signup } = useSignup();
    const { login } = useLogin();
    const { logout } = useLogout();
    const { t, language } = useTranslation();

    // Translation helper with professional bilingual fallbacks
    const tr = (key, enFallback, frFallback) => {
        const val = t(key);
        if (!val || val === key) {
            return language === 'fr' ? (frFallback || enFallback) : enFallback;
        }
        return val;
    };

    const [userInfo, setUserInfo] = useState(null);
    const [userSubmissions, setUserSubmissions] = useState(null);
    const [userLoader, setUserLoader] = useState(false);
    const [authLoader, setAuthLoader] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    const [signUpData, setSignUpData] = useState({ fullName: '', email: '', phoneNumber: '', password: '' });
    const [showVerificationNotice, setShowVerificationNotice] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    // Initialize modal to open directly on verification notice with pre-filled user info when requested
    useEffect(() => {
        if (openToVerificationNotice) {
            setSignUpData((prev) => ({
                ...prev,
                fullName: initialFullName || prev.fullName,
                email: initialEmail || prev.email,
            }));
            setShowVerificationNotice(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openToVerificationNotice, initialEmail, initialFullName]);

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
                // On successful signup: send verification email and show notice
                try {
                    await fetch(`https://api.revwheel.fr/api/user/send-verification-email`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ fullName: signUpData.fullName, email: signUpData.email })
                    });
                    toast.success(tr('verificationEmailSent', 'Verification email sent.', "E-mail de vérification envoyé."));
                } catch (err) {
                    toast.error(tr('failedToSendVerification', 'Failed to send verification email.', "Échec de l\'envoi de l\'e-mail de vérification."));
                }
                setShowVerificationNotice(true);
                setAuthLoader(false);
            }
        } catch (error) {
            toast.error(error.message);
            setAuthLoader(false);
        }
    };

    const handleResendVerification = async () => {
        if (resendLoading) return;
        setResendLoading(true);
        try {
            await fetch(`https://api.revwheel.fr/api/user/send-verification-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullName: signUpData.fullName, email: signUpData.email })
            });
            toast.success(tr('verificationEmailResent', 'Verification email resent.', "E-mail de vérification renvoyé."));
        } catch (err) {
            toast.error(tr('failedToResendVerification', 'Failed to resend verification email.', "Échec du renvoi de l\'e-mail de vérification."));
        } finally {
            setResendLoading(false);
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
                                    <h2 className="text-2xl font-bold">{showVerificationNotice ? tr('verifyYourEmail', 'Verify your email', 'Vérifiez votre e-mail') : t('createAccount')}</h2>
                                    <Link 
                                        to={closeTo}
                                        onClick={closeModal}
                                        className="p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
                                    >
                                        <X size={20} />
                                    </Link>
                                </div>
                                <p className="mt-1 text-indigo-100 text-sm">{showVerificationNotice ? tr('weSentYouALink', 'We\'ve sent you a link to confirm your email address.', 'Nous vous avons envoyé un lien pour confirmer votre adresse e-mail.') : t('joinCommunity')}</p>
                            </div>
                            
                            {/* Body */}
                            <div className="p-6">
                                {showVerificationNotice ? (
                                    <div className="space-y-4 text-center">
                                        <div className="flex justify-center">
                                            <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
                                                <CheckCircle className="text-green-600" size={28} />
                                            </div>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800">{tr('checkYourInbox', 'Please check your inbox', 'Veuillez vérifier votre boîte de réception')}</h3>
                                        <p className="text-sm text-gray-600">
                                            {tr('activateAccountEmailCopy', 'We\'ve emailed a verification link to activate your account. Click the link to complete your setup.', 'Nous avons envoyé un lien de vérification pour activer votre compte. Cliquez sur le lien pour terminer la configuration.')}
                                        </p>
                                        <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-center text-gray-700">
                                            <Mail size={16} className="mr-2 text-indigo-600" />
                                            <span className="text-sm font-medium">{signUpData.email}</span>
                                        </div>
                                        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                                            <button
                                                onClick={handleResendVerification}
                                                disabled={resendLoading}
                                                className={`inline-flex items-center justify-center px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${resendLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-100'} border-gray-300 text-gray-700`}
                                            >
                                                <RefreshCw size={16} className="mr-2" />
                                                {resendLoading ? tr('resending', 'Resending...', 'Renvoi en cours...') : tr('resendEmail', 'Resend email', 'Renvoyer l\'e-mail')}
                                            </button>
                                            <button
                                                onClick={switchToLogin}
                                                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                                            >
                                                {tr('goToLogin', 'Go to sign in', 'Aller à la connexion')}
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            {tr('verificationEmailTips', "Didn\'t receive the email? Check your spam folder or try resending.", "Vous n\'avez pas reçu l\'e-mail ? Vérifiez vos spams ou renvoyez-le.")}
                                        </p>
                                    </div>
                                ) : (
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
                                )}
                                
                                {!showVerificationNotice && (
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
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SignupModal
