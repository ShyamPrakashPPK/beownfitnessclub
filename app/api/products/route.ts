import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const db = await getDatabase();
        // Only fetch active products
        const products = await db.collection('products').find({ isActive: true }).toArray();

        // Convert ObjectId to string for JSON serialization
        const serializedProducts = products.map(product => ({
            ...product,
            _id: product._id.toString(),
        }));

        return NextResponse.json({ success: true, data: serializedProducts });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

