/**
 * Auth API Client - Mobile
 *
 * FAZ 2: Backend API'lerine bağlandı.
 */

import { request } from "./client";
import type { User } from "../types/domain";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  sessionToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface RegisterResponse {
  user: User;
  sessionToken: string;
}

export interface SendOtpRequest {
  phone: string;
}

export interface SendOtpResponse {
  success: boolean;
  message?: string;
}

export interface VerifyOtpRequest {
  code: string;
  phone: string;
}

export interface VerifyOtpResponse {
  user: User;
  sessionToken?: string;
}

/**
 * Email/password ile giriş yap
 */
export async function loginWithEmail(
  email: string,
  password: string,
  isBusiness?: boolean,
): Promise<LoginResponse> {
  const response = await request<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!response.sessionToken) {
    throw new Error("Session token alınamadı");
  }

  return response;
}

/**
 * Kullanıcı kaydı
 */
export async function registerUser(
  payload: RegisterRequest,
): Promise<RegisterResponse> {
  const response = await request<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.sessionToken) {
    throw new Error("Session token alınamadı");
  }

  return response;
}

/**
 * Esnaf kaydı
 * Not: Backend'de şu an isBusiness flag'i yok,
 * register endpoint'i kullanılıyor. İleride ayrı endpoint eklenebilir.
 */
export async function registerVendor(
  payload: RegisterRequest,
): Promise<RegisterResponse> {
  // Şimdilik normal register kullanıyoruz
  // İleride /api/auth/register-vendor endpoint'i eklenebilir
  return registerUser(payload);
}

/**
 * Mevcut kullanıcı bilgilerini al
 */
export async function getMe(authToken: string): Promise<{ user: User }> {
  return request<{ user: User }>("/api/auth/me", {
    method: "GET",
    authToken,
  });
}

/**
 * OTP gönder
 */
export async function sendOtp(phone: string): Promise<SendOtpResponse> {
  return request<SendOtpResponse>("/api/auth/send-otp", {
    method: "POST",
    body: JSON.stringify({ phone }),
  });
}

/**
 * OTP doğrula
 */
export async function verifyOtp(
  code: string,
  phone: string,
): Promise<VerifyOtpResponse> {
  const response = await request<VerifyOtpResponse>("/api/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ code, phone }),
  });

  return response;
}
