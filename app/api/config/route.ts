import { NextRequest, NextResponse } from 'next/server';
import { getAllSiteConfig, updateSiteConfig } from '@/lib/db-queries';

export async function GET() {
  try {
    const config = getAllSiteConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error fetching site config:', error);
    return NextResponse.json(
      { error: 'Failed to fetch site configuration' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Update each config key-value pair
    for (const [key, value] of Object.entries(body)) {
      if (typeof value === 'string') {
        updateSiteConfig(key, value);
      }
    }
    
    return NextResponse.json({ message: 'Site configuration updated successfully' });
  } catch (error) {
    console.error('Error updating site config:', error);
    return NextResponse.json(
      { error: 'Failed to update site configuration' },
      { status: 500 }
    );
  }
}
