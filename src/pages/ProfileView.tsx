import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowLeft, MoreHorizontal, Grid3X3, Bookmark, UserSquare2, BadgeCheck, Lock, ExternalLink, Heart, MessageCircle, Play, Settings } from 'lucide-react';
import { useInstagramProfile } from '@/hooks/useInstagramProfile';
import { ProfileSkeleton, PostGridSkeleton } from '@/components/instagram/LoadingSkeleton';
import { ErrorMessage } from '@/components/instagram/ErrorMessage';
import { Button } from '@/components/ui/button';

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString('pt-BR');
}

const ProfileView = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { profile, posts, loading, error, searchProfile } = useInstagramProfile();

  useEffect(() => {
    if (username) {
      searchProfile(username);
    }
  }, [username]);

  return (
    <div className="min-h-screen bg-background">
      {/* Instagram-style Mobile Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="p-1 hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <div className="flex items-center gap-1">
              {profile?.is_private && <Lock className="w-4 h-4 text-muted-foreground" />}
              <span className="text-lg font-semibold text-foreground">
                {profile?.username || username}
              </span>
              {profile?.is_verified && (
                <BadgeCheck className="w-5 h-5 text-verified fill-verified stroke-background" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-1 hover:opacity-70 transition-opacity">
              <Settings className="w-6 h-6 text-foreground" />
            </button>
            <button className="p-1 hover:opacity-70 transition-opacity">
              <MoreHorizontal className="w-6 h-6 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      <main className="pb-20">
        {/* Loading State */}
        {loading && (
          <div className="px-4 py-4">
            <ProfileSkeleton />
            <PostGridSkeleton />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="px-4 py-8">
            <ErrorMessage message={error} onRetry={() => username && searchProfile(username)} />
          </div>
        )}

        {/* Profile Content */}
        {profile && !loading && (
          <div className="animate-fade-in">
            {/* Profile Header Section */}
            <div className="px-4 py-4">
              <div className="flex items-start gap-6">
                {/* Profile Picture */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] instagram-gradient">
                    <img
                      src={profile.profile_pic_url}
                      alt={profile.full_name}
                      className="w-full h-full rounded-full object-cover bg-background"
                    />
                  </div>
                </div>

                {/* Stats Row - Instagram Style */}
                <div className="flex-1 flex items-center justify-around pt-2">
                  <div className="text-center">
                    <span className="block font-bold text-lg text-foreground">
                      {formatNumber(profile.posts_count)}
                    </span>
                    <span className="text-sm text-muted-foreground">publicações</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-bold text-lg text-foreground">
                      {formatNumber(profile.followers)}
                    </span>
                    <span className="text-sm text-muted-foreground">seguidores</span>
                  </div>
                  <div className="text-center">
                    <span className="block font-bold text-lg text-foreground">
                      {formatNumber(profile.following)}
                    </span>
                    <span className="text-sm text-muted-foreground">seguindo</span>
                  </div>
                </div>
              </div>

              {/* Name & Bio */}
              <div className="mt-4">
                <h2 className="font-semibold text-foreground">{profile.full_name}</h2>
                {profile.biography && (
                  <p className="text-sm text-foreground/90 whitespace-pre-line mt-1 leading-relaxed">
                    {profile.biography}
                  </p>
                )}
                {profile.external_url && (
                  <a
                    href={profile.external_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-sm font-medium text-verified hover:underline"
                  >
                    {new URL(profile.external_url).hostname.replace('www.', '')}
                  </a>
                )}
              </div>

              {/* Action Buttons - Instagram Style */}
              <div className="flex gap-2 mt-4">
                <Button 
                  className="flex-1 bg-primary/10 hover:bg-primary/20 text-foreground border-0"
                  variant="outline"
                >
                  Seguir
                </Button>
                <Button 
                  className="flex-1 bg-primary/10 hover:bg-primary/20 text-foreground border-0"
                  variant="outline"
                >
                  Mensagem
                </Button>
                <Button 
                  className="px-4 bg-primary/10 hover:bg-primary/20 text-foreground border-0"
                  variant="outline"
                  size="icon"
                >
                  <UserSquare2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Stories Highlights Placeholder */}
            <div className="px-4 py-2">
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center gap-1 shrink-0">
                    <div className="w-16 h-16 rounded-full border-2 border-border bg-muted flex items-center justify-center">
                      <span className="text-2xl text-muted-foreground">+</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Destaque</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Navigation - Instagram Style */}
            <div className="flex border-t border-border mt-2">
              <button className="flex-1 py-3 flex items-center justify-center border-b-2 border-foreground">
                <Grid3X3 className="w-6 h-6 text-foreground" />
              </button>
              <button className="flex-1 py-3 flex items-center justify-center text-muted-foreground">
                <UserSquare2 className="w-6 h-6" />
              </button>
            </div>

            {/* Posts Grid - Instagram Style */}
            {posts.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Grid3X3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Nenhuma publicação ainda</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-[1px] bg-border">
                {posts.map((post) => (
                  <a
                    key={post.id}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-square group overflow-hidden bg-muted"
                  >
                    <img
                      src={post.thumbnail_url || post.display_url}
                      alt={post.caption?.slice(0, 50) || 'Instagram post'}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* Video Indicator */}
                    {post.is_video && (
                      <div className="absolute top-2 right-2 text-foreground drop-shadow-lg">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-6">
                      <div className="flex items-center gap-1 text-white font-bold text-sm">
                        <Heart className="w-5 h-5 fill-current" />
                        <span>{formatNumber(post.likes)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-white font-bold text-sm">
                        <MessageCircle className="w-5 h-5 fill-current" />
                        <span>{formatNumber(post.comments)}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar - Instagram Style */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-6 flex items-center justify-around">
        <button onClick={() => navigate('/')} className="p-2">
          <svg className="w-7 h-7 text-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>
        <button className="p-2">
          <svg className="w-7 h-7 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        <button className="p-2">
          <svg className="w-7 h-7 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </button>
        <button className="p-2">
          <Heart className="w-7 h-7 text-muted-foreground" />
        </button>
        <button className="p-2">
          <div className="w-7 h-7 rounded-full bg-muted border-2 border-foreground"></div>
        </button>
      </nav>
    </div>
  );
};

export default ProfileView;
