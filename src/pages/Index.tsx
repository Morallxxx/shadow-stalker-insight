import { Search, Eye, Shield, Fingerprint, Lock, Radar, Target, Scan } from 'lucide-react';
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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-emerald-500/20 bg-background/90 backdrop-blur-xl">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={handleNewSearch}
            className="flex items-center gap-3 text-foreground hover:opacity-80 transition-opacity group"
          >
            <div className="relative">
              <Shield className="w-7 h-7 text-emerald-500" />
              <div className="absolute inset-0 bg-emerald-500/20 blur-lg group-hover:blur-xl transition-all" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg font-bold tracking-tight text-emerald-400">INSTA</span>
              <span className="text-[10px] text-emerald-500/70 -mt-1 tracking-widest">INVESTIGATOR</span>
            </div>
          </button>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-8 relative z-10">
        {/* Hero Section - Show when no profile */}
        {!profile && !loading && !error && (
          <div className="text-center mb-10 animate-fade-in">
            {/* Radar Animation */}
            <div className="relative inline-flex items-center justify-center w-32 h-32 mb-8">
              {/* Outer rings */}
              <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-4 border border-emerald-500/30 rounded-full animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
              <div className="absolute inset-8 border border-emerald-500/40 rounded-full animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
              
              {/* Center icon */}
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/50 flex items-center justify-center backdrop-blur-sm">
                <Radar className="w-8 h-8 text-emerald-400" />
              </div>
              
              {/* Scanning line */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div 
                  className="absolute top-1/2 left-1/2 w-1/2 h-0.5 bg-gradient-to-r from-emerald-500/80 to-transparent origin-left"
                  style={{ animation: 'spin 3s linear infinite' }}
                />
              </div>
            </div>

            {/* Title */}
            <div className="relative mb-6">
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 mb-2">
                INVESTIGADOR
              </h1>
              <p className="text-sm tracking-[0.3em] text-emerald-500/70 font-mono uppercase">
                Sistema de Análise de Perfis
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-8">
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <Eye className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] text-emerald-500/70 font-mono">MONITORAR</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <Fingerprint className="w-5 h-5 text-cyan-400" />
                <span className="text-[10px] text-cyan-500/70 font-mono">IDENTIFICAR</span>
              </div>
              <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <Lock className="w-5 h-5 text-emerald-400" />
                <span className="text-[10px] text-emerald-500/70 font-mono">DESBLOQUEAR</span>
              </div>
            </div>

            {/* Status */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-emerald-400 font-mono">SISTEMA ONLINE • AGUARDANDO ALVO</span>
            </div>

            <p className="text-muted-foreground max-w-md mx-auto text-sm">
              Digite o nome de usuário do alvo para iniciar a análise completa do perfil
            </p>
          </div>
        )}

        {/* Search Input */}
        <div className={profile || loading || error ? 'mb-8' : ''}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 rounded-2xl blur-lg opacity-50" />
            <SearchInput onSearch={searchProfile} loading={loading} />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-8">
            {/* Custom Loading with investigative feel */}
            <div className="flex flex-col items-center justify-center py-12 mb-8">
              <div className="relative">
                <Scan className="w-16 h-16 text-emerald-400 animate-pulse" />
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl animate-pulse" />
              </div>
              <div className="mt-6 space-y-2 text-center">
                <p className="text-emerald-400 font-mono text-sm animate-pulse">
                  ANALISANDO PERFIL...
                </p>
                <div className="flex items-center gap-1 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
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
            {/* Analysis Complete Badge */}
            <div className="flex items-center justify-center gap-2 mb-6 py-2 px-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit mx-auto">
              <Target className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-mono">ANÁLISE COMPLETA • ALVO IDENTIFICADO</span>
            </div>
            <ProfileHeader profile={profile} />
            <PostGrid posts={posts} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-500/10 mt-16 relative z-10">
        <div className="container max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-xs text-emerald-500/50 font-mono">
            [ SISTEMA DE INVESTIGAÇÃO DIGITAL • USO EDUCACIONAL ]
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
