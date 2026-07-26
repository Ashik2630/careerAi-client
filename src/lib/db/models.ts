import clientPromise from "../db";
import { ObjectId } from "mongodb";

export interface UserProfile {
  _id?: ObjectId;
  userId: string;
  name: string;
  email: string;
  role?: string;
  skills: string[];
  education: string;
  experience: string;
  goal: string;
  updatedAt: Date;
}

export interface ResumeData {
  _id?: ObjectId;
  userId: string;
  fileName: string;
  resumeText: string;
  score: number;
  extractedSkills: string[];
  missingSkills: string[];
  weaknesses: string[];
  summary: string;
  recommendations: string[];
  createdAt: Date;
}

export interface JobItem {
  _id?: ObjectId;
  userId?: string;
  title: string;
  company: string;
  skills: string[];
  salary: string;
  location: string;
  type: string;
  description: string;
  matchScore?: number;
  createdAt: Date;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
}

export interface Conversation {
  _id?: ObjectId;
  userId: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: Date;
}

export interface CareerPlan {
  _id?: ObjectId;
  userId: string;
  targetGoal: string;
  overallProgress: number;
  roadmap: Array<{
    id: string;
    phase: string;
    title: string;
    description: string;
    duration: string;
    completed: boolean;
    resources: string[];
  }>;
  updatedAt: Date;
}

export interface NewsletterSubscriber {
  _id?: ObjectId;
  email: string;
  subscribedAt: Date;
  active: boolean;
}

export async function getDb() {
  const client = await clientPromise;
  return client.db();
}

export async function getUserProfileCol() {
  const db = await getDb();
  return db.collection<UserProfile>("users_profiles");
}

export async function getResumesCol() {
  const db = await getDb();
  return db.collection<ResumeData>("resumes");
}

export async function getJobsCol() {
  const db = await getDb();
  return db.collection<JobItem>("jobs");
}

export async function getConversationsCol() {
  const db = await getDb();
  return db.collection<Conversation>("conversations");
}

export async function getCareerPlansCol() {
  const db = await getDb();
  return db.collection<CareerPlan>("career_plans");
}

export async function getNewsletterCol() {
  const db = await getDb();
  return db.collection<NewsletterSubscriber>("newsletter_subscribers");
}
