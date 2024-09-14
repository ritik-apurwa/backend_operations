import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/_workspace/hooks/use-toast";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import CustomFormInput from "@/_workspace/providers/form-components/custom-form-input";
import { TriangleAlert } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { cn } from "@/_workspace/lib/utils";
import {
  SignInSchema,
  SignInSchemaType,
  SignUpSchema,
  SignUpSchemaType,
} from "@/types/auth-form-types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const SignUpform = () => {
  const { signIn } = useAuthActions();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      role: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onPasswordSignIn = (values: SignUpSchemaType) => {
    setPending(true);

    signIn("password", {
      email: values.email,
      password: values.password,
      name: values.name,
      flow: "signUp",
    })
      .then(() => {
        toast({
          title: "Success",
          description: `Successfully Signed Up User`,
        });
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        toast({
          title: "Error",
          description: "your are not signed in sign up first",
          variant: "destructive",
        });
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onPasswordSignIn)}
        className=" flex flex-col"
      >
        <CustomFormInput
          control={form.control}
          label="Enter Your Name Here"
          disabled={pending}
          name="name"
          placeholder="Enter your name here"
        />

        <CustomFormInput
          control={form.control}
          name="email"
          label="Email"
          disabled={pending}
          placeholder="Enter Your Email"
        />
        <CustomFormInput
          control={form.control}
          label="Password"
          name="password"
          disabled={pending}
          placeholder="Enter Your Password"
        />

        <CustomFormInput
          control={form.control}
          label="Confirm Password"
          name="confirmPassword"
          disabled={pending}
          placeholder="Confirm Your Password"
        />

        {!!error && (
          <div>
            <TriangleAlert /> {error}
          </div>
        )}

        <Button type="submit" className="w-full my-4" disabled={pending}>
          {pending ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export const SignInForm = () => {
  const { signIn } = useAuthActions();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onPasswordSignIn = (values: SignInSchemaType) => {
    setPending(true);

    signIn("password", {
      email: values.email,
      password: values.password,
      flow: "signIn",
    })
      .then(() => {
        toast({
          title: "Success",
          description: `Successfully Signed Up User`,
        });
        navigate("/");
      })
      .catch((error) => {
        setError("Envalid Email or Password");
        toast({
          title: "Error",
          description: "your are not signed in sign up first",
          variant: "destructive",
        });
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onPasswordSignIn)}
        className=" flex flex-col"
      >
        <CustomFormInput
          control={form.control}
          name="email"
          label="Email"
          disabled={pending}
          placeholder="Enter Your Email"
        />
        <CustomFormInput
          control={form.control}
          label="Password"
          name="password"
          disabled={pending}
          placeholder="Enter Your Password"
        />

        {!!error && (
          <div className="flex items-center justify-center rounded-md flex-row space-x-4 bg-red-500/30 p-2 my-4">
            <TriangleAlert className="mr-2 size-5" /> {error}
          </div>
        )}

        <Button type="submit" className="w-full my-4" disabled={pending}>
          {pending ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export const AuthForms = () => {
  const [pending, setPending] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { signIn } = useAuthActions();
  const { toast } = useToast();
  const [authType, setAuthType] = useState<"signUp" | "signIn">("signIn");

  const registerWithProvider = (doWith: "google" | "github") => {
    setPending(true);
    signIn(doWith)
      .then(() => {
        toast({
          title: "Success",
          description: `Successfully Signed Up User`,
        });
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        toast({
          title: "Error",
          description: "your are not signed in sign up first",
          variant: "destructive",
        });
      })
      .finally(() => {
        setPending(false);
      });
  };

  const changeAuthType = () => {
    setAuthType((prev) => (prev === "signUp" ? "signIn" : "signUp"));
  };

  return (
    <section className="h-screen flex justify-center items-center ">
      <Card className="max-w-md mx-auto  w-full ">
        <CardHeader>
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="">
          <div>
            {authType === "signUp" ? (
              <>
                <SignUpform />
              </>
            ) : (
              <>
                <SignInForm />
              </>
            )}
          </div>
          <div className="space-y-4">
            <Button
              className="w-full flex justify-between"
              variant="outline"
              onClick={() => registerWithProvider("github")}
            >
              <FaGithub className="size-6 rounded-full" />
              <span className="text-black w-full">Sign in with GitHub</span>
            </Button>
            <Button
              className="flex justify-between w-full"
              variant="outline"
              onClick={() => registerWithProvider("google")}
            >
              <FaGoogle className="text-black size-4" />
              <span className="text-black w-full">Sign in with Google</span>
            </Button>
          </div>

          {!!error && (
            <div>
              <TriangleAlert /> {error}
            </div>
          )}

          <Button variant="link" onClick={changeAuthType}>
            {authType === "signUp"
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
};
