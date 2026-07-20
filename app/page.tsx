'use client';
import React, { useState } from 'react';

interface Tweet {
  id: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  reposts: number;
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
    likes: 2093,
    reposts: 801,
    avatarUrl: "https://pbs.twimg.com/profile_images/2074137677620768768/yeoj3BGI.jpg",
    thumbnailUrl: "https://postimg.cc/5XCm7MDd",
    tweetUrl: "https://x.com/MediaSOI/status/2078216763024535716"
  },
  {
    id: "2077145657932968156",
    author: "Russian Garbage Human",
    handle: "@RusGarbageHuman",
    content: "The police officer walks straight past the armed foreigners and attacks the native holding some sticks.",
    likes: 717,
    reposts: 72,
    avatarUrl: "https://pbs.twimg.com/profile_images/2008318949448892417/v7L-39OP.jpg",
    thumbnailUrl: "https://postimg.cc/JskQ6WS8",
    tweetUrl: "https://x.com/RusGarbageHuman/status/2077145657932968156"
  },
  {
    id: "2075556663164109257",
    author: "Turning Point UK 🇬🇧",
    handle: "@TPointUK",
    content: "West Yorkshire police officer punches 16-year-old girl with special needs in the face. They wouldn't treat an illegal migrant like this.",
    likes: 5112,
    reposts: 2307,
    avatarUrl: "https://pbs.twimg.com/profile_images/1704571042524491776/ieHPB868.jpg",
    thumbnailUrl: "https://postimg.cc/ZWdL7hXb",
    tweetUrl: "https://x.com/TPointUK/status/2075556663164109257"
  },
  {
    id: "2074418780726292717",
    author: "Retard Radar",
    handle: "@FullRetardRadar",
    content: "Absolute state of British police.\nInvader casually walks up to a police car, pops the door like it’s his personal Uber, springs his fellow criminal invader, and they both bolt while the coppers just stand there.",
    likes: 76,
    reposts: 39,
    avatarUrl: "https://pbs.twimg.com/profile_images/2067713504182697984/xG9JHwPk.jpg",
    thumbnailUrl: "https://postimg.cc/bZtRCj4j",
    tweetUrl: "https://x.com/FullRetardRadar/status/2074418780726292717"
  },
  {
    id: "2074041176559108555",
    author: "UNN",
    handle: "@UnityNewsNet",
    content: "British Constables are taught to hate the people.\n\nDon't trust them.\n\nDon't consent to them.",
    likes: 3175,
    reposts: 737,
    avatarUrl: "https://pbs.twimg.com/profile_images/1133287235531485190/BdNIkUda.jpg",
    thumbnailUrl: "https://postimg.cc/zLYF4c18",
    tweetUrl: "https://x.com/UnityNewsNet/status/2074041176559108555"
  },
  {
    id: "2075539170504667425",
    author: "Rare | ♻️🇬🇧",
    handle: "@RareAxies",
    content: "Sadiq Khan responds to images of Moroccan football fans rioting in London:\n\nI've seen the videos from Edgware Road & I'm proud of our brave Met officers for their tactical retreat, showing true community sensitivity! \n\nCredit to those passionate Moroccan fans for bringing such lively energy to our streets.\n\nLondon is safer with me in charge. Alhamdulillah!",
    likes: 49,
    reposts: 15,
    avatarUrl: "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS.jpg",
    thumbnailUrl: "https://postimg.cc/FfXVwBQ9",
    tweetUrl: "https://x.com/RareAxies/status/2075539170504667425"
  },
];

const tiers = ['S', 'A', 'B', 'C', 'D', 'E'];

const tierColors: Record<string, string> = {
  S: 'bg-red-600/20 border-red-500 text-red-400',
  A: 'bg-orange-600/20 border-orange-500 text-orange-400',
  B: 'bg-yellow-600/20 border-yellow-500 text-yellow-400',
  C: 'bg-emerald-600/20 border-emerald-500 text-emerald-400',
  D: 'bg-blue-600/20 border-blue-500 text-blue-400',
  E: 'bg-gray-600/20 border-gray-500 text-gray-400',
};

