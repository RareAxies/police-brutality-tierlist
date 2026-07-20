'use client';
import React, { useState, useEffect } from 'react';

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

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1lUu200jZW545f5WqQdqsL-rupAyb3-SazTIPDbtFgpk/gviz/tq?tqx=out:csv';

export default function TierListApp() {
  const [availableTweets, setAvailableTweets] = useState<Tweet[]>([]);
  const [tierLists, setTierLists] = useState<Record<string, Tweet[]>>({
    S: [], A: [], B: [], C: [], D: [], E: []
  });

  useEffect(() => {
    fetch(SHEET_URL)
      .then(res => res.text())
      .then(csvText => {
        const rows = csvText.split('\n').slice(1); // skip header
        const tweets = rows.map(row => {
          const cols = row.split(',').map(c => c.replace(/^"|"$/g, ''));
          const tweetUrl = cols[0];
          const id = tweetUrl.split('/').pop() || '';
          return {
            id,
            author: cols[4] || 'Unknown',
            handle: cols[5] || '',
            content: cols[3] || '',
            likes: parseInt(cols[6]) || 0,
            reposts: parseInt(cols[7]) || 0,
            avatarUrl: cols[1] || '',
            thumbnailUrl: cols[2] || '',
            tweetUrl: tweetUrl
          };
        });
        setAvailableTweets(tweets);
      })
      .catch(err => console.error('Failed to load sheet', err));
  }, []);

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