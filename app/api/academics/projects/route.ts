import { NextRequest, NextResponse } from 'next/server';
import {
  getAllResearchProjects,
  createResearchProject,
  updateResearchProject,
  deleteResearchProject,
} from '@/lib/db-queries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeArchived = searchParams.get('archived') === 'true';
    
    const projects = getAllResearchProjects();
    
    // Filter out archived projects unless explicitly requested
    const filteredProjects = includeArchived 
      ? projects.filter(proj => proj.archived === 1)
      : projects.filter(proj => proj.archived === 0);
    
    return NextResponse.json(filteredProjects);
  } catch (error) {
    console.error('Error fetching research projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch research projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = createResearchProject({
      ...body,
      display_order: body.display_order || 0,
    });
    return NextResponse.json({ id, message: 'Research project created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating research project:', error);
    return NextResponse.json(
      { error: 'Failed to create research project' },
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
        { error: 'Research project ID is required' },
        { status: 400 }
      );
    }
    
    updateResearchProject(id, data);
    return NextResponse.json({ message: 'Research project updated successfully' });
  } catch (error) {
    console.error('Error updating research project:', error);
    return NextResponse.json(
      { error: 'Failed to update research project' },
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
        { error: 'Research project ID is required' },
        { status: 400 }
      );
    }
    
    deleteResearchProject(parseInt(id));
    return NextResponse.json({ message: 'Research project deleted successfully' });
  } catch (error) {
    console.error('Error deleting research project:', error);
    return NextResponse.json(
      { error: 'Failed to delete research project' },
      { status: 500 }
    );
  }
}
