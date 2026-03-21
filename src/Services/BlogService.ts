// BlogService.ts
import axios, { AxiosInstance } from 'axios';

// Types for the published posts API response
export interface Category {
  id: number;
  name: string;
  created_by?: string;
  created_at?: string;
}

export interface Author {
  id: number;
  name: string;
  bio?: string;
  profile_image?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogText {
  id: number;
  content: string;
  order: number;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  image: string;
  categories: Category[];
  author: Author;
  status: 'PUBLISHED';
  scheduled_date?: string;
  published_date?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
  text_blocks: BlogText[];
  excerpt?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface FilterParams {
  page?: number;
  page_size?: number;
  category?: string;
  author?: string;
  search?: string;
  start_date?: string;
  end_date?: string;
}

class BlogService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
    this.api = axios.create({
      baseURL: `${this.baseURL}/api/`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Function 1: Get all published blog posts with pagination and filters
  async getPublishedPosts(params?: FilterParams): Promise<PaginatedResponse<BlogPost>> {
    try {
      const response = await this.api.get('published-posts/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching published posts:', error);
      throw error;
    }
  }

  // Function 2: Get a single published blog post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const response = await this.api.get(`published-posts/${slug}/`);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log(`Published post with slug "${slug}" not found`);
        return null;
      }
      console.error(`Error fetching post with slug ${slug}:`, error);
      throw error;
    }
  }

  // Utility function to get image URL
  getImageUrl(imagePath: string): string {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${this.baseURL}${imagePath}`;
  }

  // Utility function to get author image URL
  getAuthorImageUrl(imagePath?: string): string {
    if (!imagePath) {
      return 'https://ui-avatars.com/api/?name=Author&background=random';
    }
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `${this.baseURL}${imagePath}`;
  }

  // Format date for display
  formatDate(dateString?: string): string {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}

// Create and export a singleton instance
export const blogService = new BlogService('https://backend-django-5-clix.onrender.com');