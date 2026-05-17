"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  HeartOff,
  ArrowLeft,
  User,
  MessageCircle,
  Check,
  Sparkles,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { FloralSVG, InteractiveFlower } from "@/components/interactive-flower";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
} as const;

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

function RSVPContent() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get("status") as
    | "attending"
    | "not-attending"
    | null;

  const [rsvpStatus, setRsvpStatus] = useState<
    "attending" | "not-attending" | null
  >(initialStatus);
  const [formData, setFormData] = useState({ name: "", wishes: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(!!initialStatus);

  useEffect(() => {
    if (initialStatus) {
      setRsvpStatus(initialStatus);
      setShowForm(true);
    }
  }, [initialStatus]);

  const handleStatusSelect = (status: "attending" | "not-attending") => {
    setRsvpStatus(status);
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dbStatus = rsvpStatus === "attending" ? "Приду" : "Не приду";

    try {
      const response = await fetch(
        "https://akzdooeilllsmmxtikpm.supabase.co/rest/v1/guests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: "sb_publishable_d0tpR7SPWuwm7KY0_CLSoQ__SkiWjAu",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFremRvb2VpbGxsc21teHRpa3BtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MzAwMjcsImV4cCI6MjA5NDQwNjAyN30.q57bTTOa1p1pgTvX2AOd6KBzyvSeJ3oO4iDB_lVDgSo",
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            name: formData.name,
            status: dbStatus,
            message: formData.wishes || "", // Пожелание (если пустое, отправится пустая строка)
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Кате кетті / Ошибка при отправке данных");
      }

      // Если запрос успешный, переключаем экран на SuccessScreen
      setIsSubmitted(true);
    } catch (error) {
      console.error("Ошибка Supabase:", error);
      alert("Деректерді жіберу мүмкін болмады. Қайта байқап көріңіз.");
    }
  };

  const handleBack = () => {
    setShowForm(false);
    setRsvpStatus(null);
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <AnimatePresence mode="wait">
        {!showForm ? (
          <SelectionScreen onSelect={handleStatusSelect} />
        ) : !isSubmitted ? (
          <FormScreen
            rsvpStatus={rsvpStatus}
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        ) : (
          <SuccessScreen rsvpStatus={rsvpStatus} />
        )}
      </AnimatePresence>
    </div>
  );
}

// Selection Screen Component
function SelectionScreen({
  onSelect,
}: {
  onSelect: (status: "attending" | "not-attending") => void;
}) {
  return (
    <motion.div
      key="selection"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: -20 }}
      variants={staggerContainer}
      className="bg-card rounded-3xl p-8 shadow-lg border border-border">
      <motion.div variants={fadeInUp} className="text-center mb-8">
        <Link href="/" className="inline-block mb-6">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.div>
        </Link>
        <h1 className="font-serif text-3xl italic text-foreground mb-3">
          Қатысуды растау
        </h1>
        <p className="uppercase tracking-widest text-muted-foreground text-xs">
          Тойға келуіңізді растауыңызды сұраймыз
        </p>
      </motion.div>

      <motion.div variants={fadeInUp} className="space-y-4">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("attending")}
          className="w-full flex items-center gap-4 bg-primary text-primary-foreground px-6 py-5 rounded-2xl font-medium transition-all shadow-lg shadow-primary/20">
          <Heart className="w-6 h-6" />
          <span className="flex-1 text-left text-lg">КЕЛЕМІН</span>
          <div className="w-6 h-6 rounded-full border-2 border-primary-foreground/30" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("not-attending")}
          className="w-full flex items-center gap-4 bg-background text-foreground border-2 border-border px-6 py-5 rounded-2xl font-medium transition-all hover:bg-secondary">
          <HeartOff className="w-6 h-6" />
          <span className="flex-1 text-left text-lg">КЕЛЕ АЛМАЙМЫН</span>
          <div className="w-6 h-6 rounded-full border-2 border-border" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// Form Screen Component
interface FormScreenProps {
  rsvpStatus: "attending" | "not-attending" | null;
  formData: { name: string; wishes: string };
  setFormData: (data: { name: string; wishes: string }) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
}

