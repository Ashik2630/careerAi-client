/**
 * Multi-Agent AI Framework for CareerAI Platform
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

// Generic helper to query Gemini or fallback to smart rule-based AI engine
async function callGemini(prompt: string, systemInstruction: string = "You are an expert AI Career Orchestrator."): Promise<string | null> {
  if (!GEMINI_API_KEY) return null;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemInstruction}\n\nTask: ${prompt}` }]
          }
        ]
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || null;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    return null;
  }
}

/**
 * 1. Resume Analyzer Agent
 */
export async function runResumeAnalyzerAgent(resumeText: string, targetRole: string = "Software Engineer") {
  const prompt = `Analyze this resume for target role "${targetRole}". 
  Return a valid JSON object only with format:
  {
    "score": 78,
    "summary": "...",
    "extractedSkills": ["React", "Node.js"],
    "missingSkills": ["TypeScript", "Docker"],
    "weaknesses": ["Lack of cloud deployment experience"],
    "recommendations": ["Learn Docker basics", "Build a Next.js fullstack project"]
  }

  Resume Content:
  ${resumeText}`;

  const rawAi = await callGemini(prompt, "You are a professional ATS Resume Analyzer Agent.");
  if (rawAi) {
    try {
      const cleaned = rawAi.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(cleaned);
    } catch {
      // Fallback below
    }
  }

  // Heuristic Fallback Engine
  const textLower = resumeText.toLowerCase();
  const knownSkills = ["React", "Node.js", "JavaScript", "TypeScript", "Python", "MongoDB", "SQL", "Tailwind", "Next.js", "Docker", "AWS", "Git", "REST API", "GraphQL"];
  const foundSkills = knownSkills.filter(s => textLower.includes(s.toLowerCase()));
  if (foundSkills.length === 0) foundSkills.push("JavaScript", "HTML/CSS", "Problem Solving");

  const missingSkills = ["TypeScript", "Docker", "System Design", "CI/CD Pipeline", "Jest / Testing"].filter(s => !foundSkills.includes(s));
  const baseScore = Math.min(95, Math.max(55, foundSkills.length * 12 + 40));

  return {
    score: baseScore,
    summary: `Candidate demonstrates practical experience with ${foundSkills.slice(0, 3).join(", ")}. Strong potential for ${targetRole} with targeted skill upskilling.`,
    extractedSkills: foundSkills,
    missingSkills: missingSkills.slice(0, 4),
    weaknesses: [
      "Resume could highlight quantitative metrics and project impact more clearly",
      `Missing explicit keywords for modern ${targetRole} tooling (${missingSkills[0] || "Docker"})`
    ],
    recommendations: [
      `Add 2 production projects featuring ${missingSkills[0] || "TypeScript"} and ${missingSkills[1] || "Docker"}`,
      "Format work experience using the STAR method (Situation, Task, Action, Result)",
      "Include ATS-optimized keyword section in header"
    ]
  };
}

/**
 * 2. Skill Gap Analysis Agent
 */
export async function runSkillGapAgent(currentSkills: string[], goal: string) {
  const prompt = `User goal: "${goal}". Current skills: ${currentSkills.join(", ")}.
  Identify critical skill gaps and recommend high-impact skills to learn.
  Return valid JSON:
  {
    "matchedSkills": ["React"],
    "missingSkills": ["TypeScript", "System Design"],
    "recommendedRoles": ["Frontend Engineer", "Full Stack Developer"],
    "learningPriority": ["TypeScript", "Next.js 15", "Docker"]
  }`;

  const raw = await callGemini(prompt, "You are a Skill Gap Analysis Agent.");
  if (raw) {
    try {
      return JSON.parse(raw.replace(/```json/g, "").replace(/```/g, "").trim());
    } catch {}
  }

  const defaultMissing = ["TypeScript", "Next.js 15", "System Design", "Docker & Kubernetes", "CI/CD Automated Testing"].filter(s => !currentSkills.includes(s));
  return {
    matchedSkills: currentSkills.length ? currentSkills : ["JavaScript", "HTML/CSS"],
    missingSkills: defaultMissing.slice(0, 3),
    recommendedRoles: [goal || "Full Stack Developer", "Frontend Engineer", "Software Engineer"],
    learningPriority: [defaultMissing[0] || "TypeScript", defaultMissing[1] || "Next.js Advanced", "System Design Patterns"]
  };
}

/**
 * 3. AI Smart Job Recommendation Agent
 */
