'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '../components/ui/ProductCard';
import { Button } from '../components/ui/Button';
import { Section, SectionHeader } from '../components/ui/Section';
import { Product } from '../types';
import { productApi, userApi } from '../lib/api';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ShopPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);

    // Filters state
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [sortBy, setSortBy] = useState('-createdAt');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchFiltersData();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, selectedBrand, searchQuery, sortBy, page]);

    const fetchFiltersData = async () => {
        try {
            const [categoriesRes, brandsRes] = await Promise.all([
                productApi.getCategories(),
                productApi.getBrands()
            ]);

            if (categoriesRes.success) setCategories(categoriesRes.data);
            if (brandsRes.success) setBrands(brandsRes.data);
        } catch (error) {
            console.error('Error fetching filters:', error);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params: any = {
                page,
                limit: 20,
                sort: sortBy
            };

            if (selectedCategory) params.category = selectedCategory;
            if (selectedBrand) params.brand = selectedBrand;
            if (searchQuery) params.search = searchQuery;
            if (priceRange.min > 0) params.minPrice = priceRange.min;
            if (priceRange.max < 10000) params.maxPrice = priceRange.max;

            const response = await productApi.getAll(params);

            if (response.success) {
                setProducts(response.data);
                setTotalPages(response.pagination.pages);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedBrand('');
        setSearchQuery('');
        setPriceRange({ min: 0, max: 10000 });
        setPage(1);
    };

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
        <Section variant="default" containerSize="xl">
            <SectionHeader
                accent="Shop"
                title="All Products"
                subtitle={`Discover our complete collection of ${products.length ? 'premium' : ''} fitness equipment`}
            />

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-dark-bg-tertiary rounded-2xl p-6 border border-dark-border sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-display font-bold text-xl">Filters</h3>
                            <button
                                onClick={clearFilters}
                                className="text-sm text-primary-neon hover:text-primary-neon-light"
                            >
                                Clear All
                            </button>
                        </div>

                        {/* Search */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">Search</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text-secondary" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full pl-10 pr-4 py-2 bg-dark-bg-primary border border-dark-border rounded-lg text-dark-text-primary placeholder:text-dark-text-secondary focus:outline-none focus:border-primary-neon"
                                />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">Category</label>
                            <div className="space-y-2 max-h-64 overflow-y-auto">
                                <button
                                    onClick={() => setSelectedCategory('')}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory
                                        ? 'bg-primary-neon text-dark-bg-primary'
                                        : 'hover:bg-dark-bg-primary'
                                        }`}
                                >
                                    All Categories
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat._id}
                                        onClick={() => setSelectedCategory(cat._id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat._id
                                            ? 'bg-primary-neon text-dark-bg-primary'
                                            : 'hover:bg-dark-bg-primary'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="capitalize">{cat._id.replace(/-|_/g, ' ')}</span>
                                            <span className="text-xs opacity-70">({cat.count})</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Brands */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">Brand</label>
                            <div className="space-y-2 max-h-48 overflow-y-auto">
                                <button
                                    onClick={() => setSelectedBrand('')}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedBrand
                                        ? 'bg-secondary-electric text-dark-bg-primary'
                                        : 'hover:bg-dark-bg-primary'
                                        }`}
                                >
                                    All Brands
                                </button>
                                {brands.map((brand) => (
                                    <button
                                        key={brand._id}
                                        onClick={() => setSelectedBrand(brand._id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedBrand === brand._id
                                            ? 'bg-secondary-electric text-dark-bg-primary'
                                            : 'hover:bg-dark-bg-primary'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span>{brand._id}</span>
                                            <span className="text-xs opacity-70">({brand.count})</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sort */}
                        <div>
                            <label className="block text-sm font-semibold mb-2">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 py-2 bg-dark-bg-primary border border-dark-border rounded-lg text-dark-text-primary focus:outline-none focus:border-primary-neon"
                            >
                                <option value="-createdAt">Newest First</option>
                                <option value="price">Price: Low to High</option>
                                <option value="-price">Price: High to Low</option>
                                <option value="-rating">Highest Rated</option>
                                <option value="name">Name: A to Z</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden mb-6">
                        <Button
                            variant="secondary"
                            size="md"
                            onClick={() => setShowFilters(!showFilters)}
                            className="w-full"
                        >
                            <SlidersHorizontal className="w-5 h-5 mr-2" />
                            {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </Button>
                    </div>

                    {/* Products */}
                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(12)].map((_, i) => (
                                <div key={i} className="bg-dark-bg-tertiary rounded-2xl p-6 animate-pulse">
                                    <div className="aspect-square bg-dark-bg-primary rounded-xl mb-4" />
                                    <div className="h-4 bg-dark-bg-primary rounded mb-2 w-3/4" />
                                    <div className="h-4 bg-dark-bg-primary rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : products.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onAddToCart={handleAddToCart}
                                        onToggleWishlist={handleToggleWishlist}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-12">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={page === 1}
                                        onClick={() => setPage(page - 1)}
                                    >
                                        Previous
                                    </Button>

                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setPage(i + 1)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${page === i + 1
                                                ? 'bg-primary-neon text-dark-bg-primary'
                                                : 'bg-dark-bg-tertiary text-dark-text-primary hover:bg-dark-bg-primary'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        disabled={page === totalPages}
                                        onClick={() => setPage(page + 1)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-dark-text-secondary text-lg mb-4">
                                No products found matching your filters.
                            </p>
                            <Button variant="secondary" onClick={clearFilters}>
                                Clear Filters
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Section>
    );
}
