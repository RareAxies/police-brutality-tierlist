'use client';

import React, { useState } from 'react';

interface Tweet {
  id: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  reposts: number;
  views: number;
  avatarUrl: string;
  thumbnailUrl: string;
  tweetUrl: string;
}

const initialTweets: Tweet[] = [
  {
    id: "2078216763024535716",
    author: "The media SOI 🇬🇧",
    handle: "@MediaSOI",
    content: "Up Scotland police pull a taser out on concerned parents after migrants kept a 14 year old girl against her will locked in their flat for 3 days",
    likes: 2000,
    reposts: 82,
    views: 41400,
    avatarUrl: "https://pbs.twimg.com/profile_images/2074137677620768768/yeoj3BGI.jpg",
    thumbnailUrl: "https://i.postimg.cc/fRHgbzKL/1.png",
    tweetUrl: "https://x.com/MediaSOI/status/2078216763024535716"
  },
  {
    id: "2075539170504667425",
    author: "Rare | ♻️🇬🇧",
    handle: "@RareAxies",
    content: "Sadiq Khan responds to images of Moroccan football fans rioting in London:\n\nI've seen the videos from Edgware Road & I'm proud of our brave Met officers for their tactical retreat, showing true community sensitivity! Credit to those passionate Moroccan fans for bringing such lively energy to our streets. London is safer with me in charge. Alhamdulillah!",
    likes: 49,
    reposts: 19,
    views: 7410,
    avatarUrl: "https://pbs.twimg.com/profile_images/1750000000000000000/default.jpg",
    thumbnailUrl: "https://i.postimg.cc/FHPnKrZY/2.png",
    tweetUrl: "https://x.com/RareAxies/status/2075539170504667425"
  },
  {
    id: "2074041176559108555",
    author: "UNN",
    handle: "@UnityNewsNet",
    content: "British Constables are taught to hate the people.\n\nDon't trust them.\n\nDon't consent to them.",
    likes: 3100,
    reposts: 808,
    views: 369000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1750000000000000000/default.jpg",
    thumbnailUrl: "https://i.postimg.cc/nhdwLFkD/3.png",
    tweetUrl: "https://x.com/UnityNewsNet/status/2074041176559108555"
  },
  {
    id: "2074418780726292717",
    author: "Retard Radar",
    handle: "@FullRetardRadar",
    content: "Absolute state of British police.\nInvader casually walks up to a police car, pops the door like it’s his personal Uber, springs his fellow criminal invader, and they both bolt while the coppers just stand there.",
    likes: 75,
    reposts: 40,
    views: 52300,
    avatarUrl: "https://pbs.twimg.com/profile_images/1750000000000000000/default.jpg",
    thumbnailUrl: "https://i.postimg.cc/7ZBQLHVb/4.png",
    tweetUrl: "https://x.com/FullRetardRadar/status/2074418780726292717"
  },
  {
    id: "2075556663164109257",
    author: "Turning Point UK 🇬🇧",
    handle: "@TPointUK",
    content: "West Yorkshire police officer punches 16-year-old girl with special needs in the face.\n\nThey wouldn't treat an illegal migrant like this.",
    likes: 5100,
    reposts: 2400,
    views: 184000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1704571042524491776/ieHPB868.jpg",
    thumbnailUrl: "https://i.postimg.cc/hGfZzkyz/5.png",
    tweetUrl: "https://x.com/TPointUK/status/2075556663164109257"
  },
  {
    id: "2077145657932968156",
    author: "Russian Garbage Human",
    handle: "@RusGarbageHuman",
    content: "The police officer walks straight past the armed foreigners and attacks the native holding some sticks.\n\nYou should be coming up to such officers, recording his face, voice and collar number.",
    likes: 714,
    reposts: 72,
    views: 8196,
    avatarUrl: "https://pbs.twimg.com/profile_images/2008318949448892417/v7L-39OP.jpg",
    thumbnailUrl: "https://i.postimg.cc/mrtpzvXF/6.png",
    tweetUrl: "https://x.com/RusGarbageHuman/status/2077145657932968156"
  },
];

const tiers = ['S', 'A', 'B', 'C', 'D', 'E'];

export default function TierListApp() {
  const [availableTweets, setAvailableTweets] = useState<Tweet[]>(initialTweets);
  const [tierLists, setTierLists] = useState<Record<string, Tweet[]>>({
    S: [], A: [], B: [], C: [], D: [], E: []
  });

  const onDragStart = (e: React.DragEvent, tweet: Tweet) => {
    e.dataTransfer.setData('tweet', JSON.stringify(tweet));
  };

  const onDrop = (e: React.DragEvent, tier: string) => {
    e.preventDefault();
    const tweetData = JSON.parse(e.dataTransfer.getData('tweet'));
    const tweet = availableTweets.find(t => t.id === tweetData.id);
    if (tweet) {
      setTierLists(prev => ({ ...prev, [tier]: [...prev[tier], tweet] }));
      setAvailableTweets(prev => prev.filter(t => t.id !== tweet.id));
    }
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">UK Police Brutality Tier List</h1>
        <p className="text-gray-400 text-center mb-10">Drag posts into tiers — focus on the visual evidence</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Available Posts */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold mb-6">Available Posts</h2>
            <div className="space-y-6">
              {availableTweets.map(tweet => (
                <div
                  key={tweet.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, tweet)}
                  className="bg-[#16181c] border border-[#2f3336] rounded-2xl p-5 cursor-grab hover:border-gray-500 transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-5">
                    {/* LEFT: Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={tweet.avatarUrl} 
                          alt={tweet.author} 
                          className="w-11 h-11 rounded-full object-cover bg-gray-700"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png'; }}
                        />
                        <div>
                          <div className="font-bold">{tweet.author}</div>
                          <div className="text-gray-500 text-sm">{tweet.handle}</div>
                        </div>
                      </div>
                      <p className="text-[15px] leading-relaxed whitespace-pre-line">{tweet.content}</p>
                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-500">
                        <span>❤️ {tweet.likes.toLocaleString()}</span>
                        <span>🔁 {tweet.reposts.toLocaleString()}</span>
                        <span>👁️ {tweet.views.toLocaleString()}</span>
                      </div>
                      <a 
                        href={tweet.tweetUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 text-sm mt-3 inline-block hover:underline"
                      >
                        View on X →
                      </a>
                    </div>

                    {/* RIGHT: Thumbnail */}
                    <div className="w-full md:w-80 flex-shrink-0">
                      <img 
                        src={tweet.thumbnailUrl} 
                        alt="Evidence thumbnail" 
                        className="w-full h-auto rounded-xl border border-[#2f3336] object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier List */}
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-semibold mb-6">Your Tier List</h2>
            <div className="space-y-6">
              {tiers.map(tier => (
                <div
                  key={tier}
                  onDrop={(e) => onDrop(e, tier)}
                  onDragOver={onDragOver}
                  className="bg-[#16181c] border-2 border-dashed border-[#2f3336] rounded-2xl p-6 min-h-[140px]"
                >
                  <div className="text-5xl font-black mb-4 opacity-90">{tier}</div>
                  <div className="space-y-3">
                    {tierLists[tier].map((tweet, i) => (
                      <div key={i} className="bg-[#1f2429] p-4 rounded-xl border border-[#2f3336] flex gap-3">
                        <img 
                          src={tweet.thumbnailUrl} 
                          alt="" 
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-sm truncate">{tweet.author}</div>
                          <p className="text-xs text-gray-400 line-clamp-2 mt-1">{tweet.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}