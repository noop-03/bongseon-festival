import * as Sentry from "@sentry/nextjs";

// Only initialize Sentry on server when DSN is provided
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 0.2,
  });
}
