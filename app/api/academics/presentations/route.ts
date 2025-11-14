import { NextRequest, NextResponse } from 'next/server';
import {
  getAllPresentations,
  createPresentation,
  updatePresentation,
  deletePresentation,
} from '@/lib/db-queries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeArchived = searchParams.get('archived') === 'true';
    
    const presentations = getAllPresentations();
    
    // Filter out archived presentations unless explicitly requested
    const filteredPresentations = includeArchived 
      ? presentations.filter(pres => pres.archived === 1)
      : presentations.filter(pres => pres.archived === 0);
    
    return NextResponse.json(filteredPresentations);
  } catch (error) {
    console.error('Error fetching presentations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch presentations' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = createPresentation({
      ...body,
      display_order: body.display_order || 0,
    });
    return NextResponse.json({ id, message: 'Presentation created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating presentation:', error);
    return NextResponse.json(
      { error: 'Failed to create presentation' },
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
        { error: 'Presentation ID is required' },
        { status: 400 }
      );
    }
    
    updatePresentation(id, data);
    return NextResponse.json({ message: 'Presentation updated successfully' });
  } catch (error) {
    console.error('Error updating presentation:', error);
    return NextResponse.json(
      { error: 'Failed to update presentation' },
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
        { error: 'Presentation ID is required' },
        { status: 400 }
      );
    }
    
    deletePresentation(parseInt(id));
    return NextResponse.json({ message: 'Presentation deleted successfully' });
  } catch (error) {
    console.error('Error deleting presentation:', error);
    return NextResponse.json(
      { error: 'Failed to delete presentation' },
      { status: 500 }
    );
  }
}
