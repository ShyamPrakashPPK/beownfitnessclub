import Image from 'next/image';
import MapEmbed from '@/components/ui/MapEmbed';

export default function Home() {
  return (
    <div className="bg-zinc-50 font-sans dark:bg-black">
      {/* First Section - Full Screen */}
      <section className="flex min-h-screen items-center justify-center">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Image
              src="/common/goldenlogo.png"
              alt="Be Own Fitness Club Logo"
              width={400}
              height={400}
              className="object-contain"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Coming Soon
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mx-auto">
            We're working on something amazing. Stay tuned!
          </p>
          <div className="pt-4">
            <hr className="border-t border-zinc-300 dark:border-zinc-700 w-24 mx-auto" />
          </div>
        </div>
      </section>

      {/* Second Section - Map (Full Screen) */}
      <section className="flex min-h-screen items-center justify-center">
        <div className="w-[50%] px-4">
          <MapEmbed />
        </div>
      </section>
    </div>
  );
}
