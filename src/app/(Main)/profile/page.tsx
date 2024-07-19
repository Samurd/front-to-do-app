import useAuthServer from "@/hooks/useUser-server";
import { redirect } from "next/navigation";




export default async function ProfilePage() {
  const { user }  = await useAuthServer()

  if(!user) {
    return redirect('/login')
  }

  return (
    <main>
      <h2>Profile</h2>
      {user && (
        <p>{user.email}</p>
      )}
    </main>
  );
}