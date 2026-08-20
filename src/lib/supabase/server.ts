import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return a minimal mock client so the app can run locally without Supabase.
    // Methods mirror the chainable supabase client shape used in the app
    const makeChainable = () => {
      const ctx: { head?: boolean } = {};
      const api: any = {
        select(_cols?: any, options?: any) {
          if (options && options.head) ctx.head = true;
          return api;
        },
        order() { return api; },
        eq() { return api; },
        limit() { return api; },
        then(resolve: any) {
          if (ctx.head) resolve({ count: 0 });
          else resolve({ data: [] });
          return Promise.resolve();
        },
      };
      return api;
    };

    return {
      from() {
        return makeChainable();
      },
    } as any;
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component — ignore cookie mutations
        }
      },
    },
  });
}
