'use client';

import React from 'react';
import Link from 'next/link';
import { Dumbbell, Facebook, Instagram, Twitter, Youtube, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
    const footerLinks = {
        shop: [
            { label: 'All Products', href: '/shop' },
            { label: 'New Arrivals', href: '/shop?filter=new' },
            { label: 'Best Sellers', href: '/shop?filter=bestsellers' },
            { label: 'Sale', href: '/shop?filter=sale' },
        ],
        coaching: [
            { label: 'Plans & Pricing', href: '/coaching' },
            { label: 'Our Coaches', href: '/coaching/coaches' },
            { label: 'Success Stories', href: '/coaching/stories' },
            { label: 'FAQ', href: '/coaching/faq' },
        ],
        company: [
            { label: 'About Us', href: '/about' },
            { label: 'Contact', href: '/contact' },
            { label: 'Careers', href: '/careers' },
            { label: 'Blog', href: '/blog' },
        ],
        support: [
            { label: 'Help Center', href: '/help' },
            { label: 'Shipping Info', href: '/shipping' },
            { label: 'Returns', href: '/returns' },
            { label: 'Track Order', href: '/track' },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Youtube, href: '#', label: 'YouTube' },
    ];

    return (
        <footer className="bg-dark-bg-secondary border-t border-dark-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Dumbbell className="w-8 h-8 text-primary-neon" />
                            <span className="font-display font-bold text-2xl text-primary-neon">
                                FitHub
                            </span>
                        </Link>
                        <p className="text-dark-text-secondary text-sm mb-4">
                            Your Fitness Journey, Elevated. Premium equipment and expert coaching.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="p-2 bg-dark-bg-tertiary rounded-full text-dark-text-secondary hover:text-primary-neon hover:bg-dark-bg-primary transition-colors"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-display font-semibold text-white mb-4">Shop</h3>
                        <ul className="space-y-2">
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-text-secondary hover:text-primary-neon transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Coaching Links */}
                    <div>
                        <h3 className="font-display font-semibold text-white mb-4">Coaching</h3>
                        <ul className="space-y-2">
                            {footerLinks.coaching.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-text-secondary hover:text-primary-neon transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-display font-semibold text-white mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-text-secondary hover:text-primary-neon transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-display font-semibold text-white mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-dark-text-secondary hover:text-primary-neon transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-dark-border pt-8 mb-8">
                    <div className="max-w-md">
                        <h3 className="font-display font-semibold text-white mb-2">
                            Stay Updated
                        </h3>
                        <p className="text-dark-text-secondary text-sm mb-4">
                            Subscribe to get special offers, fitness tips, and more.
                        </p>
                        <div className="flex gap-2">
                            <div className="flex-1 relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-text-secondary" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-3 bg-dark-bg-tertiary border border-dark-border rounded-lg text-dark-text-primary placeholder:text-dark-text-secondary focus:outline-none focus:border-primary-neon transition-colors"
                                />
                            </div>
                            <button className="px-6 py-3 bg-primary-neon text-dark-bg-primary font-semibold rounded-lg hover:shadow-neon-md transition-all">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-dark-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-dark-text-secondary text-sm">
                        © {new Date().getFullYear()} FitHub. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="text-dark-text-secondary hover:text-primary-neon text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-dark-text-secondary hover:text-primary-neon text-sm transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="text-dark-text-secondary hover:text-primary-neon text-sm transition-colors">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
