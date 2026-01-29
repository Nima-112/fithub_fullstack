'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Section, SectionHeader } from '../../components/ui/Section';
import { ProductCard } from '../../components/ui/ProductCard';
import { Button } from '../../components/ui/Button';
import { Product } from '../../types';
import { productApi, userApi } from '../../lib/api';
import { ShoppingCart, Heart, ArrowLeft, Star, Truck, ShieldCheck, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';
import Link from 'next/link';

export default function ProductDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [recommendations, setRecommendations] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState<string>('');

    useEffect(() => {
        if (id) {
            fetchProductData();
        }
    }, [id]);

    const fetchProductData = async () => {
        try {
            setLoading(true);

            // Fetch product logic would go here, usually calling an API
            const productResponse = await productApi.getById(id);
            if (productResponse.success) {
                setProduct(productResponse.data);
                setMainImage(productResponse.data.images[0] || '');

                // Fetch recommendations
                try {
                    const recResponse = await productApi.getRecommendations(id);
                    if (recResponse.success) {
                        setRecommendations(recResponse.data);
                    }
                } catch (recError) {
                    console.error('Error fetching recommendations:', recError);
                }
            } else {
                // If product not found
                console.error('Product not found');
            }
        } catch (error) {
            console.error('Error details:', error);
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
            // Could add toast notification here
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
            await userApi.toggleWishlist(product._id);
        } catch (error) {
            console.error('Error toggling wishlist:', error);
        }
    };

    if (loading) {
        return (
            <Section className="min-h-screen">
                <div className="animate-pulse space-y-8">
                    <div className="h-96 bg-dark-bg-tertiary rounded-2xl" />
                    <div className="h-40 bg-dark-bg-tertiary rounded-2xl" />
                </div>
            </Section>
        );
    }

    if (!product) {
        return (
            <Section className="min-h-screen">
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                    <Link href="/shop" className="text-primary-neon hover:underline">
                        Back to Shop
                    </Link>
                </div>
            </Section>
        );
    }

    return (
        <div className="min-h-screen pb-20">
            {/* Breadcrumbs & Back */}
            <div className="container mx-auto px-4 py-6">
                <Button
                    variant="ghost"
                    className="gap-2 text-dark-text-secondary hover:text-white pl-0"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Shop
                </Button>
            </div>

            {/* Product Hero */}
            <section className="container mx-auto px-4 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Images */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-dark-border relative">
                            <img
                                src={mainImage}
                                alt={product.name}
                                className="w-full h-full object-contain p-8 transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setMainImage(img)}
                                        className={cn(
                                            "aspect-square bg-white rounded-xl overflow-hidden border transition-all",
                                            mainImage === img
                                                ? "border-primary-neon ring-2 ring-primary-neon/20"
                                                : "border-dark-border hover:border-primary-neon/50"
                                        )}
                                    >
                                        <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-contain p-2" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col">
                        <div className="mb-2">
                            <span className="text-primary-neon font-bold uppercase tracking-wider text-sm">
                                {product.brand}
                            </span>
                        </div>
                        <h1 className="font-display font-bold text-4xl md:text-5xl mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-5 h-5 fill-current" />
                                <span className="font-bold">{product.rating || 4.5}</span>
                            </div>
                            <span className="text-dark-text-secondary">•</span>
                            <span className="text-dark-text-secondary">{product.reviewCount || 12} reviews</span>
                        </div>

                        <div className="text-3xl font-bold text-white mb-8">
                            ${product.price.toFixed(2)}
                        </div>

                        <div className="prose prose-invert max-w-none text-dark-text-secondary mb-8">
                            <p>{product.description}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            <Button
                                variant="primary"
                                size="lg"
                                className="flex-1 gap-2 text-lg h-14"
                                onClick={() => handleAddToCart(product)}
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 w-14 p-0 shrink-0"
                                onClick={() => handleToggleWishlist(product)}
                            >
                                <Heart className="w-6 h-6" />
                            </Button>
                        </div>

                        {/* Features / Upsell */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-dark-border">
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="p-3 bg-dark-bg-tertiary rounded-full text-primary-neon">
                                    <Truck className="w-6 h-6" />
                                </div>
                                <span className="font-bold text-sm">Free Shipping</span>
                                <span className="text-xs text-dark-text-secondary">On orders over $50</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="p-3 bg-dark-bg-tertiary rounded-full text-primary-neon">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <span className="font-bold text-sm">2 Year Warranty</span>
                                <span className="text-xs text-dark-text-secondary">Full coverage</span>
                            </div>
                            <div className="flex flex-col items-center text-center gap-2">
                                <div className="p-3 bg-dark-bg-tertiary rounded-full text-primary-neon">
                                    <RefreshCw className="w-6 h-6" />
                                </div>
                                <span className="font-bold text-sm">Free Returns</span>
                                <span className="text-xs text-dark-text-secondary">30 days return policy</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <Section variant="secondary">
                    <SectionHeader
                        accent="You might also like"
                        title="Recommended For You"
                        subtitle="Based on your selection, we think you'll love these"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {recommendations.map((rec) => (
                            <ProductCard
                                key={rec._id}
                                product={rec}
                                onAddToCart={handleAddToCart}
                                onToggleWishlist={handleToggleWishlist}
                            />
                        ))}
                    </div>
                </Section>
            )}
        </div>
    );
}
