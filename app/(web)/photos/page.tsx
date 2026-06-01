import type { Metadata } from "next";
import { getManifest } from "@/config/photos";
import { PhotoGallery } from "@/features/photos/photo-gallery";

export const metadata: Metadata = {
  title: "Photos",
  description: "A collection of photographs by Leo Constantin.",
};

export default async function BlogPage() {
  const manifest = await getManifest();
  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="mx-auto max-w-450 px-3 sm:px-4 md:px-6">
        {manifest.photos.length === 0 ? (
          <div className="flex items-center justify-center py-32">
            <p className="font-mono text-muted-foreground text-sm">
              No photos yet.
            </p>
          </div>
        ) : (
          <PhotoGallery photos={manifest.photos} />
        )}
      </div>
    </main>
  );
}
