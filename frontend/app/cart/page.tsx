'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Section, SectionHeader } from '../components/ui/Section';
import { Button } from '../components/ui/Button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { userApi } from '../lib/api';

interface CartItem {
    product: Product;
    quantity: number;
}

export default function CartPage() {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/signin');
            return;
        }

        try {
            setLoading(true);
            const response = await userApi.getCart();
            if (response.success) {
                setCartItems(response.data);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        // Optimistic update
        setCartItems(items =>
            items.map(item =>
                item.product._id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );

        try {
            // For now, we'll just update locally since backend doesn't have update quantity endpoint
            // In production, you'd want to add a PATCH endpoint to update quantity
            await userApi.addToCart(productId, newQuantity - cartItems.find(i => i.product._id === productId)!.quantity);
        } catch (error) {
            console.error('Error updating quantity:', error);
            // Revert on error
            fetchCart();
        }
    };

    const removeItem = async (productId: string) => {
        try {
            const response = await userApi.removeFromCart(productId);
            if (response.success) {
                setCartItems(items => items.filter(item => item.product._id !== productId));
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );
    const shipping = subtotal > 500 ? 0 : 50;
    const total = subtotal + shipping;

    return (
        <Section variant="default" containerSize="lg">
            <SectionHeader
                accent="Shopping"
                title="Cart"
                subtitle={loading ? 'Loading...' : `${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'} in your cart`}
            />

            {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-dark-bg-tertiary rounded-2xl p-6 border border-dark-border animate-pulse">
                                <div className="flex gap-6">
                                    <div className="w-32 h-32 bg-dark-bg-primary rounded-xl" />
                                    <div className="flex-1 space-y-3">
                                        <div className="h-6 bg-dark-bg-primary rounded w-3/4" />
                                        <div className="h-4 bg-dark-bg-primary rounded w-1/2" />
                                        <div className="h-4 bg-dark-bg-primary rounded w-1/4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-dark-bg-tertiary rounded-2xl p-6 border border-dark-border animate-pulse">
                            <div className="h-8 bg-dark-bg-primary rounded mb-6" />
                            <div className="space-y-4">
                                <div className="h-4 bg-dark-bg-primary rounded" />
                                <div className="h-4 bg-dark-bg-primary rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            ) : cartItems.length === 0 ? (
                <div className="text-center py-20">
                    <ShoppingBag className="w-24 h-24 text-dark-text-secondary mx-auto mb-6" />
                    <h2 className="font-display font-bold text-2xl mb-4">Your cart is empty</h2>
                    <p className="text-dark-text-secondary mb-8">
                        Looks like you haven't added any items to your cart yet.
                    </p>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => window.location.href = '/shop'}
                    >
                        Start Shopping
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.product._id}
                                className="bg-dark-bg-tertiary rounded-2xl p-6 border border-dark-border"
                            >
                                <div className="flex gap-6">
                                    {/* Product Image */}
                                    <div className="w-32 h-32 bg-dark-bg-primary rounded-xl flex-shrink-0 flex items-center justify-center">
                                        {item.product.images[0] ? (
                                            <img
                                                src={item.product.images[0]}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                        ) : (
                                            <span className="text-dark-text-secondary text-sm">No Image</span>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1">
                                        <h3 className="font-display font-semibold text-xl mb-1">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-dark-text-secondary text-sm mb-2">
                                            {item.product.brand}
                                        </p>
                                        <p className="text-primary-neon font-bold text-lg mb-4">
                                            {item.product.price.toFixed(2)} MAD
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 bg-dark-bg-primary rounded-lg p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                    className="p-2 hover:bg-dark-bg-secondary rounded transition-colors"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-semibold">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                    className="p-2 hover:bg-dark-bg-secondary rounded transition-colors"
                                                    disabled={item.quantity >= item.product.stock}
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.product._id)}
                                                className="p-2 text-accent-orange hover:bg-dark-bg-primary rounded-lg transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {item.product.stock < 10 && (
                                            <p className="text-accent-orange text-sm mt-2">
                                                Only {item.product.stock} left in stock!
                                            </p>
                                        )}
                                    </div>

                                    {/* Item Total */}
                                    <div className="text-right">
                                        <p className="text-dark-text-secondary text-sm mb-1">Total</p>
                                        <p className="font-display font-bold text-2xl text-primary-neon">
                                            {(item.product.price * item.quantity).toFixed(2)} MAD
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-dark-bg-tertiary rounded-2xl p-6 border border-dark-border sticky top-24">
                            <h3 className="font-display font-bold text-2xl mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-dark-text-secondary">
                                    <span>Subtotal</span>
                                    <span>{subtotal.toFixed(2)} MAD</span>
                                </div>
                                <div className="flex justify-between text-dark-text-secondary">
                                    <span>Shipping</span>
                                    <span>{shipping === 0 ? 'FREE' : `${shipping.toFixed(2)} MAD`}</span>
                                </div>
                                {shipping === 0 && (
                                    <p className="text-primary-neon text-sm">
                                        ✓ Free shipping on orders over 500 MAD
                                    </p>
                                )}
                                <div className="border-t border-dark-border pt-4">
                                    <div className="flex justify-between font-display font-bold text-xl">
                                        <span>Total</span>
                                        <span className="text-primary-neon">{total.toFixed(2)} MAD</span>
                                    </div>
                                </div>
                            </div>

                            <Button variant="primary" size="lg" className="w-full mb-3">
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>

                            <Button
                                variant="secondary"
                                size="md"
                                className="w-full"
                                onClick={() => window.location.href = '/shop'}
                            >
                                Continue Shopping
                            </Button>

                            {/* Promo Code */}
                            <div className="mt-6">
                                <label className="block text-sm font-semibold mb-2">
                                    Promo Code
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        className="flex-1 px-4 py-2 bg-dark-bg-primary border border-dark-border rounded-lg text-dark-text-primary focus:outline-none focus:border-primary-neon"
                                    />
                                    <Button variant="ghost" size="sm">
                                        Apply
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Section>
    );
}
