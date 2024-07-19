import Link from "next/link";
import { CredentialsForm } from "./components/CreadentialsForm";
import { SignInGoogle } from "@/components/SignIn-google";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mx-auto max-w-lg space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-muted-foreground">
            Create your account to get started.
          </p>
        </div>
        <CredentialsForm />

        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline" prefetch={false}>
            Log in
          </Link>
        </div>

        <SignInGoogle />
      </div>
    </main>
  );
}
