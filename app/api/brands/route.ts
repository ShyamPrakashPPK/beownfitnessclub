import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const db = await getDatabase();
        const brands = await db.collection('brands').find({}).toArray();

        // Convert ObjectId to string for JSON serialization
        const serializedBrands = brands.map(brand => ({
            ...brand,
            _id: brand._id.toString(),
        }));

        return NextResponse.json({ success: true, data: serializedBrands });
    } catch (error) {
        console.error('Error fetching brands:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch brands' },
            { status: 500 }
        );
    }
}

