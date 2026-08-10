'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  // ===== S - Anti-white Racism =====
  {
    id: "2061573327911543106",
    author: "Visegrád 24",
    handle: "@visegrad24",
    content: "Southampton police arrest stabbing victim Henry Nowak",
    likes: 130000,
    reposts: 35000,
    views: 22000000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1875625827674591232/OBzjRIZ4_400x400.jpg",
    tweetUrl: "https://x.com/visegrad24/status/2061573327911543106"
  },
  {
    id: "2072389805032305037",
    author: "Joshua",
    handle: "@Re_mi_gra_tion",
    content: "Birmingham police arrest assault victim Cody Harper",
    likes: 113000,
    reposts: 23000,
    views: 16400000,
    avatarUrl: "https://pbs.twimg.com/profile_images/2043446340936687616/oa-VZrH4_400x400.jpg",
    tweetUrl: "https://x.com/Re_mi_gra_tion/status/2072389805032305037"
  },
  {
    id: "2076630838658146406",
    author: "Tommy Robinson",
    handle: "@TRobinsonNewEra",
    content: "More evidence of anti white DEI policing.",
    likes: 24000,
    reposts: 7400,
    views: 503000,
    avatarUrl: "https://pbs.twimg.com/profile_images/2007262159403671552/-DltTmcT_400x400.jpg",
    tweetUrl: "https://x.com/TRobinsonNewEra/status/2076630838658146406"
  },

  // ===== A - Violent Policing =====
  {
    id: "2063310379904577880",
    author: "BritMatters 🇬🇧",
    handle: "@britmatters",
    content: "15-Year-Old Impaled on Spiked Railings by Suffolk Police.",
    likes: 4300,
    reposts: 2400,
    views: 187400,
    avatarUrl: "https://pbs.twimg.com/profile_images/1998156217550598144/sqVKF_qg_400x400.jpg",
    tweetUrl: "https://x.com/britmatters/status/2063310379904577880"
  },
  {
    id: "2071609632993288677",
    author: "Britain Is Broken",
    handle: "@BROKENBRITAIN0",
    content: "Police use riot shields to batter military veteran",
    likes: 23000,
    reposts: 4700,
    views: 825000,
    avatarUrl: "https://pbs.twimg.com/profile_images/2063329057320624128/Tx7pGN7X_400x400.jpg",
    tweetUrl: "https://x.com/BROKENBRITAIN0/status/2071609632993288677"
  },
  {
    id: "2075556663164109257",
    author: "Turning Point UK",
    handle: "@TPointUK",
    content: "West Yorkshire police officer punches 16-year-old girl with special needs in the face. They wouldn't treat an illegal migrant like this.",
    likes: 5100,
    reposts: 2400,
    views: 184000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1704571042524491776/ieHPB868_400x400.jpg",
    tweetUrl: "https://x.com/TPointUK/status/2075556663164109257"
  },
  {
    id: "2066098327347761412",
    author: "Mario ZNA",
    handle: "@MarioBojic",
    content: "UK Police arrested a crying 5-year-old boy while taking away his father.",
    likes: 70000,
    reposts: 27000,
    views: 3600000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1568578086484037632/i3dKr8r__400x400.jpg",
    tweetUrl: "https://x.com/MarioBojic/status/2066098327347761412"
  },
  {
    id: "2063641296489599358",
    author: "Turning Point UK",
    handle: "@TPointUK",
    content: "Hampshire Police violently arrest 15-year-old girl in Southampton for running away from foster care.",
    likes: 18000,
    reposts: 7300,
    views: 549000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1704571042524491776/ieHPB868_400x400.jpg",
    tweetUrl: "https://x.com/TPointUK/status/2063641296489599358"
  },

  // ===== B - Thought Police =====
  {
    id: "2073427211898556481",
    author: "News Now Yorkshire",
    handle: "@NewsNowYorks",
    content: "Police in Leeds are now arresting people for insulting Muhammad",
    likes: 13000,
    reposts: 4200,
    views: 2100000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1895405336686710784/hmKeOzLS_400x400.jpg",
    tweetUrl: "https://x.com/NewsNowYorks/status/2073427211898556481"
  },
  {
    id: "2072582825954467905",
    author: "Skint Eastwood",
    handle: "@Skint_Eastwood1",
    content: "UK police officer threatens to arrest a man for peacefully filming in public, because his presence “might” wind people up and cause someone else to lose their temper.",
    likes: 23000,
    reposts: 7300,
    views: 1000000,
    avatarUrl: "https://pbs.twimg.com/profile_images/2019411824270090240/AL1pSX5D_400x400.jpg",
    tweetUrl: "https://x.com/Skint_Eastwood1/status/2072582825954467905"
  },
  {
    id: "2072966413841567810",
    author: "HJB News",
    handle: "@HJB_News__",
    content: "British police arrest member of the Public for filming outside which is perfectly legal.",
    likes: 1800,
    reposts: 526,
    views: 258000,
    avatarUrl: "https://pbs.twimg.com/profile_images/2006926965429723136/nuuCSsTe_400x400.jpg",
    tweetUrl: "https://x.com/HJB_News__/status/2072966413841567810"
  },
  {
    id: "2083169814521037033",
    author: "The Free Speech Union",
    handle: "@SpeechUnion",
    content: "An Animal rights campaigner was told to accept a police record, attend an “online thinking” course, or face arrest following comments she made on social media.",
    likes: 8600,
    reposts: 2700,
    views: 351000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1226483248458555393/o11tG_Sj_400x400.jpg",
    tweetUrl: "https://x.com/SpeechUnion/status/2083169814521037033"
  },
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

  // ===== C - Failed Arrest =====
  {
    id: "2082148843500523718",
    author: "Turning Point UK",
    handle: "@TPointUK",
    content: "Migrant takes down female police officer with pepper spray in Luton.",
    likes: 354,
    reposts: 98,
    views: 65000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1704571042524491776/ieHPB868_400x400.jpg",
    tweetUrl: "https://x.com/TPointUK/status/2082148843500523718"
  },
  {
    id: "2073285994279842042",
    author: "Tony",
    handle: "@EvacTony",
    content: "A suspect overpowers two West Mids Police officers",
    likes: 2900,
    reposts: 441,
    views: 333333,
    avatarUrl: "https://pbs.twimg.com/profile_images/2045764888031559680/fJEED4ke_400x400.jpg",
    tweetUrl: "https://x.com/EvacTony/status/2073285994279842042"
  },
  {
    id: "2074418780726292717",
    author: "Retard Radar",
    handle: "@FullRetardRadar",
    content: "Absolute state of British police. Invader casually walks up to a police car, pops the door like it’s his personal Uber, springs his fellow criminal invader, and they both bolt while the coppers just stand there.",
    likes: 75,
    reposts: 40,
    views: 52300,
    avatarUrl: "https://pbs.twimg.com/profile_images/2067713504182697984/xG9JHwPk_400x400.jpg",
    tweetUrl: "https://x.com/FullRetardRadar/status/2074418780726292717"
  },

  // ===== D - Two Tier Policing =====
  {
    id: "2075470278621065366",
    author: "Visegrád 24",
    handle: "@visegrad24",
    content: "British police officers fleeing rioting supporters of Morocco in London after the France-Morocco game",
    likes: 5000,
    reposts: 1400,
    views: 909000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1875625827674591232/OBzjRIZ4_400x400.jpg",
    tweetUrl: "https://x.com/visegrad24/status/2075470278621065366"
  },
  {
    id: "2082921585472643105",
    author: "Turning Point UK",
    handle: "@TPointUK",
    content: "Police officer panics as she is unable to arrest a man.",
    likes: 1400,
    reposts: 182,
    views: 68000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1704571042524491776/ieHPB868_400x400.jpg",
    tweetUrl: "https://x.com/TPointUK/status/2082921585472643105"
  },
  {
    id: "2066292267682304430",
    author: "RareAxies",
    handle: "@RareAxies",
    content: "Black man tells police to f*ck off... and they do!",
    likes: 7300,
    reposts: 1500,
    views: 1100000,
    avatarUrl: "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS_400x400.jpg",
    tweetUrl: "https://x.com/RareAxies/status/2066292267682304430"
  },
  {
    id: "2077145657932968156",
    author: "Russian Garbage Human",
    handle: "@RusGarbageHuman",
    content: "The police officer walks straight past the armed foreigners and attacks the native holding some sticks. You should be coming up to such officers, recording his face, voice and collar number.",
    likes: 714,
    reposts: 72,
    views: 8196,
    avatarUrl: "https://pbs.twimg.com/profile_images/2008318949448892417/v7L-39OP_400x400.jpg",
    tweetUrl: "https://x.com/RusGarbageHuman/status/2077145657932968156"
  },
  // ===== NEW TWEET (added to D) =====
  {
    id: "2086203543623455106",
    author: "Brit Lad X 🇬🇧",
    handle: "@BritLadx",
    content: "So this video is doing the rounds...\n\nFrom the reports going around, this bloke had bought a baseball bat. You can literally see it’s still in the plastic packaging. (THIS APPEARS TO BE MANCHESTER)\n\nOwning a baseball bat is perfectly legal.\n\nSo what happens?\n\nA copper sees him walking with it and decides that apparently this warrants an arrest. Then, unsurprisingly, the whole thing kicks off.\n\nAnd this is exactly why people are fucking sick of it.\n\nWould everyone get treated the same way in this situation? I seriously doubt it.",
    likes: 160,
    reposts: 33,
    views: 387655,
    avatarUrl: "https://pbs.twimg.com/profile_images/1904501834577780736/vP2Ual4q_400x400.jpg",
    tweetUrl: "https://x.com/BritLadx/status/2086203543623455106"
  },

  // ===== E - DEI hires =====
  {
    id: "2073755447719248065",
    author: "J Stewart",
    handle: "@triffic_stuff_",
    content: "What on earth is this female police officer doing?! 🤨",
    likes: 11000,
    reposts: 2900,
    views: 971000,
    avatarUrl: "https://pbs.twimg.com/profile_images/1746070412381863937/KKz4xn-u_400x400.jpg",
    tweetUrl: "https://x.com/triffic_stuff_/status/2073755447719248065"
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
    id: "2071297092136431711",
    author: "RareAxies",
    handle: "@RareAxies",
    content: "Diversity, equity, and inclusion (DEI) hiring within the Police has reached a new all time high 😅",
    likes: 9,
    reposts: 4,
    views: 3750,
    avatarUrl: "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS_400x400.jpg",
    tweetUrl: "https://x.com/RareAxies/status/2071297092136431711"
  },
  {
    id: "2086139748607836477",
    author: "RareAxies",
    handle: "@RareAxies",
    content: "West Midlands Police with yet another entry for the DEI category of the YooKay Police Madness Index 🏆",
    likes: 25,
    reposts: 8,
    views: 6633,
    avatarUrl: "https://pbs.twimg.com/profile_images/2015038970405572608/lbcRtHrS_400x400.jpg",
    tweetUrl: "https://x.com/RareAxies/status/2086139748607836477"
  },
];

