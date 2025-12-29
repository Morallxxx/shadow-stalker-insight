import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Lock, Camera, Home, Search, PlusSquare, Play, Users, Star } from 'lucide-react';
import { useInstagramProfile } from '@/hooks/useInstagramProfile';
import { ProfileSkeleton, PostGridSkeleton } from '@/components/instagram/LoadingSkeleton';
import { ErrorMessage } from '@/components/instagram/ErrorMessage';

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toLocaleString('pt-BR');
}

const UNLOCK_URL = "https://desbloqueio.com.br";

// Mock data para stories de close friends bloqueados
const closeFriendsStories = [
  { id: 1, username: 'maria_oculta', hasStory: true },
  { id: 2, username: 'joao_privado', hasStory: true },
  { id: 3, username: 'ana_secret', hasStory: true },
  { id: 4, username: 'pedro_cf', hasStory: true },
  { id: 5, username: 'julia_hidden', hasStory: true },
  { id: 6, username: 'lucas_priv', hasStory: true },
];

// Mock data para mensagens ocultas no Direct
const hiddenMessages = [
  { id: 1, name: 'Julia 🔥', gender: 'female', unread: 3, preview: 'Mensagem oculta...' },
  { id: 2, name: 'Pedro', gender: 'male', unread: 1, preview: 'Foto enviada 📷' },
  { id: 3, name: 'Mariana ❤️', gender: 'female', unread: 5, preview: 'Áudio recebido 🎤' },
  { id: 4, name: 'Rafael', gender: 'male', unread: 2, preview: 'Vídeo enviado 🎥' },
  { id: 5, name: 'Camila 💋', gender: 'female', unread: 8, preview: 'Reagiu à sua foto...' },
];

