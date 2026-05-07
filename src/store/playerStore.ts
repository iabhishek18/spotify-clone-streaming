import { create } from 'zustand';
import { Howl } from 'howler';

interface Song { id: string; title: string; artist: string; album: string; coverUrl: string; audioUrl: string; duration: number; }

interface PlayerState {
  currentSong: Song | null; queue: Song[]; queueIndex: number; isPlaying: boolean; volume: number; progress: number; duration: number; shuffle: boolean; repeat: 'off' | 'all' | 'one'; howl: Howl | null;
  playSong: (song: Song) => void; playQueue: (songs: Song[], idx: number) => void; togglePlay: () => void; nextTrack: () => void; prevTrack: () => void; setVolume: (v: number) => void; seek: (p: number) => void; toggleShuffle: () => void; toggleRepeat: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentSong: null, queue: [], queueIndex: 0, isPlaying: false, volume: 0.7, progress: 0, duration: 0, shuffle: false, repeat: 'off', howl: null,

  playSong: (song) => {
    const { howl } = get();
    if (howl) howl.unload();
    const newHowl = new Howl({
      src: [song.audioUrl], html5: true, volume: get().volume,
      onplay: () => { set({ isPlaying: true, duration: newHowl.duration() }); const tick = () => { if (newHowl.playing()) { set({ progress: newHowl.seek() as number }); requestAnimationFrame(tick); } }; requestAnimationFrame(tick); },
      onend: () => { if (get().repeat === 'one') newHowl.play(); else get().nextTrack(); },
    });
    newHowl.play();
    set({ currentSong: song, howl: newHowl, progress: 0 });
  },
  playQueue: (songs, idx) => { set({ queue: songs, queueIndex: idx }); get().playSong(songs[idx]); },
  togglePlay: () => { const { howl, isPlaying } = get(); if (!howl) return; if (isPlaying) { howl.pause(); set({ isPlaying: false }); } else { howl.play(); set({ isPlaying: true }); } },
  nextTrack: () => { const { queue, queueIndex, shuffle, repeat } = get(); if (!queue.length) return; let next: number; if (shuffle) next = Math.floor(Math.random() * queue.length); else if (queueIndex < queue.length - 1) next = queueIndex + 1; else if (repeat === 'all') next = 0; else { set({ isPlaying: false }); return; } set({ queueIndex: next }); get().playSong(queue[next]); },
  prevTrack: () => { const { queue, queueIndex, progress } = get(); if (progress > 3) { get().seek(0); return; } const prev = queueIndex > 0 ? queueIndex - 1 : queue.length - 1; set({ queueIndex: prev }); get().playSong(queue[prev]); },
  setVolume: (v) => { get().howl?.volume(v); set({ volume: v }); },
  seek: (p) => { get().howl?.seek(p); set({ progress: p }); },
  toggleShuffle: () => set((s) => ({ shuffle: !s.shuffle })),
  toggleRepeat: () => set((s) => ({ repeat: s.repeat === 'off' ? 'all' : s.repeat === 'all' ? 'one' : 'off' })),
}));
