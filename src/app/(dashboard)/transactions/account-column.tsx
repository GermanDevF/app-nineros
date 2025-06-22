import { Button } from "@/components/ui/button";
import { useOpenAccountStore } from "@/features/accounts/hooks/use-open-account";

type AccountColumnProps = {
  accountId: string;
  account: string;
};

export const AccountColumn = ({ accountId, account }: AccountColumnProps) => {
  const { onOpen: onOpenAccount } = useOpenAccountStore();

  return (
    <div className="flex items-center cursor-pointer hover:underline">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onOpenAccount(accountId)}>
        {account}
      </Button>
    </div>
  );
};
