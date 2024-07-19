"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/interfaces/user/user";
import { api_url } from "@/constants/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { pageHome } from "@/constants/frontend";

interface Props {
  user: User;
}

export function DropMenu({ user }: Props) {
  const router = useRouter();
  const onLogout = async () => {
    const response = await fetch(api_url + "/api/auth/logout", {
      method: "GET",
      credentials: "include",
    });

    if (response.ok) {
      router.refresh();
      return toast.success("Logged out successfully");
    }

    return;
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage width={10} height={10} src={user.img as string} />
          <AvatarFallback>{user.username.split("").at(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>Sign out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
