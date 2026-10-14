import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const subInput = z.object({
  endpoint: z.string().min(8).max(2000),
  keys: z.object({
    p256dh: z.string().min(1).max(255),
    auth: z.string().min(1).max(255),
  }),
});

export const getPushPublicKey = createServerFn({ method: "GET" }).handler(async () => {
  const { publicPushKey } = await import("./push-send");
  return publicPushKey();
});

export const savePushSubscription = createServerFn({ method: "POST" })
  .validator(subInput)
  .handler(async ({ data }) => {
    const { saveSub } = await import("./push-send");
    return saveSub(data);
  });

export const removePushSubscription = createServerFn({ method: "POST" })
  .validator(z.object({ endpoint: z.string().min(8).max(2000) }))
  .handler(async ({ data }) => {
    const { removeSub } = await import("./push-send");
    return removeSub(data.endpoint);
  });

export const runDueAlerts = createServerFn({ method: "POST" })
  .validator(z.object({ force: z.boolean().optional() }))
  .handler(async ({ data }) => {
    const { dispatchAlerts } = await import("./push-send");
    return dispatchAlerts(Boolean(data.force));
  });
