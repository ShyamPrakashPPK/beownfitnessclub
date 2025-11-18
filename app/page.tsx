import Image from 'next/image';
import MapEmbed from '@/components/ui/MapEmbed';
import ScrollAnimation from '@/components/ui/ScrollAnimation';
import VideoBanner from '@/components/home/VideoBanner';

export default function Home() {
  return (
    <div className="bg-black font-sans min-h-screen">
      {/* Video Banner Section */}
      <section className="w-full">
        <VideoBanner />
      </section>

      {/* First Section - Full Screen */}
      <section className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 sm:space-y-6 max-w-4xl w-full">
          <ScrollAnimation className="fade-in-up fade-delay-1">
            <div className="flex justify-center">
              <Image
                src="/common/goldenlogo.png"
                alt="Be Own Fitness Club Logo"
                width={400}
                height={400}
                className="object-contain w-full max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] h-auto"
                priority
              />
            </div>
          </ScrollAnimation>

          <ScrollAnimation className="fade-in-up fade-delay-2">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-zinc-100 mb-4">
              Coming Soon
            </h1>
          </ScrollAnimation>

          <ScrollAnimation className="fade-in-up fade-delay-3">
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 mx-auto max-w-2xl px-4">
              We're working on something amazing. Stay tuned!
            </p>
          </ScrollAnimation>

          <ScrollAnimation className="fade-in-up fade-delay-4">
            <div className="pt-4">
              <hr className="border-t border-zinc-700 w-24 mx-auto" />
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Second Section - Map (Full Screen) */}
      <section className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="w-full max-w-7xl mx-auto flex justify-center">
          <ScrollAnimation className="fade-in w-full max-w-5xl">
            <MapEmbed />
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}
