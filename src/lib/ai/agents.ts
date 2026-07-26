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
 * 4. Interview Coach Agent
 */
export async function runInterviewCoachAgent(role: string, userMessage: string, chatHistory: any[] = []) {
  const prompt = `Role: "${role}". User question/answer: "${userMessage}".
  Provide structured mock interview feedback or next interview question.
  Format output clearly with Markdown styling.`;

  const raw = await callGemini(prompt, "You are an empathetic, expert AI Interview Coach.");
  if (raw) return raw;

  return `### 💡 AI Interview Coach Feedback

**Question:** "Can you describe a challenging technical problem you solved using modern web architecture?"

**Recommended Structure (STAR Method):**
1. **Situation:** Context of your project/company.
2. **Task:** What exact problem or bottleneck needed solving.
3. **Action:** How you implemented ${role} best practices (e.g. state optimization, caching, error handling).
4. **Result:** Metrics like 40% faster load speed or 99.9% uptime.

**Follow-up Challenge Question:** How do you handle state synchronization across multiple serverless routes in Next.js?`;
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
