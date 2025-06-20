"use client";
import { Button } from "@/components/ui/button";
import { useNewAccountStore } from "@/features/accounts/hooks/use-new-accout";

export default function Dashboard() {
  const { onOpen } = useNewAccountStore();

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={onOpen}>New Account</Button>
    </div>
  );
}
