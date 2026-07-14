import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import MessageSection from "@/components/MessageSection";
import SectionDivider from "@/components/SectionDivider";
import FinalScene from "@/components/FinalScene";
import { getGalleryImages, splitHeroAndGallery } from "@/lib/images";

export default function Home() {
  const images = getGalleryImages();
  const { hero, gallery } = splitHeroAndGallery(images);

  return (
    <main className="relative flex flex-1 flex-col">
      <Hero heroImage={hero} />

      <SectionDivider />
      <Gallery images={gallery} />

      <SectionDivider />
      <MessageSection
        id="for-you"
        eyebrow="Слова від щирого серця"
        title="Я хочу сказати тобі"
        greeting="Бусяя."
        paragraphs={[
          "Мабуть, ти навіть не уявляєш, наскільки сильно я тебе кохаю.",
          "Ти робиш моє життя щасливішим.",
          "Твоя посмішка — моя улюблена.",
          "Коли добре тобі — добре й мені.",
          "Ти мій спокій, підтримка, натхнення і найкраще, що сталося у моєму житті.",
        ]}
      />

      <SectionDivider />
      <MessageSection
        id="together"
        eyebrow="Наш шлях"
        title="Ми пройшли багато"
        paragraphs={[
          "Так, між нами були складні моменти, образи та непорозуміння.",
          "Але попри все я жодного разу не перестав тебе кохати.",
          "Усі труднощі зробили нас сильнішими.",
          "І я вдячний долі, що ми залишилися разом.",
        ]}
      />

      <SectionDivider />
      <MessageSection
        id="wishes"
        eyebrow="Мої побажання"
        title="Що я хочу побажати тобі"
        paragraphs={[
          "Я хочу, щоб ти завжди усміхалася, вірила у себе, здійснила всі свої мрії та була найщасливішою.",
          "А я хочу бути поруч із тобою ще дуже-дуже довго.",
        ]}
      />

      <FinalScene />
    </main>
  );
}
