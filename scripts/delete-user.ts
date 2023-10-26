import { prisma } from "@/lib/prisma";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.SUPABASE_ADMIN_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const id = process.argv[2];
  if (!id) {
    console.log("Usage: scripts/delete-user.ts <id>");
    return;
  }

  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
    console.log("User deleted from Prisma");
  } catch (error) {
    console.error(error);
  }

  try {
    const result = await supabase.auth.admin.deleteUser(id);

    console.log("[SUPABASE]", result);

    console.log("User deleted from Supabase");
  } catch (error) {
    console.error(error);
  }
}

main();
