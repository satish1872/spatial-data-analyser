// Import the server-side Supabase client creation utility
import { createClient } from "@/utils/supabase/server";

export default async function handler(req, res) {
  const supabase = createClient({ req });

  if (req.method === "POST") {
    const { user } = await supabase.auth.api.getUserByCookie(req);

    console.log("user_id=", user.id);

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { shape_data } = req.body;
    const { data, error } = await supabase.from("shapes").upsert(
      {
        user_id: user.id,
        shape_data: shape_data,
      },
      {
        returning: "representation", // Returns the created or updated row
      }
    );

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
