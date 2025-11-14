import { NextRequest, NextResponse } from 'next/server';
import {
  getAllPublications,
  createPublication,
  updatePublication,
  deletePublication,
} from '@/lib/db-queries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeArchived = searchParams.get('archived') === 'true';
    
    const publications = getAllPublications();
    
    // Filter out archived publications unless explicitly requested
    const filteredPublications = includeArchived 
      ? publications.filter(pub => pub.archived === 1)
      : publications.filter(pub => pub.archived === 0);
    
    return NextResponse.json(filteredPublications);
  } catch (error) {
    console.error('Error fetching publications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch publications' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = createPublication({
      ...body,
      citations: body.citations || 0,
      display_order: body.display_order || 0,
    });
    return NextResponse.json({ id, message: 'Publication created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating publication:', error);
    return NextResponse.json(
      { error: 'Failed to create publication' },
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
        { error: 'Publication ID is required' },
        { status: 400 }
      );
    }
    
    updatePublication(id, data);
    return NextResponse.json({ message: 'Publication updated successfully' });
  } catch (error) {
    console.error('Error updating publication:', error);
    return NextResponse.json(
      { error: 'Failed to update publication' },
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
        { error: 'Publication ID is required' },
        { status: 400 }
      );
    }
    
    deletePublication(parseInt(id));
    return NextResponse.json({ message: 'Publication deleted successfully' });
  } catch (error) {
    console.error('Error deleting publication:', error);
    return NextResponse.json(
      { error: 'Failed to delete publication' },
      { status: 500 }
    );
  }
}
