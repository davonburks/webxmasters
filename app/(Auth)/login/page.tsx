"use client";
import Link from "next/link";
import { login } from "../auth/login/actions";
import { Button } from "@/lib/@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/@/components/ui/form";
import { Input } from "@/lib/@/components/ui/input";
import supabase from "@/lib/utils/supabase/client";
import { useRouter } from "next/navigation";
import GoogleAuth from "./components/googleAuth";

export default function Login() {
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().min(2, "You need to enter a valid email address").max(50),
    password: z.string().min(1, "You must enter a valid password"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: { email: string; password: string }) {
    try {
      await login(values.email, values.password);
      // Reset login error if successful
      setError("password", { type: "manual", message: "" }); // Clear previous error
    } catch (error) {
      // Use setError to display the login error under the password field
      setError("password", {
        type: "manual",
        message: "Incorrect login credentials",
      });
    }
  }
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = form;

  return (
    <div className="my-32 flex items-center justify-center">
      <div className=" mx-auto p-8 border  md:w-1/3 w-full	 rounded-lg">
        <h2 className="text-3xl mb-6 text-center font-bold">LOG IN</h2>

        <GoogleAuth />
        <hr />
        <div className="text-center  my-4">OR</div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full p-2  bg-primary-foreground hover:bg-secondary rounded"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      className="w-full p-2  bg-primary-foreground hover:bg-secondary rounded"
                      {...field}
                    />
                  </FormControl>

                  {errors.password && (
                    <FormMessage className="m-2 italict text-destructive ">
                      {errors.password.message}
                    </FormMessage>
                  )}
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="outline"
              className=" flex bg-secondary-color items-center p-8 w-full  rounded hover:bg-accent-color"
            >
              LOG IN
            </Button>
          </form>
        </Form>

        <div className="text-center text-gray-400 mt-6 ">
          <Link href="/forgotpassword" className="hover:underline">
            FORGOT YOUR PASSWORD?
          </Link>
        </div>
        <div className="text-center  mt-6">
          NOT A MEMBER?{" "}
          <Link href="/signup" className=" hover:underline">
            REGISTER HERE
          </Link>
        </div>
      </div>
    </div>
  );
}
