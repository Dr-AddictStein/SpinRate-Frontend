import { Instagram, Youtube, Facebook, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#2098F3] text-white py-10 px-6">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <p className="text-sm leading-relaxed">Providing top-notch services to grow your business and boost your online presence.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white">Home</a></li>
                        <li><a href="#" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white">About</a></li>
                        <li><a href="#" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white">Services</a></li>
                        <li><a href="#" className="hover:underline focus:outline-none focus:ring-2 focus:ring-white">Contact</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                    <p className="text-sm mb-2">Subscribe to our newsletter for updates.</p>
                    <div className="flex flex-col space-y-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-white p-2 rounded bg-transparent text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-black hover:bg-gray-800 transition-colors text-white px-4 py-2 rounded w-full">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="Instagram" className="hover:text-gray-200 transition-colors"><Instagram size={24} /></a>
                        <a href="#" aria-label="YouTube" className="hover:text-gray-200 transition-colors"><Youtube size={24} /></a>
                        <a href="#" aria-label="Facebook" className="hover:text-gray-200 transition-colors"><Facebook size={24} /></a>
                        <a href="#" aria-label="Twitter" className="hover:text-gray-200 transition-colors"><Twitter size={24} /></a>
                    </div>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="text-center text-sm mt-8 border-t border-white pt-4">
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
