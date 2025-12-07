import Image from "next/image";

export default function HeroAfterImage() {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mt-12 md:mt-16 mb-16 md:mb-20">
      <div className="relative overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/35049145/pexels-photo-35049145.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Hizmet sağlayıcı"
          width={1800}
          height={360}
          className="w-full h-[220px] md:h-[360px] object-cover"
          unoptimized
        />

        {/* Üst yumuşak dalgalı kesik */}
        <div className="absolute top-0 left-0 right-0 h-16 md:h-24 lg:h-32 overflow-hidden pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            fill="white"
          >
            <path d="M0,120 C360,60 720,80 1080,50 C1260,35 1380,45 1440,40 L1440,120 L0,120 Z" />
          </svg>
        </div>

        {/* Alt yumuşak dalgalı kesik */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 lg:h-32 overflow-hidden pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            fill="white"
          >
            <path d="M0,0 C360,60 720,40 1080,70 C1260,85 1380,75 1440,80 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
