import React, { useState, useEffect, useRef } from 'react';

/* ==========================================================================
   ÍCONES (SVG PATHS OFICIAIS DO INSTAGRAM)
   ========================================================================== */
const Icons = {
  Home: () => <svg aria-label="Página inicial" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M22 10.188V22h-9v-6h-2v6H2V10.188l10-7.79 10 7.79zM20 12h-2v8h-5v-6h-2v6H5v-8H3l9-7.017L21 12z" /></svg>,
  Search: () => <svg aria-label="Pesquisar" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="16.511" y1="16.511" x2="22" y2="22" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>,
  Messenger: () => <svg aria-label="Messenger" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M12.003 2.001a9.705 9.705 0 11-9.705 9.705 9.69 9.69 0 019.705-9.705zm0 17.58c-1.205 0-2.433-.258-3.568-.788l-3.35 1.05 1.04-3.15a7.92 7.92 0 115.878 2.888z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" /><path d="M13.593 12.306L11.026 15l-3.16-3.327-4.135 4.673 5.42-3.308 2.656-2.738 3.12 3.373 4.095-4.665-5.428 3.297z" fill="currentColor" /></svg>,
  Heart: () => <svg aria-label="Atividade" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.956-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z" /></svg>,
  Comment: () => <svg aria-label="Comentar" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" /></svg>,
  Share: () => <svg aria-label="Compartilhar" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><line x1="22" y1="2" x2="11" y2="13" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" /><polygon points="22 2 15 22 11 13 2 9 22 2" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" /></svg>,
  Bookmark: () => <svg aria-label="Salvar" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><polygon points="20 21 12 13.44 4 21 4 3 20 3 20 21" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>,
  Grid: () => <svg aria-label="Publicações" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="9.015" y1="3" x2="9.015" y2="21" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="14.985" y1="3" x2="14.985" y2="21" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="21" y1="9.015" x2="3" y2="9.015" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><line x1="21" y1="14.985" x2="3" y2="14.985" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>,
  Video: () => <svg aria-label="Reels" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M5.888 22.5a3.46 3.46 0 01-1.721-.46l-.003-.002a3.451 3.451 0 01-1.72-2.982V4.943a3.445 3.445 0 015.163-2.987l12.226 7.059a3.444 3.444 0 01-.001 5.967l-12.22 7.056a3.462 3.462 0 01-1.724.462z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" /></svg>,
  Tag: () => <svg aria-label="Marcados" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><path d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><circle cx="12.072" cy="11.075" r="3.556" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>,
  Verified: () => <svg aria-label="Verificado" height="14" viewBox="0 0 40 40" width="14"><path d="M19.998 3.094 14.638 0l-5.36 3.094-5.86-1.524-1.524 5.86-5.86 1.524 3.094 5.36L-.868 19.67l3.094 5.36 1.524 5.86 5.86 1.524 1.524 5.86 5.86-1.524 5.36 3.094 5.36-3.094 5.86 1.524 1.524-5.86 5.86-1.524-3.094-5.36 5.86-5.86-3.094-5.36-5.86-1.524-1.524-5.86-5.86 1.524z" fill="#3897f0" /><path d="M11.306 20.065l5.088 5.088 13.132-13.132" fill="none" stroke="#fff" strokeWidth="5" /></svg>,
  Lock: () => <svg aria-label="Privado" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M19 11h-1.5V7.5a5.5 5.5 0 10-11 0V11H5a3 3 0 00-3 3v6a3 3 0 003 3h14a3 3 0 003-3v-6a3 3 0 00-3-3zm-10-3.5a3.5 3.5 0 117 0V11H9V7.5z" /></svg>,
  Back: () => <svg aria-label="Voltar" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><line x1="2.909" y1="12.004" x2="22.001" y2="12.004" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /><polyline points="9.276 4.726 2.001 12.004 9.276 19.274" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>,
  Dots: () => <svg aria-label="Opções" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5" /><circle cx="6" cy="12" r="1.5" /><circle cx="18" cy="12" r="1.5" /></svg>,
  Camera: () => <svg aria-label="Câmera" color="currentColor" fill="currentColor" height="24" viewBox="0 0 24 24" width="24"><path d="M11.8 4.387c-.848 0-1.543.655-1.597 1.503l-.053 1.947c-.012.449-.387.797-.836.797H5.97c-1.353 0-2.456 1.101-2.456 2.453v8.324c0 1.352 1.103 2.453 2.456 2.453h12.06c1.353 0 2.456-1.101 2.456-2.453v-8.324c0-1.352-1.103-2.453-2.456-2.453h-3.344c-.45 0-.825-.348-.837-.797l-.052-1.947c-.054-.848-.75-1.503-1.598-1.503h-2.8z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" /><circle cx="12" cy="13.2" r="3.2" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" /></svg>
};