export async function runJobRecommendationAgent(profile: { skills: string[]; goal: string }, availableJobs: any[]) {
  const userSkills = profile.skills.map(s => s.toLowerCase());

  return availableJobs.map(job => {
    const jobSkills = (job.skills || []).map((s: string) => s.toLowerCase());
    const matches = jobSkills.filter((s: string) => userSkills.includes(s));
    const score = jobSkills.length ? Math.round((matches.length / jobSkills.length) * 100) : 75;

    return {
      ...job,
      matchScore: Math.min(98, Math.max(60, score + 20)),
      matchedSkillsCount: matches.length
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * 4. Interview Coach Agent - Dynamic Multi-Category AI Engine
 */
export async function runInterviewCoachAgent(role: string, userMessage: string, chatHistory: any[] = []) {
  const historyContext = chatHistory.slice(-4).map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n");

  const systemInstruction = `You are CareerAI's Principal Lead Software Engineer & AI Career Orchestrator. 
Your goal is to provide deep, accurate, highly tailored answers for programming, system design, web frameworks (React, Next.js, Node.js, TypeScript, Python, etc.), technical interview preparation, and software career growth.
Always use Markdown formatting (bold text, code blocks, bullet points, headers) to make responses easy to read. Provide concrete code snippets or step-by-step technical blueprints wherever relevant. Never return generic static placeholders.`;

  const prompt = `Target Role: "${role}".
Recent Conversation History:
${historyContext || "None"}

Current User Prompt:
"${userMessage}"

Provide a detailed, expert technical response or career guidance tailored to the user's prompt.`;

  const raw = await callGemini(prompt, systemInstruction);
  if (raw) return raw;

  // Smart Dynamic Fallback Reasoning Engine
  const query = userMessage.toLowerCase();

  // 1. Transition / Junior to Senior Questions
  if (query.includes("transition") || query.includes("senior") || query.includes("junior to senior") || query.includes("growth") || query.includes("lead")) {
    return `### 🚀 Roadmap: Junior to Senior ${role || "React Developer"}

To successfully transition from a Junior to a **Senior ${role || "React Developer"}**, you need to evolve from *writing working code* to *architecting scalable systems & leading technical decisions*.

#### 🧠 1. Core Technical Mastery (Deep Dive)
- **Advanced State & Rendering Patterns:** Master React 19 Server Components (RSC), Concurrent Rendering, optimistic UI updates (\`useOptimistic\`), and state collocation.
- **Performance Optimization:** Diagnose bottlenecks using React Profiler, Chrome DevTools, and Lighthouse. Understand Bundle Splitting, Dynamic Imports (\`next/dynamic\`), and Tree Shaking.
- **Type Safety & Architecture:** Use strict TypeScript generic constraints, Zod schema validation, and clean architectural layers (Domain, Infrastructure, Presentation).

#### 🏗️ 2. System Design & Infrastructure
- **Serverless & Edge Runtime:** Understand Middleware, Edge Caching, Revalidation strategies (\`revalidatePath\` / \`revalidateTag\`), and ISR (Incremental Static Regeneration).
- **API Architecture:** Build robust RESTful and GraphQL APIs with rate limiting, Redis caching, and error-handling middleware.

#### 👥 3. Leadership & Architectural Ownership
- **Code Reviews:** Provide constructive, high-impact feedback focused on readability, security, and scalability.
- **Technical RFCs:** Write Request For Comments (RFC) docs before building complex features to align team engineering decisions.

#### 💡 Suggested Action Items for You:
1. **Build a Production Project:** Create a full-stack Next.js 15 application with authentication, server actions, and MongoDB aggregation.
2. **Practice System Design:** Study distributed caching (Redis), rate-limiting, and microservices architecture.`;
  }

  // 2. Next.js 15 / React Technical Interview Questions
  if (query.includes("next.js") || query.includes("nextjs") || query.includes("react") || query.includes("interview question") || query.includes("top 5")) {
    return `### 🎯 Top Technical Interview Questions (Next.js 15 & React 19)

Here are high-impact technical interview questions with expert answers expected for senior roles:

#### 1. Difference Between Server Components (RSC) and Client Components?
- **Server Components:** Render exclusively on the server, zero JavaScript sent to client bundle, direct database access, async/await native.
- **Client Components:** Marked with \`"use client"\`, interactive event listeners (\`onClick\`, \`onChange\`), browser APIs (\`window\`, \`localStorage\`), and React hooks (\`useState\`, \`useEffect\`).

#### 2. How do Server Actions work in Next.js 15?
Server Actions allow client forms or hooks to invoke asynchronous server-side functions directly without manually creating separate REST endpoint files.

\`\`\`tsx
// app/actions.ts
"use server";

import { db } from "@/lib/db";

export async function updateUserGoal(userId: string, goal: string) {
  await db.user.update({ where: { id: userId }, data: { goal } });
  return { success: true };
}
\`\`\`

#### 3. What is Revalidation in Next.js (\`revalidatePath\` vs \`revalidateTag\`)?
- \`revalidatePath("/dashboard")\`: Invalidates cached data for a specific URL route path.
- \`revalidateTag("user-profile")\`: Invalidates cached fetch requests tagged with \`user-profile\` across any route.

#### 4. How do you prevent unnecessary re-renders in React?
- Use \`React.memo\` for component memoization.
- Use \`useCallback\` to preserve function references passed to child components.
- Keep state local to where it is consumed rather than lifting state unnecessarily high.

#### 💡 Mock Interview Challenge:
*Can you explain how you would design an optimistic UI update when a user submits a comment or updates their profile?*`;
  }

  // 3. Docker / Microservices / System Design Questions
  if (query.includes("docker") || query.includes("microservice") || query.includes("system design") || query.includes("architecture") || query.includes("redis")) {
    return `### 🐳 System Design & Containerization Architecture

Building production-grade microservices requires decoupling services and managing container lifecycle effectively.

#### 📐 Core Architectural Pattern
\`\`\`text
[ Client App (Next.js / Mobile) ]
           │
           ▼
 [ NGINX / Cloudflare Gateway ]  <── SSL / Rate Limiting
           │
     ┌─────┴────────────────┐
     ▼                      ▼
[ Auth & User API ]   [ AI Engine Service ]
     │                      │
     ▼                      ▼
 [ MongoDB ]           [ Redis Cache / Queue ]
\`\`\`

#### 🛠️ Key Docker & Microservice Best Practices
1. **Multi-Stage Builds:** Keep Docker images lightweight (< 150MB) using Node.js Alpine base images and multi-stage build targets.
2. **Container Orchestration:** Use Docker Compose for local microservices orchestration and Kubernetes / AWS ECS for production auto-scaling.
3. **Stateless Microservices:** Keep services stateless by storing sessions and cache in Redis.

#### 💻 Sample Production \`Dockerfile\`
\`\`\`dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
\`\`\``;
  }

  // 4. Resume & ATS Optimization Questions
  if (query.includes("resume") || query.includes("ats") || query.includes("highlight") || query.includes("cv")) {
    return `### 📄 ATS Resume Optimization Strategy for ${role || "Developers"}

To ensure your resume passes Applicant Tracking Systems (ATS) and impresses hiring managers:

#### 🎯 1. Use Metrics-Driven Accomplishment Statements (STAR Formula)
- ❌ **Weak:** "Built web apps using React and Node.js."
- ✅ **Strong (ATS Optimized):** "Engineered a full-stack Next.js 15 analytics dashboard serving 150K+ active users, reducing API latency by 42% through Redis query caching."

#### 🔑 2. Essential Technical Keyword Section
Ensure your resume explicitly lists modern industry keywords:
- **Frontend:** React 19, Next.js App Router, TypeScript, Tailwind CSS, Redux Toolkit, Web Vitals.
- **Backend & Database:** Node.js, Express, MongoDB, PostgreSQL, RESTful APIs, GraphQL, Better-Auth.
- **DevOps & Testing:** Docker, GitHub Actions CI/CD, Jest, Cypress, Vercel, AWS S3.

#### 💡 Action Step:
Use our **[Resume Analyzer tool](/resume-analyzer)** to get a instant ATS compatibility score and key-skill gap breakdown for your target job posting!`;
  }

  // 5. Default General Programming & Career Coaching Response
  return `### 💡 CareerAI Technical Guidance for ${role || "Developers"}

Thank you for your question regarding **"${userMessage}"**. Here is an expert breakdown tailored for your technical trajectory:

#### 🔑 Key Concepts & Solution Overview
1. **Core Architectural Approach:** When tackling **${userMessage.slice(0, 40)}...**, always prioritize clean modular code, type safety, and proper error handling.
2. **Best Practice:** Structure your logic into reusable modules, separate database/API calls from UI components, and enforce strict TypeScript interfaces.

#### 🛠️ Code Pattern Example
\`\`\`typescript
interface QueryPayload {
  query: string;
  targetRole: string;
}

export async function processTechnicalQuery(payload: QueryPayload) {
  try {
    // 1. Input Validation
    if (!payload.query) throw new Error("Query parameters required");

    // 2. Business Logic Execution
    const result = await executeQuery(payload);
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
\`\`\`

#### 🎯 Next Recommended Steps:
- Would you like to practice a mock interview question on this topic?
- Or explore a step-by-step learning roadmap in our **[Roadmap Generator](/roadmap)**?`;
}

/**
 * 5. Learning Roadmap Agent
 */
export async function runLearningRoadmapAgent(currentSkills: string[], targetGoal: string) {
  const prompt = `Generate a 90-day learning roadmap for becoming a "${targetGoal}". Current skills: ${currentSkills.join(", ")}.
  Return JSON array of roadmap steps:
  [
    {
      "id": "phase-1",
      "phase": "Month 1: Core Fundamentals",
      "title": "Master Advanced TypeScript & React Patterns",
      "description": "Deep dive into strict typing, generic interfaces, custom hooks, and state management.",
      "duration": "4 Weeks",
      "completed": true,
      "resources": ["TypeScript Official Docs", "React 19 Server Components Handbook"]
    }
  ]`;

  const raw = await callGemini(prompt, "You are a Learning Roadmap Architect Agent.");
  if (raw) {
    try {
      return JSON.parse(raw.replace(/```json/g, "").replace(/```/g, "").trim());
    } catch {}
  }

  return [
    {
      id: "phase-1",
      phase: "Month 1: Core Upskilling",
      title: "Master Advanced TypeScript & Next.js App Router",
      description: "Build type-safe APIs, implement server actions, handle authentication with Better-Auth.",
      duration: "4 Weeks",
      completed: true,
      resources: ["Next.js Documentation", "TypeScript Deep Dive", "Full Stack Next.js Course"]
    },
    {
      id: "phase-2",
      phase: "Month 2: Backend & Database Mastery",
      title: "MongoDB Aggregations & Serverless Microservices",
      description: "Design production schemas, optimize query indexing, create robust REST APIs.",
      duration: "4 Weeks",
      completed: false,
      resources: ["MongoDB University", "Node.js Performance Guide"]
    },
    {
      id: "phase-3",
      phase: "Month 3: System Design & Production Deployment",
      title: "Docker Containerization & Agentic AI Workflows",
      description: "Integrate LLM API workflows, containerize with Docker, deploy on Vercel with automated CI/CD.",
      duration: "4 Weeks",
      completed: false,
      resources: ["Docker Mastery Handbook", "Agentic AI System Architecture"]
    }
  ];
}

/**
 * 6. AI Resume Content Generator Agent
 */
export async function runResumeContentGeneratorAgent(input: { name: string; education: string; skills: string[]; experience: string; targetJob: string }) {
  const prompt = `Generate professional resume content for:
  Name: ${input.name}
  Target Job: ${input.targetJob}
  Skills: ${input.skills.join(", ")}
  Education: ${input.education}
  Experience: ${input.experience}

  Return valid JSON:
  {
    "professionalSummary": "...",
    "experienceDescription": "...",
    "linkedinBio": "...",
    "coverLetter": "..."
  }`;

  const raw = await callGemini(prompt, "You are an expert AI Resume Writer Agent.");
  if (raw) {
    try {
      return JSON.parse(raw.replace(/```json/g, "").replace(/```/g, "").trim());
    } catch {}
  }

  return {
    professionalSummary: `Results-driven ${input.targetJob || "Software Engineer"} with hands-on expertise in ${input.skills.join(", ") || "modern software development"}. Passionate about building scalable, high-performance web applications and solving complex architectural challenges.`,
    experienceDescription: `• Developed and deployed scalable full-stack web applications utilizing ${input.skills[0] || "React"} and ${input.skills[1] || "Node.js"}.\n• Collaborated with cross-functional teams to engineer high-throughput REST APIs and serverless workflows.\n• Improved web application performance by 35% through code refactoring and database query optimization.`,
    linkedinBio: `🚀 ${input.targetJob || "Full Stack Developer"} | Specializing in ${input.skills.slice(0, 3).join(" • ") || "Modern Web Development"} | Passionate about building intelligent AI SaaS platforms.`,
    coverLetter: `Dear Hiring Manager,\n\nI am writing to express my strong enthusiasm for the ${input.targetJob || "Software Engineer"} position. With a solid foundation in ${input.education || "Computer Science"} and proven technical experience in ${input.skills.join(", ")}, I am confident in my ability to make an immediate impact on your team.\n\nThank you for your time and consideration.\n\nSincerely,\n${input.name || "Candidate"}`
  };
}
