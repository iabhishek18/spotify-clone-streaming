'use client';
import { usePlayerStore } from '@/store/playerStore';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaRandom, FaRedo } from 'react-icons/fa';

export function Player() {
  const { currentSong, isPlaying, progress, duration, volume, shuffle, repeat, togglePlay, nextTrack, prevTrack, setVolume, seek, toggleShuffle, toggleRepeat } = usePlayerStore();
  if (!currentSong) return null;
  const fmt = (s: number) => `${Math.floor(s/60)}:${Math.floor(s%60).toString().padStart(2,'0')}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#181818] border-t border-[#282828] px-4 py-3 flex items-center z-50">
      <div className="flex items-center gap-3 w-1/4">
        <img src={currentSong.coverUrl} alt="" className="w-14 h-14 rounded" />
        <div><p className="text-white text-sm font-medium truncate">{currentSong.title}</p><p className="text-gray-400 text-xs">{currentSong.artist}</p></div>
      </div>
      <div className="flex flex-col items-center w-2/4">
        <div className="flex items-center gap-4">
          <button onClick={toggleShuffle} className={shuffle ? 'text-green-500' : 'text-gray-400'}><FaRandom /></button>
          <button onClick={prevTrack} className="text-gray-400 hover:text-white"><FaStepBackward /></button>
          <button onClick={togglePlay} className="bg-white rounded-full p-2 hover:scale-105">{isPlaying ? <FaPause className="text-black" /> : <FaPlay className="text-black ml-0.5" />}</button>
          <button onClick={nextTrack} className="text-gray-400 hover:text-white"><FaStepForward /></button>
          <button onClick={toggleRepeat} className={repeat !== 'off' ? 'text-green-500' : 'text-gray-400'}><FaRedo /></button>
        </div>
        <div className="flex items-center gap-2 w-full mt-1">
          <span className="text-xs text-gray-400">{fmt(progress)}</span>
          <input type="range" min={0} max={duration||100} value={progress} onChange={(e)=>seek(+e.target.value)} className="flex-1 h-1 accent-green-500" />
          <span className="text-xs text-gray-400">{fmt(duration)}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 w-1/4 justify-end">
        <FaVolumeUp className="text-gray-400" />
        <input type="range" min={0} max={1} step={0.01} value={volume} onChange={(e)=>setVolume(+e.target.value)} className="w-24 h-1 accent-green-500" />
      </div>
    </div>
  );
}
