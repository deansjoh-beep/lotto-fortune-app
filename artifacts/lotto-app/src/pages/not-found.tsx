import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { GlassCard } from "@/components/GlassCard";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center p-4">
        <GlassCard className="max-w-md w-full text-center py-16">
          <h1 className="text-6xl font-black text-[#FF2E93] mb-4 text-glow">404</h1>
          <h2 className="text-2xl font-bold text-white mb-6">페이지를 찾을 수 없습니다</h2>
          <p className="text-white/60 mb-8">
            요청하신 우주적 주소는 존재하지 않거나<br/>블랙홀로 빨려 들어갔습니다.
          </p>
          <Link 
            href="/" 
            className="inline-block px-8 py-3 rounded-xl bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </GlassCard>
      </div>
    </Layout>
  );
}
