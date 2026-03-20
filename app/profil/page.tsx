import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <ProfileForm
      name={user.name}
      email={user.email}
      role={user.role}
      profileImageUrl={user.profile_image_url}
    />
  );
}
