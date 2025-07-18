import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import { Filters } from "@/components/filters";
import HeaderLogo from "@/components/header-logo";
import Navigation from "@/components/navigation";
import WelcomeMsg from "@/components/welcome-msg";

export default function Header() {
  return (
    <header className="bg-gradient-to-b from-primary to-primary/80 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton afterSwitchSessionUrl="/" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="w-4 h-4 animate-spin" />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
        <Filters />
      </div>
    </header>
  );
}