function FormScreen({
  rsvpStatus,
  formData,
  setFormData,
  onSubmit,
  onBack,
}: FormScreenProps) {
  return (
    <motion.div
      key="form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-card rounded-3xl p-8 shadow-lg border border-border">
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl italic text-foreground mb-3">
          Қатысуды растау
        </h1>
        <p className="uppercase tracking-widest text-muted-foreground text-xs">
          Келуіңізді растауыңызды сұраймыз
        </p>
      </div>

      {/* Selected status */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`flex items-center gap-3 p-4 rounded-2xl mb-6 ${
          rsvpStatus === "attending"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-foreground"
        }`}>
        {rsvpStatus === "attending" ? (
          <Heart className="w-5 h-5" />
        ) : (
          <HeartOff className="w-5 h-5" />
        )}
        <span className="flex-1 font-medium">
          {rsvpStatus === "attending" ? "КЕЛЕМІН" : "КЕЛЕ АЛМАЙМЫН"}
        </span>
        <Check className="w-5 h-5" />
      </motion.div>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Name field */}
        <div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground mb-3 uppercase tracking-wider">
            <User className="w-4 h-4" />
            Сіздің есіміңіз
          </label>
          <input
            type="text"
            required
            placeholder="Есіміңізді енгізіңіз (мысалы: Айбек, Гүлнұр)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-4 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Бірнеше қонақ болса, есімдерді үтір арқылы жазыңыз
          </p>
        </div>

        {/* Wishes field */}
        <div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground mb-3 uppercase tracking-wider">
            <MessageCircle className="w-4 h-4" />
            Тілегіңіз (міндетті емес)
          </label>
          <textarea
            placeholder="Жылы тілектеріңізді жазыңыз..."
            value={formData.wishes}
            onChange={(e) =>
              setFormData({ ...formData, wishes: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-4 rounded-2xl bg-background border border-border text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onBack}
            className="flex-1 flex items-center justify-center gap-2 bg-secondary text-foreground px-6 py-4 rounded-2xl font-medium">
            <ArrowLeft className="w-4 h-4" />
            АРТҚА ҚАЙТУ
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!formData.name.trim()}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-2xl font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            РАСТАУ
            <Sparkles className="w-4 h-4" />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

// Success Screen Component
function SuccessScreen({
  rsvpStatus,
}: {
  rsvpStatus: "attending" | "not-attending" | null;
}) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="bg-card rounded-3xl p-8 shadow-lg border border-border text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
        className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-primary-foreground" />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="font-serif text-3xl italic text-foreground mb-4">
        Рахмет!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-muted-foreground mb-8">
        {rsvpStatus === "attending"
          ? "Сіздің жауабыңыз қабылданды. Той күні кездескенше!"
          : "Сіздің жауабыңыз қабылданды. Келе алмайтыныңызға өкінеміз."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}>
        <Link href="/">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-medium">
            <ArrowLeft className="w-4 h-4" />
            Шақыруға оралу
          </motion.button>
        </Link>
      </motion.div>

      {/* Decorative hearts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center gap-2 mt-8">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}>
            <Heart className="w-4 h-4 text-accent" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function RSVPPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 opacity-10">
          <FloralSVG />
        </div>
        <div className="absolute bottom-10 right-10 w-40 h-40 opacity-10 rotate-180">
          <FloralSVG />
        </div>
        <div className="absolute top-1/4 right-10 w-24 h-24 opacity-5">
          <FloralSVG />
        </div>
        <InteractiveFlower
          className="absolute bottom-20 left-4 w-20 opacity-30"
          variant="small"
        />
        <InteractiveFlower
          className="absolute top-20 right-8 w-24 opacity-30"
          variant="medium"
        />
      </div>

      <Suspense
        fallback={
          <div className="w-full max-w-md bg-card rounded-3xl p-8 animate-pulse">
            <div className="h-8 bg-secondary rounded mb-4" />
            <div className="h-4 bg-secondary rounded w-2/3 mx-auto" />
          </div>
        }>
        <RSVPContent />
      </Suspense>
    </main>
  );
}
