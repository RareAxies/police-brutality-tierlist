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
  // ← Paste your full initialTweets array here (the one you already have)
  // Make sure it's exactly the same as in your current code
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
    e.dataTransfer.setData('tweetId', tweet.id);
    e.dataTransfer.setData('source', source);
    if (tierKey) e.dataTransfer.setData('fromTier', tierKey);
  };

  const onDrop = (e: React.DragEvent, targetTier: string) => {
    e.preventDefault();
    const tweetId = e.dataTransfer.getData('tweetId');
    const source = e.dataTransfer.getData('source') as 'available' | 'tier';
    const fromTier = e.dataTransfer.getData('fromTier');

    const allTweets = [...availableTweets, ...Object.values(tierLists).flat()];
    const tweet = allTweets.find(t => t.id === tweetId);
    if (!tweet) return;

    // Remove from source
    if (source === 'available') {
      setAvailableTweets(prev => prev.filter(t => t.id !== tweetId));
    } else if (fromTier && fromTier !== targetTier) {
      setTierLists(prev => ({
        ...prev,
        [fromTier]: prev[fromTier].filter(t => t.id !== tweetId)
      }));
    }

    // Add to target
    if (!tierLists[targetTier].some(t => t.id === tweetId)) {
      setTierLists(prev => ({
        ...prev,
        [targetTier]: [...prev[targetTier], tweet]
      }));
    }
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();

  const removeFromTier = (tier: string, tweetId: string) => {
    const tweet = tierLists[tier].find(t => t.id === tweetId);
    if (!tweet) return;

    setTierLists(prev => ({
      ...prev,
      [tier]: prev[tier].filter(t => t.id !== tweetId)
    }));
    setAvailableTweets(prev => [...prev, tweet]);
  };

  const resetAll = () => {
    setAvailableTweets(initialTweets);
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
          <button
            onClick={resetAll}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
          >
            Reset Everything
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Available Posts - left side */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-semibold mb-6">Available Posts ({availableTweets.length})</h2>
            <div className="space-y-6">
              {availableTweets.map(tweet => (
                <div
                  key={tweet.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, tweet, 'available')}
                  className="bg-[#16181c] border border-[#2f3336] p-6 rounded-3xl cursor-grab hover:border-blue-500/50 transition-all"
                >
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <img src={tweet.avatarUrl} alt={tweet.author} className="w-11 h-11 rounded-full" />
                        <div>
                          <div className="font-bold">{tweet.author}</div>
                          <div className="text-gray-500">{tweet.handle}</div>
                        </div>
                      </div>
                      <p className="leading-relaxed text-[15px]">{tweet.content}</p>
                      <div className="mt-4 flex gap-6 text-sm text-gray-400">
                        ❤️ {tweet.likes} &nbsp; 🔁 {tweet.reposts}
                      </div>
                      <a href={`https://x.com/i/status/${tweet.id}`} target="_blank" className="text-blue-400 hover:text-blue-300 text-sm mt-4 inline-block">
                        View on X →
                      </a>
                    </div>

                    {tweet.mediaUrl && (
                      <div className="w-80 flex-shrink-0 rounded-2xl overflow-hidden border border-[#2f3336]">
                        <video src={tweet.mediaUrl} controls className="w-full" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier List - right side */}
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
                      <div key={tweet.id} className="bg-[#1f2429] p-5 rounded-2xl border border-[#2f3336] relative group">
                        <button
                          onClick={() => removeFromTier(tier, tweet.id)}
                          className="absolute top-3 right-3 text-xl text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100"
                        >
                          ×
                        </button>
                        <div className="flex items-center gap-3 mb-3">
                          <img src={tweet.avatarUrl} alt="" className="w-8 h-8 rounded-full" />
                          <div>
                            <div className="font-semibold text-sm">{tweet.author}</div>
                            <div className="text-xs text-gray-500">{tweet.handle}</div>
                          </div>
                        </div>
                        <p className="text-[15px]">{tweet.content}</p>
                        {tweet.mediaUrl && <div className="text-xs text-blue-400 mt-3">📹 Video attached</div>}
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