import { useState, KeyboardEvent } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

export function SearchInput({ onSearch, loading }: SearchInputProps) {
  const [value, setValue] = useState('');

  const handleSearch = () => {
    if (value.trim() && !loading) {
      onSearch(value);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 instagram-gradient rounded-xl opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity duration-500" />
        <div className="relative flex items-center glass rounded-xl overflow-hidden">
          <div className="pl-4 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="@username"
            disabled={loading}
            className={cn(
              "flex-1 bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground",
              "focus:outline-none text-base font-medium",
              "disabled:opacity-50"
            )}
          />
          <button
            onClick={handleSearch}
            disabled={loading || !value.trim()}
            className={cn(
              "px-6 py-4 font-semibold transition-all duration-300",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center gap-2"
            )}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Buscando...</span>
              </>
            ) : (
              <span>Buscar</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
