// All the site's text, in French and English. To add a project, add an entry to `projects`.
import type { ImageMetadata } from 'astro';
import ragRbacImage from '../assets/projects/rag-rbac.png';
import ragFrameworksImage from '../assets/projects/rag-frameworks.png';
import sportInsightImage from '../assets/projects/sportinsight.png';
import coderBuddyImage from '../assets/projects/coder-buddy.png';

export type Lang = 'fr' | 'en';
type Localized<T> = Record<Lang, T>;

// Non-breaking spaces so a line never starts with ":" or "%" (French typography), nor splits "±5 s" or "janvier 2027".
function typography(lang: Lang, text: string): string {
  let out = text
    .replace(/(\d) (s|%)(?=$|[\s.,)])/g, '$1\u00a0$2')
    .replace(/(janvier|January) (\d{4})/g, '$1\u00a0$2');
  if (lang === 'fr') out = out.replace(/ ([:;!?»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
  return out;
}

// Applies `typography` to every string found under an `fr` or `en` key.
function withTypography<T>(value: T, lang?: Lang): T {
  if (typeof value === 'string') return (lang ? typography(lang, value) : value) as T;
  if (Array.isArray(value)) return value.map((v) => withTypography(v, lang)) as T;
  if (value && typeof value === 'object' && !('src' in value && 'format' in value)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, withTypography(v, k === 'fr' || k === 'en' ? k : lang)]),
    ) as T;
  }
  return value;
}

export const site = {
  name: 'Mathieu Bonneau',
  url: 'https://kazuwaii.github.io',
  email: 'mbonneau8@etu.uqac.ca',
  github: 'https://github.com/KazuWaii',
  linkedin: 'https://www.linkedin.com/in/mathieu-bonneau-135a12296/',
  sourceCode: 'https://github.com/KazuWaii/kazuwaii.github.io',
  cv: {
    fr: '/cv/Mathieu_Bonneau_CV_FR.pdf',
    en: '/cv/Mathieu_Bonneau_CV_EN.pdf',
  },
};

