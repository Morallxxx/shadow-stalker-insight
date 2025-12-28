import { InstagramPost } from '@/types/instagram';
import { Heart, MessageCircle, Play } from 'lucide-react';

interface PostGridProps {
  posts: InstagramPost[];
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString('pt-BR');
}

export function PostGrid({ posts }: PostGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Nenhum post disponível</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-center gap-2 mb-6 text-xs uppercase tracking-widest text-muted-foreground">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
          </svg>
          <span>Publicações</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 md:gap-4">
          {posts.map((post, index) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="post-card relative aspect-square group overflow-hidden bg-muted rounded-md"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <img
                src={post.thumbnail_url || post.display_url}
                alt={post.caption?.slice(0, 50) || 'Instagram post'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {/* Video Indicator */}
              {post.is_video && (
                <div className="absolute top-3 right-3 text-foreground drop-shadow-lg">
                  <Play className="w-6 h-6 fill-current" />
                </div>
              )}

              {/* Hover Overlay */}
              <div className="post-overlay rounded-md">
                <div className="flex items-center gap-1 text-foreground font-bold">
                  <Heart className="w-5 h-5 fill-current" />
                  <span>{formatNumber(post.likes)}</span>
                </div>
                <div className="flex items-center gap-1 text-foreground font-bold">
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{formatNumber(post.comments)}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
