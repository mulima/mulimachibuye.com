import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts, createPost } from '@/lib/db-queries';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const publishedOnly = searchParams.get('published') !== 'false';
    const includeArchived = searchParams.get('archived') === 'true';
    
    const posts = getAllPosts(publishedOnly);
    
    // Filter out archived posts unless explicitly requested
    const filteredPosts = includeArchived 
      ? posts.filter(post => post.archived === 1)
      : posts.filter(post => post.archived === 0);
    
    return NextResponse.json(filteredPosts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { title, slug, excerpt, content, category_id, read_time, published, featured } = body;
    
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }
    
    const postId = createPost({
      title,
      slug,
      excerpt,
      content,
      category_id,
      read_time,
      published,
      featured,
    });
    
    return NextResponse.json({ id: postId, message: 'Post created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}
