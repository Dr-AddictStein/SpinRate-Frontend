import React, { useEffect, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react'
import LoginModal from '../../Components/LoginModal'
import { useTranslation } from '../../hooks/useTranslation'

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t, language } = useTranslation();
    const tr = (key, enFallback, frFallback) => {
        const val = t(key);
        if (!val || val === key) {
            return language === 'fr' ? (frFallback || enFallback) : enFallback;
        }
        return val;
    };
    const [status, setStatus] = useState('loading'); // loading | success | error | expired | invalid
    const [message, setMessage] = useState('');
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');

        if (!token) {
            setStatus('invalid');
            setMessage(tr('verifyInvalid', 'Invalid verification link.', 'Lien de vérification invalide.'));
            return;
        }

        const verify = async () => {
            try {
                const res = await fetch(`https://api.revwheel.fr/api/user/verify-email/${token}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json();

                if (res.ok) {
                    setStatus('success');
                    setMessage(tr('verifySuccess', 'Your email has been verified successfully. You can now sign in.', "Votre e-mail a été vérifié avec succès. Vous pouvez maintenant vous connecter."));
                } else {
                    if (data?.error === 'Verification link has expired') {
                        setStatus('expired');
                        setMessage(tr('verifyExpired', 'This verification link has expired. Please request a new one.', 'Ce lien de vérification a expiré. Veuillez en demander un nouveau.'));
                    } else if (data?.error === 'Invalid verification link') {
                        setStatus('invalid');
                        setMessage(tr('verifyInvalid', 'This verification link is invalid.', 'Ce lien de vérification est invalide.'));
                    } else {
                        setStatus('error');
                        setMessage(data?.error || tr('verifyFailed', 'Failed to verify email. Please try again.', "Échec de la vérification de l'e-mail. Veuillez réessayer."));
                    }
                }
            } catch (err) {
                setStatus('error');
                setMessage(tr('verifyUnexpected', 'Something went wrong while verifying your email.', "Une erreur est survenue lors de la vérification de votre e-mail."));
            }
        };

        verify();
    }, [location.search]);

    const renderIcon = () => {
        if (status === 'loading') return <Loader2 className="animate-spin text-indigo-600" size={28} />
        if (status === 'success') return <CheckCircle className="text-green-600" size={28} />
        return <AlertTriangle className="text-red-600" size={28} />
    };

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div className="flex justify-center mb-4">
                    <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center">
                        {renderIcon()}
                    </div>
                </div>
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    {status === 'loading' ? tr('verifyHeadingLoading', 'Verifying your email...', 'Vérification de votre e-mail...') : status === 'success' ? tr('verifyHeadingSuccess', 'Email verified', 'E-mail vérifié') : tr('verifyHeadingIssue', 'Verification issue', 'Problème de vérification')}
                </h1>
                <p className="text-gray-600 text-sm mb-6">{message}</p>

                {status === 'success' ? (
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => setShowLogin(true)}
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                        >
                            {tr('goToLogin', 'Go to sign in', 'Aller à la connexion')}
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            {tr('goToDashboard', 'Go to dashboard', 'Aller au tableau de bord')}
                        </button>
                    </div>
                ) : status === 'expired' ? (
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        {tr('requestNewLink', 'Request a new link', 'Demander un nouveau lien')}
                    </Link>
                ) : (
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                    >
                        {tr('backToHome', 'Back to home', 'Retour à l\'accueil')}
                    </Link>
                )}
            </div>

            {showLogin && <LoginModal closeModal={() => setShowLogin(false)} />}
        </div>
    )
}

export default VerifyEmail


