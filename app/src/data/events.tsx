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
    duration: "4 Hours",
    prize: "₹7,000",
    overview:
      "On-spot bridge-making competition challenging undergraduate engineering students to design and construct an efficient scale model bridge. Participants choose any structural typology (Truss, Arch, Cantilever, Suspension, or Cable-Stayed) and optimize the Structural Efficiency Ratio (SER = Ultimate Load Capacity / Mass of Bridge).",
    rules: [
      "Model should be prepared on event days only — 4 hours on Day 1 to build, tested on Day 2",
      "All structural elements must be built exclusively using materials provided by the organizers",
      "Provided materials (per team): Max 150 standard popsicle sticks and 1 bottle of Wood Glue",
      "Permitted tools (to be brought by participants): utility knife/cutter, cutting mat, pencil, sandpaper, steel ruler only",
      "Bridge must span a clear horizontal gap of exactly 400 mm; total length must be 440–480 mm",
      "Maximum width: 100 mm; Maximum total height: 250 mm (lowest chord to highest peak)",
      "Bridge must feature a horizontal roadway deck ≥40 mm wide, allowing a 40 mm × 40 mm testing block to pass unimpeded",
      "Laminating more than 3 sticks face-to-face is prohibited; sticks must not be soaked in chemical agents",
      "Bridges failing dimensional criteria during pre-test inspection face immediate disqualification",
      "Judges\u2019 decisions are final and binding",
    ],
    judgingCriteria: [
      { criteria: "Strength-to-Weight Ratio", detail: "Primary criterion — SER = Ultimate Load Capacity (kg) / Mass of Bridge (kg); recorded at structural collapse or 30 mm deflection" },
      { criteria: "Creativity & Design", detail: "Aesthetic appeal and innovative structural form; choice of typology" },
      { criteria: "Presentation", detail: "Team\u2019s ability to explain design choices and respond to judges\u2019 questions" },
    ],
    venue: "U Block, 1st Floor AFF 12",
    date: "Oct 9, 2026",
    time: "01:00 PM",
    coordinators: [
      { name: "Mr. M. Anirudh", phone: "", role: "Faculty Advisor" },
      { name: "V. Sudheer", phone: "+91 9391833416", role: "Student Coordinator" },
      { name: "Y. Gayathri", phone: "+91 7569953276", role: "Student Coordinator" },
      { name: "Nyama", phone: "+91 8247089641", role: "Student Coordinator" },
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
    venue: "U Block, 1st Floor CAD Lab AFF8(A)",
    date: "Oct 10, 2026",
    time: "08:30 AM",
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
    prize: "₹6,000",
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
    venue: "U Block, 1st Floor Corridor",
    date: "Oct 9, 2026",
    time: "01:00 PM",
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
    prize: "₹6,000",
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
    venue: "U Block, 1st Floor AFF 15",
    date: "Oct 9, 2026",
    time: "04:00 PM",
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
    venue: "U Block, 1st Floor AFF 15",
    date: "Oct 9, 2026",
    time: "01:00 PM",
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
    venue: "Structural Computational & Research Lab, Opp. Pharmacy Block",
    date: "Oct 10, 2026",
    time: "08:30 AM",
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
    venue: "Reporting at U Block, 1st Floor AFF 11",
    date: "Oct 10, 2026",
    time: "10:30 AM",
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
    title: "Model Making - Structure Showcase",
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
      "Pre-build a scale model of a world-famous structure and deliver a structured technical presentation. Choose from: Burj Khalifa, Eiffel Tower, Lotus Temple, Taj Mahal — or any other world-famous structure of your choice. Models must be built before the event using any material of choice.",
    rules: [
      "Assigned Structures Pool: Burj Khalifa, Eiffel Tower, Lotus Temple, Taj Mahal — or any other world-famous structure of your choice",
      "Model dimensions must not exceed 600 mm × 600 mm × 800 mm (L × W × H)",
      "Models must be constructed before the event and brought on the day",
      "Presentation must strictly follow the provided 10-slide structure focusing on engineering facts and reasoning",
    ],
    judgingCriteria: [
      { criteria: "Detailing", detail: "Aesthetic quality and physical craftsmanship" },
      { criteria: "Presentation", detail: "Technical explanation of the structure" },
    ],
    venue: "U Block, 1st Floor Corridor",
    date: "Oct 9, 2026",
    time: "01:00 PM",
    coordinators: [
      { name: "Simba C", phone: "+91 98765 43216", role: "Student Coordinator" },
    ],
    color: "#ec4899",
    image: "/images/events/model-making.png",
  }
];
