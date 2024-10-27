import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Logininput } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthStore from "@/store/authStore";
import { login } from "@/service";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Logininput>({
    defaultValues: {
      username: "73312752",
      password: "73312752",
    },
  });

  const loginStore = useAuthStore((state) => state.login);

  const loginMutation = useMutation({
    mutationFn: async (data: Logininput) => {
      const response = await login(data);
      return response;
    },
    onSuccess: (data) => {
      console.log("Login successful");
      console.log(data);
      loginStore(data.accestoken);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Login failed";
      console.error("Login failed: " + message);
    },
  });

  const onSubmit: SubmitHandler<Logininput> = async (data) => {
    try {
      toast.promise(loginMutation.mutateAsync(data), {
        loading: "Loading...",
        success: (response) => {
          console.warn(response);
          navigate("/");
          return "Login successful";
        },
        error: (error) => {
          console.log(error);
          return error.response.data.message;
          // return error.response.errors[0].message;
        },
        duration: 1000,
      });
    } catch (error) {
      // const message = (error as any).response.data.message;
      console.error("Login failed: " + error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card>
        <CardHeader className="w-[350px]">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your username and password to login
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register("username", { required: "username is required" })}
              />
              {errors.username && (
                <span className="text-red-500">{errors.username.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
        {/* <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <a href="#" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter> */}
      </Card>
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            error: "bg-red-400 text-white",
            success: "bg-green-400 text-white",
            warning: "text-yellow-400",
            info: "bg-blue-400",
            loading: "bg-blue-400 text-white",
          },
        }}
      />
    </div>
  );
};

export default Login;