const uiText: Localized<{
  meta: { title: string; description: string };
  nav: { projects: string; experience: string; education: string; skills: string; contact: string };
  skipLink: string;
  otherLang: { label: string; href: string; name: string };
  theme: { toDark: string; toLight: string };
  hero: { available: string; role: string; tagline: string; meta: string[]; projectsButton: string; cvButton: string };
  about: { title: string; paragraphs: string[] };
  projects: {
    title: string;
    intro: string;
    tryHere: string;
    newTab: string;
    code: string;
    others: string;
    dialog: { loading: string; close: string; openInTab: string; sleepHint: string };
    voice: { warming: string; ready: string; error: string; hint: string };
  };
  experience: { title: string };
  education: { title: string };
  skills: { title: string; languages: string };
  contact: { title: string; text: string; email: string; cvFr: string; cvEn: string };
  footer: { builtWith: string; source: string };
}> = {
  fr: {
    meta: {
      title: 'Mathieu Bonneau · Développeur IA',
      description:
        "Développeur IA : applications LLM, RAG et agents, du prototype au service déployé. Maîtrise en informatique (IA) à l'UQAC, disponible dès janvier 2027.",
    },
    nav: { projects: 'Projets', experience: 'Expérience', education: 'Formation', skills: 'Compétences', contact: 'Contact' },
    skipLink: 'Aller au contenu',
    otherLang: { label: 'EN', href: '/en/', name: 'English version' },
    theme: { toDark: 'Passer au thème sombre', toLight: 'Passer au thème clair' },
    hero: {
      available: 'Disponible dès janvier 2027',
      role: 'Développeur IA : applications LLM, RAG et agents',
      tagline: 'Je conçois des applications LLM et je les mène du prototype au service déployé.',
      meta: ["Maîtrise en informatique (IA) à l'UQAC", "Chicoutimi (QC), prêt à m'installer à Québec ou à Montréal"],
      projectsButton: 'Voir mes projets',
      cvButton: 'Télécharger mon CV',
    },
    about: {
      title: 'À propos',
      paragraphs: [
        "Je fais le pont entre le développement logiciel et l'IA. Je construis des applications LLM (RAG, agents LangGraph, contrôle d'accès) et je les déploie avec FastAPI, Docker et Azure, avec des tests, un suivi des coûts et des garde-fous. Quand je compare des frameworks ou des modèles, je le fais sur des critères mesurés et j'en donne les limites.",
        "En parallèle de ma maîtrise, je suis le diplôme d'ingénieur en traitement d'image de Télécom Saint-Étienne et je fais un stage de recherche au laboratoire LIARA.",
      ],
    },
    projects: {
      title: 'Projets',
      intro:
        "Les démos se mettent en veille quand personne ne les utilise : la première ouverture peut prendre jusqu'à une minute.",
      tryHere: 'Tester ici',
      newTab: 'Nouvel onglet',
      code: 'Code',
      others: 'Autres projets',
      dialog: {
        loading: "La démo démarre… La première ouverture peut prendre jusqu'à une minute.",
        close: 'Fermer la démo',
        openInTab: 'Ouvrir dans un nouvel onglet',
        sleepHint: "Écran vide ? L'application est peut-être en veille : ouvrez-la dans un nouvel onglet pour la réveiller.",
      },
      voice: {
        warming: "Démarrage du serveur… (jusqu'à une minute)",
        ready: "Prêt : cliquez sur le bouton d'appel en bas à droite de la page et autorisez le micro.",
        error: "Le serveur ne répond pas pour l'instant. Réessayez dans une minute.",
        hint: 'Essayez : « What are your business hours? », « Check transaction TXN10005 », ou demandez un rappel.',
      },
    },
    experience: { title: 'Expérience' },
    education: { title: 'Formation' },
    skills: { title: 'Compétences', languages: 'Langues' },
    contact: {
      title: 'Contact',
      text: "Je cherche un premier poste de développeur IA à partir de janvier 2027. Le plus simple pour me joindre : un courriel.",
      email: 'Écrire un courriel',
      cvFr: 'CV en français',
      cvEn: 'CV en anglais',
    },
    footer: { builtWith: 'Site construit avec Astro', source: 'Code source' },
  },
  en: {
    meta: {
      title: 'Mathieu Bonneau · AI Developer',
      description:
        'AI developer: LLM applications, RAG and agents, from prototype to deployed service. M.Sc. Computer Science (AI) at UQAC, available from January 2027.',
    },
    nav: { projects: 'Projects', experience: 'Experience', education: 'Education', skills: 'Skills', contact: 'Contact' },
    skipLink: 'Skip to content',
    otherLang: { label: 'FR', href: '/', name: 'Version française' },
    theme: { toDark: 'Switch to dark theme', toLight: 'Switch to light theme' },
    hero: {
      available: 'Available from January 2027',
      role: 'AI Developer: LLM applications, RAG and agents',
      tagline: 'I build LLM applications and take them from prototype to deployed service.',
      meta: ['M.Sc. Computer Science (AI) at UQAC', 'Chicoutimi, QC, willing to relocate to Québec City or Montréal'],
      projectsButton: 'See my projects',
      cvButton: 'Download my CV',
    },
    about: {
      title: 'About',
      paragraphs: [
        'I bridge software development and AI. I build LLM applications (RAG, LangGraph agents, access control) and deploy them with FastAPI, Docker and Azure, with tests, cost monitoring and guardrails. When I compare frameworks or models, I do it on measured criteria and state their limits.',
        "Alongside my master's, I'm completing an engineering degree in image processing at Télécom Saint-Étienne (France) and a research internship at the LIARA lab.",
      ],
    },
    projects: {
      title: 'Projects',
      intro: 'Demos sleep when nobody is using them, so the first load can take up to a minute.',
      tryHere: 'Try it here',
      newTab: 'New tab',
      code: 'Code',
      others: 'Other projects',
      dialog: {
        loading: 'The demo is starting… The first load can take up to a minute.',
        close: 'Close the demo',
        openInTab: 'Open in a new tab',
        sleepHint: 'Blank screen? The app may be asleep: open it in a new tab to wake it up.',
      },
      voice: {
        warming: 'Starting the server… (up to a minute)',
        ready: 'Ready: click the call button at the bottom right of the page and allow the microphone.',
        error: "The server isn't responding right now. Try again in a minute.",
        hint: 'Try: "What are your business hours?", "Check transaction TXN10005", or ask for a callback.',
      },
    },
    experience: { title: 'Experience' },
    education: { title: 'Education' },
    skills: { title: 'Skills', languages: 'Languages' },
    contact: {
      title: 'Contact',
      text: "I'm looking for a first AI developer role starting January 2027. The easiest way to reach me is by email.",
      email: 'Send me an email',
      cvFr: 'CV in French',
      cvEn: 'CV in English',
    },
    footer: { builtWith: 'Built with Astro', source: 'Source code' },
  },
};

