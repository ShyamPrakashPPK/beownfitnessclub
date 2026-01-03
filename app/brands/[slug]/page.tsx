'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';

interface Brand {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    coo?: string;
}

interface Product {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    images?: string[];
    price: number;
    mrp?: number;
    brand?: string;
    category?: string;
    weight?: string;
    flavor?: string;
}

export default function BrandDetailPage() {
    const params = useParams();
    const [brand, setBrand] = useState<Brand | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (params.slug) {
            fetchBrand();
        }
    }, [params.slug]);

    const fetchBrand = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/brands/${params.slug}`);
            const data = await res.json();

            if (data.success) {
                setBrand(data.data.brand);
                setProducts(data.data.products);
            } else {
                setError('Brand not found');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching brand:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-black font-sans min-h-screen">
                <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-400"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !brand) {
        return (
            <div className="bg-black font-sans min-h-screen">
                <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Brand Not Found</h1>
                        <p className="text-zinc-400 mb-8">{error || 'The brand you are looking for does not exist.'}</p>
                        <Link href="/supplements" className="text-yellow-400 hover:text-yellow-300 underline">
                            Back to Supplements
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black font-sans min-h-screen">
            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm text-zinc-400">
                        <Link href="/" className="hover:text-yellow-400">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/supplements" className="hover:text-yellow-400">Supplements</Link>
                        <span className="mx-2">/</span>
                        <span className="text-zinc-300">{brand.name}</span>
                    </nav>

                    {/* Brand Header */}
                    <div className="mb-12">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            {brand.image && (
                                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800">
                                    <Image
                                        src={brand.image}
                                        alt={brand.name}
                                        fill
                                        className="object-contain p-4"
                                        sizes="160px"
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <h1 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
                                    {brand.name}
                                </h1>
                                {brand.coo && (
                                    <p className="text-zinc-400 mb-2">
                                        Country of Origin: <span className="text-zinc-300">{brand.coo}</span>
                                    </p>
                                )}
                                {brand.description && (
                                    <p className="text-zinc-300 leading-relaxed max-w-3xl">
                                        {brand.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {products.length > 0 ? (
                        <>
                            <h2 className="text-2xl font-bold text-zinc-100 mb-6">
                                Products ({products.length})
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <Link key={product._id} href={`/products/${product.slug}`}>
                                        <ProductCard product={product} />
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-zinc-400 text-lg">No products available for this brand.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

