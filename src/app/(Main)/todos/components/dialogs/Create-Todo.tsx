"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Resolver, useForm } from "react-hook-form";
import { api_url } from "@/constants/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

interface FormValues {
  title: string;
  description: string | null;
}

export function CreateTodo() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
  const resolver: Resolver<FormValues> = async (values) => {
    return {
      values: values.title ? values : {},
      errors: !values.title
        ? {
            title: {
              type: "required",
              message: "This field is required",
            },
          }
        : {},
    };
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });

  const onSubmit = handleSubmit(async (data) => {
    const response = await fetch(api_url + "/api/todos", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description ?? null,
      }),
    });

    if (response.ok) {
       router.refresh();
       setOpen(false);
       return toast.success("To-Do created successfully");
    }

    const body = await response.json();
    if(response.status === 400) {
        return toast.error(body.message);
    }
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New To-Do</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-card p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create New To-Do
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter a description"
                {...register("description")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create To-Do</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
