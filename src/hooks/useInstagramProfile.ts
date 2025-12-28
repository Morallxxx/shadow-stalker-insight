import { useState } from 'react';
import { InstagramApiResponse, InstagramProfile, InstagramPost } from '@/types/instagram';

interface UseInstagramProfileReturn {
  profile: InstagramProfile | null;
  posts: InstagramPost[];
  loading: boolean;
  error: string | null;
  searchProfile: (username: string) => Promise<void>;
  clearProfile: () => void;
}

export function useInstagramProfile(): UseInstagramProfileReturn {
  const [profile, setProfile] = useState<InstagramProfile | null>(null);
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchProfile = async (username: string) => {
    // Clean username (remove @ if present)
    const cleanUsername = username.replace(/^@/, '').trim();
    
    if (!cleanUsername) {
      setError('Por favor, digite um nome de usuário válido');
      return;
    }

    setLoading(true);
    setError(null);
    setProfile(null);
    setPosts([]);

    try {
      const response = await fetch(
        `https://natalshow.com/instagram_api.php?user=${encodeURIComponent(cleanUsername)}`
      );

      if (!response.ok) {
        throw new Error('Erro ao conectar com a API');
      }

      const data: InstagramApiResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Perfil não encontrado');
      }

      setProfile(data.profile);
      setPosts(data.posts.slice(0, 6)); // Limit to 6 posts
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const clearProfile = () => {
    setProfile(null);
    setPosts([]);
    setError(null);
  };

  return {
    profile,
    posts,
    loading,
    error,
    searchProfile,
    clearProfile,
  };
}
