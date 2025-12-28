import { Instagram } from 'lucide-react';
import { useInstagramProfile } from '@/hooks/useInstagramProfile';
import { SearchInput } from '@/components/instagram/SearchInput';
import { ProfileHeader } from '@/components/instagram/ProfileHeader';
import { PostGrid } from '@/components/instagram/PostGrid';
import { ProfileSkeleton, PostGridSkeleton } from '@/components/instagram/LoadingSkeleton';
import { ErrorMessage } from '@/components/instagram/ErrorMessage';

const Index = () => {
  const { profile, posts, loading, error, searchProfile, clearProfile } = useInstagramProfile();

  const handleNewSearch = () => {
    clearProfile();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={handleNewSearch}
            className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity"
          >
            <Instagram className="w-6 h-6" />
            <span className="text-xl font-semibold tracking-tight">InstaSearch</span>
          </button>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section - Show when no profile */}
        {!profile && !loading && !error && (
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl instagram-gradient mb-6">
              <Instagram className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Buscar Perfil do Instagram
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Digite o nome de usuário para visualizar informações do perfil e publicações recentes
            </p>
          </div>
        )}

        {/* Search Input */}
        <div className={profile || loading || error ? 'mb-8' : ''}>
          <SearchInput onSearch={searchProfile} loading={loading} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-8">
            <ProfileSkeleton />
            <PostGridSkeleton />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="mt-8">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Profile & Posts */}
        {profile && !loading && (
          <div className="mt-8">
            <ProfileHeader profile={profile} />
            <PostGrid posts={posts} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            Esta ferramenta é apenas para fins educacionais
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
