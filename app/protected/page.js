import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import GeospatialPage from "../../components/geoSpatial/page.js";

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  // return redirect("/geoSpatial");
  return <GeospatialPage />;
}