const tiers = ['S', 'A', 'B', 'C', 'D', 'E'];
const allTiers = [...tiers, 'DISCARD'];

const tierStyles: Record<string, string> = {
  S: 'bg-red-950/40 border-red-600',
  A: 'bg-orange-950/40 border-orange-500',
  B: 'bg-yellow-950/30 border-yellow-500',
  C: 'bg-green-950/30 border-green-500',
  D: 'bg-blue-950/30 border-blue-500',
  E: 'bg-purple-950/30 border-purple-500',
  DISCARD: 'bg-gray-900/60 border-gray-500',
};

const tierColors: Record<string, string> = {
  S: '#dc2626',
  A: '#f97316',
  B: '#eab308',
  C: '#22c55e',
  D: '#3b82f6',
  E: '#a855f7',
  DISCARD: '#6b7280',
};

export default function TierListApp() {
  const [tierLists, setTierLists] = useState<Record<string, Tweet[]>>({
    S: [initialTweets[0], initialTweets[1], initialTweets[2]],
    A: [initialTweets[3], initialTweets[4], initialTweets[5], initialTweets[6], initialTweets[7]],
    B: [initialTweets[8], initialTweets[9], initialTweets[10], initialTweets[11], initialTweets[12]],
    C: [initialTweets[13], initialTweets[14], initialTweets[15]],
    D: [initialTweets[16], initialTweets[17], initialTweets[18], initialTweets[19], initialTweets[20]], // now includes the new tweet
    E: [initialTweets[21], initialTweets[22], initialTweets[23], initialTweets[24]],
    DISCARD: [],
  });

  const [tierTitles, setTierTitles] = useState<Record<string, string>>({
    S: 'Anti-white Racism',
    A: 'Violent Policing',
    B: 'Thought Police',
    C: 'Failed Arrest',
    D: 'Two Tier Policing',
    E: 'DEI hires',
    DISCARD: 'Discard Pile',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const cleanRef = useRef<HTMLDivElement>(null);
  const scrollInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll while dragging near top/bottom edges
  useEffect(() => {
    if (!isDragging) {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }
      return;
    }

    const EDGE = 100;
    const SPEED = 12;

    const handleDragOver = (e: DragEvent) => {
      const y = e.clientY;
      const h = window.innerHeight;

      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }

      if (y < EDGE) {
        scrollInterval.current = setInterval(() => {
          window.scrollBy(0, -SPEED);
        }, 16);
      } else if (y > h - EDGE) {
        scrollInterval.current = setInterval(() => {
          window.scrollBy(0, SPEED);
        }, 16);
      }
    };

    const stopScroll = () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
        scrollInterval.current = null;
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragend', stopScroll);
    window.addEventListener('drop', stopScroll);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragend', stopScroll);
      window.removeEventListener('drop', stopScroll);
      stopScroll();
    };
  }, [isDragging]);

  const onDragStart = (e: React.DragEvent, tweet: Tweet, fromTier: string) => {
    e.dataTransfer.setData('tweet', JSON.stringify(tweet));
    e.dataTransfer.setData('fromTier', fromTier);
    setIsDragging(true);
  };

  const onDrop = (e: React.DragEvent, toTier: string) => {
    e.preventDefault();
    setIsDragging(false);
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

  const onDragEnd = () => {
    setIsDragging(false);
  };

  const moveToDiscard = (tweet: Tweet, fromTier: string) => {
    if (!isEditing) return;
    setTierLists(prev => {
      const newLists = { ...prev };
      newLists[fromTier] = newLists[fromTier].filter(t => t.id !== tweet.id);
      newLists['DISCARD'] = [...newLists['DISCARD'], tweet];
      return newLists;
    });
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

  const handleTitleChange = (tier: string, value: string) => {
    setTierTitles(prev => ({ ...prev, [tier]: value }));
  };

  const handleDownload = async () => {
    if (!cleanRef.current) return;

    setIsEditing(false);
    setEditingTier(null);
    setIsDownloading(true);

    try {
      const dataUrl = await toPng(cleanRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#000000',
      });

      const link = document.createElement('a');
      link.download = 'uk-police-on-x.png';
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
      alert('Download failed — try again');
    } finally {
      setIsDownloading(false);
    }
  };

  const visibleTiers = isEditing ? allTiers : tiers;

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10 overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">UK Police on X</h1>
          <p className="text-gray-400 mb-6">(YooKay Police doing a madness)</p>

          <div className="flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => {
                setIsEditing(!isEditing);
                setEditingTier(null);
              }}
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
              Editing mode — drag cards, click titles to rename, or use ✕ to discard
            </p>
          )}
        </div>

        {/* Tiers */}
        <div className="space-y-5">
          {visibleTiers.map(tier => (
            <div
              key={tier}
              onDrop={(e) => onDrop(e, tier)}
              onDragOver={onDragOver}
              className={`border-l-8 rounded-2xl p-4 transition-all ${tierStyles[tier]} ${
                isEditing ? 'ring-2 ring-white/20' : ''
              }`}
            >
              <div className="flex items-center gap-5 mb-4">
                <div className="text-6xl font-black leading-none w-16 flex-shrink-0 flex items-center justify-center">
                  {tier === 'DISCARD' ? '🗑️' : tier}
                </div>

                <div className="flex-1 min-w-0">
                  {isEditing && editingTier === tier && tier !== 'DISCARD' ? (
                    <input
                      autoFocus
                      value={tierTitles[tier]}
                      onChange={(e) => handleTitleChange(tier, e.target.value)}
                      onBlur={() => setEditingTier(null)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setEditingTier(null);
                      }}
                      className="w-full bg-black/40 border border-white/30 rounded-lg px-3 py-2 text-xl font-semibold text-white focus:outline-none focus:border-white"
                      maxLength={40}
                    />
                  ) : (
                    <div
                      onClick={() => isEditing && tier !== 'DISCARD' && setEditingTier(tier)}
                      className={`text-xl font-semibold truncate ${
                        isEditing && tier !== 'DISCARD'
                          ? 'cursor-pointer hover:text-white/80 border-b border-dashed border-white/30 pb-0.5'
                          : ''
                      }`}
                    >
                      {tierTitles[tier] || 'Untitled'}
                    </div>
                  )}
                </div>
              </div>

              <div className="relative min-w-0">
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
                      onDragEnd={onDragEnd}
                      className={`relative bg-[#1f2429] border border-[#2f3336] rounded-xl p-4 w-60 flex-shrink-0 ${
                        isEditing ? 'cursor-grab active:cursor-grabbing' : ''
                      }`}
                    >
                      {isEditing && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveToDiscard(tweet, tier);
                          }}
                          className="absolute top-2 right-2 z-10 w-7 h-7 bg-black/70 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-sm transition-colors"
                          title="Move to Discard Pile"
                        >
                          ✕
                        </button>
                      )}

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

                      <p className="text-sm text-gray-200 line-clamp-3 mb-3 whitespace-pre-line">
                        {tweet.content}
                      </p>

                      <img
                        src={`/images/${tweet.id}.png`}
                        alt="Evidence"
                        className="w-full aspect-square object-cover rounded-lg mb-3 bg-gray-800"
                      />

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
                      {tier === 'DISCARD' ? 'Discarded cards appear here' : 'Drop cards here'}
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
          ))}
        </div>

        {/* Live site footer */}
        <div className="text-center mt-12 pb-6 text-gray-400 text-sm">
          Questions —{' '}
          <a
            href="https://x.com/RareAxies"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            DM @RareAxies
          </a>
        </div>
      </div>

      {/* ========== CLEAN VERSION FOR DOWNLOAD ========== */}
      <div className="fixed -left-[9999px] top-0">
        <div ref={cleanRef} className="bg-black p-8 w-[900px]">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">UK Police on X</h1>
            <p className="text-gray-400 mt-1">(YooKay Police doing a madness)</p>
          </div>

          <div className="space-y-5">
            {tiers.map(tier => (
              <div key={tier} className="flex items-start gap-3">
                <div
                  className="w-24 h-24 flex-shrink-0 rounded-xl flex flex-col items-center justify-center text-center px-1"
                  style={{ 
                    backgroundColor: tierColors[tier] + '33', 
                    border: `2px solid ${tierColors[tier]}` 
                  }}
                >
                  <div 
                    className="text-3xl font-black leading-none"
                    style={{ color: tierColors[tier] }}
                  >
                    {tier}
                  </div>
                  <div className="text-[10px] font-medium text-white/90 mt-1 leading-tight break-words w-full px-0.5">
                    {tierTitles[tier]}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {tierLists[tier].map(tweet => (
                    <div key={tweet.id} className="w-24 text-center">
                      <img
                        src={`/images/${tweet.id}.png`}
                        alt=""
                        className="w-24 h-24 object-cover rounded-xl mb-1 bg-gray-800"
                      />
                      <div className="text-[11px] text-gray-300 truncate">{tweet.handle}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10 text-gray-500 text-sm space-y-1">
            <div>Make your own → bit.ly/UK-Police-On-X (case sensitive)</div>
            <div>Questions — DM @RareAxies on X</div>
          </div>
        </div>
      </div>
    </div>
  );
}