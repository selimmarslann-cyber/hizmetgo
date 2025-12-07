/**
 * Auth API Client
 *
 * Authentication ile ilgili tüm API çağrıları bu dosyada toplanmıştır.
 */

import { fetchJson } from "./client";
import type { User } from "../types/domain";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
}

export interface RegisterResponse {
  user: User;
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
}

/**
 * Email/password ile giriş yap
 */
export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  return fetchJson<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

/**
 * Çıkış yap
 */
export async function logout(): Promise<void> {
  await fetchJson("/auth/logout", {
    method: "POST",
  });
}

/**
 * Mevcut kullanıcı bilgilerini al
 */
export async function getMe(): Promise<{ user: User }> {
  return fetchJson<{ user: User }>("/auth/me");
}

/**
 * Yeni kullanıcı kaydı
 */
export async function register(
  payload: RegisterRequest,
): Promise<RegisterResponse> {
  return fetchJson<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/**
 * OTP gönder
 */
export async function sendOtp(phone: string): Promise<SendOtpResponse> {
  return fetchJson<SendOtpResponse>("/auth/send-otp", {
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
  return fetchJson<VerifyOtpResponse>("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ code, phone }),
  });
}
