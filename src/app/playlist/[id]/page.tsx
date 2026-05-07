'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getPlaylistById, formatDuration, songs as allSongs } from '@/lib/music';
import { usePlayerStore } from '@/store/playerStore';

export default function PlaylistPage() {
  const params = useParams();
  const playlist = getPlaylistById(params.id as string);
  const { playQueue, currentSong } = usePlayerStore();

  if (!playlist) {
    return (
      <div className="min-h-screen bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Playlist not found</p>
          <Link href="/" className="text-green-400 text-sm mt-2 inline-block hover:underline">Go Home</Link>
        </div>
      </div>
    );
  }

  const totalDuration = playlist.songs.reduce((sum, s) => sum + s.duration, 0);
  const hours = Math.floor(totalDuration / 3600);
  const mins = Math.floor((totalDuration % 3600) / 60);

  return (
    <div className="min-h-screen bg-[#121212] pb-28">
      <header className="bg-gradient-to-b from-[#3d2b7a] to-[#121212] p-6 pt-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 max-w-5xl mx-auto">
          <img src={playlist.coverUrl} alt={playlist.name} className="w-48 h-48 rounded shadow-2xl object-cover" />
          <div>
            <p className="text-xs text-gray-300 uppercase font-semibold">Playlist</p>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-2">{playlist.name}</h1>
            <p className="text-gray-300 text-sm mt-3">{playlist.description}</p>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
              <span className="text-white font-semibold">{playlist.createdBy}</span>
              <span>•</span>
              <span>{playlist.songs.length} songs</span>
              <span>•</span>
              <span>{hours > 0 ? `${hours} hr ` : ''}{mins} min</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 mt-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => playQueue(playlist.songs, 0)} className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center hover:scale-105 hover:bg-green-400 transition shadow-xl">
            <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347A1.125 1.125 0 015.25 18.347V5.653z"/></svg>
          </button>
        </div>

        <div className="border-b border-white/10 pb-2 mb-2 flex items-center gap-4 px-4 text-xs text-gray-400 uppercase">
          <span className="w-8 text-center">#</span>
          <span className="flex-1">Title</span>
          <span className="w-20 text-right">Duration</span>
        </div>

        <div className="space-y-0.5">
          {playlist.songs.map((song, idx) => {
            const isPlaying = currentSong?.id === song.id;
            return (
              <button key={song.id} onClick={() => playQueue(playlist.songs, idx)} className={`w-full flex items-center gap-4 px-4 py-2.5 rounded hover:bg-white/10 transition text-left group ${isPlaying ? 'bg-white/5' : ''}`}>
                <span className={`w-8 text-center text-sm ${isPlaying ? 'text-green-400' : 'text-gray-400 group-hover:hidden'}`}>{isPlaying ? '♪' : idx + 1}</span>
                <svg className="w-4 h-4 text-white hidden group-hover:block ml-2" fill="currentColor" viewBox="0 0 24 24"><path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347A1.125 1.125 0 015.25 18.347V5.653z"/></svg>
                <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded" />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm truncate ${isPlaying ? 'text-green-400' : 'text-white'}`}>{song.title}</p>
                  <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                </div>
                <span className="text-xs text-gray-400 w-20 text-right">{formatDuration(song.duration)}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
