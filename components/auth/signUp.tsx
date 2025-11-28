"use client"
import React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react"
import { signup , login } from "@/services/auth"
import { PasswordInput } from "@/components/ui/passwordInput"

export default function SignUp({ onClose }: { onClose?: () => void }) {

  // Validation for Email
  const validateEmail = (email: string) => {
    if (!email) return "Email is required";
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) return "Enter a valid email";
    return "";
  };

  // Validation for password
  const validatePassword = (password: string) => {
    if (!password) return "Password is required";

    if (password.length < 8)
      return "Password must be at least 8 characters long";

    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter (A-Z)";

    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter (a-z)";

    if (!/\d/.test(password))
      return "Password must contain at least one number (0-9)";

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return "Password must include a special character (!@#$%^&*)";

    return ""; // no error
  };

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });

  const [auth, setAuth] = React.useState<"login" | "signup">("signup");

  // Function to handle signup form submission
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget as HTMLFormElement & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    // extarcting values of form fields
    const email = target.email.value;
    const password = target.password.value;

    // Calling validation functions
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // Errors transfer to satate
    setErrors({
      email: emailError,
      password: passwordError,
    });

    // Stops submission if there are errors
    if (emailError || passwordError) return;

    // Supabase Signup Call
    const { data, error } = await signup(email, password);
    if (error) {
      console.error("Signup Error:", error.message);
      return;
    }
    console.log("Signup Successful:", data);

    // Close the modal after successful signup
    onClose && onClose();
  };

  // function to handle login form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

    const target = e.currentTarget as HTMLFormElement & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };

    // extarcting values of form fields
    const email = target.email.value;
    const password = target.password.value;

    // Calling validation functions
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    // Errors transfer to satate
    setErrors({
      email: emailError,
      password: passwordError,
    });

    // Stops submission if there are errors
    if (emailError || passwordError) return;

    // Supabase Login call
    const { data, error } = await login(email, password);
    if (error) {
      console.error("Login Error:", error.message);
      return;
    }
    console.log("Login Successful:", data);

    // Close the modal after successful signup
    onClose && onClose();
};


  if (auth == "signup") {

    return (
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-black p-4 md:rounded-2xl md:p-8 z-50 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Welcome to Fraud Detector</h2>

        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Login to catch some real fraudsters !!!
        </p>

        <form className="my-8" onSubmit={handleSignup}>

          {/* Email Field */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
            {errors.email && (
              <p className="text-red-500 text-[12px]">{errors.email}</p>
            )}
          </LabelInputContainer>


          {/* Password Field */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" />
            {errors.password && (
              <p className="text-red-500 text-[12px]">{errors.password}</p>
            )}
          </LabelInputContainer>

          {/* Submit Button */}
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <p onClick={() => setAuth("login")} className="text-blue-300 cursor-pointer text-xs my-4 hover:underline">Already have an account ? &nbsp;Log in</p>

          <div className="mt-4 mb-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="flex flex-col space-y-4">

            {/* OAuth Button for Github */}
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="submit"
              onClick={onClose}
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">GitHub</span>
              <BottomGradient />
            </button>

            {/* OAuth Button for Google */}
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="submit"
              onClick={onClose}
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Google</span>
              <BottomGradient />
            </button>

          </div>
        </form>
      </div>
    )
  }

  if (auth == "login") {

    return (
      <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-black p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">Welcome to Fraud Detector</h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Lets Resume our journey to catch some real fraudsters !!!
        </p>

        <form className="my-8" onSubmit={handleLogin}>

          {/* Email Field */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
          </LabelInputContainer>

          {/* Password Field */}
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="********" type="password" />
          </LabelInputContainer>

          {/* Submit Button */}
          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>

          <p onClick={() => setAuth("signup")} className="text-blue-300 cursor-pointer text-xs my-4 hover:underline">Don't have an account? &nbsp;Sign up</p>


          <div className="mt-4 mb-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

          <div className="flex flex-col space-y-4">
            {/* OAuth Button for Github */}
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="submit"
              onClick={onClose}
            >
              <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">GitHub</span>
              <BottomGradient />
            </button>

            {/* OAuth Button for Google */}
            <button
              className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
              type="submit"
              onClick={onClose}
            >
              <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
              <span className="text-sm text-neutral-700 dark:text-neutral-300">Google</span>
              <BottomGradient />
            </button>
          </div>

        </form>
      </div>
    )
  }
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  )
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>
}
