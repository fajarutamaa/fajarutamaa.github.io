import { Facebook, Github, Instagram, Linkedin, Rss } from "lucide-react";
import Image from "next/image";
import { promises as fs } from "fs";
import Link from "next/link";

type Reader = {
  name: string;
  description: string;
  website: string;
  logo: string;
  stack?: string[];
  thumbnail: string;
  year: string;
};

export default async function Home() {
  const file = await fs.readFile(
    process.cwd() + "/data/bookmarks.json",
    "utf-8"
  );
  const readers: Reader[] = JSON.parse(file);

  return (
    <main className="container max-w-[680px] leading-relaxed antialiased pb-20">
      <div className="flex items-center space-x-4">
        <img
          src="/img/avatar.webp"
          alt="Avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <Link href="/" className="font-medium">
            Fajar Dwi Utomo
          </Link>
          <p className="opacity-70 font-medium">Junior Software Engineer 👋</p>
        </div>
      </div>
      <p className="mt-6 text-foreground/70">
        I'm a junior software engineer passionate about building things people
        love. Currently learning and working on{" "}
        <Link
          href="https://gps.id"
          className="hover:text-[#1da1f2]"
          target="_blank"
        >
          GPS.id
        </Link>
        .
      </p>

      <p className="font-medium mt-10">Bookmarks</p>
      <div className="mt-10 grid md:grid-cols-2 gap-8">
        {readers.map((reader: Reader, index: number) => (
          <Link
            href={reader.website}
            key={reader.name}
            className={`relative hover:bg-foreground/5 hover:border-foreground/10 border border-foreground/0 rounded-lg -m-3 p-3 transition-colors duration-200 animate-fadeIn`}
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: "both",
            }}
          >
            <Image
              src={reader.thumbnail}
              alt={reader.name}
              width={400}
              height={300}
              className="aspect-[16/9] object-cover rounded-lg border border-foreground/5 shadow-sm w-full min-h-[200px] min-w-full transition-transform duration-300 hover:scale-105"
            />
            <div className="mt-4 flex flex-row items-start justify-between w-full">
              <p>{reader.name}</p>
              <p className="text-xs opacity-50">{reader.year}</p>
            </div>
            <h2 className="opacity-70">{reader.description}</h2>
            <h2 className="opacity-70 flex flex-row flex-wrap gap-1.5 text-xs mt-2 font-medium">
              {reader.stack?.map((e) => (
                <span key={e} className="px-2 py-1 rounded-lg bg-foreground/5">
                  {e}
                </span>
              ))}
            </h2>
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center mt-20">
        <h2 className="font-medium text-sm">connect with me</h2>
        <div className="flex gap-6 mt-4">
          <Link
            href="https://github.com/fajarutamaa"
            target="_blank"
            className="transition-transform transform hover:scale-110"
          >
            <Github size={20} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/fajardwiutomo/"
            target="_blank"
            className="transition-transform transform hover:scale-110"
          >
            <Linkedin size={20} />
          </Link>
          <Link
            href="https://www.instagram.com/fajar.utamaa/"
            target="_blank"
            className="transition-transform transform hover:scale-110"
          >
            <Instagram size={20} />
          </Link>
          <Link
            href="https://medium.com/@fajardwiutomo"
            target="_blank"
            className="transition-transform transform hover:scale-110"
          >
            <Rss size={20} />
          </Link>
        </div>
      </div>
    </main>
  );
}
