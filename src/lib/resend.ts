import { Resend } from "resend";

let resendClient: Resend | null = null;
let warnedMissingKey = false;

function resolveResendApiKey() {
  return (
    (typeof process !== "undefined" && process.env?.RESEND_API_KEY) ||
    (typeof process !== "undefined" && process.env?.VITE_RESEND_API_KEY) ||
    import.meta.env.RESEND_API_KEY ||
    import.meta.env.VITE_RESEND_API_KEY
  );
}

export function getResendClient() {
  if (resendClient) {
    return resendClient;
  }

  const apiKey = resolveResendApiKey();
  if (!apiKey) {
    if (!warnedMissingKey) {
      console.warn("Resend API key missing; emails will be skipped.");
      warnedMissingKey = true;
    }
    return null;
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}
