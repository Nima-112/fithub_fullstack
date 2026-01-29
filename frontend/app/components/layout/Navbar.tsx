'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User, Search, Dumbbell, LogOut, Package, Heart, LayoutDashboard } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/app/lib/utils';
import { userApi } from '@/app/lib/api';

interface UserProfile {
    _id: string;
    email: string;
    profile: {
        name: string;
        avatar?: string;
    };
    role: string;
}

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isProfileDropdownOpen && !target.closest('.profile-dropdown-container')) {
                setIsProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isProfileDropdownOpen]);

    const checkAuth = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const [profileRes, cartRes] = await Promise.all([
                    userApi.getProfile(),
                    userApi.getCart()
                ]);

                if (profileRes.success) {
                    setUser(profileRes.data);
                    setIsAuthenticated(true);
                }

                if (cartRes.success) {
                    setCartCount(cartRes.data.length);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Token might be invalid
                localStorage.removeItem('token');
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        setCartCount(0);
        window.location.href = '/';
    };

    const navLinks = [
        { href: '/shop', label: 'Shop' },
        { href: '/coaching', label: 'Coaching' },
        { href: '/about', label: 'About' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'h-16 bg-dark-bg-primary/95 backdrop-blur-lg border-b border-primary-neon/20'
                    : 'h-20 bg-dark-bg-primary/80 backdrop-blur-md'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex items-center justify-between h-full">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Dumbbell className="w-8 h-8 text-primary-neon group-hover:rotate-12 transition-transform" />
                        <span className={cn(
                            'font-display font-bold text-primary-neon transition-all',
                            isScrolled ? 'text-xl' : 'text-2xl'
                        )}>
                            FitHub
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-dark-text-primary hover:text-primary-neon transition-colors font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/shop" className="p-2 text-dark-text-primary hover:text-primary-neon transition-colors" title="Search products">
                            <Search className="w-5 h-5" />
                        </Link>

                        <Link href="/cart" className="relative p-2 text-dark-text-primary hover:text-primary-neon transition-colors" title="Shopping cart">
                            <ShoppingCart className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <Link href="/wishlist" className="p-2 text-dark-text-primary hover:text-primary-neon transition-colors" title="My Wishlist">
                            <Heart className="w-5 h-5" />
                        </Link>

                        {isAuthenticated && user ? (
                            <div className="relative profile-dropdown-container">
                                <button
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center gap-2 p-2 text-dark-text-primary hover:text-primary-neon transition-colors"
                                    title="Profile"
                                >
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">{user.profile.name}</span>
                                </button>

                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-dark-bg-secondary border border-dark-border rounded-xl shadow-xl overflow-hidden z-50">
                                        <div className="p-4 border-b border-dark-border">
                                            <p className="font-semibold text-dark-text-primary">{user.profile.name}</p>
                                            <p className="text-sm text-dark-text-secondary">{user.email}</p>
                                        </div>
                                        <div className="py-2">
                                            {user.role === 'admin' && (
                                                <Link
                                                    href="/admin"
                                                    className="flex items-center gap-3 px-4 py-2 text-primary-neon font-semibold bg-primary-neon/10 hover:bg-primary-neon/20 transition-colors"
                                                    onClick={() => setIsProfileDropdownOpen(false)}
                                                >
                                                    <LayoutDashboard className="w-4 h-4" />
                                                    <span>Admin Panel</span>
                                                </Link>
                                            )}
                                            <Link
                                                href="/orders"
                                                className="flex items-center gap-3 px-4 py-2 text-dark-text-primary hover:bg-dark-bg-tertiary transition-colors"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <Package className="w-4 h-4" />
                                                <span>My Orders</span>
                                            </Link>
                                            <Link
                                                href="/wishlist"
                                                className="flex items-center gap-3 px-4 py-2 text-dark-text-primary hover:bg-dark-bg-tertiary transition-colors"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                            >
                                                <Heart className="w-4 h-4" />
                                                <span>My Wishlist</span>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-2 text-accent-orange hover:bg-dark-bg-tertiary transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link href="/auth/signin">
                                <Button variant="primary" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-dark-text-primary"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-dark-bg-secondary border-t border-dark-border">
                    <div className="px-4 py-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block text-dark-text-primary hover:text-primary-neon transition-colors font-medium py-2"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <div className="pt-4 border-t border-dark-border space-y-3">
                            <Link href="/auth/signin" className="block">
                                <Button variant="primary" size="md" className="w-full">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/auth/signup" className="block">
                                <Button variant="secondary" size="md" className="w-full">
                                    Sign Up
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};
