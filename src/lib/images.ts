import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

export interface GalleryImage {
  src: string;
  name: string;
}

/** Reads every image in /public/images at request time so new photos show up without code changes. */
export function getGalleryImages(): GalleryImage[] {
  const imagesDir = path.join(process.cwd(), "public", "images");

  let files: string[] = [];
  try {
    files = fs.readdirSync(imagesDir);
  } catch {
    return [];
  }

  return files
    .filter((file) => IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "uk"))
    .map((file) => ({
      src: `/images/${file}`,
      name: path.parse(file).name,
    }));
}

/** Picks the hero photo: a file named "hero.*" if present, otherwise the first image. */
export function splitHeroAndGallery(images: GalleryImage[]) {
  const heroIndex = images.findIndex((img) =>
    img.name.toLowerCase().startsWith("hero")
  );

  if (heroIndex === -1) {
    const [hero, ...rest] = images;
    return { hero: hero ?? null, gallery: rest };
  }

  const hero = images[heroIndex];
  const gallery = images.filter((_, i) => i !== heroIndex);
  return { hero, gallery };
}
