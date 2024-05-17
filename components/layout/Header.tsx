import Image from "next/image";

import { serverClient } from "@/lib/supabase/server";

import ProfileDropdown from "@/components/header/ProfileDropdown";
import Notifications from "@/components/header/Notifications";
import NavMenu from "@/components/header/NavMenu";
import Link from "next/link";
import NewItemReq from "@/components/header/NewItemList";

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
    <div
      className="h-48 w-full border-b border-border"
      style={{
        backgroundColor: "#EFF3FF",
        backgroundImage: 'url("/concrete-wall.png")',
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl justify-between p-4">
        <div className="relative h-10 w-[118px]">
          <Link href="/">
            <Image src="/logo.png" alt="concrete core logo" fill={true} />
          </Link>
        </div>
        <div className="flex gap-2">
          <NavMenu />
          {/* <NewItemReq /> */}
          {/* <Notifications /> */}
          <div className="h-full w-px bg-concrete-200"></div>
          <ProfileDropdown
            avatar_url={profile?.avatar_url}
            full_name={profile?.full_name}
            email={user?.email!}
          />
        </div>
      </div>
    </div>
  );
}
