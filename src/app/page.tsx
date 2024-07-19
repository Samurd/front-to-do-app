import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import useAuthServer from "@/hooks/useUser-server";
import Link from "next/link";

export default async function Home() {
  const { user } = await useAuthServer();
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen justify-center">
        <section className="bg-primary text-primary-foreground w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6 text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-bold">
              Organize Your Life with Acme To-Do App
            </h1>
            <p className="text-lg md:text-xl">
              Stay on top of your tasks and boost your productivity with our
              powerful to-do app.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                className="h-10 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                href={user ? "/todos" : "/login"}
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
