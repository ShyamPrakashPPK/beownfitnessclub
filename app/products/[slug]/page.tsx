'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/products/ProductCard';

interface Product {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    images?: string[];
    price: number;
    mrp?: number;
    brand?: string;
    brandSlug?: string;
    category?: string;
    weight?: string;
    flavor?: string;
    stock?: number;
}

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (params.slug) {
            fetchProduct();
        }
    }, [params.slug]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/products/${params.slug}`);
            const data = await res.json();

            if (data.success) {
                setProduct(data.data);
                // Fetch related products (same category or brand)
                fetchRelatedProducts(data.data);
            } else {
                setError('Product not found');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
            console.error('Error fetching product:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRelatedProducts = async (currentProduct: Product) => {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();

            if (data.success) {
                const related = data.data.filter((p: Product) =>
                    p._id !== currentProduct._id &&
                    (p.category === currentProduct.category || p.brand === currentProduct.brand)
                ).slice(0, 4);
                setRelatedProducts(related);
            }
        } catch (err) {
            console.error('Error fetching related products:', err);
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

    if (error || !product) {
        return (
            <div className="bg-black font-sans min-h-screen">
                <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl font-bold text-zinc-100 mb-4">Product Not Found</h1>
                        <p className="text-zinc-400 mb-8">{error || 'The product you are looking for does not exist.'}</p>
                        <Link href="/supplements" className="text-yellow-400 hover:text-yellow-300 underline">
                            Back to Supplements
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const mainImage = product.images && product.images.length > 0 ? product.images[0] : '/common/goldenlogo.png';
    const discount = product.mrp && product.mrp > product.price
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : 0;

    return (
        <div className="bg-black font-sans min-h-screen">
            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <nav className="mb-8 text-sm text-zinc-400">
                        <Link href="/" className="hover:text-yellow-400">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/supplements" className="hover:text-yellow-400">Supplements</Link>
                        {product.category && (
                            <>
                                <span className="mx-2">/</span>
                                <span className="text-zinc-300">{product.category}</span>
                            </>
                        )}
                        <span className="mx-2">/</span>
                        <span className="text-zinc-300">{product.name}</span>
                    </nav>

                    {/* Product Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800">
                                <Image
                                    src={mainImage}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                                {discount > 0 && (
                                    <div className="absolute top-4 right-4 bg-yellow-400 text-black px-4 py-2 rounded-md text-lg font-bold">
                                        {discount}% OFF
                                    </div>
                                )}
                            </div>
                            {product.images && product.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {product.images.slice(0, 4).map((image, index) => (
                                        <div key={index} className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800">
                                            <Image
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 1024px) 25vw, 12.5vw"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {product.brand && (
                                <div>
                                    <span className="text-zinc-400 text-sm">Brand: </span>
                                    <Link
                                        href={product.brandSlug ? `/brands/${product.brandSlug}` : `/brands/${product.brand.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')}`}
                                        className="text-yellow-400 hover:text-yellow-300 text-lg font-medium"
                                    >
                                        {product.brand}
                                    </Link>
                                </div>
                            )}
                            <h1 className="text-4xl md:text-5xl font-bold text-zinc-100">
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className="flex items-center gap-4">
                                <span className="text-4xl font-bold text-yellow-400">
                                    ₹{product.price.toLocaleString()}
                                </span>
                                {product.mrp && product.mrp > product.price && (
                                    <span className="text-2xl text-zinc-500 line-through">
                                        ₹{product.mrp.toLocaleString()}
                                    </span>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="flex flex-wrap gap-3">
                                {product.weight && (
                                    <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg">
                                        <span className="text-xs text-zinc-400">Weight</span>
                                        <p className="text-zinc-100 font-medium">{product.weight}</p>
                                    </div>
                                )}
                                {product.flavor && (
                                    <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg">
                                        <span className="text-xs text-zinc-400">Flavor</span>
                                        <p className="text-zinc-100 font-medium">{product.flavor}</p>
                                    </div>
                                )}
                                {product.stock !== undefined && (
                                    <div className="bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-lg">
                                        <span className="text-xs text-zinc-400">Stock</span>
                                        <p className={`font-medium ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className="space-y-2">
                                    <h2 className="text-xl font-semibold text-zinc-100">Description</h2>
                                    <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
                                        {product.description}
                                    </p>
                                </div>
                            )}

                            {/* Category */}
                            {product.category && (
                                <div className="flex items-center gap-2">
                                    <span className="text-zinc-400">Category:</span>
                                    <span className="text-zinc-100">{product.category}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-3xl font-bold text-zinc-100 mb-8">Related Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((relatedProduct) => (
                                    <Link key={relatedProduct._id} href={`/products/${relatedProduct.slug}`}>
                                        <ProductCard product={relatedProduct} />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

