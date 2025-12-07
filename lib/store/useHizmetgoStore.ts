/**
 * Hizmetgo - Global State Store (Zustand)
 */

import { create } from "zustand";
import type {
  UserProfile,
  Job,
  SkillKeyword,
  Earnings,
} from "../types/mahallem";

interface HizmetgoState {
  currentUser: UserProfile | null;
  users: UserProfile[];
  jobs: Job[];
  skills: SkillKeyword[];
  earnings: Earnings[];

  // Actions
  setCurrentUser: (user: UserProfile | null) => void;
  registerUser: (user: UserProfile) => void;
  createJob: (job: Job) => void;
  assignJobToVendor: (jobId: string, vendorId: string) => void;
  completeJob: (jobId: string) => void;
  addEarnings: (
    userId: string,
    amount: number,
    type: "job" | "referral",
  ) => void;
  setSkills: (skills: SkillKeyword[]) => void;
  updateUserSkills: (userId: string, skills: SkillKeyword[]) => void;
}

export const useHizmetgoStore = create<HizmetgoState>((set, get) => ({
  currentUser: null,
  users: [],
  jobs: [],
  skills: [],
  earnings: [],

  setCurrentUser: (user) => set({ currentUser: user }),

  registerUser: (user) =>
    set((state) => ({
      users: [...state.users, user],
      currentUser: user,
    })),

  createJob: (job) =>
    set((state) => ({
      jobs: [job, ...state.jobs],
    })),

  assignJobToVendor: (jobId, vendorId) =>
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === jobId ? { ...j, vendorId, status: "assigned" } : j,
      ),
    })),

  completeJob: (jobId) =>
    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === jobId ? { ...j, status: "completed" } : j,
      ),
    })),

  addEarnings: (userId, amount, type) =>
    set((state) => {
      const existing = state.earnings.find((e) => e.userId === userId);
      if (!existing) {
        return {
          earnings: [
            ...state.earnings,
            {
              userId,
              jobEarnings: type === "job" ? amount : 0,
              referralEarnings: type === "referral" ? amount : 0,
              totalEarnings: amount,
            },
          ],
        };
      }
      const updated = state.earnings.map((e) =>
        e.userId === userId
          ? {
              ...e,
              jobEarnings: e.jobEarnings + (type === "job" ? amount : 0),
              referralEarnings:
                e.referralEarnings + (type === "referral" ? amount : 0),
              totalEarnings: e.totalEarnings + amount,
            }
          : e,
      );
      return { earnings: updated };
    }),

  setSkills: (skills) => set({ skills }),

  updateUserSkills: (userId, skills) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === userId ? { ...u, skills } : u)),
      currentUser:
        state.currentUser?.id === userId
          ? { ...state.currentUser, skills }
          : state.currentUser,
    })),
}));
