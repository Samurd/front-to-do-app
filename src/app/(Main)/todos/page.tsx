import useAuthServer from "@/hooks/useUser-server";
import { redirect } from "next/navigation";
import { TodoList } from "./components/TodoList";
import { api_url } from "@/constants/api";
import { cookies } from "next/headers";
import { Todo } from "@/interfaces/Todos/todo";

const getTodos = async (userId: string): Promise<Todo[] | null> => {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("access_token")?.value;
  const response = await fetch(api_url + `/api/todos/${userId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data;
};

export default async function TodosPage() {
  const { user, isAuthenticated } = await useAuthServer();
  if (!isAuthenticated || !user) {
    redirect("/login");
  }

  const todos = await getTodos(user.id);

  return (
    <main className="w-full flex justify-center items-center">
      <div className="flex flex-col gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
            Your To-Do List
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Stay organized and on top of your tasks.
          </p>
        </div>

        <TodoList todos={todos} />
      </div>
    </main>
  );
}
