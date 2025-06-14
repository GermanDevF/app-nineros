import Header from "@/components/header";
import Navigation from "@/components/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <Navigation />
      <main className="px-3 lg:px-14 ">{children}</main>
    </>
  );
}