export type Project = {
  id: string;
  year: string;
  stack: string[];
  demo?: string;
  // Page loaded in the on-site demo window. For Streamlit Cloud apps this is the app itself (/~/+/):
  // the ?embed=true wrapper page keeps the app in a 150px-high frame.
  embed?: string;
  // ElevenLabs voice widget, mounted once the backend has woken up
  voice?: { agentId: string; healthUrl: string };
  code: string;
  image?: ImageMetadata;
  // Shown instead of a screenshot when the project has no public demo
  flow?: Localized<string[]>;
  text: Localized<{ title: string; note?: string; summary?: string; bullets: string[] }>;
};

const projectsText: Project[] = [
  {
    id: 'rag-rbac',
    year: '2026',
    stack: ['FastAPI', 'ChromaDB', 'Docker', 'Azure', 'Streamlit'],
    demo: 'https://kazuwaii-ds-rpc-01-streamlit-app-bil3rc.streamlit.app/',
    embed: 'https://kazuwaii-ds-rpc-01-streamlit-app-bil3rc.streamlit.app/~/+/?embed=true',
    code: 'https://github.com/KazuWaii/ds-rpc-01',
    image: ragRbacImage,
    text: {
      fr: {
        title: "Chatbot RAG avec contrôle d'accès par rôle",
        note: 'Réalisé à partir du dépôt de départ du défi RPC-01 de Codebasics. Identifiants de démo affichés dans l\'application.',
        bullets: [
          "Assistant interne couvrant 5 départements d'une entreprise fictive.",
          "Chacun des 6 rôles ne récupère que les extraits qu'il a le droit de lire, donc le LLM ne voit jamais de contenu restreint.",
          'Classifieur hors sujet, masquage des données personnelles, suivi des coûts avec alertes, 53 tests pytest.',
          "90 % de bonnes récupérations sur un jeu d'évaluation maison.",
        ],
      },
      en: {
        title: 'RAG Chatbot with Role-Based Access Control',
        note: 'Built from the Codebasics RPC-01 challenge starter repository. Demo credentials are shown in the app.',
        bullets: [
          'Internal assistant covering 5 departments of a fictional company.',
          'Each of the 6 roles only retrieves the chunks it may read, so the LLM never sees restricted content.',
          'Out-of-scope classifier, PII redaction, cost tracking with alerts, 53 pytest tests.',
          '90% retrieval hit rate on a hand-labeled evaluation set.',
        ],
      },
    },
  },
  {
    id: 'rag-frameworks',
    year: '2026',
    stack: ['LlamaIndex', 'LangChain', 'Haystack', 'FAISS', 'RAGAS'],
    demo: 'https://rag-frameworks-wcom9quq3pps7nfw6q44rp.streamlit.app/',
    embed: 'https://rag-frameworks-wcom9quq3pps7nfw6q44rp.streamlit.app/~/+/?embed=true',
    code: 'https://github.com/KazuWaii/rag-frameworks',
    image: ragFrameworksImage,
    text: {
      fr: {
        title: 'Comparaison de frameworks RAG',
        note: "Identifiants de démo affichés sur la page de connexion.",
        summary:
          'Le même pipeline RAG, construit trois fois sur un index FAISS commun, pour comparer les frameworks à données égales.',
        bullets: [
          'Les réglages par défaut comptent : LlamaIndex encode aussi les métadonnées, ce qui fait chuter la similarité du bon enregistrement de 0,575 à 0,396.',
          '20 questions revues à la main, notées par un LLM juge (17/20 pour LlamaIndex, 20/20 pour LangChain et Haystack) et par RAGAS (exactitude des réponses : 0,80, 0,91 et 0,91). Les trois erreurs viennent de LlamaIndex.',
          'Filtrage par rôle dans chaque framework : filtres natifs pour LangChain et Haystack, postprocesseur sur mesure pour LlamaIndex.',
        ],
      },
      en: {
        title: 'RAG Frameworks Comparison',
        note: 'Demo credentials are shown on the login page.',
        summary: 'The same RAG pipeline built three times on one shared FAISS index, to compare frameworks on equal data.',
        bullets: [
          "Defaults matter: LlamaIndex also embeds metadata by default, which cuts the correct record's similarity from 0.575 to 0.396.",
          '20 hand-reviewed questions graded by an LLM judge (17/20 for LlamaIndex, 20/20 for LangChain and Haystack) and by RAGAS (answer accuracy 0.80, 0.91 and 0.91). All three errors come from LlamaIndex.',
          'Role filtering in each framework: built-in filters for LangChain and Haystack, a custom postprocessor for LlamaIndex.',
        ],
      },
    },
  },
  {
    id: 'sportinsight',
    year: '2026',
    stack: ['PyTorch', 'FastAPI', 'Vue 3', 'Docker', 'Azure'],
    demo: 'https://sportinsight-ai.mangowave-a097a377.eastus.azurecontainerapps.io',
    embed: 'https://sportinsight-ai.mangowave-a097a377.eastus.azurecontainerapps.io',
    code: 'https://github.com/KazuWaii/SportInsightAI',
    image: sportInsightImage,
    text: {
      fr: {
        title: "SportInsight AI : détection d'événements dans les matchs de soccer",
        note: "Projet d'équipe avec Manon Le Vallois (atelier IA, UQAC).",
        bullets: [
          "Modèle de détection temporelle (U-Net 1D avec attention) entraîné sur SoccerNet pour repérer 17 types d'événements : buts, cartons, corners, etc.",
          '50,4 % de mAP à ±5 s (36,0 % à ±1 s) sur les 100 matchs de test, avec le protocole SoccerNet. Les meilleurs modèles des challenges 2022 et 2023 atteignent environ 78 %.',
          'Démo publique sur 4 matchs de test : sur Manchester City 3-0 Chelsea, les 3 buts sont détectés.',
        ],
      },
      en: {
        title: 'SportInsight AI: event detection in soccer matches',
        note: 'Team project with Manon Le Vallois (AI workshop course, UQAC).',
        bullets: [
          'Temporal detection model (1D U-Net with attention) trained on SoccerNet to spot 17 event types: goals, cards, corners and more.',
          '50.4% mAP at ±5 s (36.0% at ±1 s) on the 100 test matches, using the SoccerNet protocol. The best models of the 2022 and 2023 challenges reach about 78%.',
          'Public demo on 4 test matches: on Manchester City 3-0 Chelsea, all 3 goals are detected.',
        ],
      },
    },
  },
  {
    id: 'voice-agent',
    year: '2026',
    stack: ['LangGraph', 'FastAPI', 'ElevenLabs', 'Azure'],
    code: 'https://github.com/KazuWaii/finsolve-voice-agent',
    voice: {
      agentId: 'agent_7701m3snz3jyfnptfjd05bew1mxv',
      healthUrl: 'https://finsolve-voice-agent-api.blackhill-3f2c9dd4.eastus.azurecontainerapps.io/health',
    },
    flow: {
      fr: ['Appel vocal', 'ElevenLabs', 'API FastAPI', 'Agent LangGraph', 'FAQ RAG · Transactions · Rappel'],
      en: ['Voice call', 'ElevenLabs', 'FastAPI endpoint', 'LangGraph agent', 'RAG FAQ · Transactions · Callback'],
    },
    text: {
      fr: {
        title: 'Agent vocal IA de service à la clientèle',
        bullets: [
          'Agent LangGraph qui oriente chaque demande vers une FAQ RAG, une recherche de transaction ou une prise de rappel.',
          'Placé derrière une API compatible OpenAI, appelée par ElevenLabs pendant les appels vocaux.',
          'Déployé sur Azure ; le compromis entre coût et démarrage à froid est documenté.',
        ],
      },
      en: {
        title: 'Voice AI Customer-Support Agent',
        bullets: [
          'LangGraph agent that routes each request to a RAG FAQ, a transaction lookup or a callback booking.',
          'Sits behind an OpenAI-compatible API that ElevenLabs calls during voice calls.',
          'Deployed on Azure; the cost vs. cold-start trade-off is documented.',
        ],
      },
    },
  },
  {
    id: 'coder-buddy',
    year: '2026',
    stack: ['LangGraph', 'Groq', 'Pydantic', 'Streamlit'],
    demo: 'https://coder-buddy-xunnwmhjq2jjpp2pueekrn.streamlit.app/',
    embed: 'https://coder-buddy-xunnwmhjq2jjpp2pueekrn.streamlit.app/~/+/?embed=true',
    code: 'https://github.com/KazuWaii/coder-buddy',
    image: coderBuddyImage,
    text: {
      fr: {
        title: 'Assistant de programmation multi-agents',
        bullets: [
          'Pipeline Planificateur → Architecte → Codeur qui transforme une demande en langage naturel en projet de plusieurs fichiers.',
          "Sorties JSON validées par Pydantic, avec nouvelle tentative en cas d'erreur.",
        ],
      },
      en: {
        title: 'Multi-Agent Coding Assistant',
        bullets: [
          'Planner → Architect → Coder pipeline that turns a plain-English request into a multi-file project.',
          'Pydantic-validated JSON outputs, with a retry on error.',
        ],
      },
    },
  },
];

