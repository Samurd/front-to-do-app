import React from "react";
import Link from "next/link";
import useAuthServer from "@/hooks/useUser-server";
import { Button } from "./ui/button";
import { DropMenu } from "./DropMenu";

export async function Navbar() {
  const { user } = await useAuthServer();

  if (user) {
    return (
      <nav className="flex items-center justify-center w-full p-3">
        <ul className="flex gap-5 justify-end items-center w-full">
          <ul className="flex gap-4 font-medium">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
                <Link href={"/todos"}>To Dos</Link>
            </li>
          </ul>
          <DropMenu user={user} />
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="flex gap-3 items-center justify-end w-full p-3">
        <Link href="/">Home</Link>
        <Button>
          <Link href="/login">Log in</Link>
        </Button>
      </nav>
    );
  }
}

export default Navbar;
