'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { playlists, songs } from '@/lib/music';
import { Player } from '@/components/Player';
import { usePlayerStore } from '@/store/playerStore';

export default function Home() {
  const pathname = usePathname();
  const { playQueue } = usePlayerStore();

  const recentPlaylists = playlists.slice(0, 6);
  const madeForYou = playlists.slice(2, 6);

  return (
    <div className="flex h-screen bg-black overflow-hidden">
      <aside className="w-[280px] bg-black flex flex-col p-2 gap-2 shrink-0">
        <div className="bg-[#121212] rounded-lg p-4">
          <Link href="/" className="flex items-center gap-3 text-white font-bold text-lg mb-5">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 14.36c-.2.28-.56.36-.84.2-2.32-1.4-5.24-1.72-8.68-.96-.32.08-.64-.12-.72-.44-.08-.32.12-.64.44-.72 3.76-.84 7-4.8 9.56-.28.24.24.2.56-.04.76-.04.04-.04.04 0 0zm1.24-2.72c-.24.36-.68.44-1.04.2-2.64-1.64-6.68-2.12-9.8-1.16-.4.12-.8-.12-.92-.48-.12-.4.12-.8.48-.92 3.56-1.08 8-56 10.96-1.44.36.24.48.72.24 1.04-.04.04-.04.04 0 0zm.12-2.8C14.48 8.68 8.72 8.44 5.48 9.4c-.48.16-.96-.12-1.12-.6-.16-.44.12-.92.6-1.08 3.72-1.12 9.92-.88 13.84 1.36.44.24.56.8.32 1.2-.24.36-.8.48-1.2.24-.04-.04-.04-.04 0 0z"/></svg>
            Spotify
          </Link>
          <nav className="space-y-3">
            <Link href="/" className={`flex items-center gap-3 text-sm font-semibold ${pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'} transition`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33z"/></svg>
              Home
            </Link>
            <Link href="/search" className={`flex items-center gap-3 text-sm font-semibold ${pathname === '/search' ? 'text-white' : 'text-gray-400 hover:text-white'} transition`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"/></svg>
              Search
            </Link>
          </nav>
        </div>

        <div className="bg-[#121212] rounded-lg p-4 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <Link href="/library" className="flex items-center gap-3 text-gray-400 hover:text-white text-sm font-semibold transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zM15.5 2.134A1 1 0 0014 3v18a1 1 0 001.5.866l7-4.5A1 1 0 0023 16.5v-9a1 1 0 00-.5-.866l-7-4.5z"/></svg>
              Your Library
            </Link>
          </div>
          <div className="space-y-2">
            {playlists.map((pl) => (
              <Link key={pl.id} href={`/playlist/${pl.id}`} className="flex items-center gap-3 p-2 rounded hover:bg-white/10 transition group">
                <img src={pl.coverUrl} alt={pl.name} className="w-12 h-12 rounded object-cover" />
                <div className="min-w-0">
                  <p className="text-sm text-white truncate group-hover:text-green-400 transition">{pl.name}</p>
                  <p className="text-xs text-gray-400 truncate">Playlist • {pl.createdBy}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-gradient-to-b from-[#1a1a2e] to-[#121212] overflow-y-auto rounded-lg m-2 pb-28">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Good evening</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
            {recentPlaylists.map((pl) => (
              <Link key={pl.id} href={`/playlist/${pl.id}`} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 rounded overflow-hidden transition group">
                <img src={pl.coverUrl} alt={pl.name} className="w-16 h-16 object-cover" />
                <span className="text-white font-semibold text-sm truncate pr-4">{pl.name}</span>
              </Link>
            ))}
          </div>

          <h2 className="text-xl font-bold text-white mb-4">Made For You</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-10">
            {madeForYou.map((pl) => (
              <Link key={pl.id} href={`/playlist/${pl.id}`} className="bg-[#181818] p-4 rounded-lg hover:bg-[#282828] transition group cursor-pointer">
                <img src={pl.coverUrl} alt={pl.name} className="w-full aspect-square object-cover rounded-md mb-4 shadow-lg" />
                <h3 className="text-white font-semibold text-sm truncate">{pl.name}</h3>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">{pl.description}</p>
              </Link>
            ))}
          </div>

          <h2 className="text-xl font-bold text-white mb-4">Popular Tracks</h2>
          <div className="space-y-1">
            {songs.slice(0, 10).map((song, idx) => (
              <button key={song.id} onClick={() => playQueue(songs, idx)} className="w-full flex items-center gap-4 p-2 rounded hover:bg-white/10 transition text-left group">
                <span className="w-5 text-center text-sm text-gray-400 group-hover:hidden">{idx + 1}</span>
                <svg className="w-5 h-5 text-white hidden group-hover:block" fill="currentColor" viewBox="0 0 24 24"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347A1.125 1.125 0 015.25 18.347V5.653z"/></svg>
                <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{song.title}</p>
                  <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                </div>
                <span className="text-xs text-gray-400">{Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </div>
      </main>

      <Player />
    </div>
  );
}