const otherProjectsText: { year: string; text: Localized<{ title: string; description: string }> }[] = [
  {
    year: '2026',
    text: {
      fr: {
        title: 'Reconnaissance d\'activités multimodale (MM-Fi)',
        description:
          'Adaptation de modèles pré-entraînés à 40 sujets, 27 activités et plus de 320 000 trames synchronisées (LiDAR, radar, Wi-Fi, RGB-D).',
      },
      en: {
        title: 'Multimodal activity recognition (MM-Fi)',
        description:
          'Adapted pre-trained models to 40 subjects, 27 activities and over 320,000 synchronized frames (LiDAR, radar, Wi-Fi, RGB-D).',
      },
    },
  },
  {
    year: '2026',
    text: {
      fr: {
        title: "Optimisation d'une centrale hydroélectrique",
        description:
          'Modélisation de 5 turbines à partir de données réelles, puis répartition optimale du débit par programmation dynamique (MATLAB).',
      },
      en: {
        title: 'Hydroelectric plant optimization',
        description:
          'Modelled 5 turbines from real operating data, then allocated flow optimally with dynamic programming (MATLAB).',
      },
    },
  },
  {
    year: '2025',
    text: {
      fr: {
        title: 'Classification de sentiments sur 1,6 million de messages',
        description: 'Traitement sur un cluster Apache Spark.',
      },
      en: {
        title: 'Sentiment classification on 1.6 million messages',
        description: 'Processed on an Apache Spark cluster.',
      },
    },
  },
];

