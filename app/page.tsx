'use client';

import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';

interface Tweet {
  id: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  reposts: number;
  views: number;
  avatarUrl: string;
  tweetUrl: string;
}

const initialTweets: Tweet[] = [
  {
    id: "2078216763024535716",
    author: "The media SOI",
    handle: "@MediaSOI",
    content: "Up Scotland police pull a taser out on concerned parents after migrants kept a 14 year old girl against her will locked in their flat for 3 days",
    likes: 2000,
    reposts: 82,
    views: 41400,
    avatarUrl: "https://pbs.twimg.com/profile_images/2074137677620768768/yeoj3BGI_400x400.jpg",
    tweetUrl: "https://x.com/MediaSOI/status/2078216763024535716"
  },
  {
    id: "2075539170504667425",
    author: "Rare | ♻️🇬🇧",
    handle: "@RareAxies",
    content: "Sadiq Khan responds to images of Moroccan football fans rioting in London: I've seen the videos from Edgware Road & I'm proud of our brave Met officers for their tactical retreat, showing true community sensitivity! Credit to those passionate Moroccan fans for bringing such lively energy to our streets. London is safer with me in charge. Alhamdulillah!",
    likes: 49,
    reposts: 19,
    views: 7410,
    avatarUrl: "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS_400x400.jpg",
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
    avatarUrl: "https://pbs.twimg.com/profile_images/1133287235531485190/BdNIkUda_400x400.jpg",
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
    avatarUrl: "https://pbs.twimg.com/profile_images/2067713504182697984/xG9JHwPk_400x400.jpg",
    tweetUrl: "https://x.com/FullRetardRadar/status/2074418780726292717"
  },
  {
    id: "2075556663164109257",
    author: "Turning Point UK",
    handle: "@TPointUK",
    content: "West Yorkshire police officer punches 16-year-old girl with special needs in the face.\n\nThey wouldn't treat an illegal migrant like this.",
    likes: 5100,
    reposts: 2400,
    views: 184000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1704571042524491776/ieHPB868_400x400.jpg",
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
    avatarUrl: "https://pbs.twimg.com/profile_images/2008318949448892417/v7L-39OP_400x400.jpg",
    tweetUrl: "https://x.com/RusGarbageHuman/status/2077145657932968156"
  },
];

const tiers = ['S', 'A', 'B', 'C', 'D', 'E'];

const tierStyles: Record<string, string> = {
  S: 'bg-red-950/40 border-red-600',
  A: 'bg-orange-950/40 border-orange-500',
  B: 'bg-yellow-950/30 border-yellow-500',
  C: 'bg-green-950/30 border-green-500',
  D: 'bg-blue-950/30 border-blue-500',
  E: 'bg-purple-950/30 border-purple-500',
};

const tierColors: Record<string, string> = {
  S: '#dc2626',
  A: '#f97316',
  B: '#eab308',
  C: '#22c55e',
  D: '#3b82f6',
  E: '#a855f7',
};

