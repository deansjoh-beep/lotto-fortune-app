import { Router, type IRouter } from "express";
import { GenerateLottoNumbersBody, GenerateLottoNumbersResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const HEAVENLY_STEMS = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const EARTHLY_BRANCHES = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const ZODIAC_SIGNS = ["쥐", "소", "호랑이", "토끼", "용", "뱀", "말", "양", "원숭이", "닭", "개", "돼지"];
const ELEMENTS_KOREAN = ["목(木)", "화(火)", "토(土)", "금(金)", "수(水)"];
const LUCKY_COLORS = ["빨강", "주황", "노랑", "초록", "파랑", "남색", "보라", "금색", "은색", "하양"];
const LUCKY_DIRECTIONS = ["동", "서", "남", "북", "동남", "동북", "서남", "서북"];
const FORTUNE_MESSAGES = [
  "오늘은 특별한 기운이 감돌고 있어요. 행운의 숫자들이 당신을 기다리고 있습니다!",
  "당신의 오행 에너지가 강하게 빛나고 있어요. 이 번호들이 행운을 가져올 거예요!",
  "천간과 지지가 완벽히 조화를 이루는 날이에요. 이 번호들을 믿어보세요!",
  "사주팔자가 행운의 기운을 나타내고 있어요. 당신만의 특별한 번호예요!",
  "우주의 기운이 당신에게 집중되어 있어요. 이 숫자들로 행운을 잡아보세요!",
  "수비학적으로 매우 강력한 에너지를 지닌 번호들이에요. 행운을 빕니다!",
  "당신의 생시 기운이 매우 긍정적이에요. 이 번호들이 행복을 가져다줄 거예요!",
  "오늘의 운세가 매우 좋아요! 당신의 생년월일이 만들어낸 최고의 번호들이에요!",
];

const ELEMENT_MESSAGES: Record<string, string[]> = {
  "목(木)": [
    "성장과 발전의 기운을 가진 목(木)의 에너지로 선택된 번호예요!",
    "봄의 생명력처럼 번창할 행운의 번호들입니다!",
  ],
  "화(火)": [
    "열정과 창의력의 화(火) 기운이 당신의 행운번호를 밝혀줍니다!",
    "뜨거운 열정으로 행운을 잡아보세요!",
  ],
  "토(土)": [
    "안정과 균형의 토(土) 기운이 깃든 행운의 번호들이에요!",
    "대지의 풍요로운 기운을 담은 번호들입니다!",
  ],
  "금(金)": [
    "풍요와 성공의 금(金) 기운이 당신을 행운으로 이끌어요!",
    "황금빛 행운이 이 번호들과 함께해요!",
  ],
  "수(水)": [
    "지혜와 유연함의 수(水) 기운이 담긴 행운번호예요!",
    "흐르는 물처럼 행운이 자연스럽게 찾아올 거예요!",
  ],
};

function getHeavenlyStem(year: number): string {
  return HEAVENLY_STEMS[(year - 4) % 10];
}

function getEarthlyBranch(year: number): string {
  return EARTHLY_BRANCHES[(year - 4) % 12];
}

function getZodiacSign(year: number): string {
  return ZODIAC_SIGNS[(year - 4) % 12];
}

function getBirthElement(year: number): string {
  const stemIndex = (year - 4) % 10;
  return ELEMENTS_KOREAN[Math.floor(stemIndex / 2)];
}

function getLifeNumber(year: number, month: number, day: number): number {
  const digits = `${year}${month}${day}`.split("").map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  while (sum > 9) {
    sum = sum.toString().split("").map(Number).reduce((a, b) => a + b, 0);
  }
  return sum;
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function generateNumbers(year: number, month: number, day: number, hour: number): number[] {
  const seed = year * 100000 + month * 1000 + day * 100 + hour;
  const rng = seededRandom(seed);

  const heavenlyStemIndex = (year - 4) % 10;
  const earthlyBranchIndex = (year - 4) % 12;
  const lifeNum = getLifeNumber(year, month, day);
  const elementIndex = Math.floor(heavenlyStemIndex / 2);

  const baseNumbers = new Set<number>();

  const anchors = [
    ((lifeNum * 7) % 45) + 1,
    ((heavenlyStemIndex * 5 + month) % 45) + 1,
    ((earthlyBranchIndex * 4 + day) % 45) + 1,
    ((elementIndex * 9 + hour) % 45) + 1,
    ((lifeNum + heavenlyStemIndex + earthlyBranchIndex) % 45) + 1,
    ((month * day + hour) % 45) + 1,
  ];

  for (const n of anchors) {
    if (n >= 1 && n <= 45) baseNumbers.add(n);
    if (baseNumbers.size >= 3) break;
  }

  while (baseNumbers.size < 6) {
    const num = Math.floor(rng() * 45) + 1;
    baseNumbers.add(num);
  }

  return Array.from(baseNumbers).slice(0, 6).sort((a, b) => a - b);
}

function generateBonusNumber(numbers: number[], seed: number): number {
  const rng = seededRandom(seed + 999);
  let bonus: number;
  do {
    bonus = Math.floor(rng() * 45) + 1;
  } while (numbers.includes(bonus));
  return bonus;
}

function calculateFortuneScore(year: number, month: number, day: number, hour: number): number {
  const lifeNum = getLifeNumber(year, month, day);
  const stemIndex = (year - 4) % 10;
  const branchIndex = (year - 4) % 12;
  const base = (lifeNum * 8 + stemIndex * 6 + branchIndex * 4 + (hour % 12) * 5) % 50;
  return 50 + base;
}

router.post("/generate", (req, res) => {
  const parseResult = GenerateLottoNumbersBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      error: "INVALID_INPUT",
      message: "올바른 생년월일시를 입력해주세요.",
    });
    return;
  }

  const { year, month, day, hour } = parseResult.data;

  const numbers = generateNumbers(year, month, day, hour);
  const seed = year * 100000 + month * 1000 + day * 100 + hour;
  const bonusNumber = generateBonusNumber(numbers, seed);

  const heavenlyStem = getHeavenlyStem(year);
  const earthlyBranch = getEarthlyBranch(year);
  const lifeNumber = getLifeNumber(year, month, day);
  const birthElement = getBirthElement(year);
  const zodiacSign = `${getZodiacSign(year)}띠`;

  const fortuneScore = calculateFortuneScore(year, month, day, hour);

  const rng = seededRandom(seed + 42);
  const fortuneElement = ELEMENTS_KOREAN[Math.floor(rng() * 5)];
  const luckyColor = LUCKY_COLORS[Math.floor(rng() * LUCKY_COLORS.length)];
  const luckyDirection = LUCKY_DIRECTIONS[Math.floor(rng() * LUCKY_DIRECTIONS.length)];

  const elementMsgs = ELEMENT_MESSAGES[fortuneElement] || FORTUNE_MESSAGES;
  const msgPool = [...FORTUNE_MESSAGES, ...elementMsgs];
  const fortuneMessage = msgPool[Math.floor(rng() * msgPool.length)];

  const responseData = GenerateLottoNumbersResponse.parse({
    numbers,
    bonusNumber,
    fortuneElement,
    fortuneScore,
    fortuneMessage,
    luckyColor,
    luckyDirection,
    zodiacSign,
    analysisDetails: {
      heavenlyStem,
      earthlyBranch,
      lifeNumber,
      birthElement,
    },
  });

  res.json(responseData);
});

export default router;
