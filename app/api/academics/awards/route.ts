import { NextRequest, NextResponse } from 'next/server';
import {
  getAllAwards,
  createAward,
  updateAward,
  deleteAward,
} from '@/lib/db-queries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeArchived = searchParams.get('archived') === 'true';
    
    const awards = getAllAwards();
    
    // Filter out archived awards unless explicitly requested
    const filteredAwards = includeArchived 
      ? awards.filter(award => award.archived === 1)
      : awards.filter(award => award.archived === 0);
    
    return NextResponse.json(filteredAwards);
  } catch (error) {
    console.error('Error fetching awards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch awards' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = createAward({
      ...body,
      display_order: body.display_order || 0,
    });
    return NextResponse.json({ id, message: 'Award created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating award:', error);
    return NextResponse.json(
      { error: 'Failed to create award' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Award ID is required' },
        { status: 400 }
      );
    }
    
    updateAward(id, data);
    return NextResponse.json({ message: 'Award updated successfully' });
  } catch (error) {
    console.error('Error updating award:', error);
    return NextResponse.json(
      { error: 'Failed to update award' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Award ID is required' },
        { status: 400 }
      );
    }
    
    deleteAward(parseInt(id));
    return NextResponse.json({ message: 'Award deleted successfully' });
  } catch (error) {
    console.error('Error deleting award:', error);
    return NextResponse.json(
      { error: 'Failed to delete award' },
      { status: 500 }
    );
  }
}
