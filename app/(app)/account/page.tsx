import AccountForm from "./account-form";
import { serverClient } from "@/lib/supabase/server";

export default async function Account() {
  const supabase = serverClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user} />;
}