const experienceText: { period: Localized<string>; text: Localized<{ title: string; place: string; bullets: string[] }> }[] = [
  {
    period: { fr: 'juil. – déc. 2026', en: 'Jul – Dec 2026' },
    text: {
      fr: {
        title: "Stagiaire de recherche, reconnaissance d'activités",
        place: 'Laboratoire LIARA, Université du Québec à Chicoutimi',
        bullets: [
          "Revue des architectures auto-supervisées (I-JEPA, V-JEPA), comparaison des approches et recommandations à l'équipe.",
          'Chaînes de traitement ROS et Python reproductibles pour enregistrer, synchroniser, calibrer et rejouer des flux LiDAR multicapteurs.',
          "Collecte de données d'activité LiDAR, de l'installation des capteurs jusqu'au jeu de données annoté.",
        ],
      },
      en: {
        title: 'Research Intern, Human Activity Recognition',
        place: 'LIARA Lab, Université du Québec à Chicoutimi',
        bullets: [
          'Reviewed self-supervised architectures (I-JEPA, V-JEPA), compared approaches and made recommendations to the team.',
          'Built reproducible ROS and Python pipelines to record, synchronize, calibrate and replay multi-sensor LiDAR streams.',
          'Collected LiDAR activity data, from sensor setup to a labelled dataset.',
        ],
      },
    },
  },
];

