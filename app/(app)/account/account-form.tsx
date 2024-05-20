"use client";

import { useCallback, useEffect, useState } from "react";
import { browserClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = browserClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [phone_number, setPhoneNumber] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, phone_number, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setPhoneNumber(data.phone_number);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    phone_number,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    avatar_url: string | null;
    phone_number: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        avatar_url,
        phone_number,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 pt-24">
      <div className="flex w-full gap-4">
        <Label
          className="w-60 text-base font-medium text-concrete-400"
          htmlFor="email"
        >
          Email:
        </Label>
        <Input
          id="email"
          name="email"
          type="text"
          value={user?.email}
          disabled
        />
      </div>
      <div className="flex w-full gap-4">
        <Label
          className="w-60 text-base font-medium text-concrete-400"
          htmlFor="fullName"
        >
          Full Name:
        </Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>

      <div className="flex w-full gap-4">
        <Label
          className="w-60 text-base font-medium text-concrete-400"
          htmlFor="username"
        >
          Username:
        </Label>
        <Input
          id="username"
          name="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="flex w-full gap-4">
        <Label
          className="w-60 text-base font-medium text-concrete-400"
          htmlFor="phoneNumber"
        >
          Phone number:
        </Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          value={phone_number || ""}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>

      <div className="my-12 h-px border border-border"></div>

      <div className="flex flex-row-reverse items-start justify-start gap-4">
        <Button
          variant="default"
          className="w-64"
          onClick={() =>
            updateProfile({ fullname, username, phone_number, avatar_url })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>
        <form action="/auth/signout" method="post">
          <Button variant="outline" className="w-64" type="submit">
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
