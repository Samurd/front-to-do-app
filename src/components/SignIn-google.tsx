import { api_url } from "@/constants/api";
import { Button } from "./ui/button";

export function SignInGoogle() {
  return (
    <Button variant={"secondary"} className={"w-full"}>
      <a
      className="w-full"
      href={api_url + "/api/auth/google/login"}
    >
      Continue with Google
    </a>
    </Button>
  );
}
