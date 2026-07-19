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
  mediaUrl?: string;
  mediaType?: 'video' | 'image';
}

const initialTweets: Tweet[] = [
  {
    id: "2078216763024535716",
    author: "The media SOI 🇬🇧",
    handle: "@MediaSOI",
    content: "Up Scotland police pull a taser out on concerned parents after migrants kept a 14 year old girl against her will locked in their flat for 3 days",
    likes: 1414,
    reposts: 518,
    avatarUrl: "https://pbs.twimg.com/profile_images/2074137677620768768/yeoj3BGI.jpg",
    mediaUrl: "https://video.twimg.com/amplify_video/2078216678232477696/vid/avc1/296x640/mVMm9L0liR8aPWWz.mp4",
    mediaType: "video"
  },
  {
    id: "2077145657932968156",
    author: "Russian Garbage Human",
    handle: "@RusGarbageHuman",
    content: "The police officer walks straight past the armed foreigners and attacks the native holding some sticks.",
    likes: 716,
    reposts: 72,
    avatarUrl: "https://pbs.twimg.com/profile_images/2008318949448892417/v7L-39OP.jpg",
    mediaUrl: "https://video.twimg.com/ext_tw_video/2076959374325518337/pu/vid/avc1/712x1276/94rcQTdM8Mg78J5v.mp4",
    mediaType: "video"
  },
  {
    id: "2075556663164109257",
    author: "Turning Point UK 🇬🇧",
    handle: "@TPointUK",
    content: "West Yorkshire police officer punches 16-year-old girl with special needs in the face. They wouldn't treat an illegal migrant like this.",
    likes: 5117,
    reposts: 2311,
    avatarUrl: "https://pbs.twimg.com/profile_images/1704571042524491776/ieHPB868.jpg",
    mediaUrl: "https://video.twimg.com/amplify_video/2075556459207700480/vid/avc1/720x1280/dKB7mTRjRY5dROej.mp4",
    mediaType: "video"
  },
  {
    id: "2074418780726292717",
    author: "Full Retard Radar",
    handle: "@FullRetardRadar",
    content: "Full Retard Radar tweet about police brutality",
    likes: 0,
    reposts: 0,
    avatarUrl: "https://pbs.twimg.com/profile_images/1750000000000000000/default.jpg"
  },
  {
    id: "2074041176559108555",
    author: "Unity News Network",
    handle: "@UnityNewsNet",
    content: "Unity News Network post regarding UK events",
    likes: 0,
    reposts: 0,
    avatarUrl: "https://pbs.twimg.com/profile_images/1750000000000000000/default.jpg"
  },
  {
    id: "2075539170504667425",
    author: "Rare Axies",
    handle: "@RareAxies",
    content: "Test tweet using someone else's video (properly linked)",
    likes: 0,
    reposts: 0,
    avatarUrl: "https://pbs.twimg.com/profile_images/1750000000000000000/default.jpg"
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
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-2">UK Police Brutality Tier List</h1>
        <p className="text-gray-400 text-center mb-12">Drag posts into tiers — focus on the visual evidence</p>

        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-7">
            <h2 className="text-2xl mb-6">Available Posts</h2>
            <div className="space-y-6">
              {availableTweets.map(tweet => (
                <div
                  key={tweet.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, tweet)}
                  className="bg-[#16181c] border border-[#2f3336] p-6 rounded-2xl cursor-grab hover:border-[#4b5563] transition-all"
                >
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <img src={tweet.avatarUrl} alt={tweet.author} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <div className="font-bold">{tweet.author}</div>
                          <div className="text-gray-500 text-sm">{tweet.handle}</div>
                        </div>
                      </div>
                      <p className="text-[15px] leading-relaxed">{tweet.content}</p>
                      <div className="mt-4 flex gap-6 text-sm text-gray-500">
                        <span>❤️ {tweet.likes}</span>
                        <span>🔁 {tweet.reposts}</span>
                      </div>
                      <a href={`https://x.com/i/status/${tweet.id}`} target="_blank" className="text-blue-400 text-xs mt-4 inline-block hover:underline">
                        View on X →
                      </a>
                    </div>

                    {tweet.mediaUrl && (
                      <div className="w-[420px] flex-shrink-0">
                        <video src={tweet.mediaUrl} controls className="w-full rounded-2xl border border-[#2f3336]" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-5">
            <h2 className="text-2xl mb-6">Your Tier List</h2>
            <div className="space-y-8">
              {tiers.map(tier => (
                <div
                  key={tier}
                  onDrop={(e) => onDrop(e, tier)}
                  onDragOver={onDragOver}
                  className="bg-[#16181c] border-2 border-dashed border-[#2f3336] rounded-3xl p-8 min-h-[200px]"
                >
                  <div className="text-7xl font-black mb-8 opacity-90">{tier}</div>
                  <div className="space-y-4">
                    {tierLists[tier].map((tweet, i) => (
                      <div key={i} className="bg-[#1f2429] p-5 rounded-2xl border border-[#2f3336]">
                        <div className="flex items-center gap-3 mb-3">
                          <img src={tweet.avatarUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <div className="font-semibold text-sm">{tweet.author}</div>
                            <div className="text-xs text-gray-500">{tweet.handle}</div>
                          </div>
                        </div>
                        <p className="text-[15px]">{tweet.content}</p>
                        {tweet.mediaUrl && <div className="text-xs text-blue-400 mt-2">📹 Video included</div>}
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