import Image from "next/image";
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center space-y-4 pt-16">
            <h1 className="text-3xl font-bold text-[#2e2a47]">Welcome back!</h1>
            <p className="text-base text-[#7e8ca0]">
              Login to your account to continue.
            </p>
          </div>
          <div className="mt-8 place-items-center justify-center">
            <ClerkLoaded>
              <SignUp path="/sign-up" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="animate-spin" />
            </ClerkLoading>
          </div>
        </div>
      </div>
      <div className="h-full bg-primary hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" alt="Logo" width={100} height={100} />
      </div>
    </div>
  );
}
