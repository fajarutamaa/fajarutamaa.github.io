import Image from "next/image";
import Link from "next/link";

const readers = [
  {
    name: "Google Style Guides",
    description: "Style guides for Google-originated open-source projects",
    website: "https://google.github.io/styleguide/",
    logo: "/google.png",
    stack: ["google", "Open-source"],
    thumbnail: "/img/thumbnail-google.png",
    year: "2024",
  },
];

export const dynamic = "force-static";

export default function Home() {
  return (
    <main className="container max-w-[680px] leading-relaxed antialiased pb-20">
      <Link href="/" className="font-medium">
        Fajar Dwi Utomo
      </Link>
      <p className="opacity-70 font-medium">Junior Software Engineer 👋</p>
      <p className="mt-6 text-foreground/70">
        I'am a junior software engineer passionate about building things people
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

      <p className="font-medium mt-20">Bookmark</p>
      <div className="mt-10 grid md:grid-cols-2 gap-8">
        {readers.map((reader) => (
          <Link
            href={reader.website}
            key={reader.name}
            className="relative hover:bg-foreground/5 hover:border-foreground/10 border border-foreground/0 rounded-lg -m-3 p-3 transition-colors duration-100"
          >
            <Image
              src={reader.thumbnail}
              alt={reader.name}
              width={400}
              height={300}
              className="aspect-[16/9] object-cover rounded-lg border border-foreground/5 shadow-sm w-full min-h-[200px] min-w-full"
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
    </main>
  );
}
