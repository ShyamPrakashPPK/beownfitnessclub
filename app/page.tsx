import VideoBanner from '@/components/home/VideoBanner';
import About from '@/components/home/About';
import ContactForm from '@/components/home/ContactForm';

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
      <ContactForm />
    </div>
  );
}
