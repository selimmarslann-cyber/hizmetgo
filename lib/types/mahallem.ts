/**
 * Hizmetgo - Core Types for Job Matching System
 */

export type UserRole = "customer" | "vendor";

export type SkillKeyword = {
  id: string;
  label: string; // e.g. "Elektrik arıza"
  sector: string; // e.g. "Elektrik"
};

export type UserProfile = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  location?: { lat: number; lng: number };
  role: UserRole;
  skills: SkillKeyword[]; // selected expertise keywords
  avatarUrl?: string;
  createdAt?: string;
};

export type JobType = "normal" | "instant";

export type JobStatus = "open" | "assigned" | "completed" | "cancelled";

export type Job = {
  id: string;
  title: string; // short title from search + description
  description: string;
  city: string;
  location?: { lat: number; lng: number }; // for instant jobs
  type: JobType;
  keywords: SkillKeyword[]; // tags used for matching
  customerId: string;
  vendorId?: string;
  status: JobStatus;
  createdAt: string;
  scheduledFor?: string; // date/time or "Acil"
  distanceKmFromVendor?: number; // computed in matching step
  priceOffered?: number;
};

export type Earnings = {
  userId: string;
  jobEarnings: number;
  referralEarnings: number;
  totalEarnings: number;
};

export type Sector = {
  id: string;
  name: string;
  keywords: SkillKeyword[];
};
