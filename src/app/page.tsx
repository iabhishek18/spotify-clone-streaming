'use client';

import { useState, useEffect } from 'react';
import { Player } from '@/components/Player';

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
}

export default function Home() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    setSongs([
      { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', coverUrl: 'https://picsum.photos/300/300?random=1', audioUrl: '', duration: 200 },
      { id: '2', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', coverUrl: 'https://picsum.photos/300/300?random=2', audioUrl: '', duration: 203 },
      { id: '3', title: 'Stay', artist: 'Justin Bieber', album: 'Justice', coverUrl: 'https://picsum.photos/300/300?random=3', audioUrl: '', duration: 141 },
      { id: '4', title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', coverUrl: 'https://picsum.photos/300/300?random=4', audioUrl: '', duration: 198 },
      { id: '5', title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', coverUrl: 'https://picsum.photos/300/300?random=5', audioUrl: '', duration: 178 },
      { id: '6', title: 'Montero', artist: 'Lil Nas X', album: 'Montero', coverUrl: 'https://picsum.photos/300/300?random=6', audioUrl: '', duration: 137 },
    ]);
  }, []);

  return (
    <div className="flex h-screen bg-black">
      <aside className="w-64 bg-black p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-white">Spotify</h1>
        <nav className="flex flex-col gap-3">
          <a href="#" className="text-white font-semibold">Home</a>
          <a href="#" className="text-gray-400 hover:text-white">Search</a>
          <a href="#" className="text-gray-400 hover:text-white">Your Library</a>
        </nav>
        <div className="mt-8">
          <h3 className="text-sm text-gray-400 uppercase tracking-wider mb-3">Playlists</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-white cursor-pointer">Liked Songs</li>
            <li className="hover:text-white cursor-pointer">Discover Weekly</li>
            <li className="hover:text-white cursor-pointer">Daily Mix 1</li>
          </ul>
        </div>
      </aside>

      <main className="flex-1 bg-gradient-to-b from-[#1a1a2e] to-[#121212] overflow-y-auto p-8 pb-32">
        <h2 className="text-2xl font-bold text-white mb-6">Good evening</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {songs.slice(0, 6).map((song) => (
            <div key={song.id} className="flex items-center gap-4 bg-white/5 rounded-md overflow-hidden hover:bg-white/10 transition cursor-pointer group">
              <img src={song.coverUrl} alt={song.title} className="w-16 h-16 object-cover" />
              <span className="text-white font-semibold text-sm">{song.title}</span>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-white mb-4">Recently Played</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {songs.map((song) => (
            <div key={song.id} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition cursor-pointer group">
              <img src={song.coverUrl} alt={song.title} className="w-full aspect-square object-cover rounded-md mb-4 shadow-lg" />
              <h3 className="text-white font-semibold text-sm truncate">{song.title}</h3>
              <p className="text-gray-400 text-xs mt-1 truncate">{song.artist}</p>
            </div>
          ))}
        </div>
      </main>

      <Player />
    </div>
  );
}
