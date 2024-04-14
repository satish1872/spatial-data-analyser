// pages/api/files/list.js
import { createClient } from "@/utils/supabase/server";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const supabase = createClient();
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data, error } = await supabase.storage
    .from("geo-files")
    .list(`${user.id}/`, {
      limit: 100,
      offset: 0,
      sortBy: { column: "created_at", order: "desc" },
    });

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
