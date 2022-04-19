import { NodeOptions } from "@sentry/node";

const sentryConfig: NodeOptions = {
    /**
     * Specifies whether this SDK should activate and send events to Sentry.
     * Disabling the SDK reduces all overhead from instrumentation, collecting
     * breadcrumbs and capturing events. Defaults to true.
     */
    enabled: true,

    /**
     * The current environment of your application (e.g. "production").
     */
    environment: process.env.APP_ENV,

    /**
     * Sentry DSN
     */
    dsn: process.env.SENTRY_DSN || undefined,

    /**
     * A global sample rate to apply to all events (0 - 1).
     */
    // sampleRate: 0,

    /**
     * Sample rate to determine trace sampling.
     *
     * 0.0 = 0% chance of a given trace being sent (send no traces) 1.0 = 100% chance of a given trace being sent (send
     * all traces)
     *
     * Tracing is enabled if either this or `tracesSampler` is defined. If both are defined, `tracesSampleRate` is
     * ignored.
     */
    tracesSampleRate: 0.0,
};

export default sentryConfig;
