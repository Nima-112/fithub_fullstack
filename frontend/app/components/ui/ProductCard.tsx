'use client';

import React from 'react';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from './Button';
import { Product } from '@/app/types';

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
    onToggleWishlist?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onAddToCart,
    onToggleWishlist
}) => {
    // Determine if we have images
    const mainImage = product.images && product.images.length > 0
        ? product.images[0]
        : 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

    const [isWishlisted, setIsWishlisted] = React.useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onAddToCart?.(product);
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
        onToggleWishlist?.(product);
    };

    return (
        <div className="group relative bg-dark-bg-secondary rounded-2xl overflow-hidden border border-dark-border hover:border-primary-neon/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary-neon/10 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-dark-bg-tertiary">
                <img
                    src={mainImage}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay with Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button
                        onClick={handleWishlistToggle}
                        className={`p-3 rounded-full hover:bg-white/20 backdrop-blur-sm transition-colors ${isWishlisted ? 'text-accent-orange fill-accent-orange' : 'text-white'}`}
                        title="Add to Wishlist"
                    >
                        <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className="p-3 rounded-full bg-primary-neon text-dark-bg-primary hover:bg-primary-neon-light transition-colors transform hover:scale-110"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="w-6 h-6" />
                    </button>
                </div>

                {/* Sale Tag (Optional) */}
                {/* <div className="absolute top-4 left-4 px-3 py-1 bg-accent-orange text-white text-xs font-bold rounded-full uppercase tracking-wider">
                    Sale
                </div> */}
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-primary-neon text-xs font-bold uppercase tracking-wider">
                        {product.category || 'Fitness'}
                    </span>
                </div>

                <h3 className="font-display font-bold text-lg text-dark-text-primary mb-2 line-clamp-2">
                    {product.name}
                </h3>

                <p className="text-dark-text-secondary text-sm mb-4 line-clamp-2 flex-grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-dark-text-primary">
                        ${product.price ? product.price.toFixed(2) : '0.00'}
                    </span>

                    {/* Stock Status */}
                    <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                </div>
            </div>
        </div>
    );
};
