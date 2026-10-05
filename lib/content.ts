export const heroWords = ["convert", "last", "grow", "lead"];

export const costRoles = [
  { role: "Marketing Strategist", range: "$3,000 to $6,000" },
  { role: "Social Media Manager", range: "$2,000 to $4,000" },
  { role: "Content Creator", range: "$2,500 to $5,000" },
  { role: "Designer", range: "$1,500 to $3,000" },
  { role: "Ads Manager", range: "$1,000 to $3,000" },
  { role: "Email Specialist", range: "$1,000 to $2,500" },
];

export type Service = {
  title: string;
  lead: string;
  points: string[];
  price?: string;
  image: string;
  pos?: string;
};

export const services: Service[] = [
  {
    title: "Brand development",
    lead: "Strategy, messaging, positioning and a visual identity that makes your work impossible to mistake for anyone else’s.",
    points: [
      "Brand strategy and positioning",
      "Custom logo, colour and typography system",
      "Mini brand guide for consistent use",
      "Social profile and launch assets",
    ],
    price: "Complete rebrand from $3,500",
    image: "/img/born-to-create.webp",
    pos: "50% 6%",
  },
  {
    title: "Social media and content",
    lead: "Planning, scripting, shooting and publishing, so your brand shows up every week and sounds like you.",
    points: [
      "Monthly content calendar and planning",
      "Up to 20 posts a month on three platforms",
      "One monthly content shoot",
      "Monthly performance report and strategy call",
    ],
    price: "From $2,000 a month",
    image: "/img/phone-clarity.webp",
    pos: "50% 45%",
  },
  {
    title: "Websites and funnels",
    lead: "Conversion focused sites, landing pages and lead capture that turn attention into enquiries.",
    points: [
      "Custom design and development, up to five core pages",
      "Conversion focused website copywriting",
      "Lead capture and email integration",
      "Foundational on page SEO",
    ],
    image: "/img/stationery.webp",
    pos: "50% 50%",
  },
  {
    title: "Ads, email and SMS",
    lead: "Paid social, newsletters and automated sequences that keep your audience warm and your offers moving.",
    points: [
      "Paid social campaigns and ad creative",
      "Audience targeting and retargeting",
      "Newsletters and automated sequences",
      "Launch, promotion and event marketing",
    ],
    image: "/img/phone-clarity.webp",
    pos: "50% 70%",
  },
  {
    title: "Documentary and campaigns",
    lead: "Story led film and campaign work that preserves your impact and gives your people something to rally behind.",
    points: [
      "Story development and creative direction",
      "Up to two production days and three interviews",
      "A 7 to 12 minute documentary and trailer",
      "Short form edits and promotional clips",
    ],
    price: "From $4,000",
    image: "/img/stationery.webp",
    pos: "20% 50%",
  },
  {
    title: "Consulting and coaching",
    lead: "Marketing guidance and team training for leaders who want to run the work themselves, with a clear plan.",
    points: [
      "Marketing consulting",
      "Team training",
      "Funnel and offer reviews",
      "Roadmaps your team can follow",
    ],
    image: "/img/born-to-create.webp",
    pos: "50% 80%",
  },
];

export const cases = [
  {
    client: "One Africa",
    kind: "Crowdfunding campaign for Repaired Nations",
    stat: "$11K+",
    statLabel: "raised in 40 days",
    copy: "We rebranded the campaign, produced a documentary style film and 3D renderings, and ran the fundraising campaign end to end.",
  },
  {
    client: "A Holy Culture Christmas",
    kind: "Album campaign",
    stat: "",
    statLabel: "",
    copy: "One campaign identity, rollout strategy and creative direction that brought multiple artists and releases together.",
  },
  {
    client: "Madam Lucy Gari",
    kind: "Rebranding, documentary and website",
    stat: "",
    statLabel: "",
    copy: "A new brand, a documentary and a redesigned website for a Ghanaian gari brand.",
  },
];

export const team = [
  { name: "Loren La’Vitta", role: "Founder and CEO", img: "/team/loren.webp", pos: "50% 22%" },
  { name: "Nii Hammond", role: "Partner and Director of Operations", img: "/team/nii.webp", pos: "50% 25%" },
  { name: "Chris", role: "Creative Director", img: "/team/chris.webp", pos: "50% 25%" },
  { name: "Elikem", role: "Director of Brand Voice", img: "/team/elikem.webp", pos: "46% 30%" },
  { name: "AY", role: "Multimedia Specialist", img: "/team/ay.webp", pos: "50% 25%" },
];
