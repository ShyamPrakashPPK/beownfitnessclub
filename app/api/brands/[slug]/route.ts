import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const db = await getDatabase();
        const brand = await db.collection('brands').findOne({
            slug: slug,
        });

        if (!brand) {
            return NextResponse.json(
                { success: false, error: 'Brand not found' },
                { status: 404 }
            );
        }

        // Also fetch products for this brand
        const products = await db.collection('products').find({
            brand: brand.name,
            isActive: true,
        }).toArray();

        // Convert ObjectId to string for JSON serialization
        const serializedBrand = {
            ...brand,
            _id: brand._id.toString(),
        };

        const serializedProducts = products.map(product => ({
            ...product,
            _id: product._id.toString(),
        }));

        return NextResponse.json({
            success: true,
            data: {
                brand: serializedBrand,
                products: serializedProducts
            }
        });
    } catch (error) {
        console.error('Error fetching brand:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch brand' },
            { status: 500 }
        );
    }
}

