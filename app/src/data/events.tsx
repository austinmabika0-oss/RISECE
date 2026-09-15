import React from "react";
import {
  IconBuilding,
  IconRuler2,
  IconBrain,
  IconBolt,
  IconFileText,
  IconFlask,
  IconPuzzle,
  IconBuildingMonument,
} from "@tabler/icons-react";

export interface Event {
  id: number;
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  category: "structural" | "digital" | "knowledge" | "creative";
  domain: string;
  teamSize: string;
  isTeamEvent: boolean;
  minTeamSize: number;
  maxTeamSize: number;
  duration: string;
  prize: string;
  overview: string;
  rules: string[];
  judgingCriteria: { criteria: string; detail: string }[];
  venue: string;
  date: string;
  time: string;
  coordinators: { name: string; phone: string; role: string }[];
  color: string;
  image?: string;
}

export const events: Event[] = [
  {
    id: 1,
    slug: "bridgemania",
    code: "EVT-01",
    title: "Bridgemania",
    subtitle: "From Sticks to Strength",
    icon: <IconBuilding size={32} stroke={1.5} />,
    category: "structural",
    domain: "Structural Engineering",
    teamSize: "2–4 Members",
    isTeamEvent: true,
    minTeamSize: 2,
    maxTeamSize: 4,
    duration: "7 Hours",
    prize: "₹10,000 / ₹7,000 / ₹3,500",
    overview:
      "Build a bridge using ice-cream sticks on the spot, judged on strength-to-weight ratio.",
    rules: [
      "Model must be prepared on event days only",
      "Bridge must span 500–800 mm clear span between two supports",
      "Only ice cream sticks, bamboo skewers, and Anabond glue are permitted",
    ],
    judgingCriteria: [
      { criteria: "Strength-to-Weight Ratio", detail: "Maximum load divided by self-weight — highest weightage" },
      { criteria: "Construction Quality", detail: "Neatness, joint quality, and structural integrity" },
    ],
    venue: "Civil Lab 1 (Block B)",
    date: "Oct 9, 2026",
    time: "10:00 AM",
    coordinators: [
      { name: "V Sudheer", phone: "+91 98765 43210", role: "Student Coordinator" },
      { name: "Dr. S. Kumar", phone: "+91 98765 43211", role: "Faculty Coordinator" },
    ],
    color: "#06b6d4",
    image: "/images/events/bridgemania.png",
  },
  {
    id: 2,
    slug: "autocad",
    code: "EVT-02",
    title: "AutoCAD",
    subtitle: "2D Engineering Drawing",
    icon: <IconRuler2 size={32} stroke={1.5} />,
    category: "digital",
    domain: "AutoCAD & Design",
    teamSize: "Individual",
    isTeamEvent: false,
    minTeamSize: 1,
    maxTeamSize: 1,
    duration: "2 Hours",
    prize: "₹6,000 / ₹4,000 / ₹2,000",
    overview:
      "2D engineering drawing from a given problem. Accuracy & drafting standards tested. Individual.",
    rules: [
      "Only AutoCAD software allowed (provided on lab machines)",
      "Must include proper layers, dimensions, and title block",
    ],
    judgingCriteria: [
      { criteria: "Accuracy", detail: "Precision of dimensions and geometry" },
      { criteria: "Standardization", detail: "Proper use of layers, line weights, and annotations" },
    ],
    venue: "CAD Lab (Block B)",
    date: "Oct 10, 2026",
    time: "02:00 PM",
    coordinators: [
      { name: "Younnes Abdullah", phone: "+91 98765 43220", role: "Student Coordinator" },
    ],
    color: "#f43f5e",
    image: "/images/events/cad-drafting.png",
  },
  {
    id: 3,
    slug: "ai-project",
    code: "EVT-03",
    title: "AI PROJECT - PROTOTYPE/ LIVE MODEL CHALLENGE",
    subtitle: "AI Application in Civil Engineering",
    icon: <IconBrain size={32} stroke={1.5} />,
    category: "digital",
    domain: "Programming / Computing",
    teamSize: "2-5 Members",
    isTeamEvent: true,
    minTeamSize: 2,
    maxTeamSize: 5,
    duration: "Exhibition Format",
    prize: "₹5,000 / ₹3,000 / ₹1,500",
    overview:
      "AI Application in all streams of Civil Engineering (Structural, Geotechnical, Transportation, Water resource, Environmental, RSGIS). These should be live demonstration with protype/ working model",
    rules: [
      "Must demonstrate an AI application relevant to civil engineering",
      "Live demonstration of the prototype or working model is mandatory",
    ],
    judgingCriteria: [
      { criteria: "Innovation", detail: "Novelty of the AI application" },
      { criteria: "Functionality", detail: "Effectiveness of the live prototype" },
    ],
    venue: "Computing Lab (Block A)",
    date: "Oct 10, 2026",
    time: "09:30 AM",
    coordinators: [
      { name: "Kasambarare T", phone: "+91 98765 43214", role: "Student Coordinator" },
    ],
    color: "#f59e0b",
    image: "/images/events/code-breaker.png",
  },
  {
    id: 4,
    slug: "technical-quiz",
    code: "EVT-04",
    title: "Technical Quiz (Spot)",
    subtitle: "Rapid Recall",
    icon: <IconBolt size={32} stroke={1.5} />,
    category: "knowledge",
    domain: "General Civil Engineering",
    teamSize: "Individual",
    isTeamEvent: false,
    minTeamSize: 1,
    maxTeamSize: 1,
    duration: "2 Hours",
    prize: "₹5,000 / ₹3,000 / ₹1,500",
    overview:
      "Civil engineering concepts, rapid recall. Battle of Brains across all major civil disciplines.",
    rules: [
      "Prelims: Written test containing MCQs",
      "Top teams advance to the stage finals",
    ],
    judgingCriteria: [
      { criteria: "Prelims Score", detail: "Cutoff for finals" },
      { criteria: "Finals Performance", detail: "Points accumulated across stage rounds" },
    ],
    venue: "Main Auditorium",
    date: "Oct 9, 2026",
    time: "03:00 PM",
    coordinators: [
      { name: "CH Sandhya", phone: "+91 98765 43215", role: "Student Coordinator" },
    ],
    color: "#10b981",
    image: "/images/events/technical-quiz.png",
  },
  {
    id: 5,
    slug: "paper-presentation",
    code: "EVT-05",
    title: "Paper presentation",
    subtitle: "Research Symposium",
    icon: <IconFileText size={32} stroke={1.5} />,
    category: "knowledge",
    domain: "Academic Research",
    teamSize: "1–2 Members",
    isTeamEvent: true,
    minTeamSize: 1,
    maxTeamSize: 2,
    duration: "10 mins per presentation",
    prize: "₹6,000 / ₹4,000 / ₹2,000",
    overview:
      "Present an original civil engineering research paper.",
    rules: [
      "Abstracts must be submitted prior to the event for screening",
      "Presentations must use PPT format",
    ],
    judgingCriteria: [
      { criteria: "Content & Research", detail: "Depth of understanding and methodology" },
      { criteria: "Presentation Skills", detail: "Clarity, confidence, and visual aids" },
    ],
    venue: "Seminar Hall A",
    date: "Oct 10, 2026",
    time: "11:00 AM",
    coordinators: [
      { name: "P Venkat", phone: "+91 98765 43217", role: "Student Coordinator" },
    ],
    color: "#3b82f6",
    image: "/images/events/paper-present.png",
  },
  {
    id: 6,
    slug: "smart-mix",
    code: "EVT-06",
    title: "Smart Mix: Light Weight Concrete",
    subtitle: "Material Science Challenge",
    icon: <IconFlask size={32} stroke={1.5} />,
    category: "structural",
    domain: "Material Science",
    teamSize: "2-4 Members",
    isTeamEvent: true,
    minTeamSize: 2,
    maxTeamSize: 4,
    duration: "3 Hours",
    prize: "₹7,500 / ₹5,000 / ₹2,500",
    overview:
      "Design & cast a lightweight concrete cube. Judged on strength-to-weight ratio (compressive strength vs density). Innovation in materials encouraged.",
    rules: [
      "Must incorporate lightweight materials",
      "Cubes will be cast on-site and accelerated curing methods will be used",
    ],
    judgingCriteria: [
      { criteria: "Strength-to-Weight Ratio", detail: "Compressive strength vs density" },
      { criteria: "Innovation", detail: "Use of novel lightweight materials" },
    ],
    venue: "Concrete Lab (Block C)",
    date: "Oct 9, 2026",
    time: "01:30 PM",
    coordinators: [
      { name: "K Narendra", phone: "+91 98765 43212", role: "Student Coordinator" },
    ],
    color: "#8b5cf6",
    image: "/images/events/smart-mix.png",
  },
  {
    id: 7,
    slug: "technical-treasure-hunt",
    code: "EVT-07",
    title: "Technical Treasure Hunt",
    subtitle: "Logic & Spatial Reasoning",
    icon: <IconPuzzle size={32} stroke={1.5} />,
    category: "creative",
    domain: "Logic & Aptitude",
    teamSize: "2-4 Members",
    isTeamEvent: true,
    minTeamSize: 2,
    maxTeamSize: 4,
    duration: "2 Hours",
    prize: "₹3,000 / ₹2,000 / ₹1,000",
    overview:
      "Find technical clues, solve engineering-based puzzles.",
    rules: [
      "Follow the trail of clues across the campus",
      "Time is the critical factor",
    ],
    judgingCriteria: [
      { criteria: "Speed", detail: "First team to reach the final destination with all clues solved" },
    ],
    venue: "Campus Wide (Start at Classroom 101)",
    date: "Oct 9, 2026",
    time: "11:30 AM",
    coordinators: [
      { name: "Anashe", phone: "+91 98765 43219", role: "Student Coordinator" },
    ],
    color: "#eab308",
    image: "/images/events/puzzle-challenge.png",
  },
  {
    id: 8,
    slug: "model-making",
    code: "EVT-08",
    title: "Model Making - Structural Showcase",
    subtitle: "Scale Models",
    icon: <IconBuildingMonument size={32} stroke={1.5} />,
    category: "creative",
    domain: "Urban Planning",
    teamSize: "2–4 Members",
    isTeamEvent: true,
    minTeamSize: 2,
    maxTeamSize: 4,
    duration: "Exhibition Format",
    prize: "₹8,000 / ₹5,000 / ₹2,500",
    overview:
      "Pre-build scale model of an iconic world structure + technical presentation.",
    rules: [
      "Maximum footprint size: 1m x 1m",
      "Models must be pre-built before the event",
    ],
    judgingCriteria: [
      { criteria: "Detailing", detail: "Aesthetic quality and physical craftsmanship" },
      { criteria: "Presentation", detail: "Technical explanation of the structure" },
    ],
    venue: "Exhibition Hall",
    date: "Oct 10, 2026",
    time: "All Day",
    coordinators: [
      { name: "Simba C", phone: "+91 98765 43216", role: "Student Coordinator" },
    ],
    color: "#ec4899",
    image: "/images/events/model-making.png",
  }
];
