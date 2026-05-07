export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  duration: number;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  coverUrl: string;
  songs: Song[];
  createdBy: string;
  isPublic: boolean;
}

export const songs: Song[] = [
  { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', coverUrl: 'https://picsum.photos/seed/blind/300/300', audioUrl: '', duration: 200 },
  { id: '2', title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', coverUrl: 'https://picsum.photos/seed/levit/300/300', audioUrl: '', duration: 203 },
  { id: '3', title: 'Stay', artist: 'The Kid LAROI & Justin Bieber', album: 'F*ck Love 3', coverUrl: 'https://picsum.photos/seed/stay1/300/300', audioUrl: '', duration: 141 },
  { id: '4', title: 'Peaches', artist: 'Justin Bieber', album: 'Justice', coverUrl: 'https://picsum.photos/seed/peach/300/300', audioUrl: '', duration: 198 },
  { id: '5', title: 'Good 4 U', artist: 'Olivia Rodrigo', album: 'SOUR', coverUrl: 'https://picsum.photos/seed/good4/300/300', audioUrl: '', duration: 178 },
  { id: '6', title: 'Montero', artist: 'Lil Nas X', album: 'Montero', coverUrl: 'https://picsum.photos/seed/monte/300/300', audioUrl: '', duration: 137 },
  { id: '7', title: 'Heat Waves', artist: 'Glass Animals', album: 'Dreamland', coverUrl: 'https://picsum.photos/seed/heatw/300/300', audioUrl: '', duration: 238 },
  { id: '8', title: 'Shivers', artist: 'Ed Sheeran', album: '=', coverUrl: 'https://picsum.photos/seed/shivr/300/300', audioUrl: '', duration: 207 },
  { id: '9', title: 'Bad Habits', artist: 'Ed Sheeran', album: '=', coverUrl: 'https://picsum.photos/seed/badha/300/300', audioUrl: '', duration: 231 },
  { id: '10', title: 'Kiss Me More', artist: 'Doja Cat ft. SZA', album: 'Planet Her', coverUrl: 'https://picsum.photos/seed/kissm/300/300', audioUrl: '', duration: 208 },
  { id: '11', title: 'Butter', artist: 'BTS', album: 'Butter', coverUrl: 'https://picsum.photos/seed/buttr/300/300', audioUrl: '', duration: 164 },
  { id: '12', title: 'drivers license', artist: 'Olivia Rodrigo', album: 'SOUR', coverUrl: 'https://picsum.photos/seed/drivr/300/300', audioUrl: '', duration: 242 },
  { id: '13', title: 'Astronaut In The Ocean', artist: 'Masked Wolf', album: 'Astronomical', coverUrl: 'https://picsum.photos/seed/astro/300/300', audioUrl: '', duration: 132 },
  { id: '14', title: 'Save Your Tears', artist: 'The Weeknd', album: 'After Hours', coverUrl: 'https://picsum.photos/seed/savet/300/300', audioUrl: '', duration: 215 },
  { id: '15', title: 'Deja Vu', artist: 'Olivia Rodrigo', album: 'SOUR', coverUrl: 'https://picsum.photos/seed/dejav/300/300', audioUrl: '', duration: 215 },
  { id: '16', title: 'Industry Baby', artist: 'Lil Nas X & Jack Harlow', album: 'Montero', coverUrl: 'https://picsum.photos/seed/indus/300/300', audioUrl: '', duration: 212 },
  { id: '17', title: 'Happier Than Ever', artist: 'Billie Eilish', album: 'Happier Than Ever', coverUrl: 'https://picsum.photos/seed/happi/300/300', audioUrl: '', duration: 298 },
  { id: '18', title: 'Essence', artist: 'Wizkid ft. Tems', album: 'Made in Lagos', coverUrl: 'https://picsum.photos/seed/essen/300/300', audioUrl: '', duration: 242 },
];

export const playlists: Playlist[] = [
  { id: 'pl-1', name: 'Today\'s Top Hits', description: 'The biggest songs right now', coverUrl: 'https://picsum.photos/seed/tophits/300/300', songs: songs.slice(0, 6), createdBy: 'Spotify', isPublic: true },
  { id: 'pl-2', name: 'Chill Vibes', description: 'Relax and unwind with these mellow tracks', coverUrl: 'https://picsum.photos/seed/chill/300/300', songs: songs.slice(4, 10), createdBy: 'Spotify', isPublic: true },
  { id: 'pl-3', name: 'Workout Pump', description: 'High energy tracks for your workout', coverUrl: 'https://picsum.photos/seed/workout/300/300', songs: songs.slice(6, 13), createdBy: 'Spotify', isPublic: true },
  { id: 'pl-4', name: 'Late Night Drive', description: 'Songs for midnight drives', coverUrl: 'https://picsum.photos/seed/drive/300/300', songs: songs.slice(10, 18), createdBy: 'Spotify', isPublic: true },
  { id: 'pl-5', name: 'Throwback Jams', description: 'Take a trip down memory lane', coverUrl: 'https://picsum.photos/seed/throwback/300/300', songs: songs.slice(2, 9), createdBy: 'You', isPublic: false },
  { id: 'pl-6', name: 'Focus Flow', description: 'Instrumental for deep work', coverUrl: 'https://picsum.photos/seed/focus/300/300', songs: songs.slice(7, 14), createdBy: 'Spotify', isPublic: true },
];

export function searchMusic(query: string): { songs: Song[]; playlists: Playlist[] } {
  const q = query.toLowerCase();
  return {
    songs: songs.filter((s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q) || s.album.toLowerCase().includes(q)),
    playlists: playlists.filter((p) => p.name.toLowerCase().includes(q)),
  };
}

export function getPlaylistById(id: string): Playlist | undefined {
  return playlists.find((p) => p.id === id);
}

export function formatDuration(seconds: number): string {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, '0')}`;
}
