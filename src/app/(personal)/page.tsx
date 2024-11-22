import Link from "next/link";
export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="container max-w[680px] leading-relaxed antialiased pb-20">
      <Link href="/" className="font-medium">
        Fajar Dwi Utomo
      </Link>
      <p className="opacity-70 font-medium">Junior Software Engineer</p>
      <p className="mt-6 text-foreground/70">
      Software engineer passionate about building things people love. Currently learning and working on {" "}
        <Link href="https://gps.id" className="hover:text-[#1da1f2]" target="_blank">GPS.id</Link>
      </p>
    </main>
  );
}
