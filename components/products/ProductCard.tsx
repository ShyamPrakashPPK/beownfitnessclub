'use client';

import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
    product: {
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
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    const mainImage = product.images && product.images.length > 0 ? product.images[0] : '/common/goldenlogo.png';
    const discount = product.mrp && product.mrp > product.price
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : 0;

    const productSlug = product.slug || product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
    const cardContent = (
        <div className="group bg-zinc-900 rounded-lg overflow-hidden hover:bg-zinc-800 transition-all duration-300 border border-zinc-800 hover:border-yellow-400/50">
            {/* Image Container */}
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-950">
                {product.images && product.images.length > 0 ? (
                    <Image
                        src={mainImage}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                )}
                {discount > 0 && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-md text-xs font-bold">
                        {discount}% OFF
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-4">
                {product.brand && (
                    <p className="text-xs text-yellow-400 font-medium mb-1">{product.brand}</p>
                )}
                <h3 className="text-lg font-semibold text-zinc-100 mb-2 line-clamp-2">
                    {product.name}
                </h3>

                {product.description && (
                    <p className="text-sm text-zinc-400 mb-3 line-clamp-2">
                        {product.description}
                    </p>
                )}

                {/* Product Details */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {product.weight && (
                        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                            {product.weight}
                        </span>
                    )}
                    {product.flavor && (
                        <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                            {product.flavor}
                        </span>
                    )}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-yellow-400">
                        ₹{product.price.toLocaleString()}
                    </span>
                    {product.mrp && product.mrp > product.price && (
                        <span className="text-sm text-zinc-500 line-through">
                            ₹{product.mrp.toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    if (productSlug) {
        return (
            <Link href={`/products/${productSlug}`}>
                {cardContent}
            </Link>
        );
    }

    return cardContent;
}

