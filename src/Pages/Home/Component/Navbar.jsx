import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // Icons for menu toggle
import logo from "../../../assets/logo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#2098F3] fixed top-0 left-0 w-full flex justify-between items-center px-6 lg:px-10 sm:px-10 py-4 shadow-md z-50">
            {/* Logo */}
            <div className="flex items-center">
                <img src={logo} alt="Company Logo" className="h-10 w-14 object-contain" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
                <button className="bg-[#FF8684] cursor-pointer hover:bg-[#ff6b68] transition text-white font-bold px-4 py-2 rounded-md">
                    GET STARTED
                </button>
                <button className="bg-[#FF8684] cursor-pointer hover:bg-[#ff6b68] transition text-white font-bold px-4 py-2 rounded-md">
                    Se connecter
                </button>

                {/* Language Selector */}
                <div className="w-10 h-8 rounded-md overflow-hidden border border-white">
                    <div className="w-full h-full flex">
                        <div className="w-1/3 bg-blue-700"></div>
                        <div className="w-1/3 bg-white"></div>
                        <div className="w-1/3 bg-red-500"></div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-white"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#2098F3] shadow-md md:hidden flex flex-col items-center space-y-4 py-5">
                    <button className="bg-[#FF8684] cursor-pointer w-3/4 text-white font-bold px-4 py-2 rounded-md">
                        GET STARTED
                    </button>
                    <button className="bg-[#FF8684] cursor-pointer w-3/4 text-white font-bold px-4 py-2 rounded-md">
                        Se connecter
                    </button>

                    {/* Language Selector */}
                    <div className="w-10 h-8 rounded-md overflow-hidden border border-white">
                        <div className="w-full h-full flex">
                            <div className="w-1/3 bg-blue-700"></div>
                            <div className="w-1/3 bg-white"></div>
                            <div className="w-1/3 bg-red-500"></div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
