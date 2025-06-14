import Image from "next/image";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image src="/logo.svg" alt="Logo" width={28} height={28} />
        <p className="text-2xl font-semibold text-white ml-2.5">Finance</p>
      </div>
    </Link>
  );
}
