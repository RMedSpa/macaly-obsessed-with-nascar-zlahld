import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const GARAGE_OWNER_EMAIL = "rmedspa@icloud.com";

export const isAdmin = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return false;
    const user = await ctx.db.get(userId);
    const email = user && typeof user.email === "string" ? user.email : "";
    return email.toLowerCase() === GARAGE_OWNER_EMAIL;
  },
});
