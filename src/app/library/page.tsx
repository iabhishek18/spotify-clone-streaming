'use client';

import Link from 'next/link';
import { playlists } from '@/lib/music';

export default function LibraryPage() {
  const userPlaylists = playlists.filter((p) => p.createdBy === 'You');
  const publicPlaylists = playlists.filter((p) => p.isPublic);

  return (
    <div className="min-h-screen bg-[#121212] p-6 pb-28">
      <h1 className="text-2xl font-bold text-white mb-6">Your Library</h1>

      <div className="flex gap-2 mb-6">
        <button className="px-4 py-1.5 bg-white text-black text-sm font-medium rounded-full">Playlists</button>
        <button className="px-4 py-1.5 bg-[#2a2a2a] text-white text-sm font-medium rounded-full hover:bg-[#3a3a3a] transition">Artists</button>
        <button className="px-4 py-1.5 bg-[#2a2a2a] text-white text-sm font-medium rounded-full hover:bg-[#3a3a3a] transition">Albums</button>
      </div>

      {userPlaylists.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-white mb-3">Your Playlists</h2>
          <div className="space-y-2">
            {userPlaylists.map((pl) => (
              <Link key={pl.id} href={`/playlist/${pl.id}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition">
                <img src={pl.coverUrl} alt={pl.name} className="w-14 h-14 rounded object-cover" />
                <div>
                  <p className="text-white font-medium">{pl.name}</p>
                  <p className="text-sm text-gray-400">{pl.songs.length} songs • {pl.createdBy}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold text-white mb-3">All Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {publicPlaylists.map((pl) => (
            <Link key={pl.id} href={`/playlist/${pl.id}`} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition">
              <img src={pl.coverUrl} alt={pl.name} className="w-full aspect-square rounded-md object-cover mb-3 shadow-lg" />
              <p className="text-sm text-white font-semibold truncate">{pl.name}</p>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{pl.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
