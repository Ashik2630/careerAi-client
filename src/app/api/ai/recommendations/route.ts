import { NextResponse } from "next/server";
import { getUserSession } from "@/lib/core/session";
import { runJobRecommendationAgent, runSkillGapAgent } from "@/lib/ai/agents";
import { getJobsCol, getUserProfileCol } from "@/lib/db/models";

const INITIAL_SEED_JOBS = [
  {
    title: "Senior Full Stack Engineer (Next.js & Node.js)",
    company: "TechPulse AI",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    salary: "$140,000 - $180,000",
    location: "Remote / San Francisco",
    type: "Full-time",
    description: "Architect Next.js web applications, optimize MongoDB queries, and deploy scalable cloud microservices.",
    createdAt: new Date()
  },
  {
    title: "Staff AI Infrastructure & LLM Engineer",
    company: "OpenAI Ecosystems",
    skills: ["Python", "PyTorch", "OpenAI API", "LangChain", "Vector DB"],
    salary: "$210,000 - $260,000",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Build custom fine-tuned model pipelines, agentic orchestration layers, and ultra-low latency inference APIs.",
    createdAt: new Date()
  },
  {
    title: "Lead Frontend Architect (React 19 & Tailwind CSS)",
    company: "Vercel Labs",
    skills: ["React", "Next.js 15", "TypeScript", "Tailwind CSS", "Design Systems"],
    salary: "$160,000 - $210,000",
    location: "Remote / Hybrid",
    type: "Full-time",
    description: "Drive core design system engineering, React Server Components (RSC) architecture, and Web Vitals performance.",
    createdAt: new Date()
  },
  {
    title: "Senior Backend & Distributed Systems Engineer",
    company: "Stripe Tech",
    skills: ["Node.js", "Go", "PostgreSQL", "Redis", "Kafka"],
    salary: "$175,000 - $225,000",
    location: "New York, NY",
    type: "Full-time",
    description: "Design fault-tolerant payment processing systems and high-throughput event streaming infrastructure.",
    createdAt: new Date()
  },
  {
    title: "AI Application Developer (LangChain & Vector DB)",
    company: "Anthropic Partners",
    skills: ["Python", "TypeScript", "Pinecone", "Claude API", "FastAPI"],
    salary: "$150,000 - $190,000",
    location: "Remote",
    type: "Full-time",
    description: "Develop conversational AI copilots, context-aware RAG pipelines, and semantic search platforms.",
    createdAt: new Date()
  },
  {
    title: "Principal Cloud & DevOps Architect (AWS & Kubernetes)",
    company: "Datadog Cloud",
    skills: ["AWS", "Kubernetes", "Docker", "Terraform", "CI/CD"],
    salary: "$185,000 - $240,000",
    location: "Boston, MA / Remote",
    type: "Full-time",
    description: "Manage global Kubernetes clusters, automate multi-region failovers, and optimize cloud infrastructure security.",
    createdAt: new Date()
  },
  {
    title: "Senior Mobile Engineer (React Native & Expo)",
    company: "Figma Mobile",
    skills: ["React Native", "Expo", "TypeScript", "Redux Toolkit", "GraphQL"],
    salary: "$145,000 - $185,000",
    location: "San Jose, CA",
    type: "Full-time",
    description: "Build cross-platform iOS and Android vector graphics canvas tools using React Native and WebAssembly.",
    createdAt: new Date()
  },
  {
    title: "Senior TypeScript & Micro-Frontend Specialist",
    company: "Airbnb Engineering",
    skills: ["TypeScript", "React", "Webpack Module Federation", "Jest", "Tailwind CSS"],
    salary: "$155,000 - $195,000",
    location: "Remote",
    type: "Full-time",
    description: "Lead micro-frontend architecture for international booking channels and component libraries.",
    createdAt: new Date()
  },
  {
    title: "Senior Data & Data Pipelines Engineer",
    company: "Snowflake Systems",
    skills: ["Python", "Spark", "SQL", "Snowflake", "Airflow"],
    salary: "$165,000 - $215,000",
    location: "Austin, TX",
    type: "Full-time",
    description: "Construct petabyte-scale data pipelines, real-time analytics streaming, and machine learning feature stores.",
    createdAt: new Date()
  },
  {
    title: "Full Stack Next.js & GraphQL Architect",
    company: "Shopify Core",
    skills: ["Next.js", "React", "GraphQL", "Node.js", "TypeScript"],
    salary: "$150,000 - $190,000",
    location: "Remote",
    type: "Full-time",
    description: "Power high-volume e-commerce store fronts, headless API gateways, and custom checkout experiences.",
    createdAt: new Date()
  },
  {
    title: "Machine Learning Operations (MLOps) Lead",
    company: "Scale AI",
    skills: ["Python", "Kubeflow", "MLflow", "Docker", "PyTorch"],
    salary: "$190,000 - $250,000",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Streamline model training deployment, automated benchmark monitoring, and data annotation workflows.",
    createdAt: new Date()
  },
  {
    title: "Senior Rust Systems & High Performance Engineer",
    company: "Cloudflare Workers",
    skills: ["Rust", "WebAssembly", "C++", "Networking", "Distributed Systems"],
    salary: "$180,000 - $230,000",
    location: "Remote",
    type: "Full-time",
    description: "Implement edge computing runtimes, WASM sandbox security, and sub-millisecond CDN routing.",
    createdAt: new Date()
  },
  {
    title: "Principal Product & Design Engineer",
    company: "Linear Web",
    skills: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Zustand"],
    salary: "$170,000 - $220,000",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Craft pixel-perfect keyboard-first user interfaces, micro-animations, and real-time multiplayer state sync.",
    createdAt: new Date()
  },
  {
    title: "Senior Node.js & Realtime WebSockets Engineer",
    company: "Discord Infrastructure",
    skills: ["Node.js", "TypeScript", "WebSockets", "Redis", "MongoDB"],
    salary: "$160,000 - $200,000",
    location: "Remote / Seattle",
    type: "Full-time",
    description: "Scale realtime message streaming, voice channel signaling, and bot gateway infrastructure.",
    createdAt: new Date()
  },
  {
    title: "Lead Cybersecurity & Application Security Architect",
    company: "CrowdStrike Security",
    skills: ["Cybersecurity", "Python", "OAuth2 / OIDC", "AppSec", "AWS"],
    salary: "$180,000 - $230,000",
    location: "Remote",
    type: "Full-time",
    description: "Perform threat modeling, secure code audits, zero-trust auth integrations, and vulnerability mitigations.",
    createdAt: new Date()
  },
  {
    title: "Staff Autonomous AI Agent Developer",
    company: "DeepMind Partners",
    skills: ["Python", "PyTorch", "AutoGPT", "LLM Fine-Tuning", "Docker"],
    salary: "$200,000 - $260,000",
    location: "Remote / London",
    type: "Full-time",
    description: "Architect multi-agent autonomous decision loops, tool calling frameworks, and cognitive memory structures.",
    createdAt: new Date()
  },
  {
    title: "Full Stack Engineer (React, Go & PostgreSQL)",
    company: "Uber Mobility",
    skills: ["React", "Go", "PostgreSQL", "Kafka", "Docker"],
    salary: "$165,000 - $210,000",
    location: "Seattle, WA",
    type: "Full-time",
    description: "Engineer driver and rider matching engines, dynamic pricing algorithms, and real-time mapping dashboards.",
    createdAt: new Date()
  },
  {
    title: "Senior UI Component System Specialist",
    company: "Radix & Tailwind Core",
    skills: ["React", "TypeScript", "Tailwind CSS", "Accessibility (a11y)", "Storybook"],
    salary: "$140,000 - $180,000",
    location: "Remote",
    type: "Full-time",
    description: "Build WCAG AAA compliant unstyled headless UI primitives and reusable component design tokens.",
    createdAt: new Date()
  },
  {
    title: "Senior Database Optimization Specialist",
    company: "Elastic Cloud",
    skills: ["MongoDB", "Redis", "Elasticsearch", "Node.js", "Python"],
    salary: "$150,000 - $195,000",
    location: "Chicago, IL",
    type: "Full-time",
    description: "Optimize complex aggregation pipelines, sharded cluster indexing, and full-text search indexing.",
    createdAt: new Date()
  },
  {
    title: "AI Agent UX & Full Stack Developer",
    company: "CareerAI Labs",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
    salary: "$135,000 - $175,000",
    location: "Remote",
    type: "Full-time",
    description: "Build innovative AI career matching dashboards, resume scoring agents, and interview simulator interfaces.",
    createdAt: new Date()
  }
];

