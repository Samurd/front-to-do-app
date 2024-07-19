import { Button } from "./ui/button";

export function SignInGoogle() {
  return (
    <Button variant={"secondary"} className={"w-full"}>
      <a
      className="w-full"
      href="http://localhost:3000/api/auth/google/login"
    >
      Continue with Google
    </a>
    </Button>
  );
}
