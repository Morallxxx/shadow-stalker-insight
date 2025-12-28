export interface InstagramPost {
  id: string;
  shortcode: string;
  display_url: string;
  thumbnail_url: string;
  is_video: boolean;
  likes: number;
  comments: number;
  caption: string;
  timestamp: number;
  url: string;
}

export interface InstagramProfile {
  username: string;
  full_name: string;
  biography: string;
  profile_pic_url: string;
  is_private: boolean;
  is_verified: boolean;
  followers: number;
  following: number;
  posts_count: number;
  external_url: string | null;
}

export interface InstagramApiResponse {
  success: boolean;
  cached: boolean;
  profile: InstagramProfile;
  posts: InstagramPost[];
  error?: string;
}
