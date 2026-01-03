import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const db = await getDatabase();
        const categories = await db.collection('categories').find({}).toArray();

        // Convert ObjectId to string for JSON serialization
        const serializedCategories = categories.map(category => ({
            ...category,
            _id: category._id.toString(),
        }));

        return NextResponse.json({ success: true, data: serializedCategories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch categories' },
            { status: 500 }
        );
    }
}

