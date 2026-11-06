// MBTI Assessment Data: 24 Psychometric Questions & 16 Comprehensive Profiles
const MBTI_DATA = {
  questions: [
    // 1. Extraversion (E) vs Introversion (I) - 6 items
    {
      id: 1,
      axis: "EI",
      direction: "E",
      dimension: "Energy Orientation",
      text: "You feel energized and refreshed after spending time socializing in a lively group."
    },
    {
      id: 2,
      axis: "EI",
      direction: "I",
      dimension: "Energy Orientation",
      text: "After a demanding week, you recharge your mental battery best with quiet, solitary downtime."
    },
    {
      id: 3,
      axis: "EI",
      direction: "E",
      dimension: "Energy Orientation",
      text: "You easily introduce yourself to new acquaintances at social events or gatherings."
    },
    {
      id: 4,
      axis: "EI",
      direction: "I",
      dimension: "Energy Orientation",
      text: "You often prefer communicating thoughtful ideas via text or email rather than spontaneous phone calls."
    },
    {
      id: 5,
      axis: "EI",
      direction: "E",
      dimension: "Energy Orientation",
      text: "You clarify and develop your ideas by brainstorming and speaking them out loud with others."
    },
    {
      id: 6,
      axis: "EI",
      direction: "I",
      dimension: "Energy Orientation",
      text: "Prolonged group socializing drains your energy, even when you are having a wonderful time."
    },

    // 2. Sensing (S) vs Intuition (N) - 6 items
    {
      id: 7,
      axis: "SN",
      direction: "S",
      dimension: "Information Gathering",
      text: "You are firmly grounded in concrete facts, practical details, and observable reality."
    },
    {
      id: 8,
      axis: "SN",
      direction: "N",
      dimension: "Information Gathering",
      text: "You frequently daydream about future possibilities, abstract theories, and 'what-if' scenarios."
    },
    {
      id: 9,
      axis: "SN",
      direction: "S",
      dimension: "Information Gathering",
      text: "When solving problems, you favor battle-tested methods with proven track records over novel experiments."
    },
    {
      id: 10,
      axis: "SN",
      direction: "N",
      dimension: "Information Gathering",
      text: "You love reading between the lines and uncovering underlying metaphors, symbols, and patterns."
    },
    {
      id: 11,
      axis: "SN",
      direction: "S",
      dimension: "Information Gathering",
      text: "You have a sharp eye for physical details in your surroundings and quickly notice when objects change."
    },
    {
      id: 12,
      axis: "SN",
      direction: "N",
      dimension: "Information Gathering",
      text: "You instinctively grasp the high-level 'big picture' long before caring about granular specifics."
    },

    // 3. Thinking (T) vs Feeling (F) - 6 items
    {
      id: 13,
      axis: "TF",
      direction: "T",
      dimension: "Decision Making",
      text: "When making tough decisions, you prioritize impartial logic and rational consistency over personal feelings."
    },
    {
      id: 14,
      axis: "TF",
      direction: "F",
      dimension: "Decision Making",
      text: "You instinctively weigh how a choice will emotionally impact the people involved and preserve harmony."
    },
    {
      id: 15,
      axis: "TF",
      direction: "T",
      dimension: "Decision Making",
      text: "You value objective, candid truth even if delivering it risks causing momentary discomfort."
    },
    {
      id: 16,
      axis: "TF",
      direction: "F",
      dimension: "Decision Making",
      text: "You easily absorb the emotional atmosphere of a room and empathize deeply with others' personal feelings."
    },
    {
      id: 17,
      axis: "TF",
      direction: "T",
      dimension: "Decision Making",
      text: "In resolving disagreements, you rely on established fair principles and facts rather than emotional exceptions."
    },
    {
      id: 18,
      axis: "TF",
      direction: "F",
      dimension: "Decision Making",
      text: "You are fundamentally guided by empathy, core personal values, and compassion for the human experience."
    },

    // 4. Judging (J) vs Perceiving (P) - 6 items
    {
      id: 19,
      axis: "JP",
      direction: "J",
      dimension: "Lifestyle Orientation",
      text: "You prefer having a structured daily plan, organized calendar, and definite deadlines for your goals."
    },
    {
      id: 20,
      axis: "JP",
      direction: "P",
      dimension: "Lifestyle Orientation",
      text: "You prefer keeping your options open until the last moment so you can adapt spontaneously to change."
    },
    {
      id: 21,
      axis: "JP",
      direction: "J",
      dimension: "Lifestyle Orientation",
      text: "You feel uneasy leaving tasks open-ended or projects lingering without a sense of closure."
    },
    {
      id: 22,
      axis: "JP",
      direction: "P",
      dimension: "Lifestyle Orientation",
      text: "You produce your best work in bursts of inspiration and energy rather than methodical, daily increments."
    },
    {
      id: 23,
      axis: "JP",
      direction: "J",
      dimension: "Lifestyle Orientation",
      text: "You feel much more relaxed when your workspace, schedule, and files are tidy and systematic."
    },
    {
      id: 24,
      axis: "JP",
      direction: "P",
      dimension: "Lifestyle Orientation",
      text: "You find rigid schedules suffocating and happily pivot when unexpected opportunities arise."
    }
  ],

  // 16 Profiles grouped by the 4 temperament groups
  groups: {
    analysts: {
      name: "Analysts",
      color: "#8b5cf6", // Purple
      accent: "from-purple-500 to-indigo-600",
      description: "Rational, strategic, and intellectually curious thinkers driven by logic and mastery."
    },
    diplomats: {
      name: "Diplomats",
      color: "#10b981", // Green
      accent: "from-emerald-500 to-teal-600",
      description: "Empathetic, idealistic, and inspiring communicators driven by values and human potential."
    },
    sentinels: {
      name: "Sentinels",
      color: "#3b82f6", // Blue
      accent: "from-blue-500 to-cyan-600",
      description: "Practical, orderly, and dedicated guardians who uphold stability, duty, and community."
    },
    explorers: {
      name: "Explorers",
      color: "#f59e0b", // Amber/Gold
      accent: "from-amber-500 to-orange-600",
      description: "Spontaneous, adaptable, and tactical doers who thrive on action, aesthetics, and novelty."
    }
  },

  profiles: {
    // ANALYSTS (NT)
    INTJ: {
      group: "analysts",
      archetype: "The Architect",
      nickname: "Strategic, Innovative & Independent",
      quote: "Thoughtful preparation and strategic precision outmatch raw brute force every single time.",
      summary: "INTJs are analytical problem-solvers, eager to improve systems and processes with innovative ideas. Possessing a rare blend of visionary imagination and sharp, relentless logic, they constantly seek competence, efficiency, and long-term mastery.",
      cognitiveStack: ["Introverted Intuition (Ni)", "Extraverted Thinking (Te)", "Introverted Feeling (Fi)", "Extraverted Sensing (Se)"],
      strengths: [
        "Strategic vision: easily grasps high-level trends and maps out 10-step plans",
        "High intellectual standards of excellence, competence, and clarity",
        "Independent and self-directed; not swayed by peer consensus or tradition",
        "Exceptional capacity to distill chaotic systems into streamlined architectures"
      ],
      blindspots: [
        "Can come across as overly critical, blunt, or emotionally detached",
        "Impatient with inefficiency, corporate bureaucracy, or slow execution",
        "May dismiss emotional factors as 'irrational' when they deeply matter to others"
      ],
      workStyle: "Flourishes in autonomous, high-intellect roles where they can architect systems, develop strategy, and solve complex puzzles without micro-management.",
      careers: ["Software / Systems Architect", "Data Scientist", "Management Consultant", "Quantitative Analyst", "Research Scientist", "Biotech Strategist"],
      notable: ["Elon Musk", "Isaac Newton", "Friedrich Nietzsche", "Jane Austen", "Walter White", "Stephen Hawking"],
      compatibility: "ENFP, ENTP, ENTJ, INFJ"
    },
    INTP: {
      group: "analysts",
      archetype: "The Logician",
      nickname: "Inventive, Analytical & Inquisitive",
      quote: "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
      summary: "INTPs are innovative philosophers and system theorists who love exploring abstract models and deep intellectual puzzles. Unconventional, original, and deeply curious, they seek to understand the fundamental mechanics of the universe.",
      cognitiveStack: ["Introverted Thinking (Ti)", "Extraverted Intuition (Ne)", "Introverted Sensing (Si)", "Extraverted Feeling (Fe)"],
      strengths: [
        "Unbiased, objective logic and rigorous conceptual reasoning",
        "Intellectually open-minded, versatile, and receptive to novel paradigms",
        "Skilled at spotting subtle fallacies and inconsistencies in arguments",
        "Deep enthusiasm for acquiring knowledge and understanding root causes"
      ],
      blindspots: [
        "Vulnerable to analysis paralysis; can get stuck refining theories indefinitely",
        "Easily bored by routine implementation once the puzzle is conceptually solved",
        "Can appear absent-minded and overlook daily logistical necessities"
      ],
      workStyle: "Thrives in research-driven, low-bureaucracy environments that offer complex technical challenges, theoretical freedom, and minimal micromanagement.",
      careers: ["Theoretical Physicist", "Computer Programmer / AI Researcher", "Systems Analyst", "Professor of Philosophy", "Mathematician"],
      notable: ["Albert Einstein", "Charles Darwin", "Ada Lovelace", "Bill Gates", "Marie Curie", "Abraham Lincoln"],
      compatibility: "ENTJ, ENFJ, ENFP, INTJ"
    },
    ENTJ: {
      group: "analysts",
      archetype: "The Commander",
      nickname: "Decisive, Ambitious & Visionary Leader",
      quote: "Lead, follow, or get out of the way. Progress demands decisive action.",
      summary: "ENTJs are strategic organizers and natural leaders who excel at turning ambitious long-term plans into structured reality. They are charismatic, articulate, and thrive on large-scale challenges and competitive execution.",
      cognitiveStack: ["Extraverted Thinking (Te)", "Introverted Intuition (Ni)", "Extraverted Sensing (Se)", "Introverted Feeling (Fi)"],
      strengths: [
        "Exceptional leadership charisma, organizational drive, and clarity of purpose",
        "Efficient organizer of human talent, capital, and complex logistical operations",
        "Decisive and fearless in making tough calls under high-stakes pressure",
        "Relentless focus on tangible milestones and measurable outcomes"
      ],
      blindspots: [
        "Can be perceived as domineering, intimidating, or impatient with mistakes",
        "Tendency to undervalue emotional nuances and team sensitivities",
        "Can burn out by refusing to slow down or delegate total control"
      ],
      workStyle: "Dominates in executive leadership, corporate strategy, fast-scaling startups, venture capital, and competitive environments demanding rapid execution.",
      careers: ["CEO / Corporate Executive", "Venture Capitalist", "Management Consultant", "Corporate Attorney", "Political Strategist"],
      notable: ["Steve Jobs", "Margaret Thatcher", "Franklin D. Roosevelt", "Gordon Ramsay", "Julius Caesar"],
      compatibility: "INTP, INFP, INTJ, ENTP"
    },
    ENTP: {
      group: "analysts",
      archetype: "The Debater",
      nickname: "Clever, Agile & Devil's Advocate",
      quote: "Rules are often just suggestions waiting to be re-evaluated by a curious mind.",
      summary: "ENTPs are spirited, intellectual trailblazers who love playing with ideas, debating opposing viewpoints, and dismantling obsolete conventions. Quick-witted and inventive, they see fresh possibilities where others see walls.",
      cognitiveStack: ["Extraverted Intuition (Ne)", "Introverted Thinking (Ti)", "Extraverted Feeling (Fe)", "Introverted Sensing (Si)"],
      strengths: [
        "Rapid mental agility and brilliant conceptual brainstorming capability",
        "Charismatic, articulate, and engaging conversationalist and speaker",
        "Fearless questioner of dogmatic traditions, always seeking innovation",
        "Excels at generating disruptive ideas and pioneering new frontiers"
      ],
      blindspots: [
        "Prone to debating purely for sport, which can exhaust sensitive colleagues",
        "Struggles with follow-through once the novelty of an idea wears off",
        "Strong aversion to routine administration, detailed paperwork, and micromanagement"
      ],
      workStyle: "Flourishes in fast-paced innovation hubs, early-stage startups, creative direction, debate, and strategy consulting where novel ideas are currency.",
      careers: ["Startup Founder", "Creative Director", "Litigation Attorney", "Product Strategist", "Journalist / Satirist"],
      notable: ["Leonardo da Vinci", "Richard Feynman", "Mark Twain", "Tyrion Lannister", "Thomas Edison"],
      compatibility: "INFJ, INTJ, ENFP, ENTJ"
    },

    // DIPLOMATS (NF)
    INFJ: {
      group: "diplomats",
      archetype: "The Advocate",
      nickname: "Insightful, Purpose-Driven & Empathetic",
      quote: "Real change begins with understanding another person's inner world.",
      summary: "INFJs are rare, deeply thoughtful idealists guided by strong humanitarian principles and profound empathy. They seek deep meaning, authentic connection, and ways to make a lasting, compassionate mark on society.",
      cognitiveStack: ["Introverted Intuition (Ni)", "Extraverted Feeling (Fe)", "Introverted Thinking (Ti)", "Extraverted Sensing (Se)"],
      strengths: [
        "Profound intuitive insight into human nature, motivations, and hidden feelings",
        "Deeply committed to integrity, ethical values, and social upliftment",
        "Inspiring, compassionate, and eloquent writer and one-on-one communicator",
        "Uncanny ability to translate grand ideals into meaningful, practical movements"
      ],
      blindspots: [
        "Vulnerable to emotional exhaustion from continuously absorbing others' stress",
        "Can hold unrealistically perfectionistic expectations of themselves and others",
        "Very private; can suddenly 'door slam' and withdraw when hurt"
      ],
      workStyle: "Thrives in purpose-driven work aligned with their ethical ideals: psychology, counseling, creative writing, organizational culture, and non-profits.",
      careers: ["Psychologist / Counselor", "Author / Essayist", "UX Researcher", "Non-Profit Executive", "Organizational Development Specialist"],
      notable: ["Carl Jung", "Nelson Mandela", "Maya Angelou", "Mahatma Gandhi", "Eleanor Roosevelt"],
      compatibility: "ENTP, ENFP, INTJ, INFP"
    },
    INFP: {
      group: "diplomats",
      archetype: "The Mediator",
      nickname: "Poetic, Authentic & Value-Guided",
      quote: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
      summary: "INFPs are gentle, imaginative spirits guided by a rich inner world of values and empathy. True romantics and humanists, they long for genuine self-expression, authenticity, and meaningful causes.",
      cognitiveStack: ["Introverted Feeling (Fi)", "Extraverted Intuition (Ne)", "Introverted Sensing (Si)", "Extraverted Thinking (Te)"],
      strengths: [
        "Uncompromising fidelity to personal ethics, empathy, and authenticity",
        "Deep compassion and instinctive tolerance for underdogs and diverse viewpoints",
        "Vivid poetic imagination and original creative talents",
        "Supportive, non-judgmental listener who makes others feel truly heard"
      ],
      blindspots: [
        "Can take criticism very personally and become emotionally defensive",
        "May retreat into fantasy ideals when everyday reality becomes harsh or demanding",
        "Struggles with bureaucratic deadlines, rigid structures, and conflict"
      ],
      workStyle: "Excels in creative, expressive, and human-centered environments offering personal autonomy and freedom for authentic craftsmanship.",
      careers: ["Creative Writer / Novelist", "Graphic Designer", "Psychotherapist / Art Therapist", "Human Rights Advocate", "Curator"],
      notable: ["J.R.R. Tolkien", "William Shakespeare", "Vincent van Gogh", "Keanu Reeves", "Princess Diana"],
      compatibility: "ENFJ, ENTJ, INFJ, ENFP"
    },
    ENFJ: {
      group: "diplomats",
      archetype: "The Protagonist",
      nickname: "Charismatic, Inspiring & Altruistic",
      quote: "When we lift others up, we elevate the entire community together.",
      summary: "ENFJs are natural mentors and passionate communicators who bring out the best in others. Driven by genuine empathy, they love rallying people, uniting diverse factions, and guiding teams toward collective harmony and growth.",
      cognitiveStack: ["Extraverted Feeling (Fe)", "Introverted Intuition (Ni)", "Extraverted Sensing (Se)", "Introverted Thinking (Ti)"],
      strengths: [
        "Magnetic charisma, genuine warmth, and inspiring communication skills",
        "Natural mediator skilled at resolving group friction and fostering community",
        "Deeply invested in coaching and helping others achieve their full potential",
        "Reliable, organized, and dedicated team leader with emotional intelligence"
      ],
      blindspots: [
        "Can overextend themselves trying to fix everyone else's problems",
        "May sweep uncomfortable truths under the rug to preserve superficial harmony",
        "Prone to basing personal self-worth heavily on external approval and validation"
      ],
      workStyle: "Flourishes in people-centered leadership, teaching, organizational coaching, public diplomacy, and community development.",
      careers: ["Executive Coach / Mentor", "Educator / Dean", "Head of Human Resources", "Public Relations Director", "Diplomat / Ambassador"],
      notable: ["Barack Obama", "Oprah Winfrey", "Martin Luther King Jr.", "Maya Lin", "Bono"],
      compatibility: "INFP, INTP, INFJ, ENFP"
    },
    ENFP: {
      group: "diplomats",
      archetype: "The Campaigner",
      nickname: "Enthusiastic, Creative & Free Spirit",
      quote: "The world is full of magical things waiting for our wits to grow sharper.",
      summary: "ENFPs are vibrant, energetic individuals who see life as a vast, interconnected adventure. Perceptive and creative, they are passionate about exploring new ideas, championing inspiring causes, and building uplifting human connections.",
      cognitiveStack: ["Extraverted Intuition (Ne)", "Introverted Feeling (Fi)", "Extraverted Thinking (Te)", "Introverted Sensing (Si)"],
      strengths: [
        "Infectious enthusiasm, social charm, and boundless optimism",
        "Imaginative problem-solver who makes connections between disparate ideas",
        "Empathetic, authentic, and deeply attuned to others' feelings and dreams",
        "Highly adaptable, spontaneous, and excited by novelty and growth"
      ],
      blindspots: [
        "Can struggle with routine follow-through and lose interest in maintenance",
        "Prone to overthinking interpersonal dynamics and reading too much into small cues",
        "Finds rigid micromanagement and detailed paperwork draining"
      ],
      workStyle: "Thrives in vibrant, creative teams where they can brainstorm, tell stories, connect with people, and champion innovative initiatives.",
      careers: ["Brand Strategist / Storyteller", "Creative Producer", "UX Designer", "Journalist", "Speech-Language Pathologist"],
      notable: ["Robin Williams", "Walt Disney", "Anne Frank", "Oscar Wilde", "Quentin Tarantino"],
      compatibility: "INTJ, INFJ, ENFJ, INFP"
    },

    // SENTINELS (SJ)
    ISTJ: {
      group: "sentinels",
      archetype: "The Logistician",
      nickname: "Responsible, Methodical & Dependable",
      quote: "Integrity means doing the right thing, even when no one is watching.",
      summary: "ISTJs are the bedrock of reliable institutions. Methodical, duty-bound, and detail-oriented, they take immense pride in integrity, order, and delivering thorough, high-quality execution without fuss.",
      cognitiveStack: ["Introverted Sensing (Si)", "Extraverted Thinking (Te)", "Introverted Feeling (Fi)", "Extraverted Sensing (Se)"],
      strengths: [
        "Unshakeable reliability, punctuality, and personal accountability",
        "Meticulous attention to facts, regulations, budgets, and operational detail",
        "Calm, grounded, and steadfast under organizational pressure",
        "Exceptional discipline and stamina for systematic, disciplined execution"
      ],
      blindspots: [
        "Can be resistant to sudden change and unorthodox, unproven methods",
        "May appear emotionally guarded, formal, or inflexible",
        "Tendency to judge situations strictly by by-the-book metrics"
      ],
      workStyle: "Excels in orderly environments with clear expectations, structured hierarchies, data integrity, and measurable standards of competence.",
      careers: ["Financial Auditor / CPA", "Database Administrator", "Operations Director", "Compliance Officer", "Civil Engineer"],
      notable: ["George Washington", "Warren Buffett", "Angela Merkel", "Queen Elizabeth II", "Jeff Bezos"],
      compatibility: "ESFP, ESTP, ISFJ, ESTJ"
    },
    ISFJ: {
      group: "sentinels",
      archetype: "The Defender",
      nickname: "Warm, Dedicated & Conscientious Caregiver",
      quote: "True greatness is found in everyday acts of quiet kindness and loyalty.",
      summary: "ISFJs are compassionate, loyal guardians who take quiet pride in supporting the people and communities they care about. They blend meticulous memory with deep, nurturing kindness and practical responsibility.",
      cognitiveStack: ["Introverted Sensing (Si)", "Extraverted Feeling (Fe)", "Introverted Thinking (Ti)", "Extraverted Intuition (Ne)"],
      strengths: [
        "Unwavering loyalty, kindness, and devotion to friends, family, and duty",
        "Incredible practical memory for personal details, traditions, and preferences",
        "Conscientious, hardworking, and attentive to physical comfort and order",
        "Creates harmonious, dependable, and warmly welcoming spaces"
      ],
      blindspots: [
        "Reluctant to say 'no' or ask for help; vulnerable to silent burnout",
        "Excessively humble; often lets louder colleagues take credit for their labor",
        "Uncomfortable with rapid, disruptive changes to established traditions"
      ],
      workStyle: "Shines in service-oriented, supportive environments where they can directly assist people, preserve institutional stability, and maintain meticulous quality.",
      careers: ["Registered Nurse / Physician", "Elementary Educator", "Librarian / Archivist", "Customer Experience Manager", "Social Worker"],
      notable: ["Mother Teresa", "Rosa Parks", "Kate Middleton", "Beyoncé", "Jimmy Carter"],
      compatibility: "ESTP, ESFP, ISTJ, ESFJ"
    },
    ESTJ: {
      group: "sentinels",
      archetype: "The Executive",
      nickname: "Organized, Practical & Decisive Leader",
      quote: "Structure brings freedom. Good systems allow everyone to succeed.",
      summary: "ESTJs are natural administrators of order and tradition. They possess a strong sense of civic duty, logic, and operational efficiency, ensuring teams run smoothly, deadlines are hit, and rules are respected.",
      cognitiveStack: ["Extraverted Thinking (Te)", "Introverted Sensing (Si)", "Extraverted Intuition (Ne)", "Introverted Feeling (Fi)"],
      strengths: [
        "Exceptional organizational logistics, project planning, and execution",
        "Direct, transparent, and dependable in communication and commitments",
        "Dedicated to accountability, merit, and high operational standards",
        "Pragmatic realism and rapid problem-solving when managing crises"
      ],
      blindspots: [
        "Can seem rigid, uncompromising, or dismissive of unorthodox approaches",
        "May overlook subjective, emotional factors in team disputes",
        "Can find it difficult to relax or tolerate perceived inefficiency"
      ],
      workStyle: "Flourishes in structured organizations, operational management, corporate leadership, law enforcement, and engineering projects with clear deliverables.",
      careers: ["Operations Director", "Senior Project Manager", "Chief Financial Officer", "Judge / Prosecutor", "Supply Chain Director"],
      notable: ["Judge Judy", "Lyndon B. Johnson", "Sonia Sotomayor", "Vince Lombardi", "John D. Rockefeller"],
      compatibility: "ISFP, ISTP, ISTJ, ESFJ"
    },
    ESFJ: {
      group: "sentinels",
      archetype: "The Consul",
      nickname: "Warm, Social & Community Pillar",
      quote: "Kind words can be short and easy to speak, but their echoes are truly endless.",
      summary: "ESFJs are attentive, sociable caretakers who thrive on bringing people together and establishing community harmony. Keenly attuned to social dynamics, they offer generous support, hospitality, and practical care.",
      cognitiveStack: ["Extraverted Feeling (Fe)", "Introverted Sensing (Si)", "Extraverted Intuition (Ne)", "Introverted Thinking (Ti)"],
      strengths: [
        "Superb interpersonal diplomacy, warmth, and hospitality",
        "Loyal, dependable, and deeply attentive to the practical needs of others",
        "Natural organizer of social events, team rituals, and celebrations",
        "Strong sense of civic responsibility, group cohesion, and ethical duty"
      ],
      blindspots: [
        "Vulnerable to anxiety about social status and what other people think",
        "Can avoid addressing uncomfortable issues to protect surface harmony",
        "Frequently neglects their own wellbeing while overextending for others"
      ],
      workStyle: "Thrives in collaborative, people-centric workplaces where warmth, teamwork, customer care, and structured coordination are central.",
      careers: ["Event Operations Director", "Healthcare Administrator", "Public Relations Specialist", "School Counselor", "Hospitality General Manager"],
      notable: ["Taylor Swift", "Jennifer Garner", "Bill Clinton", "Hugh Jackman", "Whitney Houston"],
      compatibility: "ISTP, ISFP, ISFJ, ESTJ"
    },

    // EXPLORERS (SP)
    ISTP: {
      group: "explorers",
      archetype: "The Virtuoso",
      nickname: "Curious, Pragmatic & Master of Tools",
      quote: "Experience is the best teacher; practical mastery beats theoretical debate.",
      summary: "ISTPs are independent, practical troubleshooters who love understanding how mechanical, technological, and physical systems operate. Calm in crises, they navigate life with hands-on ingenuity and cool rationality.",
      cognitiveStack: ["Introverted Thinking (Ti)", "Extraverted Sensing (Se)", "Introverted Intuition (Ni)", "Extraverted Feeling (Fe)"],
      strengths: [
        "Masterful hands-on troubleshooting and mechanical intuition",
        "Calm, unflappable, and resourceful in high-stress emergencies",
        "Pragmatic, adaptable, and highly efficient with code, tools, and hardware",
        "Self-reliant and fiercely respectful of personal freedom"
      ],
      blindspots: [
        "Can appear emotionally aloof, detached, or difficult to get close to",
        "Dislikes long-term theoretical commitments and rigid protocol",
        "Prone to boredom or risk-seeking behavior when under-stimulated"
      ],
      workStyle: "Excels in environments requiring direct, tactical problem-solving, technical diagnostics, field engineering, or crisis response.",
      careers: ["DevOps / Systems Engineer", "Mechanical Engineer", "Forensic Investigator", "Commercial Pilot", "Emergency Response Specialist"],
      notable: ["Clint Eastwood", "Bruce Lee", "Amelia Earhart", "Indiana Jones", "Steve Wozniak"],
      compatibility: "ESFJ, ESTJ, ISFP, ESTP"
    },
    ISFP: {
      group: "explorers",
      archetype: "The Adventurer",
      nickname: "Spontaneous, Gentle & Aesthetic Creator",
      quote: "Art enables us to find ourselves and lose ourselves at the same time.",
      summary: "ISFPs are quiet, sensitive artists who experience life through their senses and personal values. With an eye for beauty, color, and emotional nuance, they express themselves through craft, design, and authentic living.",
      cognitiveStack: ["Introverted Feeling (Fi)", "Extraverted Sensing (Se)", "Introverted Intuition (Ni)", "Extraverted Thinking (Te)"],
      strengths: [
        "Refined aesthetic taste and instinctive visual/tactile sensitivity",
        "Gentle, accepting, and non-judgmental presence that puts others at ease",
        "Lives richly and authentically in the present sensory moment",
        "Passionate, quiet devotion to loved ones and meaningful artistic causes"
      ],
      blindspots: [
        "Can be overly sensitive to criticism of their creative work or taste",
        "Aversion to rigid corporate structures, competitive games, and long-range plans",
        "May withdraw from confrontation rather than assertively state boundaries"
      ],
      workStyle: "Thrives in tactile, aesthetic, or caregiving spaces with low bureaucratic pressure and high freedom for personal creative craftsmanship.",
      careers: ["UI/UX & Product Designer", "Landscape Architect", "Veterinarian", "Chef / Culinary Artist", "Fine Artist / Animator"],
      notable: ["Frida Kahlo", "Michael Jackson", "Audrey Hepburn", "Bob Dylan", "David Bowie"],
      compatibility: "ESTJ, ESFJ, ISTP, ESFP"
    },
    ESTP: {
      group: "explorers",
      archetype: "The Entrepreneur",
      nickname: "Bold, Action-Oriented & Tactical Dynamo",
      quote: "Life is either a daring adventure or nothing at all.",
      summary: "ESTPs are energetic, action-driven dynamos who thrive on excitement, immediate problem-solving, and living on the leading edge. They read people quickly and act with bold confidence and pragmatic agility.",
      cognitiveStack: ["Extraverted Sensing (Se)", "Introverted Thinking (Ti)", "Extraverted Feeling (Fe)", "Introverted Intuition (Ni)"],
      strengths: [
        "Rapid, fearless decision-making and decisive action in real time",
        "Sharp observational awareness of subtle physical cues and market openings",
        "Charismatic, witty, and persuasive negotiating and sales skills",
        "Direct, pragmatic, and uninhibited by theoretical dogma"
      ],
      blindspots: [
        "Can become impatient with theoretical discussions or slow deliberation",
        "May take excessive physical or financial risks for immediate thrills",
        "Can inadvertently offend sensitive colleagues with unfiltered bluntness"
      ],
      workStyle: "Flourishes in fast-moving, high-stakes environments requiring immediate tactical response, negotiation, sales agility, or physical action.",
      careers: ["Sales Director / Closer", "Emergency First Responder", "Stock Trader / Investment Broker", "Sports Agent / Coach", "Real Estate Developer"],
      notable: ["Madonna", "Donald Trump", "Ernest Hemingway", "Winston Churchill", "Theodore Roosevelt"],
      compatibility: "ISFJ, ISTJ, ISTP, ESFP"
    },
    ESFP: {
      group: "explorers",
      archetype: "The Entertainer",
      nickname: "Spontaneous, Lively & Generous Performer",
      quote: "Live in the sunshine, swim in the sea, drink the wild air.",
      summary: "ESFPs are vibrant, vivacious performers who bring infectious joy, humor, and style to any room. Generous, spontaneous, and fun-loving, they turn everyday moments into shared celebrations.",
      cognitiveStack: ["Extraverted Sensing (Se)", "Introverted Feeling (Fi)", "Extraverted Thinking (Te)", "Introverted Intuition (Ni)"],
      strengths: [
        "Infectious optimism, warmth, and captivating showmanship",
        "Deep empathy and instinctive sense of what brings comfort and joy to people",
        "Spontaneous, playful, and adventurous approach to daily living",
        "Aesthetic flair for fashion, music, dining, and interior spaces"
      ],
      blindspots: [
        "Can struggle with long-term financial discipline or repetitive planning",
        "Easily bored by abstract debates or solitary technical tasks",
        "Prone to avoiding difficult, heavy emotional conflicts"
      ],
      workStyle: "Excels in lively, interactive settings like event planning, entertainment, hospitality, media, active sales, and human relations.",
      careers: ["Live Event Producer", "Performing Artist / Actor", "Public Relations Specialist", "Hospitality Director", "Fitness Coach / Influencer"],
      notable: ["Marilyn Monroe", "Adele", "Jamie Oliver", "Will Smith", "Serena Williams"],
      compatibility: "ISTJ, ISFJ, ESTP, ISFP"
    }
  }
};

// Export for browser or node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MBTI_DATA;
}
