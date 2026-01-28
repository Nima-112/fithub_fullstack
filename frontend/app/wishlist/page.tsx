'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Section, SectionHeader } from '../components/ui/Section';
import { ProductCard } from '../components/ui/ProductCard';
import { Heart } from 'lucide-react';
import { Product } from '../types';
import { userApi } from '../lib/api';

export default function WishlistPage() {
    const router = useRouter();
    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/signin');
            return;
        }

        try {
            setLoading(true);
            const response = await userApi.getWishlist();
            if (response.success) {
                setWishlistItems(response.data);
            }
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (product: Product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/signin');
            return;
        }

        try {
            await userApi.addToCart(product._id, 1);
            // Optionally show success message
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleToggleWishlist = async (product: Product) => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/signin');
            return;
        }

        try {
            const response = await userApi.toggleWishlist(product._id);
            if (response.success) {
                // If allowed, we could remove it from the list immediately
                // For a wishlist page, untoggling usually means removing
                setWishlistItems(items => items.filter(item => item._id !== product._id));
            }
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        }
    };

    return (
        <Section variant="default" containerSize="lg">
            <SectionHeader
                accent="My Favorites"
                title="Wishlist"
                subtitle={loading ? 'Loading...' : `${wishlistItems.length} ${wishlistItems.length === 1 ? 'item' : 'items'} in your wishlist`}
            />

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-dark-bg-tertiary rounded-2xl p-6 border border-dark-border animate-pulse h-96">
                            <div className="w-full h-48 bg-dark-bg-primary rounded-xl mb-4" />
                            <div className="h-6 bg-dark-bg-primary rounded w-3/4 mb-2" />
                            <div className="h-4 bg-dark-bg-primary rounded w-1/2" />
                        </div>
                    ))}
                </div>
            ) : wishlistItems.length === 0 ? (
                <div className="text-center py-20">
                    <Heart className="w-24 h-24 text-dark-text-secondary mx-auto mb-6" />
                    <h2 className="font-display font-bold text-2xl mb-4">Your wishlist is empty</h2>
                    <p className="text-dark-text-secondary mb-8">
                        Save items you love to your wishlist to revisit them later.
                    </p>
                    <button
                        onClick={() => router.push('/shop')}
                        className="inline-flex items-center justify-center px-8 py-4 bg-primary-neon text-dark-bg-primary font-bold rounded-lg hover:bg-primary-neon-light transition-all"
                    >
                        Browse Shop
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wishlistItems.map((product) => (
                        <ProductCard
                            key={product._id}
                            product={product}
                            onAddToCart={handleAddToCart}
                            onToggleWishlist={handleToggleWishlist}
                        />
                    ))}
                </div>
            )}
        </Section>
    );
}
