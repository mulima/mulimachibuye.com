import { NextRequest, NextResponse } from 'next/server';
import {
  getAllEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from '@/lib/db-queries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeArchived = searchParams.get('archived') === 'true';
    
    const education = getAllEducation();
    
    // Filter out archived education unless explicitly requested
    const filteredEducation = includeArchived 
      ? education.filter(edu => edu.archived === 1)
      : education.filter(edu => edu.archived === 0);
    
    return NextResponse.json(filteredEducation);
  } catch (error) {
    console.error('Error fetching education:', error);
    return NextResponse.json(
      { error: 'Failed to fetch education' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = createEducation({
      ...body,
      display_order: body.display_order || 0,
    });
    return NextResponse.json({ id, message: 'Education created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating education:', error);
    return NextResponse.json(
      { error: 'Failed to create education' },
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
        { error: 'Education ID is required' },
        { status: 400 }
      );
    }
    
    updateEducation(id, data);
    return NextResponse.json({ message: 'Education updated successfully' });
  } catch (error) {
    console.error('Error updating education:', error);
    return NextResponse.json(
      { error: 'Failed to update education' },
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
        { error: 'Education ID is required' },
        { status: 400 }
      );
    }
    
    deleteEducation(parseInt(id));
    return NextResponse.json({ message: 'Education deleted successfully' });
  } catch (error) {
    console.error('Error deleting education:', error);
    return NextResponse.json(
      { error: 'Failed to delete education' },
      { status: 500 }
    );
  }
}
