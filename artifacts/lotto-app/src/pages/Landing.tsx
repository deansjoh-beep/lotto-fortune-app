import { Link } from "wouter";
import { motion } from "framer-motion";
import { Sparkles, Star, Moon, Sun, Zap, ArrowRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/GlassCard";

const cards = [
  {
    title: "사주와 운명의 연결",
    desc: "생년월일이 만들어내는 고유한 에너지 패턴이 행운의 숫자를 결정합니다.",
    icon: <Star className="w-8 h-8" style={{ color: "#FFD700" }} />,
    accent: "#FFD700",
  },
  {
    title: "수비학의 과학",
    desc: "숫자에는 우주적 의미가 숨겨져 있어요. 생명수가 당신의 행운을 안내합니다.",
    icon: <Zap className="w-8 h-8" style={{ color: "#00F0FF" }} />,
    accent: "#00F0FF",
  },
  {
    title: "오행의 조화",
    desc: "목화토금수 오행이 당신의 행운번호를 결정하는 핵심 원리입니다.",
    icon: <Sun className="w-8 h-8" style={{ color: "#FF2E93" }} />,
    accent: "#FF2E93",
  },
  {
    title: "천간지지의 비밀",
    desc: "출생 연도의 천간과 지지가 숫자 운을 좌우하는 힘을 가집니다.",
    icon: <Moon className="w-8 h-8" style={{ color: "#A020F0" }} />,
    accent: "#A020F0",
  },
  {
    title: "생시의 기운",
    desc: "태어난 시각도 당신의 운세에 영향을 미쳐요. 정확한 시간이 중요합니다.",
    icon: <Sparkles className="w-8 h-8" style={{ color: "#39FF14" }} />,
    accent: "#39FF14",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export default function Landing() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 w-full flex-1 flex flex-col">

        {/* Hero */}
        <div className="text-center pt-10 pb-16 md:pb-24">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="inline-block mb-6 px-6 py-2 rounded-full glass-panel text-sm sm:text-base font-semibold text-muted-foreground shadow-xl"
          >
            당신의 우주적 에너지를 숫자로 🔮
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-gradient-mz leading-[1.1] pb-4"
          >
            운세로 알아보는<br />나만의 행운번호
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto font-light"
          >
            단순한 랜덤 추첨이 아닙니다. 당신이 태어난 순간의 우주적 기운을 계산하여
            오늘 당신에게 가장 강력한 힘을 주는 숫자를 찾아냅니다.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr"
        >
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={idx === 4 ? "lg:col-start-2" : ""}
            >
              <GlassCard className="h-full flex flex-col items-center text-center group cursor-default">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                  style={{ background: `${card.accent}18`, border: `1.5px solid ${card.accent}40` }}
                >
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-20 sm:mt-28 text-center pb-20"
        >
          <Link
            href="/input"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#FF2E93] to-[#00F0FF] text-white font-bold text-xl sm:text-2xl px-10 py-5 sm:px-14 sm:py-6 rounded-full glow-pink hover:opacity-90 hover:-translate-y-1 transition-all active:scale-95"
          >
            내 행운번호 알아보기
            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </Link>
        </motion.div>
      </div>
    </Layout>
  );
}