const educationText: { period: Localized<string>; school: string; text: Localized<{ degree: string; place: string }> }[] = [
  {
    period: { fr: '2025 – en cours', en: '2025 – present' },
    school: 'Université du Québec à Chicoutimi (UQAC)',
    text: {
      fr: { degree: 'Maîtrise en informatique, intelligence artificielle', place: 'Chicoutimi (QC)' },
      en: { degree: 'M.Sc. Computer Science, Artificial Intelligence', place: 'Chicoutimi, QC' },
    },
  },
  {
    period: { fr: '2023 – en cours', en: '2023 – present' },
    school: 'Télécom Saint-Étienne',
    text: {
      fr: { degree: "Diplôme d'ingénieur, traitement d'image", place: 'Saint-Étienne, France' },
      en: { degree: 'Engineering degree, image processing', place: 'Saint-Étienne, France' },
    },
  },
];

const skillsText: Localized<{ label: string; items: string }>[] = [
  {
    fr: { label: 'Programmation', items: 'Python, SQL, JavaScript, Java, C++' },
    en: { label: 'Programming', items: 'Python, SQL, JavaScript, Java, C++' },
  },
  {
    fr: { label: 'Applications LLM', items: 'API compatibles OpenAI (Groq, Ollama), conception de prompts, sorties structurées, garde-fous' },
    en: { label: 'LLM applications', items: 'OpenAI-compatible APIs (Groq, Ollama), prompt design, structured outputs, guardrails' },
  },
  {
    fr: { label: 'RAG', items: 'LlamaIndex, LangChain, Haystack, FAISS, ChromaDB, segmentation, filtrage par métadonnées' },
    en: { label: 'RAG', items: 'LlamaIndex, LangChain, Haystack, FAISS, ChromaDB, chunking, metadata filtering' },
  },
  {
    fr: { label: 'Agents', items: "LangGraph, appels d'outils, routage d'intentions, pipelines multi-agents" },
    en: { label: 'Agents', items: 'LangGraph, tool calling, intent routing, multi-agent pipelines' },
  },
  {
    fr: { label: 'Évaluation', items: 'RAGAS, LLM juge, métriques de récupération, jeux de test synthétiques' },
    en: { label: 'Evaluation', items: 'RAGAS, LLM-as-judge, retrieval metrics, synthetic test sets' },
  },
  {
    fr: { label: 'Backend et déploiement', items: 'FastAPI, REST, pytest, Docker, Azure Container Apps, Streamlit Cloud' },
    en: { label: 'Backend & deployment', items: 'FastAPI, REST, pytest, Docker, Azure Container Apps, Streamlit Cloud' },
  },
  {
    fr: { label: 'Mise en production', items: "Contrôle d'accès, masquage des données personnelles, suivi des coûts, gestion des secrets" },
    en: { label: 'Production', items: 'Access control, PII redaction, token and cost monitoring, secrets management' },
  },
  {
    fr: { label: 'Apprentissage automatique', items: 'PyTorch, scikit-learn, Pandas, NumPy, vision par ordinateur (OpenCV)' },
    en: { label: 'Machine learning', items: 'PyTorch, scikit-learn, Pandas, NumPy, computer vision (OpenCV)' },
  },
  {
    fr: { label: 'Outils et méthodes', items: 'Git, GitHub, Linux, uv, Agile/Scrum' },
    en: { label: 'Tools & methods', items: 'Git, GitHub, Linux, uv, Agile/Scrum' },
  },
];

const languagesText: Localized<{ name: string; level: string }[]> = {
  fr: [
    { name: 'Français', level: 'langue maternelle' },
    { name: 'Anglais', level: 'compétence professionnelle (TOEIC B2)' },
  ],
  en: [
    { name: 'French', level: 'native' },
    { name: 'English', level: 'professional working proficiency (TOEIC B2)' },
  ],
};

export const ui = withTypography(uiText);
export const projects = withTypography(projectsText);
export const otherProjects = withTypography(otherProjectsText);
export const experience = withTypography(experienceText);
export const education = withTypography(educationText);
export const skills = withTypography(skillsText);
export const languages = withTypography(languagesText);
