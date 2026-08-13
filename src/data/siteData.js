/*
 * ============================================================
 *  FILE QUAN TRỌNG NHẤT ĐỂ CHỈNH NỘI DUNG WEBSITE
 * ============================================================
 *
 * Bạn có thể thay:
 * - tên website, logo, banner
 * - tin tức (news)
 * - video (movies)
 * - profile, works, schedule
 * - social links
 *
 * Ảnh đặt trong: public/images/
 * Sau đó dùng đường dẫn: /images/ten-file.jpg
 */

export const siteData = {
  site: {
    name: 'MilkLove',
    shortName: 'ML',
    languageLabel: 'EN',
    tagline: 'Official Fan Hub',
    titleLine1: 'Milk',
    titleLine2: 'Love',
    logo: '/images/avt.svg',
    heroImage: '/images/x-header-ditto.svg',
    heroLabel: 'MilkLove Family',
    footerNote: 'Not affiliated with MilkLove or any agency',
    copyright: '©2026 MilkLove HUB · Fan-made editable edition',
    accentColor: '#d94f6a',
  },

  banners: [
    { image: '/images/x-header-ditto.svg', url: '/works', alt: 'Ditto' },
    { image: '/images/work-fancon.svg', url: '/schedule', alt: 'Fancon' },
    { image: '/images/work-235.svg', url: '/works', alt: '23.5' },
  ],

  countdown: {
    label: 'Countdown to MilkLove Fancon',
    target: '2026-11-15T18:00:00+07:00',
  },

  news: [
    {
      id: 1,
      title: 'MilkLove Fancon 2026 — Official announcement & ticket info coming soon!',
      date: '2026,08,10',
      image: '/images/work-fancon.svg',
      isNew: true,
      url: '/schedule',
    },
    {
      id: 2,
      title: 'Girl Rules Fan Meeting — Taipei, August 15, 2026',
      date: '2026,08,08',
      image: '/images/work-girlrules.svg',
      isNew: true,
      url: '/schedule',
    },
    {
      id: 3,
      title: 'Ditto — New series starring Milk Pansa & Love Pattranite (TBA)',
      date: '2026,08,05',
      image: '/images/work-ditto.svg',
      isNew: false,
      url: '/works',
    },
    {
      id: 4,
      title: 'Scarlet Heart Thailand — Support role confirmed for MilkLove',
      date: '2026,08,03',
      image: '/images/work-scarlet.svg',
      isNew: false,
      url: '/works',
    },
    {
      id: 5,
      title: 'White Christmas Fan Meet Day — Madrid, December 12, 2026',
      date: '2026,08,01',
      image: '/images/work-whale.svg',
      isNew: false,
      url: '/schedule',
    },
    {
      id: 6,
      title: '23.5 — Full series now available on YouTube',
      date: '2026,07,28',
      image: '/images/work-235.svg',
      isNew: false,
      url: '/works',
    },
  ],

  movies: [
    {
      id: 1,
      title: '23.5 OST',
      youtubeId: 'placeholder1',
      thumbnail: '/images/work-235.svg',
      url: 'https://www.youtube.com/results?search_query=milklove+23.5',
    },
    {
      id: 2,
      title: 'Whale Store xoxo',
      youtubeId: 'placeholder2',
      thumbnail: '/images/work-whale.svg',
      url: 'https://www.youtube.com/results?search_query=milklove+whale+store',
    },
    {
      id: 3,
      title: 'Girl Rules',
      youtubeId: 'placeholder3',
      thumbnail: '/images/work-girlrules.svg',
      url: 'https://www.youtube.com/results?search_query=milklove+girl+rules',
    },
    {
      id: 4,
      title: 'Fancon Teaser',
      youtubeId: 'placeholder4',
      thumbnail: '/images/work-fancon.svg',
      url: 'https://www.youtube.com/results?search_query=milklove+fancon',
    },
    {
      id: 5,
      title: 'Behind the Scenes',
      youtubeId: 'placeholder5',
      thumbnail: '/images/hero.svg',
      url: 'https://www.youtube.com/results?search_query=milklove',
    },
  ],

  profiles: [
    {
      slug: 'milk',
      name: 'Milk',
      fullName: 'Milk Pansa',
      subtitle: 'Actor · Artist',
      image: '/images/profile-milk.svg',
      accent: '#d6b2b8',
      facts: [
        { label: 'Birthday', value: '31 July' },
        { label: 'Height', value: '170 cm' },
        { label: 'Hometown', value: 'Lampang' },
      ],
      bio: 'Thay đoạn giới thiệu Milk tại đây.',
    },
    {
      slug: 'love',
      name: 'Love',
      fullName: 'Love Pattranite',
      subtitle: 'Actor · Artist',
      image: '/images/profile-love.svg',
      accent: '#c9d5e8',
      facts: [
        { label: 'Birthday', value: '23 May' },
        { label: 'Height', value: '156 cm' },
        { label: 'Hometown', value: 'Bangkok' },
      ],
      bio: 'Thay đoạn giới thiệu Love tại đây.',
    },
    {
      slug: 'muvmuv',
      name: 'MuvMuv',
      fullName: 'MuvMuv',
      subtitle: 'Family mascot',
      image: '/images/profile-muvmuv.svg',
      accent: '#ead7a7',
      facts: [
        { label: 'Type', value: 'Mascot' },
        { label: 'Family', value: 'Fluffy Family' },
        { label: 'Status', value: 'Loved' },
      ],
      bio: 'Thay đoạn giới thiệu MuvMuv tại đây.',
    },
  ],

  works: [
    {
      id: 1,
      year: 'TBA',
      category: 'Series',
      date: 'Soon',
      title: 'Ditto',
      roles: 'Rafah (Dear) and Dream, Rafah',
      image: '/images/work-ditto.svg',
      tag: 'Lead Role',
      url: '#',
    },
    {
      id: 2,
      year: 'TBA',
      category: 'Series',
      date: 'Soon',
      title: 'Scarlet Heart Thailand',
      roles: 'Hong Kham',
      image: '/images/work-scarlet.svg',
      tag: 'Support Role',
      url: '#',
    },
    {
      id: 3,
      year: '2026',
      category: 'Series',
      date: '9 Mar 2026',
      title: 'Girl Rules',
      roles: 'Shasha, Gorya',
      image: '/images/work-girlrules.svg',
      tag: 'YouTube Playlist',
      url: '#',
    },
    {
      id: 4,
      year: '2025',
      category: 'Series',
      date: '25 Jun 2025',
      title: 'Whale Store xoxo',
      roles: 'Wan, Maewnam',
      image: '/images/work-whale.svg',
      tag: 'YouTube Playlist',
      url: '#',
    },
    {
      id: 5,
      year: '2024',
      category: 'Series',
      date: '8 Mar 2024',
      title: '23.5',
      roles: 'Ongsa, Sun',
      image: '/images/work-235.svg',
      tag: 'YouTube Playlist',
      url: '#',
    },
    {
      id: 6,
      year: '2026',
      category: 'Event',
      date: '15 Nov 2026',
      title: 'MilkLove Fancon',
      roles: 'MilkLove Fancon',
      image: '/images/work-fancon.svg',
      tag: 'Event',
      url: '#',
    },
  ],

  schedule: [
    { date: '15 Aug 2026', city: 'Taipei', title: 'Girl Rules Fan Meeting', type: 'On Stage' },
    { date: '3 Oct 2026', city: 'Manila', title: 'Girl Rules Fan Meeting', type: 'On Stage' },
    { date: '15 Nov 2026', city: 'Bangkok', title: 'MilkLove Fancon', type: 'Fancon' },
    { date: '12 Dec 2026', city: 'Madrid', title: 'White Christmas Fan Meet Day', type: 'On Stage' },
  ],

  stats: [
    { label: 'Milk', value: 1027 },
    { label: 'Love', value: 975 },
    { label: 'MilkLove', value: 654 },
    { label: 'MuvMuv', value: 54 },
    { label: 'Fluffy Family', value: 21 },
  ],

  guideTabs: [
    {
      name: 'Basics',
      items: [
        { no: '01', title: 'Velocity', text: 'Getting engagements in the first 15–30 mins triggers the system best.' },
        { no: '02', title: 'Network Diversity', text: 'Engage diverse users or non-fans to interact with the posts.' },
        { no: '03', title: 'Contextual Integrity', text: 'Always write new content. Avoid copy-pasting identical text.' },
      ],
    },
    {
      name: 'Algorithm',
      items: [
        { no: '01', title: 'Early signals', text: 'Add your own algorithm notes here.' },
        { no: '02', title: 'Retention', text: 'Add your own engagement notes here.' },
      ],
    },
    {
      name: 'Tags & KWs',
      items: [
        { no: '01', title: 'Hashtags', text: 'Add hashtags and keywords here.' },
      ],
    },
    {
      name: 'Rules',
      items: [
        { no: '01', title: 'Community rules', text: 'Add fanbase rules here.' },
      ],
    },
  ],

  socials: [
    { label: 'Facebook', url: 'https://www.facebook.com/MilkLove.tothemoon/', icon: 'facebook' },
    { label: 'X', url: '#', icon: 'twitter' },
    { label: 'Instagram', url: '#', icon: 'instagram' },
    { label: 'TikTok', url: '#', icon: 'tiktok' },
  ],
}
