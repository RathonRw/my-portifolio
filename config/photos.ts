import type { Photo, PhotoManifest } from "@/types";

export const photos: Photo[] = Array.from({ length: 20 }, (_, i) =>
  generateRandomPhoto(String(i + 1))
);

export function generateRandomPhoto(id: string): Photo {
  return {
    id,
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/1200/800`,
    width: 1200,
    height: 800,
    uploadedAt: new Date().toISOString(),
    metadata: {
      camera: ["Sony A7 IV", "Canon R5", "Fujifilm X-T5"][
        Math.floor(Math.random() * 3)
      ],
      aperture: ["f/1.8", "f/2.8", "f/4"][Math.floor(Math.random() * 3)],
      focalLength: ["24mm", "35mm", "50mm"][Math.floor(Math.random() * 3)],
      shutterSpeed: ["1/125s", "1/250s", "1/500s"][
        Math.floor(Math.random() * 3)
      ],
      iso: [100, 200, 400, 800][Math.floor(Math.random() * 4)],
      location: ["Kigali", "Lake Kivu", "Musanze"][
        Math.floor(Math.random() * 3)
      ],
    },
  };
}

export function getManifest(): PhotoManifest {
  return { photos };
}
