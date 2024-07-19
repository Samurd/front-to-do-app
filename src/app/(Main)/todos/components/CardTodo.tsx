"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Todo } from "@/interfaces/Todos/todo";
import { api_url } from "@/constants/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { pageAuth } from "@/constants/frontend";
import { cn } from "@/lib/utils";

interface Props {
  todo: Todo;
}

export function CardTodo({ todo }: Props) {
  const router = useRouter();
  const onComplete = async () => {
    const response = await fetch(api_url + "/api/todos/" + todo.id, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: !todo.isCompleted,
      }),
    });
    if (response.ok) {
      router.refresh();
      return toast.success("Todo updated");
    }

    if (response.status === 401) {
      return router.push(pageAuth);
    }
  };

  const onDelete = async () => {
    const response = await fetch(api_url + "/api/todos/" + todo.id, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      router.refresh();
      return toast.success("Todo deleted");
    }

    if (response.status === 401) {
      return router.push(pageAuth);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("text-lg", todo.isCompleted && "line-through")}>{todo.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{todo.description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between">
          {todo.isCompleted ? (
            <p className="text-muted-foreground">Completed</p>
          ) : (
            <Button onClick={onComplete} size="sm" variant="outline">
              Mark as Done
            </Button>
          )}
          <Button onClick={onDelete} size="sm" variant="ghost">
            <TrashIcon className="h-5 w-5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function TrashIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}
