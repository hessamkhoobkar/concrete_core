import Image from "next/image";

import { serverClient } from "@/lib/supabase/server";

import ProfileDropdown from "@/components/header/ProfileDropdown";
import Notifications from "@/components/header/Notifications";

export default async function Header() {
  const supabase = serverClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: profile,
    error,
    status,
  } = await supabase
    .from("profiles")
    .select(`full_name, username, avatar_url`)
    .eq("id", user?.id)
    .single();

  return (
    <div className="flex justify-between p-4">
      <div className="relative h-10 w-[118px]">
        <Image src="/logo.png" alt="concrete core logo" fill={true} />
      </div>
      <div className="flex gap-2">
        <Notifications />
        <div className="bg-concrete-600 h-full w-px"></div>
        <ProfileDropdown
          avatar_url={profile?.avatar_url}
          full_name={profile?.full_name}
          email={user?.email!}
        />
      </div>
    </div>
  );
}
