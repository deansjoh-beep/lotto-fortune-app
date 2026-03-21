import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { RefreshCcw, Share2, Star, Sparkles, Compass, Fingerprint } from "lucide-react";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/GlassCard";
import { LottoBall } from "@/components/LottoBall";
import type { LottoResult } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

export default function Result() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [result, setResult] = useState<LottoResult | null>(null);
  const confettiFired = useRef(false);

  useEffect(() => {
    const savedData = sessionStorage.getItem("lottoResult");
    if (!savedData) {
      setLocation("/input");
      return;
    }
    try {
      const parsedData = JSON.parse(savedData) as LottoResult;
      setResult(parsedData);

      if (!confettiFired.current) {
        confettiFired.current = true;
        setTimeout(() => {
          confetti({
            particleCount: 200,
            spread: 120,
            origin: { y: 0.6 },
            colors: ["#FF2E93", "#00F0FF", "#39FF14", "#FFD700", "#A020F0"],
          });
        }, 500);
      }
    } catch {
      setLocation("/input");
    }
  }, [setLocation]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "내 운세 로또 번호",
          text: `내 행운의 번호는 ${result?.numbers.join(", ")} + ${result?.bonusNumber} 입니다! 🍀`,
          url: window.location.origin,
        });
      } else {
        await navigator.clipboard.writeText(
          `${result?.numbers.join(", ")} + ${result?.bonusNumber}`
        );
        toast({ title: "복사 완료!", description: "클립보드에 번호가 복사되었습니다." });
      }
    } catch {}
  };

  if (!result) return null;

  const scoreColor = result.fortuneScore >= 80 ? "#39FF14" : result.fortuneScore >= 60 ? "#FFD700" : "#FF2E93";

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20 w-full">

        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-panel text-sm font-semibold mb-6"
            style={{ color: "#39FF14", border: "1.5px solid #39FF1440" }}
          >
            <Sparkles className="w-4 h-4" />
            운세 분석 완료
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-foreground"
          >
            당신의 <span className="text-gradient-mz">행운번호</span>
          </motion.h1>
        </div>

        {/* Lotto Balls */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 mb-18 px-2">
          {result.numbers.map((num, idx) => (
            <LottoBall key={`main-${num}`} number={num} delay={0.2 + idx * 0.1} />
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 text-muted-foreground text-4xl font-black"
          >
            +
          </motion.div>
          <LottoBall number={result.bonusNumber} delay={0.9} />
        </div>

        {/* Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-8">

          {/* Score */}
          <GlassCard className="md:col-span-1 flex flex-col items-center justify-center text-center py-10">
            <h3 className="text-muted-foreground font-medium mb-6 text-sm uppercase tracking-widest">행운 지수</h3>
            <div
              className="relative w-36 h-36 flex items-center justify-center rounded-full"
              style={{ border: `4px solid ${scoreColor}`, boxShadow: `0 0 28px ${scoreColor}50` }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="text-center"
              >
                <div className="text-6xl font-black text-foreground">{result.fortuneScore}</div>
                <div className="text-xs font-bold tracking-widest mt-1" style={{ color: scoreColor }}>
                  SCORE
                </div>
              </motion.div>
            </div>
          </GlassCard>

          {/* Message + Details */}
          <div className="md:col-span-2 flex flex-col gap-5">
            <GlassCard className="flex-1 flex items-center p-7" style={{ borderColor: "rgba(0,240,255,0.2)" }}>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  <Star className="w-5 h-5" style={{ color: "#FFD700" }} />
                  오늘의 운세 메시지
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  "{result.fortuneMessage}"
                </p>
              </div>
            </GlassCard>

            <div className="grid grid-cols-2 gap-5">
              <GlassCard className="p-5">
                <div className="text-muted-foreground text-xs mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" /> 행운의 방향
                </div>
                <div className="text-2xl font-bold" style={{ color: "#00F0FF" }}>
                  {result.luckyDirection}
                </div>
              </GlassCard>
              <GlassCard className="p-5">
                <div className="text-muted-foreground text-xs mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <Fingerprint className="w-3.5 h-3.5" /> 행운의 색상
                </div>
                <div className="text-2xl font-bold" style={{ color: "#39FF14" }}>
                  {result.luckyColor}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>

        {/* Deep Analysis */}
        <GlassCard className="mb-12">
          <h3 className="text-base font-bold text-foreground mb-6 pb-4 border-b border-border flex items-center gap-2">
            <span className="text-gradient-mz">✦</span> 상세 사주 분석
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "띠 (Zodiac)", value: result.zodiacSign, color: "#FFD700" },
              { label: "천간 (Stem)", value: result.analysisDetails.heavenlyStem, color: "#FF2E93" },
              { label: "지지 (Branch)", value: result.analysisDetails.earthlyBranch, color: "#00F0FF" },
              { label: "오행 (Element)", value: result.fortuneElement, color: "#39FF14" },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div className="text-muted-foreground text-xs uppercase tracking-wider mb-2">{label}</div>
                <div className="text-xl font-bold" style={{ color }}>{value}</div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setLocation("/input")}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-2xl glass-panel text-foreground font-bold hover:border-[#FF2E93]/40 transition-all active:scale-95"
          >
            <RefreshCcw className="w-5 h-5" />
            다시 뽑기
          </button>
          <button
            onClick={handleShare}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold transition-all active:scale-95 hover:-translate-y-0.5 glow-pink"
            style={{ background: "linear-gradient(135deg, #FF2E93, #A020F0)" }}
          >
            <Share2 className="w-5 h-5" />
            결과 공유하기
          </button>
        </div>

      </div>
    </Layout>
  );
}