export async function GET() {
  try {
    const session = await getUserSession();
    const userId = session?.id || session?.email || "guest-user";
    const sessionEmail = session?.email;

    const profilesCol = await getUserProfileCol();
    const userProfile = await profilesCol.findOne({
      $or: [
        { userId },
        ...(sessionEmail ? [{ email: sessionEmail }] : [])
      ]
    });

    const currentSkills = userProfile?.skills || ["React", "JavaScript", "Node.js"];
    const targetGoal = userProfile?.goal || "Full Stack Developer";

    const jobsCol = await getJobsCol();
    let jobs = await jobsCol.find({}).sort({ createdAt: -1 }).toArray();

    if (jobs.length < 15) {
      // Seed high-skill jobs if DB has fewer than 15 jobs
      await jobsCol.insertMany(INITIAL_SEED_JOBS);
      jobs = await jobsCol.find({}).sort({ createdAt: -1 }).toArray();
    }

    const matchedJobs = await runJobRecommendationAgent({ skills: currentSkills, goal: targetGoal }, jobs);
    const skillGapAnalysis = await runSkillGapAgent(currentSkills, targetGoal);

    return NextResponse.json({
      success: true,
      data: {
        matchedJobs,
        skillGapAnalysis,
        userProfile: {
          skills: currentSkills,
          goal: targetGoal
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
