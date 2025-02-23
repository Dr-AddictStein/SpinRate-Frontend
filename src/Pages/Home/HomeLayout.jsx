import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LoginModal from '../../Components/LoginModal';
import Loader from '../../Components/Loader';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';

const HomeLayout = () => {

  const { user } = useAuthContext();

  const { logout } = useLogout();

  const navigate = useNavigate();


  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="">
      <Outlet />
      {isLoginModalOpen && (
        <LoginModal closeModal={() => setIsLoginModalOpen(false)} />
      )}
    </div>
  )
}

export default HomeLayout;