const LINK_REDIRECT = "https://google.com";

const Index = () => {
  // Estado Global
  const [view, setView] = useState('HOME'); // 'HOME', 'HACKING', 'PROFILE'
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('M'); // 'M' ou 'F'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);
  
  // Overlays
  const [showDirect, setShowDirect] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Hacking Animation State
  const [hackLogs, setHackLogs] = useState([]);
  const [hackPass, setHackPass] = useState('********');

  // Helpers
  const formatNum = (n) => {
    if (!n) return '0';
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n;
  };

  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  /* ==========================================================================
     LÓGICA DE BUSCA E HACKING
     ========================================================================== */
  const handleSearch = async () => {
    if (!username.trim()) return;
    
    setLoading(true);
    setError('');

    try {
      // Simulação de delay para realismo
      await wait(1500);

      // Chamada API Real
      const res = await fetch(`https://natalshow.com/instagram_api.php?user=${encodeURIComponent(username)}`);
      const data = await res.json();

      if (data && data.success) {
        setProfileData(data.profile);
        setPosts(data.posts || []);
        startHacking(data.profile);
      } else {
        throw new Error('Usuário não encontrado');
      }
    } catch (err) {
      // Fallback para demo se falhar
      console.log("Modo demonstração ativado");
      const fakeProfile = {
        username: username,
        full_name: username,
        profile_pic_url: `https://ui-avatars.com/api/?name=${username}&background=random&size=200`,
        biography: "🔒 Perfil Privado\n✨ Lifestyle & Travel",
        followers: 1340,
        following: 420,
        posts_count: 24,
        external_url: "onlyfans.com/vip"
      };
      setProfileData(fakeProfile);
      setPosts([]); // Array vazio gera placeholders
      startHacking(fakeProfile);
    } finally {
      setLoading(false);
    }
  };

  const startHacking = async (profile) => {
    setView('HACKING');
    setHackLogs([]);
    setHackPass('********');

    const logs = [
      "Conectando ao servidor Instagram (v2.4)...",
      `Target: @${profile.username}`,
      "Bypassing SSL Pinning...",
      "Explorando vulnerabilidade Auth_Token...",
      "Token encontrado: eyJhbGciOiJIUzI1Ni...",
      "Descriptografando chaves privadas...",
      "Acessando banco de dados de mensagens...",
      "Baixando mídia oculta (Stories/Reels)...",
      "Acesso Root concedido."
    ];

    for (const log of logs) {
      setHackLogs(prev => [log, ...prev]);
      await wait(400);
    }

    // Animação de Senha
    let steps = 0;
    const interval = setInterval(() => {
      setHackPass(Math.random().toString(36).slice(-8));
      steps++;
      if (steps > 20) {
        clearInterval(interval);
        setHackPass('********'); // Sucesso
        setTimeout(() => setView('PROFILE'), 800);
      }
    }, 50);
  };

  /* ==========================================================================
     COMPONENTES UI
     ========================================================================== */
  
  // Renderização do Feed da Home
  const HomeView = () => (
    <div className="pb-16 bg-black min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black border-b border-[#262626] px-4 h-[54px] flex items-center justify-between">
        <div className="font-semibold text-2xl tracking-tighter" style={{ fontFamily: '"Segoe UI", sans-serif' }}>Instagram</div>
        <div className="flex gap-5">
          <Icons.Heart />
          <div className="relative cursor-pointer" onClick={() => setShowDirect(true)}>
            <Icons.Messenger />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#FF3040] rounded-full border-2 border-black"></div>
          </div>
        </div>
      </div>

      {/* Stories */}
      <div className="flex gap-3.5 overflow-x-auto px-4 py-3 border-b border-[#262626] scrollbar-hide">
        <div className="flex flex-col items-center gap-1.5 min-w-[72px]">
          <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
            <img src="https://picsum.photos/100/100?random=999" className="w-full h-full rounded-full border-[3px] border-black object-cover" alt="story" />
          </div>
          <span className="text-[11px] text-white">Seu story</span>
        </div>
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 min-w-[72px] cursor-pointer" onClick={() => setShowModal(true)}>
            <div className="w-[68px] h-[68px] rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]">
              <img src={`https://picsum.photos/100/100?random=${i}`} className="w-full h-full rounded-full border-[3px] border-black object-cover" alt="story" />
            </div>
            <span className="text-[11px] text-white truncate w-16 text-center">user_{i}</span>
          </div>
        ))}
      </div>

      {/* Search Container */}
      <div className="p-4">
        <div className="flex bg-[#262626] rounded-lg p-0.5 mb-4">
          <button 
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${gender === 'M' ? 'bg-[#363636] text-white' : 'text-[#888]'}`}
            onClick={() => setGender('M')}
          >
            Homem
          </button>
          <button 
            className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${gender === 'F' ? 'bg-[#363636] text-white' : 'text-[#888]'}`}
            onClick={() => setGender('F')}
          >
            Mulher
          </button>
        </div>

        <div className="flex items-center bg-[#262626] rounded-xl px-3 h-10 mb-4">
          <div className="text-[#8e8e8e]"><Icons.Search /></div>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Pesquisar..." 
            className="bg-transparent flex-1 ml-3 text-white placeholder-[#8e8e8e] outline-none text-base"
          />
        </div>

        <button 
          onClick={handleSearch}
          disabled={loading}
          className="w-full bg-[#0095F6] active:bg-[#1877F2] text-white font-semibold py-3 rounded-lg flex justify-center items-center h-12"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            'Buscar Perfil'
          )}
        </button>
        {error && <p className="text-[#ed4956] text-center text-sm mt-3">{error}</p>}
      </div>

      {/* Fake Feed Posts */}
      <div className="mt-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="mb-4 border-b border-[#262626] pb-5">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2.5 font-semibold text-sm">
                <img src={`https://picsum.photos/50/50?random=${i+10}`} className="w-8 h-8 rounded-full blur-[1px]" alt="avatar" />
                <span>amigo_oculto_{i}</span>
              </div>
              <div className="text-[#888]"><Icons.Dots /></div>
            </div>
            <div className="relative aspect-[4/5] bg-[#1a1a1a] flex items-center justify-center overflow-hidden cursor-pointer" onClick={() => setShowModal(true)}>
              <img src={`https://picsum.photos/400/500?random=${i+20}`} className="w-full h-full object-cover blur-lg opacity-60" alt="post" />
              <div className="absolute flex flex-col items-center gap-2">
                <div className="text-white scale-150"><Icons.Lock /></div>
                <span className="text-xs font-bold tracking-widest uppercase">Privado</span>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="flex justify-between mb-3">
                <div className="flex gap-4">
                  <Icons.Heart />
                  <Icons.Comment />
                  <Icons.Share />
                </div>
                <Icons.Bookmark />
              </div>
              <div className="font-semibold text-sm mb-1">{Math.floor(Math.random()*500)} curtidas</div>
              <div className="text-sm"><span className="font-bold mr-1">amigo_oculto_{i}</span> esta publicação é privada.</div>
              <div className="text-[11px] text-[#a8a8a8] mt-1">HÁ 2 HORAS</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Tela de Hacking
  const HackingView = () => (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center font-mono p-5">
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-16 h-16 mb-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" alt="logo" />
      
      <div className="w-full max-w-sm bg-[#111] border border-[#333] rounded-lg p-4 shadow-2xl">
        <div className="flex gap-1.5 mb-4 border-b border-[#333] pb-3">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="h-40 overflow-hidden flex flex-col-reverse text-xs text-[#00ff00] leading-relaxed">
          {hackLogs.map((log, i) => (
            <div key={i}>{`> ${log}`}</div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-[#222] px-4 py-2 rounded border border-[#444] text-white tracking-[0.2em] font-bold">
        PASS: <span style={{ color: hackPass === '********' ? '#00ff00' : 'white' }}>{hackPass}</span>
      </div>
      <div className="mt-8 text-xs text-[#666]">SECURITY CHECKPOINT</div>
    </div>
  );

  // Perfil Resultante
  const ProfileView = () => {
    const p = profileData;
    const postItems = posts.length > 0 ? posts : [...Array(12)];

    return (
      <div className="bg-black min-h-screen pb-16">
        <div className="sticky top-0 bg-black z-50 h-[44px] flex items-center justify-between px-4 border-b border-[#262626]">
          <div className="cursor-pointer" onClick={() => { setView('HOME'); setUsername(''); }}><Icons.Back /></div>
          <div className="font-bold text-base flex items-center gap-1">
            {p.username}
            <span className="text-[#0095f6] scale-75"><Icons.Verified /></span>
          </div>
          <Icons.Dots />
        </div>

        <div className="px-4 pt-4">
          <div className="flex items-center mb-4">
            <div className="w-[86px] h-[86px] rounded-full p-[2px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] mr-5 shrink-0">
              <img src={p.profile_pic_url} className="w-full h-full rounded-full border-[3px] border-black object-cover" alt="profile" />
            </div>
            <div className="flex flex-1 justify-around text-center">
              <div><div className="font-bold text-base">{formatNum(p.posts_count)}</div><div className="text-xs text-white">Publicações</div></div>
              <div><div className="font-bold text-base">{formatNum(p.followers)}</div><div className="text-xs text-white">Seguidores</div></div>
              <div><div className="font-bold text-base">{formatNum(p.following)}</div><div className="text-xs text-white">Seguindo</div></div>
            </div>
          </div>

          <div className="text-sm">
            <div className="font-semibold">{p.full_name || p.username}</div>
            <div className="whitespace-pre-wrap leading-tight my-1">{p.biography}</div>
            {p.external_url && (
              <div className="text-[#E0F1FF] font-semibold flex items-center gap-1">
                <span className="truncate">{p.external_url.replace('https://', '')}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 mt-4 mb-4">
            <button className="flex-1 bg-[#0095F6] text-white font-semibold py-1.5 rounded-lg text-sm active:opacity-70">Seguir</button>
            <button className="flex-1 bg-[#262626] text-white font-semibold py-1.5 rounded-lg text-sm active:bg-[#1a1a1a]" onClick={() => setShowDirect(true)}>Mensagem</button>
          </div>

          {/* Destaques */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {['Privado', 'Close Fr...', 'Viagens'].map((name, i) => (
              <div key={i} className="flex flex-col items-center gap-1 min-w-[64px] cursor-pointer" onClick={() => setShowModal(true)}>
                <div className="w-[62px] h-[62px] rounded-full border border-[#262626] bg-[#1a1a1a] flex items-center justify-center text-[#888]">
                  <Icons.Lock />
                </div>
                <span className="text-[11px] text-white">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-[#262626] h-[44px]">
          <div className="flex-1 flex items-center justify-center border-b border-white text-white cursor-pointer"><Icons.Grid /></div>
          <div className="flex-1 flex items-center justify-center text-[#888] cursor-pointer"><Icons.Video /></div>
          <div className="flex-1 flex items-center justify-center text-[#888] cursor-pointer"><Icons.Tag /></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-0.5">
          {postItems.slice(0, 15).map((post, i) => {
            const img = post?.thumbnail_url || post?.display_url || `https://picsum.photos/300/300?random=${i + 500}`;
            return (
              <div key={i} className="relative aspect-square bg-[#222] cursor-pointer overflow-hidden group" onClick={() => setShowModal(true)}>
                <img src={img} className="w-full h-full object-cover blur-[6px] brightness-75 transition-all group-hover:brightness-50" alt="grid" />
                {i % 3 === 0 && <div className="absolute top-2 right-2 text-white drop-shadow-md"><span className="scale-75"><Icons.Grid /></span></div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Direct Overlay
  const DirectOverlay = () => {
    const maleNames = ["joao.silva", "pedro_henrique", "lucas.m", "marcos_v", "felipe_neto"];
    const femaleNames = ["ana.clara", "julia_m", "mariana_x", "bruna.s", "larissa_manoela"];
    // Se busco homem (gender='M'), mostra mulheres no direct
    const names = gender === 'M' ? femaleNames : maleNames;
    const msgs = ["Enviou uma foto 🔥", "Posso te ver hoje?", "Respondeu ao seu story", "Olha isso...", "Vídeo 📹"];

    return (
      <div className={`fixed inset-0 bg-black z-[60] transition-transform duration-300 ${showDirect ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-[44px] flex items-center justify-between px-4 border-b border-[#262626]">
          <div className="cursor-pointer" onClick={() => setShowDirect(false)}><Icons.Back /></div>
          <div className="font-bold text-base">Direct</div>
          <Icons.Video />
        </div>
        <div className="pt-2">
          {names.map((name, i) => (
            <div key={i} className="flex items-center px-4 py-2 cursor-pointer active:bg-[#121212]" onClick={() => setShowModal(true)}>
              <div className="relative mr-3.5">
                <img src={`https://picsum.photos/60/60?random=${i + 2000}`} className="w-14 h-14 rounded-full object-cover blur-[4px]" alt="avatar" />
                <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-[#00FF00] rounded-full border-2 border-black" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-white truncate mb-0.5 font-normal filter blur-[3px]">{name}</div>
                <div className="text-[13px] text-[#a8a8a8] flex items-center">
                  <span className="font-semibold text-white truncate">{msgs[i % msgs.length]}</span>
                  <span className="mx-1">•</span>
                  <span>{i + 2} min</span>
                </div>
              </div>
              <div className="text-[#888]"><Icons.Camera /></div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Modal de Bloqueio
  const LockModal = () => {
    if (!showModal) return null;
    return (
      <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
        <div className="bg-[#262626] w-full max-w-[280px] rounded-xl overflow-hidden text-center">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-3 text-white">Conteúdo Protegido</h3>
            <p className="text-[13px] text-[#a8a8a8] leading-snug">
              Este perfil contém fotos e mensagens privadas. Confirme que você é maior de 18 anos para desbloquear o acesso completo.
            </p>
          </div>
          <div className="flex border-t border-[#363636]">
            <button className="flex-1 py-3.5 text-sm font-semibold text-[#a8a8a8] border-r border-[#363636] active:bg-[#1a1a1a]" onClick={() => setShowModal(false)}>Cancelar</button>
            <button className="flex-1 py-3.5 text-sm font-semibold text-[#0095F6] active:bg-[#1a1a1a]" onClick={() => window.location.href = LINK_REDIRECT}>Confirmar</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="text-[#F5F5F5] font-sans antialiased">
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {view === 'HOME' && <HomeView />}
      {view === 'HACKING' && <HackingView />}
      {view === 'PROFILE' && <ProfileView />}
      
      <DirectOverlay />
      <LockModal />
    </div>
  );
};

export default Index;
export default Index;
