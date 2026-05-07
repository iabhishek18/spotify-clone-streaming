'use client';

import { useState } from 'react';
import Link from 'next/link';
import { searchMusic, formatDuration } from '@/lib/music';
import { usePlayerStore } from '@/store/playerStore';
import { songs as allSongs } from '@/lib/music';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { playQueue } = usePlayerStore();
  const results = query.length >= 2 ? searchMusic(query) : { songs: [], playlists: [] };

  const categories = [
    { name: 'Pop', color: 'from-pink-500 to-rose-600' },
    { name: 'Hip-Hop', color: 'from-orange-500 to-amber-600' },
    { name: 'Rock', color: 'from-red-600 to-red-800' },
    { name: 'Electronic', color: 'from-cyan-500 to-blue-600' },
    { name: 'R&B', color: 'from-purple-500 to-indigo-600' },
    { name: 'Jazz', color: 'from-green-500 to-emerald-700' },
    { name: 'Classical', color: 'from-amber-400 to-yellow-600' },
    { name: 'Indie', color: 'from-teal-500 to-cyan-700' },
  ];

  return (
    <div className="min-h-screen bg-[#121212] p-6 pb-28">
      <div className="max-w-3xl mx-auto mb-8">
        <h1 className="text-2xl font-bold text-white mb-4">Search</h1>
        <input type="text" autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What do you want to listen to?" className="w-full px-5 py-3.5 bg-white rounded-full text-black text-sm font-medium placeholder:text-gray-500 outline-none" />
      </div>

      {query.length < 2 ? (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Browse all</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.name} className={`bg-gradient-to-br ${cat.color} rounded-lg p-5 h-[140px] relative overflow-hidden cursor-pointer hover:scale-105 transition-transform`}>
                <h3 className="text-white font-bold text-lg">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {results.songs.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-bold text-white mb-3">Songs</h2>
              <div className="space-y-1">
                {results.songs.map((song, idx) => (
                  <button key={song.id} onClick={() => playQueue(allSongs, allSongs.findIndex((s) => s.id === song.id))} className="w-full flex items-center gap-3 p-2 rounded hover:bg-white/10 transition text-left">
                    <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{song.title}</p>
                      <p className="text-xs text-gray-400">{song.artist}</p>
                    </div>
                    <span className="text-xs text-gray-400">{formatDuration(song.duration)}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
          {results.playlists.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-white mb-3">Playlists</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.playlists.map((pl) => (
                  <Link key={pl.id} href={`/playlist/${pl.id}`} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition">
                    <img src={pl.coverUrl} alt={pl.name} className="w-full aspect-square rounded-md object-cover mb-3" />
                    <p className="text-sm text-white font-semibold truncate">{pl.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{pl.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
          {results.songs.length === 0 && results.playlists.length === 0 && (
            <p className="text-center text-gray-400 py-16">No results for &quot;{query}&quot;</p>
          )}
        </div>
      )}
    </div>
  );
}
