import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

export async function GET() {
    try {
        const db = await getDatabase();
        const trainers = await db.collection('trainers').find({}).sort({ createdAt: -1 }).toArray();

        // Convert ObjectId to string for JSON serialization
        const serializedTrainers = trainers.map(trainer => ({
            ...trainer,
            _id: trainer._id.toString(),
        }));

        return NextResponse.json({ success: true, data: serializedTrainers });
    } catch (error) {
        console.error('Error fetching trainers:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch trainers' },
            { status: 500 }
        );
    }
}