const ProfileView = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { profile, posts, loading, error, searchProfile } = useInstagramProfile();

  useEffect(() => {
    if (username) {
      searchProfile(username);
    }
  }, [username]);

  const handleUnlock = () => {
    window.open(UNLOCK_URL, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Instagram-style Mobile Header - Feed Style */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent font-instagram">
              Instagram
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-1 hover:opacity-70 transition-opacity relative" onClick={handleUnlock}>
              <Heart className="w-6 h-6 text-foreground" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                9
              </span>
            </button>
            <button className="p-1 hover:opacity-70 transition-opacity relative" onClick={handleUnlock}>
              <Send className="w-6 h-6 text-foreground" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {hiddenMessages.reduce((acc, m) => acc + m.unread, 0)}
              </span>
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

        {/* Feed Content - Instagram Home Style */}
        {profile && !loading && (
          <div className="animate-fade-in">
            {/* Stories Section - Close Friends Ocultos */}
            <div className="border-b border-border/50">
              <div className="flex gap-4 px-4 py-3 overflow-x-auto scrollbar-hide">
                {/* User's own story */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border">
                      <img
                        src={profile.profile_pic_url}
                        alt={profile.username}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-0.5 border-2 border-background">
                      <PlusSquare className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <span className="text-xs text-foreground">Seu story</span>
                </div>

                {/* Close Friends Stories - BLOQUEADOS */}
                {closeFriendsStories.map((story) => (
                  <button
                    key={story.id}
                    onClick={handleUnlock}
                    className="flex flex-col items-center gap-1 shrink-0 group"
                  >
                    <div className="relative">
                      {/* Close Friends Ring (Green) */}
                      <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-tr from-green-400 to-green-600">
                        <div className="w-full h-full rounded-full bg-background p-0.5">
                          <div className="w-full h-full rounded-full bg-muted flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/30 to-green-700/30 backdrop-blur-sm" />
                            <Lock className="w-5 h-5 text-green-400 z-10" />
                          </div>
                        </div>
                      </div>
                      {/* Close Friends Badge */}
                      <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 bg-green-500 rounded-full px-1.5 py-0.5 flex items-center gap-0.5">
                        <Star className="w-2.5 h-2.5 text-white fill-white" />
                        <span className="text-[8px] text-white font-bold">CF</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground truncate w-16 text-center">
                      {story.username.slice(0, 8)}...
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Hidden Direct Messages Section */}
            <div className="bg-gradient-to-r from-pink-500/10 via-red-500/10 to-orange-500/10 border-b border-border/50">
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5 text-pink-500" />
                    <span className="font-semibold text-foreground">Mensagens Ocultas</span>
                    <span className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      🔥 TOM QUENTE
                    </span>
                  </div>
                  <button 
                    onClick={handleUnlock}
                    className="text-xs bg-gradient-to-r from-pink-500 to-orange-500 text-white px-3 py-1.5 rounded-full font-semibold"
                  >
                    Desbloquear
                  </button>
                </div>
                
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
                  {hiddenMessages.map((msg) => (
                    <button
                      key={msg.id}
                      onClick={handleUnlock}
                      className="flex flex-col items-center gap-1.5 shrink-0"
                    >
                      <div className="relative">
                        <div className={`w-14 h-14 rounded-full p-[2px] ${
                          msg.gender === 'female' 
                            ? 'bg-gradient-to-tr from-pink-500 via-red-500 to-orange-500' 
                            : 'bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500'
                        }`}>
                          <div className="w-full h-full rounded-full bg-background p-0.5">
                            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center relative overflow-hidden">
                              <div className="absolute inset-0 backdrop-blur-md bg-black/40" />
                              <Lock className="w-4 h-4 text-white z-10" />
                            </div>
                          </div>
                        </div>
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                          {msg.unread}
                        </span>
                      </div>
                      <span className="text-[10px] text-foreground truncate w-14 text-center font-medium">
                        {msg.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Feed Posts - Privados de Amigos */}
            <div className="divide-y divide-border/50">
              {posts.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground">
                  <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhuma publicação ainda</p>
                </div>
              ) : (
                posts.map((post, index) => (
                  <article key={post.id} className="bg-background">
                    {/* Post Header */}
                    <div className="flex items-center justify-between px-3 py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full overflow-hidden instagram-gradient p-[1.5px]">
                          <img
                            src={profile.profile_pic_url}
                            alt={profile.username}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-sm text-foreground">{profile.username}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Amigos Próximos
                          </span>
                        </div>
                      </div>
                      <button className="p-1">
                        <MoreHorizontal className="w-5 h-5 text-foreground" />
                      </button>
                    </div>

                    {/* Post Image - BLOQUEADO */}
                    <button 
                      onClick={handleUnlock}
                      className="relative w-full aspect-square bg-muted overflow-hidden group"
                    >
                      {/* Blurred Background Image */}
                      <img
                        src={post.thumbnail_url || post.display_url}
                        alt="Conteúdo privado"
                        className="w-full h-full object-cover blur-2xl scale-110"
                      />
                      
                      {/* Overlay with Lock */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                        <div className="text-center">
                          <p className="text-white font-semibold text-base">Conteúdo Privado</p>
                          <p className="text-white/70 text-sm">Toque para desbloquear</p>
                        </div>
                        {post.is_video && (
                          <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2">
                            <Play className="w-5 h-5 text-white fill-white" />
                          </div>
                        )}
                      </div>

                      {/* Private Badge */}
                      <div className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-white" />
                        <span className="text-white text-xs font-semibold">Amigos Próximos</span>
                      </div>
                    </button>

                    {/* Post Actions */}
                    <div className="px-3 py-2.5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-4">
                          <button onClick={handleUnlock} className="hover:opacity-70 transition-opacity">
                            <Heart className="w-6 h-6 text-foreground" />
                          </button>
                          <button onClick={handleUnlock} className="hover:opacity-70 transition-opacity">
                            <MessageCircle className="w-6 h-6 text-foreground" />
                          </button>
                          <button onClick={handleUnlock} className="hover:opacity-70 transition-opacity">
                            <Send className="w-6 h-6 text-foreground" />
                          </button>
                        </div>
                        <button onClick={handleUnlock} className="hover:opacity-70 transition-opacity">
                          <Bookmark className="w-6 h-6 text-foreground" />
                        </button>
                      </div>
                      
                      {/* Likes */}
                      <button onClick={handleUnlock} className="flex items-center gap-1.5 mb-1">
                        <span className="font-semibold text-sm text-foreground">
                          {formatNumber(post.likes)} curtidas
                        </span>
                        <Lock className="w-3 h-3 text-muted-foreground" />
                      </button>

                      {/* Caption Preview - Oculto */}
                      <div className="text-sm">
                        <span className="font-semibold text-foreground">{profile.username}</span>
                        <span className="text-muted-foreground ml-1.5">
                          ••••••• ••••• •••••••• 
                          <button onClick={handleUnlock} className="text-blue-400 ml-1">
                            ver mais
                          </button>
                        </span>
                      </div>

                      {/* Comments - Ocultos */}
                      <button onClick={handleUnlock} className="text-muted-foreground text-sm mt-1 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Ver todos os {formatNumber(post.comments)} comentários
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>

            {/* Unlock Banner */}
            <div className="sticky bottom-16 mx-4 mb-4">
              <button
                onClick={handleUnlock}
                className="w-full bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2 animate-pulse"
              >
                <Lock className="w-5 h-5" />
                DESBLOQUEAR TODO CONTEÚDO
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation Bar - Instagram Style */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-2 px-6 flex items-center justify-around z-50">
        <button className="p-2">
          <Home className="w-7 h-7 text-foreground fill-foreground" />
        </button>
        <button onClick={() => navigate('/')} className="p-2">
          <Search className="w-7 h-7 text-muted-foreground" />
        </button>
        <button onClick={handleUnlock} className="p-2">
          <PlusSquare className="w-7 h-7 text-muted-foreground" />
        </button>
        <button onClick={handleUnlock} className="p-2 relative">
          <Heart className="w-7 h-7 text-muted-foreground" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            9
          </span>
        </button>
        <button className="p-2">
          {profile ? (
            <img 
              src={profile.profile_pic_url} 
              alt={profile.username}
              className="w-7 h-7 rounded-full border-2 border-foreground object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-muted border-2 border-foreground" />
          )}
        </button>
      </nav>
    </div>
  );
};

export default ProfileView;