export default function TierListApp() {
  // Pre-fill the tiers with the 6 real tweets (3 in S, 3 in A for the demo)
  const [tierLists, setTierLists] = useState<Record<string, Tweet[]>>({
    S: [initialTweets[0], initialTweets[4], initialTweets[2]],
    A: [initialTweets[5], initialTweets[3], initialTweets[1]],
    B: [],
    C: [],
    D: [],
    E: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cleanRef = useRef<HTMLDivElement>(null);

  const onDragStart = (e: React.DragEvent, tweet: Tweet, fromTier: string) => {
    e.dataTransfer.setData('tweet', JSON.stringify(tweet));
    e.dataTransfer.setData('fromTier', fromTier);
  };

  const onDrop = (e: React.DragEvent, toTier: string) => {
    e.preventDefault();
    if (!isEditing) return;

    const tweet = JSON.parse(e.dataTransfer.getData('tweet'));
    const fromTier = e.dataTransfer.getData('fromTier');
    if (fromTier === toTier) return;

    setTierLists(prev => {
      const newLists = { ...prev };
      newLists[fromTier] = newLists[fromTier].filter(t => t.id !== tweet.id);
      newLists[toTier] = [...newLists[toTier], tweet];
      return newLists;
    });
  };

  const onDragOver = (e: React.DragEvent) => {
    if (isEditing) e.preventDefault();
  };

  const scroll = (tier: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[tier];
    if (container) {
      container.scrollBy({
        left: direction === 'right' ? 280 : -280,
        behavior: 'smooth',
      });
    }
  };

  const handleDownload = async () => {
    if (!cleanRef.current) return;
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(cleanRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#000000',
      });

      const link = document.createElement('a');
      link.download = 'the-best-of-uk-policing.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert('Download failed — try again');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">The Best of UK Policing</h1>
          <p className="text-gray-400 mb-6">Drag posts into tiers — focus on the visual evidence</p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                isEditing ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'
              }`}
            >
              {isEditing ? 'Finish Editing' : 'Re-arrange this Tier List'}
            </button>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-6 py-3 rounded-xl font-semibold bg-gray-700 hover:bg-gray-600 transition-all disabled:opacity-50"
            >
              {isDownloading ? 'Generating…' : 'Finish & Download Image'}
            </button>
          </div>

          {isEditing && (
            <p className="mt-4 text-sm text-yellow-400">
              Editing mode active — drag cards between tiers
            </p>
          )}
        </div>

        {/* ========== DETAILED ON-SITE VIEW ========== */}
        <div className="space-y-5">
          {tiers.map(tier => (
            <div
              key={tier}
              onDrop={(e) => onDrop(e, tier)}
              onDragOver={onDragOver}
              className={`border-l-8 rounded-2xl p-4 transition-all ${tierStyles[tier]} ${
                isEditing ? 'ring-2 ring-white/20' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="text-5xl font-black w-14 flex-shrink-0 pt-2">{tier}</div>

                <div className="flex-1 relative min-w-0">
                  {tierLists[tier].length > 3 && (
                    <button
                      onClick={() => scroll(tier, 'left')}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white text-xl"
                    >
                      ‹
                    </button>
                  )}

                  <div
                    ref={(el) => { scrollRefs.current[tier] = el; }}
                    className="flex gap-4 overflow-x-auto scrollbar-hide py-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {tierLists[tier].map(tweet => (
                      <div
                        key={tweet.id}
                        draggable={isEditing}
                        onDragStart={(e) => onDragStart(e, tweet, tier)}
                        className={`bg-[#1f2429] border border-[#2f3336] rounded-xl p-4 w-60 flex-shrink-0 ${
                          isEditing ? 'cursor-grab active:cursor-grabbing' : ''
                        }`}
                      >
                        {/* Author */}
                        <div className="flex items-center gap-2 mb-3">
                          <img
                            src={tweet.avatarUrl}
                            alt={tweet.author}
                            className="w-9 h-9 rounded-full object-cover flex-shrink-0 bg-gray-700"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';
                            }}
                          />
                          <div className="min-w-0">
                            <div className="font-semibold text-sm truncate">{tweet.author}</div>
                            <div className="text-xs text-gray-500 truncate">{tweet.handle}</div>
                          </div>
                        </div>

                        {/* Content */}
                        <p className="text-sm text-gray-200 line-clamp-3 mb-3 whitespace-pre-line">
                          {tweet.content}
                        </p>

                        {/* Real Evidence Image */}
                        <img
                          src={`/images/${tweet.id}.png`}
                          alt="Evidence"
                          className="w-full aspect-square object-cover rounded-lg mb-3 bg-gray-800"
                        />

                        {/* Stats + Link */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex gap-3 text-gray-500">
                            <span>❤️ {tweet.likes.toLocaleString()}</span>
                            <span>🔁 {tweet.reposts.toLocaleString()}</span>
                          </div>
                          <a
                            href={tweet.tweetUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            View on X →
                          </a>
                        </div>
                      </div>
                    ))}

                    {tierLists[tier].length === 0 && (
                      <div className="text-gray-600 text-sm italic py-8 pl-2">
                        Drop cards here
                      </div>
                    )}
                  </div>

                  {tierLists[tier].length > 3 && (
                    <button
                      onClick={() => scroll(tier, 'right')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/80 hover:bg-black rounded-full flex items-center justify-center text-white text-xl"
                    >
                      ›
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== CLEAN VERSION FOR DOWNLOAD ========== */}
      <div className="fixed -left-[9999px] top-0">
        <div ref={cleanRef} className="bg-black p-8 w-[900px]">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">The Best of UK Policing</h1>
            <p className="text-gray-400 mt-1">UK Police Brutality Tier List</p>
          </div>

          <div className="space-y-6">
            {tiers.map(tier => (
              <div key={tier} className="flex items-start gap-4">
                <div
                  className="text-4xl font-black w-12 flex-shrink-0 pt-1"
                  style={{ color: tierColors[tier] }}
                >
                  {tier}
                </div>

                <div className="flex flex-wrap gap-3">
                  {tierLists[tier].map(tweet => (
                    <div key={tweet.id} className="w-28 text-center">
                      <img
                        src={`/images/${tweet.id}.png`}
                        alt=""
                        className="w-28 h-28 object-cover rounded-lg mb-1.5 bg-gray-800"
                      />
                      <div className="text-xs text-gray-300 truncate">{tweet.handle}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 text-gray-500 text-sm">
            Make your own ranking → thebestofukpolicing.com
          </div>
        </div>
      </div>
    </div>
  );
}