'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    Settings,
    LogOut,
    Menu,
    X,
    BarChart3
} from 'lucide-react';
import { userApi } from '../lib/api';
import { cn } from '../lib/utils';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAdminAccess();
    }, []);

    const checkAdminAccess = async () => {
        try {
            const profile = await userApi.getProfile();
            if (profile.data.role !== 'admin') {
                router.push('/');
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            router.push('/auth/signin');
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark-bg-primary flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-neon"></div>
            </div>
        );
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
        { name: 'Users', href: '/admin/users', icon: Users },
        { name: 'Products', href: '/admin/products', icon: ShoppingBag },
        { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
                    !isSidebarOpen && "-translate-x-full"
                )}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-display font-bold text-2xl text-gray-900">
                            Fit<span className="text-primary-neon">Hub</span>
                        </span>
                        <span className="text-xs font-mono text-gray-500 border border-gray-300 px-1 rounded">ADMIN</span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden text-gray-500 hover:text-gray-900"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                                    isActive
                                        ? "bg-primary-neon/10 text-primary-neon"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
                    <button
                        onClick={() => router.push('/')}
                        className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Exit Admin</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-gray-900"
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                    <span className="font-bold text-gray-900">Admin Panel</span>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
