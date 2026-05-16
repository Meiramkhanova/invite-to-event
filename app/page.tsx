"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Heart, Sparkles, ExternalLink } from "lucide-react";

import { AudioPlayer } from "@/components/audio-player";
import { RSVPBottomBar } from "@/components/rsvp-bottom-bar";
import {
  InteractiveFlower,
  FloralDecoration,
} from "@/components/interactive-flower";

// Wedding details configuration
const WEDDING_CONFIG = {
  date: new Date("2025-10-11T17:00:00"),
  groom: "Бекзат",
  bride: "Гүлсая",
  groomParents: "Молдахан & Жамал",
  venue: "ЖҰЛДЫЗ",
  address: "ЖАНСҮГҮРОВА 112 А",
  city: "Алматы облысы Өтеген батыр ауылы",
};

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  } as const,
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  } as const,
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
} as const;

export default function WeddingInvitation() {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showRSVPBar, setShowRSVPBar] = useState(false);

  // Countdown timer
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const distance = WEDDING_CONFIG.date.getTime() - now;

      if (distance > 0) {
        setCountdown({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    calculateCountdown();
    const timer = setInterval(calculateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Show RSVP bar after scrolling 30% of viewport
  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.3;
      setShowRSVPBar(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-background overflow-x-hidden pb-48 italic font-serif">
      <AudioPlayer />

      {/* Hero Section */}
      <HeroSection config={WEDDING_CONFIG} />

      {/* Invitation Text */}
      <InvitationSection config={WEDDING_CONFIG} />

      {/* Photo Section */}
      <PhotoSection />

      {/* Parents Section */}
      <ParentsSection parents={WEDDING_CONFIG.groomParents} />

      {/* Date Section */}
      <DateSection />

      {/* Calendar Section */}
      <CalendarSection />

      {/* Countdown Section */}
      <CountdownSection countdown={countdown} />

      {/* Location Section */}
      <LocationSection config={WEDDING_CONFIG} />

      {/* Footer */}
      <FooterSection config={WEDDING_CONFIG} />

      {/* Fixed RSVP Bar */}
      <RSVPBottomBar isVisible={showRSVPBar} />
    </main>
  );
}

// Hero Section Component
function HeroSection({ config }: { config: typeof WEDDING_CONFIG }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 py-20 font-serif">
      <FloralDecoration position="top-left" />
      <FloralDecoration position="top-right" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="text-center max-w-lg mx-auto">
        <motion.div variants={fadeInUp} className="mb-6">
          <Heart className="w-8 h-8 mx-auto text-accent animate-pulse" />
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="text-muted-foreground uppercase tracking-[0.3em] text-sm mb-4">
          Той шақыруы
        </motion.p>

        <motion.div variants={fadeInUp} className="mb-8">
          <h1 className="font-serif text-5xl md:text-7xl text-foreground leading-tight">
            <span className="block italic">{config.groom}</span>
            <span className="text-2xl md:text-3xl text-muted-foreground my-2 block">
              &
            </span>
            <span className="block italic">{config.bride}</span>
          </h1>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          className="space-y-2 text-foreground/80">
          <p className="uppercase tracking-widest text-sm">Үйлену тойына</p>
          <p className="uppercase tracking-widest text-sm">Шақырамыз</p>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-12">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground">
            <Sparkles className="w-5 h-5 mx-auto" />
          </motion.div>
        </motion.div>
      </motion.div>

      <InteractiveFlower className="absolute bottom-20 right-4 w-24 md:w-32" />
    </section>
  );
}

// Invitation Text Section
function InvitationSection({ config }: { config: typeof WEDDING_CONFIG }) {
  return (
    <section className="py-20 px-4 bg-card italic font-serif">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-2xl mx-auto text-center">
        <motion.h2
          variants={fadeInUp}
          className="font-serif text-3xl md:text-4xl italic text-foreground mb-8">
          Құрметті қонақтар!
        </motion.h2>

        <motion.div
          variants={fadeInUp}
          className="space-y-4 text-foreground/80 leading-relaxed">
          <p className="uppercase tracking-wide text-sm italic">
            Құрметті ағайын-туыс, бауырлар, құда-жекжат, нағашы-жиен, бөлелер,
            құрбы-құрдас, апке-жезделер, дос-жарандар, әріптестер, көршілер!
          </p>
          <p className="text-lg mt-6">Сіз(дер)ді ұлымыз</p>
          <p className="font-serif text-4xl md:text-5xl italic text-foreground my-4">
            {config.groom}
          </p>
          <p className="text-lg">пен келініміз</p>
          <p className="font-serif text-4xl md:text-5xl italic text-foreground my-4">
            {config.bride}ның
          </p>
          <p className="uppercase tracking-wide text-sm mt-6">
            Үйлену тойына арналған салтанатты ақ дастарханымыздың қадірлі қонағы
            болуға шақырамыз.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Photo Section
function PhotoSection() {
  return (
    <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-card via-transparent to-background z-10" />
      <img
        src="https://img.freepik.com/premium-photo/elegant-black-white-wedding-photo-background-minimalist-design_1287624-51742.jpg"
        alt="Wedding rings"
        className="w-full h-full object-cover object-center grayscale"
      />
      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent z-10" />
    </section>
  );
}

// Parents Section
function ParentsSection({ parents }: { parents: string }) {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-lg mx-auto">
        <motion.div
          variants={fadeInUp}
          className="bg-card rounded-3xl p-8 text-center border border-gray-100 shadow">
          <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-xl">ⓘ</span>
          </div>
          <p className="uppercase tracking-[0.2em] text-muted-foreground text-sm mb-4">
            Той иелері
          </p>
          <h3 className="font-serif text-2xl md:text-3xl text-foreground">
            {parents}
          </h3>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Date Section
function DateSection() {
  return (
    <section className="py-20 px-4 bg-card font-serif">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-lg mx-auto">
        <motion.div
          variants={fadeInUp}
          className="bg-background rounded-3xl p-8 text-center border border-gray-100 shadow">
          <div className="w-12 h-12 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-foreground" />
          </div>
          <p className="uppercase tracking-[0.2em] text-muted-foreground text-sm mb-4">
            Той күні
          </p>
          <p className="uppercase tracking-widest text-sm text-muted-foreground mb-2">
            Сенбі
          </p>
          <motion.p
            variants={scaleIn}
            className="text-7xl md:text-8xl font-light text-foreground mb-2 font-serif">
            11
          </motion.p>
          <p className="text-xl italic text-foreground mb-4">Қазан 2025</p>
          <p className="text-3xl font-light text-foreground">17:00</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Calendar Section
function CalendarSection() {
  const weekDays = ["ДУ", "СЕ", "СР", "БЕ", "ЖҰ", "СЕ", "ЖК"];

  return (
    <section className="py-20 px-4 relative">
      <InteractiveFlower
        className="absolute top-10 left-4 w-20 md:w-28"
        variant="medium"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-lg mx-auto">
        <motion.div
          variants={fadeInUp}
          className="bg-card rounded-3xl p-8 shadow-sm relative overflow-hidden">
          <FloralDecoration position="bottom-left" />

          <h3 className="font-serif text-3xl italic text-center text-foreground mb-2">
            Қазан 2025
          </h3>
          <p className="text-center text-muted-foreground text-sm mb-6">
            Күнтізбе
          </p>

          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-4">
            {weekDays.map((day, i) => (
              <div
                key={`${day}-${i}`}
                className="text-muted-foreground font-medium py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {/* Empty cells for October 2025 start (Wednesday) */}
            {[...Array(2)].map((_, i) => (
              <div key={`empty-${i}`} className="py-2" />
            ))}
            {/* Calendar days */}
            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              const isWeddingDay = day === 11;
              return (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.1 }}
                  className={`py-2 rounded-lg cursor-default transition-colors ${
                    isWeddingDay
                      ? "bg-primary text-primary-foreground font-bold"
                      : "text-foreground hover:bg-secondary"
                  }`}>
                  {day}
                </motion.div>
              );
            })}
          </div>

          <motion.div
            variants={fadeInUp}
            className="mt-8 p-4 border border-border rounded-2xl text-center">
            <p className="font-serif text-2xl italic text-foreground">
              11 Қазан
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Countdown Section
function CountdownSection({
  countdown,
}: {
  countdown: { days: number; hours: number; minutes: number; seconds: number };
}) {
  const items = [
    { value: countdown.days, label: "КҮН" },
    { value: countdown.hours, label: "САҒАТ" },
    { value: countdown.minutes, label: "МИН" },
    { value: countdown.seconds, label: "СЕК" },
  ];

  return (
    <section className="py-20 px-4 bg-card font-serif">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-lg mx-auto text-center">
        <motion.p
          variants={fadeInUp}
          className="uppercase tracking-[0.2em] text-muted-foreground text-sm mb-8">
          Қалған уақыт
        </motion.p>

        <motion.div variants={fadeInUp} className="grid grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
              className="bg-background rounded-2xl p-4 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.p
                  key={item.value}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  className="text-3xl md:text-4xl font-light text-foreground">
                  {String(item.value).padStart(2, "0")}
                </motion.p>
              </AnimatePresence>
              <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// Location Section
function LocationSection({ config }: { config: typeof WEDDING_CONFIG }) {
  return (
    <section className="py-20 px-4 relative">
      <InteractiveFlower
        className="absolute bottom-10 right-4 w-20 md:w-28"
        variant="small"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="max-w-lg mx-auto">
        <motion.p
          variants={fadeInUp}
          className="uppercase tracking-[0.2em] text-muted-foreground text-sm mb-8 text-center">
          Мекенжайы
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="bg-card rounded-3xl p-8 text-center relative border border-gray-100 shadow">
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <MapPin className="w-4 h-4 text-muted-foreground" />
          </div>

          <p className="font-serif text-xl italic text-foreground mb-4">
            {config.city}
          </p>
          <p className="font-serif text-2xl italic text-foreground mb-2">
            батыр ауылы
          </p>
          <h3 className="font-serif text-4xl md:text-5xl italic text-foreground mb-4">
            {`"${config.venue}"`}
          </h3>
          <p className="font-serif text-xl italic text-muted-foreground mb-2">
            мейрамханасы
          </p>
          <p className="uppercase tracking-widest text-foreground">
            {config.address}
          </p>

          <motion.a
            href="https://2gis.kz"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 mt-8 bg-primary text-primary-foreground px-6 py-3 rounded-full">
            <ExternalLink className="w-4 h-4" />
            2GIS-те көру
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Footer Section
function FooterSection({ config }: { config: typeof WEDDING_CONFIG }) {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="max-w-lg mx-auto text-center">
        <motion.div variants={fadeInUp}>
          <Heart className="w-8 h-8 mx-auto text-accent mb-6" />
          <p className="font-serif text-2xl italic text-foreground mb-4">
            Сіздерді күтеміз!
          </p>
          <p className="text-muted-foreground text-sm">
            {config.groom} & {config.bride}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