export default function TierListApp() {
  const [availableTweets, setAvailableTweets] = useState<Tweet[]>(initialTweets);
  const [tierLists, setTierLists] = useState<Record<string, Tweet[]>>({
    S: [], A: [], B: [], C: [], D: [], E: []
  });

  const onDragStart = (e: React.DragEvent, tweet: Tweet, source: 'available' | 'tier', tierKey?: string) => {
    e.dataTransfer.setData('tweet', JSON.stringify(tweet));
  };

  const onDrop = (e: React.DragEvent, targetTier: string) => {
    e.preventDefault();
    const tweet = JSON.parse(e.dataTransfer.getData('tweet'));
    setTierLists(prev => ({
      ...prev,
      [targetTier]: [...prev[targetTier], tweet]
    }));
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const removeFromTier = (tier: string, tweetId: string) => {
    setTierLists(prev => ({
      ...prev,
      [tier]: prev[tier].filter(t => t.id !== tweetId)
    }));
  };

  const resetAll = () => {
    setTierLists({ S: [], A: [], B: [], C: [], D: [], E: [] });
  };

  return (
    <div className="min-h-screen bg-black text-white pb-12">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">UK Police Brutality Tier List</h1>
            <p className="text-gray-400 mt-2 text-lg">Drag posts into tiers — focus on the visual evidence</p>
          </div>
          <button onClick={resetAll} className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors">
            Reset Everything
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-semibold mb-6">Available Posts ({availableTweets.length})</h2>
            <div className="space-y-6">
              {availableTweets.map(tweet => (
                <div
                  key={tweet.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, tweet, 'available')}
                  className="bg-[#16181c] border border-[#2f3336] p-6 rounded-3xl cursor-grab hover:border-blue-500/50 transition-all flex gap-6"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <img src={tweet.avatarUrl} alt={tweet.author} className="w-11 h-11 rounded-full" />
                      <div>
                        <div className="font-bold">{tweet.author}</div>
                        <div className="text-gray-500 text-sm">{tweet.handle}</div>
                      </div>
                    </div>
                    <p className="text-[15px] leading-relaxed whitespace-pre-line">{tweet.content}</p>
                    <div className="mt-4 flex gap-6 text-sm text-gray-400">
                      ❤️ {tweet.likes} &nbsp; 🔁 {tweet.reposts}
                    </div>
                  </div>

                  {tweet.thumbnailUrl && (
                    <div className="w-80 flex-shrink-0">
                      <div className="relative rounded-2xl overflow-hidden border border-[#2f3336] aspect-video bg-black group">
                        <img src={tweet.thumbnailUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/30 transition-all">
                          <div className="text-6xl text-white/90">▶</div>
                        </div>
                      </div>
                      <a href={tweet.tweetUrl} target="_blank" className="block text-center text-blue-400 hover:text-blue-300 text-sm mt-3 font-medium">
                        Watch full video on X →
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="text-3xl font-semibold mb-6">Your Tier List</h2>
            <div className="space-y-6">
              {tiers.map(tier => (
                <div
                  key={tier}
                  onDrop={(e) => onDrop(e, tier)}
                  onDragOver={onDragOver}
                  className={`border-2 border-dashed rounded-3xl p-6 min-h-[180px] transition-all ${tierColors[tier]}`}
                >
                  <div className="text-6xl font-black mb-6 opacity-90">{tier}</div>
                  <div className="space-y-4">
                    {tierLists[tier].map((tweet) => (
                      <div key={tweet.id} className="bg-[#1f2429] p-5 rounded-2xl border border-[#2f3336] relative group flex gap-4">
                        <button onClick={() => removeFromTier(tier, tweet.id)} className="absolute top-3 right-3 text-xl text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100">×</button>
                        <img src={tweet.avatarUrl} alt="" className="w-10 h-10 rounded-full flex-shrink-0" />
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{tweet.author}</div>
                          <p className="text-[15px] mt-1 line-clamp-3 whitespace-pre-line">{tweet.content}</p>
                          <a href={tweet.tweetUrl} target="_blank" className="text-blue-400 hover:text-blue-300 text-xs mt-2 inline-block">
                            View original →
                          </a>
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