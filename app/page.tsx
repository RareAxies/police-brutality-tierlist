'use client';

import React, { useState, useEffect } from 'react';

interface Tweet {
  id: string;
  author: string;
  handle: string;
  content: string;
  tweetUrl: string;
}

const initialTweets: Tweet[] = [
  {
    id: "2078216763024535716",
    author: "The media SOI 🇬🇧",
    handle: "@MediaSOI",
    content: "Up Scotland police pull a taser out on concerned parents after migrants kept a 14 year old girl against her will locked in their flat for 3 days",
    tweetUrl: "https://x.com/MediaSOI/status/2078216763024535716"
  },
  {
    id: "2075539170504667425",
    author: "Rare | ♻️🇬🇧",
    handle: "@RareAxies",
    content: "Sadiq Khan responds to images of Moroccan football fans rioting in London: I've seen the videos from Edgware Road & I'm proud of our brave Met officers for their tactical retreat, showing true community sensitivity! Credit to those passionate Moroccan fans for bringing such lively energy to our streets. London is safer with me in charge. Alhamdulillah!",
    tweetUrl: "https://x.com/RareAxies/status/2075539170504667425"
  },
  {
    id: "2074041176559108555",
    author: "UNN",
    handle: "@UnityNewsNet",
    content: "British Constables are taught to hate the people. Don't trust them. Don't consent to them.",
    tweetUrl: "https://x.com/UnityNewsNet/status/2074041176559108555"
  },
  {
    id: "2074418780726292717",
    author: "Retard Radar",
    handle: "@FullRetardRadar",
    content: "Absolute state of British police. Invader casually walks up to a police car, pops the door like it’s his personal Uber, springs his fellow criminal invader, and they both bolt while the coppers just stand there.",
    tweetUrl: "https://x.com/FullRetardRadar/status/2074418780726292717"
  },
  {
    id: "2075556663164109257",
    author: "Turning Point UK 🇬🇧",
    handle: "@TPointUK",
    content: "West Yorkshire police officer punches 16-year-old girl with special needs in the face. They wouldn't treat an illegal migrant like this.",
    tweetUrl: "https://x.com/TPointUK/status/2075556663164109257"
  },
  {
    id: "2077145657932968156",
    author: "Russian Garbage Human",
    handle: "@RusGarbageHuman",
    content: "The police officer walks straight past the armed foreigners and attacks the native holding some sticks. You should be coming up to such officers, recording his face, voice and collar number.",
    tweetUrl: "https://x.com/RusGarbageHuman/status/2077145657932968156"
  },
];

const tiers = ['S', 'A', 'B', 'C', 'D', 'E'];

export default function TierListApp() {
  const [availableTweets, setAvailableTweets] = useState<Tweet[]>(initialTweets);
  const [tierLists, setTierLists] = useState<Record<string, Tweet[]>>({
    S: [], A: [], B: [], C: [], D: [], E: []
  });

  // Load X widgets.js
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Re-render embeds when list changes
  useEffect(() => {
    // @ts-ignore
    if (window.twttr?.widgets) {
      // @ts-ignore
      window.twttr.widgets.load();
    }
  }, [availableTweets, tierLists]);

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
      <div class="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2">UK Police Brutality Tier List</h1>
        <p className="text-gray-400 text-center mb-10">Drag the tweets into tiers</p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Available Posts */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold mb-6">Available Posts</h2>
            <div className="space-y-8">
              {availableTweets.map(tweet => (
                <div
                  key={tweet.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, tweet)}
                  className="bg-[#16181c] border border-[#2f3336] rounded-2xl p-4 cursor-grab hover:border-gray-500 transition-all"
                >
                  <blockquote className="twitter-tweet" data-theme="dark">
                    <a href={tweet.tweetUrl}></a>
                  </blockquote>
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
                  className="bg-[#16181c] border-2 border-dashed border-[#2f3336] rounded-2xl p-6 min-h-[160px]"
                >
                  <div className="text-5xl font-black mb-4 opacity-90">{tier}</div>
                  
                  <div className="space-y-4">
                    {tierLists[tier].map((tweet, i) => (
                      <div key={i} className="bg-[#1f2429] p-4 rounded-xl border border-[#2f3336]">
                        <div className="font-semibold text-sm">{tweet.author}</div>
                        <div className="text-xs text-gray-400 mb-1">{tweet.handle}</div>
                        <p className="text-sm line-clamp-3 mt-1">{tweet.content}</p>
                        <a 
                          href={tweet.tweetUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-400 text-xs mt-2 inline-block hover:underline"
                        >
                          View original →
                        </a>
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