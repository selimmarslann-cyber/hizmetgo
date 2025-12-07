/**
 * Jobs API Client
 *
 * İş talepleri (jobs) ile ilgili tüm API çağrıları bu dosyada toplanmıştır.
 */

import { fetchJson } from "./client";
import type { Job } from "../types/domain";

export interface CreateJobRequest {
  mainCategoryId: string;
  subServiceId?: string | null;
  isOther?: boolean;
  description: string;
  urgency?: "simdi" | "acil" | "bugun" | "yarin" | "hafta";
  desiredDate?: string;
}

export interface CreateJobResponse {
  job: Job;
}

/**
 * Yeni iş talebi oluştur
 */
export async function createJob(
  payload: CreateJobRequest,
): Promise<CreateJobResponse> {
  return fetchJson<CreateJobResponse>("/jobs/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * İş detayını al
 */
export async function getJobDetail(jobId: string): Promise<{ job: Job }> {
  return fetchJson<{ job: Job }>(`/jobs/${jobId}`);
}

/**
 * Müşterinin işlerini listele
 */
export async function listCustomerJobs(
  customerId: string,
): Promise<{ jobs: Job[] }> {
  return fetchJson<{ jobs: Job[] }>(`/jobs/customer/${customerId}`);
}
