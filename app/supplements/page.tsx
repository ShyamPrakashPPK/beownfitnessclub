'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/products/ProductCard';

interface Product {
    _id: string;
    name: string;
    slug?: string;
    description?: string;
    images?: string[];
    price: number;
    mrp?: number;
    brand?: string;
    category?: string;
    weight?: string;
    flavor?: string;
    isActive?: boolean;
}

interface Category {
    _id: string;
    name: string;
}

interface Brand {
    _id: string;
    name: string;
}

export default function SupplementsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedBrand, setSelectedBrand] = useState<string>('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [productsRes, categoriesRes, brandsRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/categories'),
                    fetch('/api/brands'),
                ]);

                if (!productsRes.ok || !categoriesRes.ok || !brandsRes.ok) {
                    throw new Error('Failed to fetch data');
                }

                const productsData = await productsRes.json();
                const categoriesData = await categoriesRes.json();
                const brandsData = await brandsRes.json();

                if (productsData.success) {
                    setProducts(productsData.data);
                }
                if (categoriesData.success) {
                    setCategories(categoriesData.data);
                }
                if (brandsData.success) {
                    setBrands(brandsData.data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredProducts = products.filter(product => {
        const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
        const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
        return categoryMatch && brandMatch;
    });

    return (
        <div className="bg-black font-sans min-h-screen">
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-100 mb-4 text-center">
                        Supplements
                    </h1>
                    <p className="text-lg sm:text-xl text-zinc-400 text-center max-w-3xl mx-auto mb-12">
                        Explore our premium selection of fitness supplements to support your journey.
                    </p>

                    {/* Filters */}
                    {(categories.length > 0 || brands.length > 0) && (
                        <div className="mb-8 flex flex-wrap gap-4 justify-center">
                            {/* Category Filter */}
                            {categories.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-zinc-400">Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-2 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                                    >
                                        <option value="all">All Categories</option>
                                        {categories.map((category) => (
                                            <option key={category._id} value={category.name}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Brand Filter */}
                            {brands.length > 0 && (
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm text-zinc-400">Brand</label>
                                    <select
                                        value={selectedBrand}
                                        onChange={(e) => setSelectedBrand(e.target.value)}
                                        className="bg-zinc-900 border border-zinc-800 text-zinc-100 px-4 py-2 rounded-lg focus:outline-none focus:border-yellow-400 transition-colors"
                                    >
                                        <option value="all">All Brands</option>
                                        {brands.map((brand) => (
                                            <option key={brand._id} value={brand.name}>
                                                {brand.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-20">
                            <p className="text-red-400 text-lg mb-4">Error: {error}</p>
                            <p className="text-zinc-400">Please make sure MongoDB is configured correctly.</p>
                        </div>
                    )}

                    {/* Products Grid */}
                    {!loading && !error && (
                        <>
                            {filteredProducts.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-zinc-400 text-lg">No products found.</p>
                                    {(selectedCategory !== 'all' || selectedBrand !== 'all') && (
                                        <button
                                            onClick={() => {
                                                setSelectedCategory('all');
                                                setSelectedBrand('all');
                                            }}
                                            className="mt-4 text-yellow-400 hover:text-yellow-300 underline"
                                        >
                                            Clear filters
                                        </button>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <p className="text-zinc-400 mb-6 text-center">
                                        Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {filteredProducts.map((product) => (
                                            <ProductCard key={product._id} product={product} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

