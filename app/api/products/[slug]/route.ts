import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const db = await getDatabase();
        const product = await db.collection('products').findOne({
            slug: slug,
            isActive: true,
        });

        if (!product) {
            return NextResponse.json(
                { success: false, error: 'Product not found' },
                { status: 404 }
            );
        }

        // Fetch brand information if product has a brand
        let brandSlug = null;
        if (product.brand) {
            const brand = await db.collection('brands').findOne({ name: product.brand });
            if (brand && brand.slug) {
                brandSlug = brand.slug;
            }
        }

        // Convert ObjectId to string for JSON serialization
        const serializedProduct = {
            ...product,
            _id: product._id.toString(),
            brandSlug: brandSlug,
        };

        return NextResponse.json({ success: true, data: serializedProduct });
    } catch (error) {
        console.error('Error fetching product:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch product' },
            { status: 500 }
        );
    }
}

