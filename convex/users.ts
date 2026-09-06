import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { GARAGE_OWNER_EMAIL } from "./garageAuthz";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    const user = await ctx.db.get(userId);
    if (!user) return null;
    const email = typeof user.email === "string" ? user.email : null;
    return {
      _id: user._id,
      email,
      name: user.name ?? null,
      isAdmin: !!email && email.toLowerCase() === GARAGE_OWNER_EMAIL,
    };
  },
});
