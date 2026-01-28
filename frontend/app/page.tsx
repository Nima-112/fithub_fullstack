'use client';

import { useEffect, useState } from 'react';
import { HeroSection } from "./components/ui/HeroSection";
import { Section, SectionHeader } from "./components/ui/Section";
import { ProductCard } from "./components/ui/ProductCard";
import { Button } from "./components/ui/Button";
import { Product } from "./types";
import { productApi, userApi } from "./lib/api";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productApi.getFeatured(8);
        if (response.success) {
          setFeaturedProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const router = useRouter();

  const handleAddToCart = async (product: Product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/signin');
      return;
    }

    try {
      const response = await userApi.addToCart(product._id);
      if (response.success) {
        alert('Added to cart!');
      }
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

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Transform Your Fitness Journey"
        subtitle="Premium Equipment + Expert Coaching = Your Best Self"
        primaryCTA={{
          label: "Shop Equipment",
          href: "/shop"
        }}
        secondaryCTA={{
          label: "Explore Coaching",
          href: "/coaching"
        }}
      />

      {/* Featured Products Section */}
      <Section variant="default">
        <SectionHeader
          accent="Featured"
          title="Equipment"
          subtitle="Premium gear to elevate your training"
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-dark-bg-tertiary rounded-2xl p-6 animate-pulse">
                <div className="aspect-square bg-dark-bg-primary rounded-xl mb-4" />
                <div className="h-4 bg-dark-bg-primary rounded mb-2 w-3/4" />
                <div className="h-4 bg-dark-bg-primary rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-dark-text-secondary text-lg">
              No featured products available at the moment.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '/shop'}
          >
            View All Products
          </Button>
        </div>
      </Section>

      {/* Coaching CTA Section */}
      <Section variant="gradient">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-4xl md:text-5xl mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-xl text-dark-text-secondary mb-8">
            Get personalized workout plans and nutrition guidance from expert coaches
          </p>
          <Button
            variant="accent"
            size="lg"
            onClick={() => window.location.href = '/coaching'}
          >
            Start Your Journey
          </Button>
        </div>
      </Section>

      {/* Features Section */}
      <Section variant="dark">
        <SectionHeader
          accent="Why Choose"
          title="FitHub?"
          subtitle="Everything you need to achieve your fitness goals"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Premium Equipment',
              description: 'Top-quality fitness gear from trusted brands like KALENJI, DOMYOS, and KIPRUN',
              icon: '🏋️'
            },
            {
              title: 'Expert Coaching',
              description: 'Personalized workout and nutrition plans from certified professionals',
              icon: '💪'
            },
            {
              title: 'Community Support',
              description: 'Join thousands of fitness enthusiasts on their transformation journey',
              icon: '🤝'
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-dark-bg-secondary rounded-2xl p-8 border border-dark-border hover:border-primary-neon transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="font-display font-bold text-2xl mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-dark-text-secondary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
