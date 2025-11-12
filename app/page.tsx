import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-center space-y-6 ">
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
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400  mx-auto">
          We're working on something amazing. Stay tuned!
        </p>
      </div>
    </div>
  );
}
