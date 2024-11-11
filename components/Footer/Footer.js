// components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-orange-500 text-white py-6">
            <div className="container mx-auto text-center">
                <p className="text-sm mb-2">
                    © {new Date().getFullYear()} Community Recipe Sharing | All Rights Reserved
                </p>
                <div className="flex justify-center space-x-4">
                    <a href="#" className="hover:text-yellow-300">Privacy Policy</a>
                    <a href="#" className="hover:text-yellow-300">Terms of Service</a>
                    <a href="#" className="hover:text-yellow-300">Contact Us</a>
                </div>
                <div className="mt-4">
                    <p className="text-xs">
                        Follow us on:
                        <a href="#" className="ml-2 hover:text-yellow-300">Facebook</a> |
                        <a href="#" className="ml-2 hover:text-yellow-300">Instagram</a> |
                        <a href="#" className="ml-2 hover:text-yellow-300">Twitter</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
