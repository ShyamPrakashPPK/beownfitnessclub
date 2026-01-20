import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const db = await getDatabase();
        const posts = await db.collection('socialPosts').find({ isActive: true }).sort({ createdAt: -1 }).toArray();

        // Convert ObjectId to string for JSON serialization
        const serializedPosts = posts.map(post => ({
            ...post,
            _id: post._id.toString(),
        }));

        return NextResponse.json({ success: true, data: serializedPosts });
    } catch (error) {
        console.error('Error fetching social posts:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch social posts' },
            { status: 500 }
        );
    }
}
