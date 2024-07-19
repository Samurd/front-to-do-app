import { CardTodo } from "./CardTodo";
import { Todo } from "@/interfaces/Todos/todo";
import { CreateTodo } from "./dialogs/Create-Todo";

interface Props {
  todos: Todo[] | null;
}

export function TodoList({ todos }: Props) {
  return (
    <>
      {todos && todos?.length > 0 && <CreateTodo />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {todos && todos?.length > 0 ? (
          todos.map((todo) => <CardTodo key={todo.id} todo={todo} />)
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center">
            <ClipboardListIcon className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold">No Tasks Yet</h3>
            <p className="text-muted-foreground">
              You don't have any tasks added to your to-do list. Get started by
              adding a new task.
            </p>
            <CreateTodo />
          </div>
        )}
      </div>
    </>
  );
}

function ClipboardListIcon(props: any) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  );
}
