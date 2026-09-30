import { NavItem, HighlightItem, ApproachItem, ConsultationOption } from "@/types";

export const SITE_NAME = "Dr. Anil Pandey";
export const SITE_TAGLINE = "Dedicated Professional Practice & Comprehensive Consultation";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Dr. Anil Pandey", href: "/about" },
  { label: "Take Appointment", href: "/appointment" },
  { label: "Consultation Booking", href: "/consultation" },
];

export const IMAGES = {
  heroBg: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=2000&q=85",
  aboutConsultation: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=85",
  aboutPhilosophy: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=85",
  aboutWhyValue: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85",
  aboutCredentials: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=85",
  doctorWorkspace: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
  doctorProfile: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=85",
  ctaBg: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1600&q=85",
  videoThumbnail: "https://images.unsplash.com/photo-1576091160291-237466810a4f?auto=format&fit=crop&w=1200&q=85",
  finalCtaBg: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=85",
  diagnosticClinic: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=85",
  patientCare: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85",
  medicalLab: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
  hospitalCorridor: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=85",
  appointmentHero: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=2000&q=85",
  appointmentIntro: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=85",
  consultationHero: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=2000&q=85",
  consultationIntro: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
  consultationExp1: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=85",
  consultationExp2: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
  highlights: {
    experience: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
    qualifications: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    expertise: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    achievements: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
  approach: {
    patientCentered: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    evidenceBased: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    clearGuidance: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    continuousCare: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80",
  },
  focusAreas: [
    {
      id: "clinical-evaluation",
      title: "Comprehensive Clinical Diagnosis & Case Review",
      description:
        "Structured in-depth medical history reviews, systematic symptom evaluation, and diagnostic correlation to establish accurate health baselines.",
      points: [
        "Thorough physical and clinical evaluation protocols",
        "Detailed review of multi-specialty medical records and labs",
        "Clear diagnostic roadmap and transparent discussion",
      ],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
      badge: "Diagnostic Excellence",
    },
    {
      id: "preventive-management",
      title: "Evidence-Guided Management & Lifestyle Care",
      description:
        "Formulating customized, medically substantiated care pathways aimed at long-term wellness, condition stabilization, and preventive healthcare.",
      points: [
        "Patient-tailored therapeutic and lifestyle guidance",
        "Adherence to proven international clinical guidelines",
        "Collaborative decisions between patient and clinician",
      ],
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=85",
      badge: "Therapeutic Guidance",
    },
    {
      id: "second-opinions",
      title: "Specialist Second Opinions & Complex Consultations",
      description:
        "Objective second medical evaluations for patients seeking confirmation on prospective treatments, surgery recommendations, or complicated cases.",
      points: [
        "Unbiased assessment of prior diagnostic investigations",
        "Identification of alternative, conservative care options",
        "Holistic perspective for critical healthcare decisions",
      ],
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=85",
      badge: "Second Opinion",
    },
  ],
  timeline: [
    {
      period: "Present — Senior Medical Consultant",
      role: "Head of Clinical Consultation & Department Lead",
      organization: "[Premier Tertiary Healthcare Center / Hospital Placeholder]",
      description:
        "Overseeing complex clinical consultations, establishing patient-first clinical standards, and heading dedicated diagnostic review teams.",
    },
    {
      period: "Previous Tenure — Attending Specialist",
      role: "Senior Consultant Physician & Clinical Mentor",
      organization: "[Medical College & Research Institute Placeholder]",
      description:
        "Supervised comprehensive outpatient diagnostics, coordinated inpatient management, and participated in clinical research initiatives.",
    },
    {
      period: "Formative Years — Clinical Residency & Fellowship",
      role: "Postgraduate Resident & Advanced Fellow",
      organization: "[Renowned Medical Teaching Hospital Placeholder]",
      description:
        "Intensive rotations across critical care, general diagnostics, and evidence-guided interdisciplinary patient management.",
    },
  ],
};

export const APPOINTMENT_STEPS = [
  {
    step: "01",
    title: "Submit Consultation Request",
    description: "Fill in your preferred date, contact info, and reason for medical consultation through our appointment form.",
    icon: "FileText",
  },
  {
    step: "02",
    title: "Select Preferred Time Window",
    description: "Choose morning, afternoon, or evening slots based on your personal availability and travel schedule.",
    icon: "Clock",
  },
  {
    step: "03",
    title: "Clinic Confirmation",
    description: "Our desk reviews clinic scheduling and verifies your confirmed slot with instructions via phone or email.",
    icon: "CheckCircle",
  },
  {
    step: "04",
    title: "Attend Dedicated Consultation",
    description: "Meet Dr. Anil Pandey for focused clinical diagnosis, treatment evaluation, and structured health guidance.",
    icon: "Stethoscope",
  },
];

export const CONSULTATION_STEPS = [
  {
    step: "01",
    title: "Share Your Medical Details",
    description: "Provide preliminary clinical background, ongoing symptoms, or specific health inquiries to prepare the session.",
  },
  {
    step: "02",
    title: "Choose a Convenient Format",
    description: "Pick between an In-Person Clinic Visit, secure Online Video Session, or detailed Medical Record Review.",
  },
  {
    step: "03",
    title: "Receive Scheduling Confirmation",
    description: "Receive confirmed calendar time, appointment reference, and consultation preparation guidelines.",
  },
  {
    step: "04",
    title: "Personalized Care & Roadmapping",
    description: "Engage in an in-depth clinical discussion with Dr. Anil Pandey and receive structured post-consultation advice.",
  },
];

export const APPOINTMENT_FAQS = [
  {
    q: "How far in advance should I book an appointment?",
    a: "Booking 24 to 48 hours in advance is recommended to secure your preferred time window and minimize waiting duration at the clinic.",
  },
  {
    q: "What should I bring to my clinic appointment?",
    a: "Please bring recent blood test reports, diagnostic imaging, prior prescriptions, and a summary list of any current medications.",
  },
  {
    q: "Can I reschedule or change my appointment time?",
    a: "Yes, you can request slot rescheduling by contacting the clinic desk in advance with your appointment reference.",
  },
  {
    q: "Are video consultations available for outstation patients?",
    a: "Yes, secure online video consultations are available for remote assessments, second opinions, and follow-up reviews.",
  },
];

export const HIGHLIGHTS_DATA: (HighlightItem & { image: string })[] = [
  {
    id: "experience",
    category: "Professional Experience",
    title: "Dedicated Clinical Practice",
    description: "Extensive professional background providing patient-centered care and clinical expertise.",
    metric: "15+ Years",
    iconName: "Clock",
    image: IMAGES.highlights.experience,
  },
  {
    id: "qualifications",
    category: "Qualifications",
    title: "Advanced Medical Credentials",
    description: "Comprehensive medical education, certified specializations, and continuing clinical training.",
    metric: "Board Certified",
    iconName: "GraduationCap",
    image: IMAGES.highlights.qualifications,
  },
  {
    id: "expertise",
    category: "Areas of Expertise",
    title: "Specialized Clinical Focus",
    description: "In-depth expertise in diagnosis, consultation protocols, and evidence-guided management.",
    metric: "Specialized",
    iconName: "Activity",
    image: IMAGES.highlights.expertise,
  },
  {
    id: "achievements",
    category: "Professional Achievements",
    title: "Academic & Clinical Recognition",
    description: "Contributions to medical knowledge, professional associations, and community health initiatives.",
    metric: "Recognized",
    iconName: "Award",
    image: IMAGES.highlights.achievements,
  },
];

export const APPROACH_ITEMS: (ApproachItem & { image: string })[] = [
  {
    id: "patient-centered",
    title: "Patient-Centered Care",
    description: "Personalized consultations tailored to each individual's unique health profile and clinical needs.",
    iconName: "HeartPulse",
    image: IMAGES.approach.patientCentered,
  },
  {
    id: "evidence-based",
    title: "Evidence-Based Practice",
    description: "Adherence to proven medical standards, rigorous diagnostic evaluations, and up-to-date guidelines.",
    iconName: "CheckCircle2",
    image: IMAGES.approach.evidenceBased,
  },
  {
    id: "transparent",
    title: "Clear & Compassionate Guidance",
    description: "Empowering patients through clear communication, comprehensive discussions, and collaborative decisions.",
    iconName: "MessageSquare",
    image: IMAGES.approach.clearGuidance,
  },
  {
    id: "holistic",
    title: "Continuous Care & Follow-Up",
    description: "Structured monitoring and proactive follow-up to support sustained long-term health outcomes.",
    iconName: "ShieldCheck",
    image: IMAGES.approach.continuousCare,
  },
];

export const CONSULTATION_OPTIONS: ConsultationOption[] = [
  {
    id: "in-person",
    title: "In-Person Clinical Consultation",
    description: "Comprehensive physical evaluation and face-to-face clinical review at the clinic.",
    duration: "30 - 45 Mins",
    badge: "Clinic Visit",
  },
  {
    id: "online-video",
    title: "Online Video Consultation",
    description: "Convenient remote assessment and medical guidance from anywhere via secure video call.",
    duration: "20 - 30 Mins",
    badge: "Digital Care",
  },
  {
    id: "second-opinion",
    title: "Second Opinion & Report Review",
    description: "Detailed evaluation of prior medical records, diagnostic tests, and treatment plans.",
    duration: "45 Mins",
    badge: "Case Review",
  },
];
