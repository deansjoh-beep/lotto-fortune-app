import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ChevronDown, Loader2, CalendarHeart } from "lucide-react";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/GlassCard";
import { useGenerateLottoNumbers } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const years = Array.from({ length: 2006 - 1900 + 1 }, (_, i) => 2006 - i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const SIGANAME: Record<number, string> = {
  23: "자시", 0: "자시", 1: "축시", 2: "축시",
  3: "인시", 4: "인시", 5: "묘시", 6: "묘시",
  7: "진시", 8: "진시", 9: "사시", 10: "사시",
  11: "오시", 12: "오시", 13: "미시", 14: "미시",
  15: "신시", 16: "신시", 17: "유시", 18: "유시",
  19: "술시", 20: "술시", 21: "해시", 22: "해시",
};
const hours = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: `${i}시 · ${SIGANAME[i]}`,
}));

export default function Input() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [year, setYear] = useState(1990);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);

  const generateMutation = useGenerateLottoNumbers({
    mutation: {
      onSuccess: (data) => {
        sessionStorage.setItem("lottoResult", JSON.stringify(data));
        setLocation("/result");
      },
      onError: () => {
        toast({
          title: "오류 발생",
          description: "운세 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.",
          variant: "destructive",
        });
      },
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateMutation.mutate({ data: { year, month, day, hour } });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24 w-full flex-1 flex flex-col justify-center">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-6 shadow-xl"
            style={{ background: "linear-gradient(135deg, #00F0FF, #FF2E93)" }}
          >
            <CalendarHeart className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-black text-foreground mb-4"
          >
            당신의 생년월일시를<br />알려주세요 ✨
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            입력하신 정보를 바탕으로 우주적 기운을 분석합니다.
          </motion.p>
        </div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
        >
          <GlassCard className="p-6 sm:p-10 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {([
                { label: "태어난 연도", value: year, onChange: setYear, options: years.map(y => ({ value: y, label: `${y}년` })) },
                { label: "태어난 월", value: month, onChange: setMonth, options: months.map(m => ({ value: m, label: `${m}월` })) },
                { label: "태어난 일", value: day, onChange: setDay, options: days.map(d => ({ value: d, label: `${d}일` })) },
                { label: "태어난 시간", value: hour, onChange: setHour, options: hours.map(h => ({ value: h.value, label: h.label })) },
              ] as const).map(({ label, value, onChange, options }) => (
                <div key={label} className="space-y-3">
                  <label className="text-muted-foreground font-medium ml-1 block text-sm tracking-wide uppercase">
                    {label}
                  </label>
                  <div className="relative group">
                    <select
                      value={value}
                      onChange={(e) => (onChange as (v: number) => void)(Number(e.target.value))}
                      className="appearance-none w-full rounded-2xl px-5 py-4 text-lg text-foreground outline-none transition-all cursor-pointer bg-background border border-border hover:border-[#FF2E93]/60 focus:border-[#FF2E93] focus:ring-2 focus:ring-[#FF2E93]/25"
                    >
                      {options.map(o => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground group-hover:text-[#FF2E93] transition-colors pointer-events-none w-5 h-5" />
                  </div>
                </div>
              ))}

            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={generateMutation.isPending}
                className="w-full text-white font-bold text-2xl py-5 rounded-2xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-3 glow-pink hover:-translate-y-1"
                style={{ background: "linear-gradient(135deg, #FF2E93, #A020F0, #00F0FF)" }}
              >
                {generateMutation.isPending ? (
                  <>
                    <Loader2 className="w-8 h-8 animate-spin" />
                    <span className="animate-pulse">운세 분석 중...</span>
                  </>
                ) : (
                  "행운번호 뽑기 🎰"
                )}
              </button>
            </div>
          </GlassCard>
        </motion.form>
      </div>
    </Layout>
  );
}
