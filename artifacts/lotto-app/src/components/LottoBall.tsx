import { motion } from "framer-motion";

export function LottoBall({ number, delay = 0 }: { number: number, delay?: number }) {
  // Apply standard Korean lotto colors
  let colorStyles = "bg-gray-500 text-white shadow-[0_0_20px_rgba(107,114,128,0.6)]";
  
  if (number <= 10) {
    colorStyles = "bg-yellow-400 text-black shadow-[0_0_20px_rgba(250,204,21,0.6)]";
  } else if (number <= 20) {
    colorStyles = "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.6)]";
  } else if (number <= 30) {
    colorStyles = "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)]";
  } else if (number <= 40) {
    colorStyles = "bg-gray-500 text-white shadow-[0_0_20px_rgba(107,114,128,0.6)]";
  } else if (number <= 45) {
    colorStyles = "bg-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.6)]";
  }

  return (
    <motion.div
      initial={{ scale: 0, y: 50, rotate: -180 }}
      animate={{ scale: 1, y: 0, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay 
      }}
      whileHover={{ scale: 1.1, y: -5 }}
      className={`relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full font-display font-black text-2xl sm:text-3xl md:text-4xl border-2 border-white/20 ${colorStyles}`}
    >
      {/* Inner specular highlight for 3D sphere effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      <span className="relative z-10">{number}</span>
    </motion.div>
  );
}
