import MapEmbed from '@/components/ui/MapEmbed';

export default function MapPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="w-full px-4">
        <MapEmbed />
      </div>
    </div>
  );
}

