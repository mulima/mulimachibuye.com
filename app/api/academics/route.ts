import { NextRequest, NextResponse } from 'next/server';
import {
  getAllPublications,
  getAllResearchProjects,
  getAllPresentations,
  getAllEducation,
  getAllAwards,
} from '@/lib/db-queries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeArchived = searchParams.get('archived') === 'true';
    
    const publications = await getAllPublications();
    const researchProjects = await getAllResearchProjects();
    const presentations = await getAllPresentations();
    const education = await getAllEducation();
    const awards = await getAllAwards();

    // Filter out archived items unless explicitly requested
    const filteredPublications = includeArchived 
      ? publications.filter(p => p.archived === 1)
      : publications.filter(p => p.archived === 0);
    
    const filteredProjects = includeArchived 
      ? researchProjects.filter(p => p.archived === 1)
      : researchProjects.filter(p => p.archived === 0);
    
    const filteredPresentations = includeArchived 
      ? presentations.filter(p => p.archived === 1)
      : presentations.filter(p => p.archived === 0);
    
    const filteredEducation = includeArchived 
      ? education.filter(e => e.archived === 1)
      : education.filter(e => e.archived === 0);
    
    const filteredAwards = includeArchived 
      ? awards.filter(a => a.archived === 1)
      : awards.filter(a => a.archived === 0);

    return NextResponse.json({
      publications: filteredPublications,
      researchProjects: filteredProjects,
      presentations: filteredPresentations,
      education: filteredEducation,
      awards: filteredAwards,
    });
  } catch (error) {
    console.error('Error fetching academic data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch academic data' },
      { status: 500 }
    );
  }
}
