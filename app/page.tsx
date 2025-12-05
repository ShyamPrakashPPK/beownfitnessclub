import VideoBanner from '@/components/home/VideoBanner';
import About from '@/components/home/About';

export default function Home() {
  return (
    <div className="bg-black font-sans min-h-screen">

      {/* Video Banner Section */}
      <section className="w-full">
        <VideoBanner />
      </section>

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-100 mb-6">
            Contact Us
          </h2>
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed">
            Get in touch with us for more information.
          </p>
        </div>
      </section>
    </div>
  );
}
