import { SignInGoogle } from "@/components/SignIn-google";
import { CredentialsFormLogin } from "./components/CredentialsForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="mx-auto max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <Link href={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.2em"
              height="1.2em"
              viewBox="0 0 15 15"
            >
              <path
                fill="currentColor"
                d="M7.825.12a.5.5 0 0 0-.65 0L0 6.27v7.23A1.5 1.5 0 0 0 1.5 15h4a.5.5 0 0 0 .5-.5v-3a1.5 1.5 0 0 1 3 0v3a.5.5 0 0 0 .5.5h4a1.5 1.5 0 0 0 1.5-1.5V6.27z"
              />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-muted-foreground">
            Enter your email and password to access your account.
          </p>
        </div>
        <CredentialsFormLogin />
        <div className="flex items-center justify-between">
          <Link
            href="/register"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Register
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Forgot password?
          </Link>
        </div>
        <SignInGoogle />
      </div>
    </main>
  );
}
