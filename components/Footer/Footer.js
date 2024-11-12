// components/Footer.js
import React from 'react';
import { FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-white text-orange-600 py-10 font-sans">
            <div className="container mx-auto px-6">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">

                    {/* Left Side: Project Name */}
                    <div className="mb-4 sm:col-span-2 md:col-span-1">
                        <h2 className="text-2xl font-bold">Recipe</h2>
                        <h2 className="text-2xl font-bold">Vault</h2>
                    </div>

                    {/* Center Sections */}
                    <div>
                        <h3 className="text-lg font-semibold">Resources</h3>
                        <ul className="mt-2 space-y-1">
                            <li><a href="#" className="hover:underline">Documentation</a></li>
                            <li><a href="#" className="hover:underline">Tutorials</a></li>
                            <li><a href="#" className="hover:underline">Support</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold">Support</h3>
                        <ul className="mt-2 space-y-1">
                            <li><a href="#" className="hover:underline">Help Center</a></li>
                            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Right Side: Contact Us */}
                    <div>
                        <h3 className="text-lg font-semibold">Contact Us</h3>
                        <ul className="mt-2 space-y-1">
                            <li>4100, Medenine</li>
                            <li>RecipeVault@gmail.com</li>
                        </ul>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center space-x-6 mt-10">
                    <a href="#" className="hover:text-orange-400"><FaFacebook size={24} /></a>
                    <a href="#" className="hover:text-orange-400"><FaYoutube size={24} /></a>
                    <a href="#" className="hover:text-orange-400"><FaTwitter size={24} /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
