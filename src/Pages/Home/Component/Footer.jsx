import { Instagram, Youtube, Facebook, Twitter } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-[#2098F3] text-white py-10 px-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Company Info */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <p className="text-sm">Providing top-notch services to grow your business and boost your presence online.</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="text-sm space-y-2">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">About</a></li>
                        <li><a href="#" className="hover:underline">Services</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                    <p className="text-sm mb-2">Subscribe to our newsletter for updates.</p>
                    <input type="email" placeholder="Enter your email" className="w-full border-white border p-2 rounded text-white" />
                    <button className="mt-2 bg-black hover:bg-blue-700 text-white px-4 py-2 rounded w-full">Subscribe</button>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-400"><Instagram size={24} /></a>
                        <a href="#" className="hover:text-gray-400"><Youtube size={24} /></a>
                        <a href="#" className="hover:text-gray-400"><Facebook size={24} /></a>
                        <a href="#" className="hover:text-gray-400"><Twitter size={24} /></a>
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