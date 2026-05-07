# Spotify Clone — Music Streaming App

> Full-featured music streaming with Howler.js audio player (play/pause/seek/shuffle/repeat), playlists, search, and Stripe subscriptions.

## 🚀 Overview

A Spotify-identical music streaming platform featuring a fully functional audio player powered by Howler.js with queue management, shuffle, repeat modes, and volume control. Built with Next.js 14 and Supabase for auth/database/storage, with Stripe for premium subscription billing.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎵 Audio Player | Full Howler.js player (play/pause/seek/volume) |
| 🔀 Shuffle & Repeat | Shuffle queue, repeat all/one/off |
| 📋 Playlists | Create, edit, delete playlists |
| 🔍 Search | Search songs by title/artist/album |
| 💳 Premium Plans | Stripe subscription billing |
| 📚 Library | Liked songs, your playlists |
| 🖤 Dark UI | Spotify-identical dark theme |
| ⏭️ Queue System | Next/previous with queue management |

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, Tailwind CSS |
| Audio | Howler.js |
| Backend | Supabase (Auth, DB, Storage) |
| State | Zustand |
| Payments | Stripe |

## ⚡ Quick Start

```bash
npm install
cp .env.example .env.local
# Add Supabase + Stripe credentials
npm run dev
```

## 📄 License

MIT
