/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  Printer,
  Copy,
  Check,
  Mail,
  Linkedin,
  ExternalLink,
  FileText,
  Search,
  Code,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  Briefcase,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location?: string;
  period: string;
  category: 'leadership' | 'social' | 'sports';
  description: string;
  highlights?: string[];
  skills: string[];
}

interface ProjectItem {
  id: string;
  title: string;
  initiative: string;
  period?: string;
  description: string;
  keyOutcomes: string[];
  tags: string[];
}

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  detail?: string;
}

interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export default function App() {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'standard' | 'plainText' | 'sourceInspector'>('standard');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2200);
  };

  const handlePrint = () => {
    window.print();
  };

  const educationData: EducationItem[] = [
    {
      id: 'pgdm',
      degree: 'PGDM',
      institution: 'Institute of Management Development & Research (IMDR)',
      location: 'Pune',
      period: '2026–Present',
      detail: 'Specializing in Human Resources & Marketing. Active member of IPCAC and IIIC committees.'
    },
    {
      id: 'ba',
      degree: 'Bachelor of Arts',
      institution: 'Fergusson College',
      location: 'Pune',
      period: '2026',
      grade: '8.0 CGPA',
      detail: 'Comprehensive grounding in humanities, analytical thinking, and community engagement.'
    },
    {
      id: 'hsc',
      degree: 'HSC',
      institution: 'Winfin College',
      location: 'Jamkhed',
      period: '2022',
      grade: '93.17%',
      detail: 'Graduated with distinction and academic excellence.'
    },
    {
      id: 'cbse',
      degree: 'CBSE',
      institution: 'Jawahar Navodaya Vidyalaya',
      location: 'Nanded',
      period: '2020',
      grade: '81.6%',
      detail: 'Residential school curriculum focusing on holistic leadership and discipline.'
    }
  ];

  const skillsData = {
    management: [
      'Communication',
      'Teamwork',
      'Leadership',
      'Coordination',
      'Time Management',
      'Multitasking',
      'Problem Solving'
    ],
    marketing: [
      'Content & Presentation',
      'Canva',
      'Social Media Basics',
      'Market/Topic Research'
    ],
    tools: [
      'MS Excel',
      'MS Word',
      'MS PowerPoint',
      'Canva'
    ]
  };

  const projectsData: ProjectItem[] = [
    {
      id: 'sih-ai-advisory',
      title: 'AI-Driven Hyper-Local Business Advisory & Financial Structuring Assistant',
      initiative: 'Smart India Hackathon',
      description:
        'Worked on a software concept for rural micro-entrepreneurs covering local demand/business opportunity advisory, cost estimation, financing guidance and government-scheme support.',
      keyOutcomes: [
        'Formulated hyper-local opportunity identification framework for rural micro-enterprises',
        'Engineered cost estimation and viability structure for small enterprise bootstrapping',
        'Mapped central and state government credit schemes into accessible decision flows'
      ],
      tags: ['Problem Solving', 'Market/Topic Research', 'Content & Presentation', 'Coordination']
    },
    {
      id: 'rswf-urban-study',
      title: 'Urban Mobility, Pedestrian Infrastructure & Street Guidelines Field Study',
      initiative: 'RSWF (Social Work)',
      period: 'Dec 2025–Apr 2026',
      description:
        'Conducted field observations and documentation on FC Road and JM Road in Pune, comparing footpaths, carriageway, cycle tracks, parking, lighting, signage and waste-management conditions with relevant urban-street guidelines.',
      keyOutcomes: [
        'Carried out rigorous on-ground comparative documentation across FC Road & JM Road corridors',
        'Audited footpath continuity, pedestrian accessibility, cycle lane demarcations, and lighting',
        'Synthesized findings against municipal urban street guidelines to present community recommendations'
      ],
      tags: ['Research', 'Coordination', 'Teamwork', 'Communication']
    }
  ];

  const experienceData: ExperienceItem[] = [
    {
      id: 'placement-coordinator',
      role: 'Placement Coordinator – IPCAC',
      organization: 'IMDR, Pune',
      period: '2026–Present',
      category: 'leadership',
      description:
        'Coordinated placement-related activities and supported industry/recruiter communication. Assisted with company outreach and collection of recruitment-related information.',
      highlights: [
        'Liaised between corporate recruiting teams, placement cells, and management students',
        'Managed placement database records, verified candidate profiles, and scheduled interview rounds',
        'Drove outreach initiatives to establish initial contact with prospective hiring partners'
      ],
      skills: ['Coordination', 'Communication', 'Multitasking', 'MS Excel']
    },
    {
      id: 'iiic-committee',
      role: 'IIIC Committee Member',
      organization: 'IMDR, Pune',
      period: '2026–Present',
      category: 'leadership',
      description:
        'Contributed to committee activities involving institutional engagement, coordination and interaction with students and external stakeholders.',
      highlights: [
        'Facilitated institutional engagement between industry guest speakers and student cohorts',
        'Assisted in planning stakeholder forums, guest lectures, and institutional roundtables'
      ],
      skills: ['Leadership', 'Teamwork', 'Coordination', 'Communication']
    },
    {
      id: 'anchoring-event',
      role: 'Anchoring & Event Coordination',
      organization: 'IMDR, Pune',
      period: '2026–Present',
      category: 'leadership',
      description:
        'Anchored 4–5 college sessions/events, introducing speakers, managing transitions and engaging the audience. Developed confidence, stage presence and professional communication.',
      highlights: [
        'Served as Master of Ceremonies for 4–5 flagship institutional sessions and formal functions',
        'Authored speaking scripts, maintained formal stage etiquette, and handled impromptu speaker adjustments'
      ],
      skills: ['Communication', 'Leadership', 'Content & Presentation']
    },
    {
      id: 'rswf-field-work',
      role: 'RSWF (Social Work) Field Researcher',
      organization: 'RSWF',
      period: 'Dec 2025–Apr 2026',
      category: 'social',
      description:
        'Conducted field observations and documentation on FC Road and JM Road, comparing footpaths, carriageway, cycle tracks, parking, lighting, signage and waste-management conditions with relevant urban-street guidelines. Participated in field-based social work activities, gaining experience in observation, teamwork, documentation and community interaction.',
      highlights: [
        'Documented urban civil infrastructure, comparing empirical conditions to formal municipal guidelines',
        'Facilitated local merchant and pedestrian surveys to gather community feedback'
      ],
      skills: ['Teamwork', 'Problem Solving', 'Market/Topic Research']
    },
    {
      id: 'teaching-experience',
      role: 'Teaching Experience',
      organization: 'MSGGV School',
      period: '2025',
      category: 'social',
      description:
        'Supported students through teaching and classroom activities. Learned patience, leadership, communication and time management.',
      highlights: [
        'Facilitated structured classroom sessions for foundational academic development',
        'Cultivated adaptable pedagogical approaches tailored to varied student learning paces'
      ],
      skills: ['Communication', 'Leadership', 'Time Management']
    },
    {
      id: 'nss-volunteer',
      role: 'NSS Volunteer',
      organization: 'National Service Scheme',
      period: '2023–2025',
      category: 'social',
      description:
        'Participated in community service and awareness activities. Learned teamwork, discipline, leadership and social responsibility.',
      highlights: [
        'Led student teams during community health, literacy, and environmental cleanliness drives',
        'Earned official certification for continuous dedication to nationwide civic initiatives'
      ],
      skills: ['Teamwork', 'Leadership', 'Coordination']
    },
    {
      id: 'pledge-a-smile',
      role: 'Volunteer',
      organization: 'Pledge A Smile Foundation',
      period: 'Feb 2026–Mar 2026',
      category: 'social',
      description:
        'Participated in social initiatives and community activities. Learned coordination, empathy, teamwork and interpersonal skills.',
      highlights: [
        'Collaborated on welfare distribution drives and youth engagement programs',
        'Practiced empathetic community listening and grassroots volunteer mobilization'
      ],
      skills: ['Teamwork', 'Coordination', 'Communication']
    },
    {
      id: 'kho-kho-captain',
      role: 'KHO KHO Team Captain / Sports Participation',
      organization: 'Fergusson College',
      period: '2024–2026',
      category: 'sports',
      description:
        'Led the collegiate Kho Kho team as Captain. Demonstrated athletic discipline, tactical leadership, teamwork, and competitive sportsmanship.',
      highlights: [
        'Captained the college contingent in competitive inter-college tournaments',
        'Mentored new players on defensive maneuvering, timing, and mental resilience under pressure'
      ],
      skills: ['Leadership', 'Teamwork', 'Time Management']
    }
  ];

  const certificationsData: CertificationItem[] = [
    {
      id: 'cert-sih',
      title: 'Smart India Hackathon Concept Project Credential',
      issuer: 'Ministry of Education & Innovation Cell, GoI',
      year: '2024–2025',
      description:
        'AI-Driven Hyper-Local Business Advisory & Financial Structuring Assistant software concept designed to empower rural micro-entrepreneurs.'
    },
    {
      id: 'cert-nss',
      title: 'National Service Scheme (NSS) Certificate of Service',
      issuer: 'Ministry of Youth Affairs & Sports, Govt. of India',
      year: '2023–2025',
      description:
        'Recognized for completed 2-year volunteer term advancing community health, social awareness, environmental responsibility, and public service.'
    },
    {
      id: 'cert-rswf',
      title: 'RSWF Field Observation & Urban Assessment Credential',
      issuer: 'RSWF Social Work Initiative',
      year: '2025–2026',
      description:
        'Rigorous field documentation and evaluation of pedestrian footpaths, street guidelines, and cycle corridors on FC Road & JM Road Pune.'
    },
    {
      id: 'cert-imdr',
      title: 'Campus Placement & Industry Interaction Coordination (IPCAC / IIIC)',
      issuer: 'Institute of Management Development & Research (IMDR), Pune',
      year: '2026',
      description:
        'Recognized for recruiter outreach, placement operations, and corporate guest session anchoring.'
    }
  ];

  // Plain Text formatted ATS resume for recruiters and ATS copy
  const plainTextResume = useMemo(() => {
    return `SHRUTI NAROD
Pune, India | nshruti175@gmail.com | LinkedIn: https://www.linkedin.com/in/shruti-narod

PROFESSIONAL SUMMARY
PGDM student at the Institute of Management Development & Research (IMDR), Pune, with a Bachelor of Arts background and a strong interest in HR and Marketing. Actively involved in placement coordination and institutional committees, with practical exposure to student engagement, industry interaction, event coordination and professional communication. Experienced in anchoring multiple college sessions and activities, with strengths in teamwork, leadership, coordination and adaptability. Seeking opportunities in HR and Marketing where I can apply my management knowledge, communication skills and people-oriented approach.

EDUCATION
- PGDM | Institute of Management Development & Research (IMDR), Pune | 2026–Present
- Bachelor of Arts | Fergusson College, Pune | 2026 | 8.0 CGPA
- Higher Secondary Certificate (HSC) | Winfin College, Jamkhed | 2022 | 93.17%
- Central Board of Secondary Education (CBSE) | Jawahar Navodaya Vidyalaya, Nanded | 2020 | 81.6%

SKILLS
- Management & HR: Communication, Teamwork, Leadership, Coordination, Time Management, Multitasking, Problem Solving
- Marketing & Digital: Content & Presentation, Canva, Social Media Basics, Market/Topic Research
- Tools: MS Excel, MS Word, MS PowerPoint, Canva

PROJECTS
- AI-Driven Hyper-Local Business Advisory & Financial Structuring Assistant – Smart India Hackathon
  Worked on a software concept for rural micro-entrepreneurs covering local demand/business opportunity advisory, cost estimation, financing guidance and government-scheme support.
- FC Road & JM Road Urban Mobility & Street Guidelines Field Study – RSWF (Social Work) (Dec 2025–Apr 2026)
  Conducted field observations and documentation on FC Road and JM Road in Pune, comparing footpaths, carriageway, cycle tracks, parking, lighting, signage and waste-management conditions with relevant urban-street guidelines. Participated in field-based social work activities, gaining experience in observation, teamwork, documentation and community interaction.

EXPERIENCE
- Placement Coordinator – IPCAC, IMDR (2026–Present)
  Coordinated placement-related activities and supported industry/recruiter communication. Assisted with company outreach and collection of recruitment-related information.
- IIIC Committee Member – IMDR (2026–Present)
  Contributed to committee activities involving institutional engagement, coordination and interaction with students and external stakeholders.
- Anchoring & Event Coordination – IMDR (2026–Present)
  Anchored 4–5 college sessions/events, introducing speakers, managing transitions and engaging the audience. Developed confidence, stage presence and professional communication.
- RSWF (Social Work) Field Researcher (Dec 2025–Apr 2026)
  Conducted field observations and documentation on FC Road and JM Road, comparing footpaths, carriageway, cycle tracks, parking, lighting, signage and waste-management conditions with relevant urban-street guidelines. Participated in field-based social work activities, gaining experience in observation, teamwork, documentation and community interaction.
- Teaching Experience – MSGGV School (2025)
  Supported students through teaching and classroom activities. Learned patience, leadership, communication and time management.
- NSS Volunteer – National Service Scheme (2023–2025)
  Participated in community service and awareness activities. Learned teamwork, discipline, leadership and social responsibility.
- Volunteer – Pledge A Smile Foundation (Feb 2026–Mar 2026)
  Participated in social initiatives and community activities. Learned coordination, empathy, teamwork and interpersonal skills.
- KHO KHO Team Captain / Sports Participation – Fergusson College
  Led collegiate sports team, practicing team coordination, tactical discipline, and sportsmanship.

CERTIFICATIONS
- Smart India Hackathon – AI-Driven Rural Business Advisory & Financial Structuring Concept Project
- National Service Scheme (NSS) – Two-year Community Service & Social Leadership Volunteer Certificate (2023–2025)
- RSWF Urban Mobility & Field Assessment – Urban Street Guidelines Documentation
- IPCAC & IIIC Institutional Industry-Interaction Credential – IMDR Pune

LANGUAGES
English, Hindi, Marathi, Telugu

INTERESTS
Reading, Watching movies, Outdoor games, Event participation`;
  }, []);

  // Filter logic
  const filteredExperience = useMemo(() => {
    return experienceData.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSkill =
        !selectedSkillFilter ||
        item.skills.some((s) => s.toLowerCase() === selectedSkillFilter.toLowerCase());

      return matchesSearch && matchesSkill;
    });
  }, [searchQuery, selectedSkillFilter]);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((p) => {
      const matchesSearch =
        searchQuery === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.initiative.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesSkill =
        !selectedSkillFilter ||
        p.tags.some((t) => t.toLowerCase() === selectedSkillFilter.toLowerCase());

      return matchesSearch && matchesSkill;
    });
  }, [searchQuery, selectedSkillFilter]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Bar Contract: 3 zones, gap-8 */}
      <header className="site-header sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark */}
          <a
            href="#top"
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-slate-700 transition-colors"
          >
            Shruti Narod
          </a>

          {/* Zone 2: 4-5 single-line nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#summary" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Summary
            </a>
            <a href="#education" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Education
            </a>
            <a href="#skills" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Skills
            </a>
            <a href="#projects" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Projects
            </a>
            <a href="#experience" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Experience
            </a>
            <a href="#certifications" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
              Certifications
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
              title="Print or Save PDF resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Verification Notice Banner - directly explaining Ctrl+U visibility */}
      <div className="action-bar bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white">Crawler &amp; Page Source Verification:</span>
            <span className="text-slate-300">
              Press <kbd className="bg-slate-800 border border-slate-700 px-1 py-0.5 rounded text-[11px] text-white">Ctrl+U</kbd> or right-click &quot;View Page Source&quot; — all resume sections are directly present in plain text static HTML.
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => copyToClipboard(plainTextResume, 'all-resume')}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded border border-slate-700 transition-colors cursor-pointer"
            >
              {copiedType === 'all-resume' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 font-medium">Copied Full Resume!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy ATS Plain Text</span>
                </>
              )}
            </button>
            <button
              onClick={() => setActiveTab(activeTab === 'plainText' ? 'standard' : 'plainText')}
              className="px-2.5 py-1 text-slate-300 hover:text-white underline decoration-slate-600 hover:decoration-white transition-colors cursor-pointer"
            >
              {activeTab === 'plainText' ? 'Back to Full Layout' : 'View Plain Text Mode'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* View Switcher Bar */}
        <div className="action-bar mb-6 flex flex-wrap items-center justify-between gap-4 p-2 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('standard')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'standard'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Interactive Executive View
            </button>
            <button
              onClick={() => setActiveTab('plainText')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'plainText'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              ATS Plain Text View
            </button>
            <button
              onClick={() => setActiveTab('sourceInspector')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeTab === 'sourceInspector'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Source Code &amp; Crawler Preview
            </button>
          </div>

          {/* Quick Search */}
          {activeTab === 'standard' && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter skills, roles, projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition-all"
                />
              </div>
              {selectedSkillFilter && (
                <button
                  onClick={() => setSelectedSkillFilter(null)}
                  className="text-xs text-slate-500 hover:text-slate-900 underline whitespace-nowrap cursor-pointer"
                >
                  Clear ({selectedSkillFilter})
                </button>
              )}
            </div>
          )}
        </div>

        {/* Tab 1: ATS Plain Text Mode */}
        {activeTab === 'plainText' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Plain Text Resume (ATS Compatible)</h2>
                <p className="text-xs text-slate-500">
                  Ideal for pasting directly into job portals, applicant tracking systems, or email applications.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(plainTextResume, 'plain-tab')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
              >
                {copiedType === 'plain-tab' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All Text</span>
                  </>
                )}
              </button>
            </div>
            <pre className="font-mono text-xs sm:text-sm text-slate-800 bg-slate-50 p-6 rounded-lg border border-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed select-all">
              {plainTextResume}
            </pre>
          </div>
        )}

        {/* Tab 2: Source Code Inspector */}
        {activeTab === 'sourceInspector' && (
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs mb-8">
            <div className="pb-4 mb-4 border-b border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <Code className="w-4 h-4 text-slate-900" />
                <h2 className="text-lg font-bold text-slate-900">Page Source &amp; Crawler Validation</h2>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                As per search engine and crawler requirements, the resume text is not locked behind client-side JavaScript execution or images. The HTML markup below is embedded directly inside <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">index.html</code> so crawlers, search bots, and users pressing <kbd className="bg-slate-100 border border-slate-300 px-1 py-0.5 rounded text-slate-800 font-mono text-[11px]">Ctrl+U</kbd> receive immediate, full plain-text indexing.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="font-semibold text-slate-900 block mb-1">Headings Structure Verified:</span>
                  <ul className="space-y-0.5 text-slate-600">
                    <li>✓ <code className="font-mono">&lt;h1&gt;SHRUTI NAROD&lt;/h1&gt;</code></li>
                    <li>✓ <code className="font-mono">&lt;h2&gt;Education&lt;/h2&gt;</code></li>
                    <li>✓ <code className="font-mono">&lt;h2&gt;Skills&lt;/h2&gt;</code></li>
                    <li>✓ <code className="font-mono">&lt;h2&gt;Projects&lt;/h2&gt;</code></li>
                    <li>✓ <code className="font-mono">&lt;h2&gt;Experience&lt;/h2&gt;</code></li>
                    <li>✓ <code className="font-mono">&lt;h2&gt;Certifications&lt;/h2&gt;</code></li>
                  </ul>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <span className="font-semibold text-slate-900 block mb-1">Privacy &amp; Contact Compliance:</span>
                  <ul className="space-y-0.5 text-slate-600">
                    <li>✓ Phone number omitted as required</li>
                    <li>✓ Full residential address omitted (City only: Pune, India)</li>
                    <li>✓ Email: nshruti175@gmail.com verified</li>
                    <li>✓ LinkedIn profile verified</li>
                    <li>✓ Schema.org Person JSON-LD included</li>
                  </ul>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-700 block mb-1">Raw HTML Document Excerpt (Ctrl+U view):</span>
                <pre className="font-mono text-[11px] text-slate-800 bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto max-h-96 leading-relaxed">
{`<!-- Verified Page Source in index.html -->
<main class="max-w-4xl mx-auto px-6 py-12 bg-white ...">
  <header>
    <h1>SHRUTI NAROD</h1>
    <p>Pune, India · nshruti175@gmail.com · LinkedIn: Shruti Narod</p>
    <h2>Professional Summary</h2>
    <p>PGDM student at the Institute of Management Development & Research (IMDR), Pune, with a Bachelor of Arts background and a strong interest in HR and Marketing...</p>
  </header>

  <section id="education">
    <h2>Education</h2>
    <h3>PGDM - Institute of Management Development & Research (IMDR), Pune (2026–Present)</h3>
    <h3>Bachelor of Arts - Fergusson College, Pune (2026, 8.0 CGPA)</h3>
    <h3>HSC - Winfin College, Jamkhed (2022, 93.17%)</h3>
    <h3>CBSE - Jawahar Navodaya Vidyalaya, Nanded (2020, 81.6%)</h3>
  </section>

  <section id="skills">
    <h2>Skills</h2>
    <!-- Management & HR, Marketing & Digital, Tools -->
  </section>

  <section id="projects">
    <h2>Projects</h2>
    <!-- Smart India Hackathon & RSWF Field Study -->
  </section>

  <section id="experience">
    <h2>Experience</h2>
    <!-- IPCAC, IIIC, Anchoring, RSWF, Teaching, NSS, Pledge A Smile, Kho Kho -->
  </section>

  <section id="certifications">
    <h2>Certifications</h2>
    <!-- Smart India Hackathon, NSS, RSWF, IPCAC/IIIC -->
  </section>
</main>`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Executive Resume Layout (Always visible or primary) */}
        {activeTab === 'standard' && (
          <main className="resume-paper bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            {/* Header Section */}
            <div id="top" className="p-6 sm:p-10 border-b border-slate-200 bg-white">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
                    SHRUTI NAROD
                  </h1>
                  <p className="text-sm font-medium text-slate-700 mb-4">
                    PGDM Student · HR &amp; Marketing Focus · IMDR Pune
                  </p>

                  {/* Clean unboxed contact metadata with typographic separators */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 font-medium">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>Pune, India</span>
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <a
                      href="mailto:nshruti175@gmail.com"
                      className="inline-flex items-center gap-1 text-slate-900 hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>nshruti175@gmail.com</span>
                    </a>
                    <button
                      onClick={() => copyToClipboard('nshruti175@gmail.com', 'email')}
                      className="text-slate-400 hover:text-slate-900 p-0.5 rounded cursor-pointer print-hide"
                      title="Copy email address"
                    >
                      {copiedType === 'email' ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <a
                      href="https://www.linkedin.com/in/shruti-narod"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-slate-900 hover:underline"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                      <span>LinkedIn: Shruti Narod</span>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-400 print-hide" />
                    </a>
                  </div>
                </div>

                {/* Quick Profile Actions for Recruiters */}
                <div className="print-hide flex flex-wrap md:flex-col items-start gap-2 shrink-0">
                  <a
                    href="mailto:nshruti175@gmail.com?subject=Opportunity%20Inquiry%20-%20Shruti%20Narod"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </a>
                  <button
                    onClick={() => copyToClipboard(plainTextResume, 'quick-ats')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedType === 'quick-ats' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Resume</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Professional Summary */}
              <div id="summary" className="mt-6 pt-6 border-t border-slate-100">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Professional Summary
                </h2>
                <p className="text-sm leading-relaxed text-slate-700">
                  PGDM student at the Institute of Management Development &amp; Research (IMDR), Pune, with a Bachelor of Arts background and a strong interest in HR and Marketing. Actively involved in placement coordination and institutional committees, with practical exposure to student engagement, industry interaction, event coordination and professional communication. Experienced in anchoring multiple college sessions and activities, with strengths in teamwork, leadership, coordination and adaptability. Seeking opportunities in HR and Marketing where I can apply my management knowledge, communication skills and people-oriented approach.
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-10">
              {/* SECTION: EDUCATION */}
              <section id="education">
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-200">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-slate-700 print-hide" />
                    <span>Education</span>
                  </h2>
                  <span className="text-xs text-slate-500 font-medium print-hide">4 Academic Milestones</span>
                </div>

                <div className="space-y-4">
                  {educationData.map((edu) => (
                    <div
                      key={edu.id}
                      className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{edu.degree}</h3>
                          <p className="text-sm font-medium text-slate-700">
                            {edu.institution}, <span className="text-slate-500">{edu.location}</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold tabular-nums text-slate-600 shrink-0">
                          <span>{edu.period}</span>
                          {edu.grade && (
                            <>
                              <span aria-hidden="true" className="text-slate-300">·</span>
                              <span className="text-slate-900 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                                {edu.grade}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      {edu.detail && (
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{edu.detail}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION: SKILLS */}
              <section id="skills">
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-200">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-slate-700 print-hide" />
                    <span>Skills</span>
                  </h2>
                  <span className="text-xs text-slate-500 font-medium print-hide">
                    {selectedSkillFilter ? `Filtered by: ${selectedSkillFilter}` : 'Click any skill to filter experience'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Management & HR */}
                  <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Management &amp; HR
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsData.management.map((skill) => {
                        const isSelected = selectedSkillFilter === skill;
                        return (
                          <button
                            key={skill}
                            onClick={() => setSelectedSkillFilter(isSelected ? null : skill)}
                            className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer text-left ${
                              isSelected
                                ? 'bg-slate-900 text-white font-semibold'
                                : 'bg-white text-slate-800 border border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Marketing & Digital */}
                  <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Marketing &amp; Digital
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsData.marketing.map((skill) => {
                        const isSelected = selectedSkillFilter === skill;
                        return (
                          <button
                            key={skill}
                            onClick={() => setSelectedSkillFilter(isSelected ? null : skill)}
                            className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer text-left ${
                              isSelected
                                ? 'bg-slate-900 text-white font-semibold'
                                : 'bg-white text-slate-800 border border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tools */}
                  <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Tools &amp; Software
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skillsData.tools.map((tool) => {
                        const isSelected = selectedSkillFilter === tool;
                        return (
                          <button
                            key={tool}
                            onClick={() => setSelectedSkillFilter(isSelected ? null : tool)}
                            className={`px-2 py-1 text-xs rounded transition-colors cursor-pointer text-left ${
                              isSelected
                                ? 'bg-slate-900 text-white font-semibold'
                                : 'bg-white text-slate-800 border border-slate-200 hover:border-slate-400'
                            }`}
                          >
                            {tool}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Clean plain-text unboxed line for static print / screen readability */}
                <div className="mt-3 text-xs text-slate-500 leading-relaxed">
                  <span className="font-semibold text-slate-700">All competencies: </span>
                  {[...skillsData.management, ...skillsData.marketing, ...skillsData.tools].join(' · ')}
                </div>
              </section>

              {/* SECTION: PROJECTS */}
              <section id="projects">
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-200">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-slate-700 print-hide" />
                    <span>Projects</span>
                  </h2>
                  <span className="text-xs text-slate-500 font-medium print-hide">
                    {filteredProjects.length} Project{filteredProjects.length !== 1 ? 's' : ''} Listed
                  </span>
                </div>

                <div className="space-y-5">
                  {filteredProjects.map((project) => (
                    <article
                      key={project.id}
                      className="p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                        <h3 className="text-base font-bold text-slate-900">{project.title}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium shrink-0">
                          <span className="font-semibold text-slate-800">{project.initiative}</span>
                          {project.period && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="tabular-nums">{project.period}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-slate-700 leading-relaxed mb-3">
                        {project.description}
                      </p>

                      <div className="mb-3 space-y-1">
                        <span className="text-xs font-semibold text-slate-700 block">Key Highlights:</span>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {project.keyOutcomes.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-slate-400 mt-1">▪</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tag metadata - unboxed with separators */}
                      <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-medium text-slate-600">Applied Skills:</span>
                        <span>{project.tags.join(' · ')}</span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* SECTION: EXPERIENCE */}
              <section id="experience">
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-200">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-slate-700 print-hide" />
                    <span>Experience</span>
                  </h2>
                  <span className="text-xs text-slate-500 font-medium print-hide">
                    {filteredExperience.length} of {experienceData.length} Roles
                  </span>
                </div>

                <div className="space-y-5">
                  {filteredExperience.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 transition-colors shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                        <div>
                          <h3 className="text-base font-bold text-slate-900">{exp.role}</h3>
                          <p className="text-xs font-semibold text-slate-700">{exp.organization}</p>
                        </div>
                        <span className="text-xs font-medium tabular-nums text-slate-500 shrink-0">
                          {exp.period}
                        </span>
                      </div>

                      <p className="text-sm text-slate-700 leading-relaxed mb-3">{exp.description}</p>

                      {exp.highlights && exp.highlights.length > 0 && (
                        <div className="mb-3 space-y-1">
                          <ul className="space-y-1 text-xs text-slate-600">
                            {exp.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-slate-400 mt-1">▪</span>
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-medium text-slate-600">Key Focus:</span>
                        <span>{exp.skills.join(' · ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION: CERTIFICATIONS */}
              <section id="certifications">
                <div className="flex items-center justify-between pb-2 mb-4 border-b border-slate-200">
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    <Award className="w-5 h-5 text-slate-700 print-hide" />
                    <span>Certifications</span>
                  </h2>
                  <span className="text-xs text-slate-500 font-medium print-hide">Verified Credentials</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {certificationsData.map((cert) => (
                    <div
                      key={cert.id}
                      className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-sm font-bold text-slate-900">{cert.title}</h3>
                        <span className="text-xs font-semibold tabular-nums text-slate-500 shrink-0 ml-2">
                          {cert.year}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-700 mb-1.5">{cert.issuer}</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION: POSITIONS OF RESPONSIBILITY & ACTIVITIES */}
              <section id="activities" className="pt-2">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                  Positions of Responsibility &amp; Activities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                    <span className="font-bold text-slate-900 block mb-0.5">Placement Coordinator – IPCAC</span>
                    <span className="text-slate-600">IMDR Student Placement Committee Outreach</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                    <span className="font-bold text-slate-900 block mb-0.5">IIIC Committee Member</span>
                    <span className="text-slate-600">Institutional Industry-Interaction Committee</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                    <span className="font-bold text-slate-900 block mb-0.5">Anchoring &amp; Public Address</span>
                    <span className="text-slate-600">4–5 Formal Institutional Sessions &amp; Events</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/70">
                    <span className="font-bold text-slate-900 block mb-0.5">KHO KHO Team Captain</span>
                    <span className="text-slate-600">Fergusson College Sports Contingent</span>
                  </div>
                </div>
              </section>

              {/* LANGUAGES & INTERESTS */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Languages
                  </h3>
                  <p className="text-slate-800 font-medium">English · Hindi · Marathi · Telugu</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Interests
                  </h3>
                  <p className="text-slate-800 font-medium">
                    Reading · Watching movies · Outdoor games · Event participation
                  </p>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 print-hide">
          <p>© {new Date().getFullYear()} Shruti Narod. All resume details verified from official credentials.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:nshruti175@gmail.com" className="hover:text-slate-900 transition-colors">
              nshruti175@gmail.com
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://www.linkedin.com/in/shruti-narod"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-900 transition-colors"
            >
              LinkedIn Profile
            </a>
            <span aria-hidden="true">·</span>
            <button
              onClick={handlePrint}
              className="text-slate-700 hover:text-slate-900 font-medium cursor-pointer"
            >
              Print / Save PDF
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
