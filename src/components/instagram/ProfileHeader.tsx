import { InstagramProfile } from '@/types/instagram';
import { BadgeCheck, Lock, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfileHeaderProps {
  profile: InstagramProfile;
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

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="glass rounded-2xl p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
        {/* Profile Picture */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 instagram-gradient rounded-full blur-lg opacity-50" />
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full p-[3px] instagram-gradient">
            <img
              src={profile.profile_pic_url}
              alt={profile.full_name}
              className="w-full h-full rounded-full object-cover bg-background"
            />
          </div>
          {profile.is_private && (
            <div className="absolute -bottom-1 -right-1 bg-secondary p-2 rounded-full border-2 border-background">
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          {/* Username & Verification */}
          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
            <h1 className="text-xl md:text-2xl font-semibold text-foreground">
              {profile.username}
            </h1>
            {profile.is_verified && (
              <BadgeCheck className="w-6 h-6 text-verified fill-verified stroke-background" />
            )}
          </div>

          {/* Stats Row */}
          <div className="flex items-center justify-center md:justify-start gap-6 md:gap-10 my-4">
            <div className="text-center md:text-left">
              <span className="font-bold text-foreground">{formatNumber(profile.posts_count)}</span>
              <span className="text-muted-foreground ml-1 text-sm">posts</span>
            </div>
            <div className="text-center md:text-left">
              <span className="font-bold text-foreground">{formatNumber(profile.followers)}</span>
              <span className="text-muted-foreground ml-1 text-sm">seguidores</span>
            </div>
            <div className="text-center md:text-left">
              <span className="font-bold text-foreground">{formatNumber(profile.following)}</span>
              <span className="text-muted-foreground ml-1 text-sm">seguindo</span>
            </div>
          </div>

          {/* Full Name */}
          <h2 className="font-semibold text-foreground mb-2">
            {profile.full_name}
          </h2>

          {/* Bio */}
          {profile.biography && (
            <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed max-w-lg">
              {profile.biography}
            </p>
          )}

          {/* External Link */}
          {profile.external_url && (
            <a
              href={profile.external_url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 mt-3 text-sm font-medium",
                "text-verified hover:underline transition-all"
              )}
            >
              <ExternalLink className="w-4 h-4" />
              {new URL(profile.external_url).hostname.replace('www.', '')}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
