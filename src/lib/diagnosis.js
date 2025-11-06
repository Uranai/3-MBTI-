// MBTI診断ロジック
export const mbtiQuestions = [
  // E/I（外向/内向）
  {
    id: 1,
    category: 'EI',
    text: '人と会った後、どう感じますか？',
    options: [
      { value: 1, text: 'エネルギーが満ち溢れる', type: 'E' },
      { value: 2, text: 'やや元気になる', type: 'E' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや疲れる', type: 'I' },
      { value: 5, text: '一人の時間が必要', type: 'I' }
    ]
  },
  {
    id: 2,
    category: 'EI',
    text: 'どちらの集まりが好きですか？',
    options: [
      { value: 1, text: '大勢の集まりが好き', type: 'E' },
      { value: 2, text: 'やや大勢が好き', type: 'E' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや少人数が好き', type: 'I' },
      { value: 5, text: '少人数の集まりが好き', type: 'I' }
    ]
  },
  {
    id: 3,
    category: 'EI',
    text: '初対面の人との会話は？',
    options: [
      { value: 1, text: 'とても得意', type: 'E' },
      { value: 2, text: 'やや得意', type: 'E' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや苦手', type: 'I' },
      { value: 5, text: '親しい人と話すのが好き', type: 'I' }
    ]
  },
  {
    id: 4,
    category: 'EI',
    text: '休日の過ごし方は？',
    options: [
      { value: 1, text: '外出して活動したい', type: 'E' },
      { value: 2, text: 'やや外出したい', type: 'E' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや家で過ごしたい', type: 'I' },
      { value: 5, text: '家で過ごすのが好き', type: 'I' }
    ]
  },
  {
    id: 5,
    category: 'EI',
    text: '考えを伝えるとき',
    options: [
      { value: 1, text: 'すぐに話す', type: 'E' },
      { value: 2, text: 'わりとすぐ話す', type: 'E' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや考えてから話す', type: 'I' },
      { value: 5, text: 'じっくり考えてから話す', type: 'I' }
    ]
  },
  // S/N（感覚/直観）
  {
    id: 6,
    category: 'SN',
    text: '何を重視しますか？',
    options: [
      { value: 1, text: '具体的な事実', type: 'S' },
      { value: 2, text: 'やや事実重視', type: 'S' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや可能性重視', type: 'N' },
      { value: 5, text: '可能性や意味', type: 'N' }
    ]
  },
  {
    id: 7,
    category: 'SN',
    text: 'あなたの傾向は？',
    options: [
      { value: 1, text: '現実的で実用的', type: 'S' },
      { value: 2, text: 'やや現実的', type: 'S' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや理論的', type: 'N' },
      { value: 5, text: '理論的で抽象的', type: 'N' }
    ]
  },
  {
    id: 8,
    category: 'SN',
    text: '注目するのは？',
    options: [
      { value: 1, text: '詳細に注目', type: 'S' },
      { value: 2, text: 'やや詳細重視', type: 'S' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや全体重視', type: 'N' },
      { value: 5, text: '全体像を見る', type: 'N' }
    ]
  },
  {
    id: 9,
    category: 'SN',
    text: '学び方は？',
    options: [
      { value: 1, text: '経験から学ぶ', type: 'S' },
      { value: 2, text: 'やや経験重視', type: 'S' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや直感重視', type: 'N' },
      { value: 5, text: '直感から学ぶ', type: 'N' }
    ]
  },
  {
    id: 10,
    category: 'SN',
    text: '大切にするのは？',
    options: [
      { value: 1, text: '今を大切にする', type: 'S' },
      { value: 2, text: 'やや今重視', type: 'S' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや未来重視', type: 'N' },
      { value: 5, text: '未来を見据える', type: 'N' }
    ]
  },
  // T/F（思考/感情）
  {
    id: 11,
    category: 'TF',
    text: '判断するとき',
    options: [
      { value: 1, text: '論理的に判断', type: 'T' },
      { value: 2, text: 'やや論理的', type: 'T' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや感情的', type: 'F' },
      { value: 5, text: '感情で判断', type: 'F' }
    ]
  },
  {
    id: 12,
    category: 'TF',
    text: '重視するのは？',
    options: [
      { value: 1, text: '公平性', type: 'T' },
      { value: 2, text: 'やや公平性', type: 'T' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや調和', type: 'F' },
      { value: 5, text: '調和', type: 'F' }
    ]
  },
  {
    id: 13,
    category: 'TF',
    text: '物事への接し方',
    options: [
      { value: 1, text: '批判的に分析', type: 'T' },
      { value: 2, text: 'やや批判的', type: 'T' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや共感的', type: 'F' },
      { value: 5, text: '共感的に理解', type: 'F' }
    ]
  },
  {
    id: 14,
    category: 'TF',
    text: '優先するのは？',
    options: [
      { value: 1, text: '真実を優先', type: 'T' },
      { value: 2, text: 'やや真実優先', type: 'T' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや気持ち優先', type: 'F' },
      { value: 5, text: '人の気持ちを優先', type: 'F' }
    ]
  },
  {
    id: 15,
    category: 'TF',
    text: '基準は？',
    options: [
      { value: 1, text: '客観的な基準', type: 'T' },
      { value: 2, text: 'やや客観的', type: 'T' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや個人的', type: 'F' },
      { value: 5, text: '個人的な価値観', type: 'F' }
    ]
  },
  // J/P（判断/知覚）
  {
    id: 16,
    category: 'JP',
    text: '行動スタイルは？',
    options: [
      { value: 1, text: '計画を立てて行動', type: 'J' },
      { value: 2, text: 'やや計画的', type: 'J' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや臨機応変', type: 'P' },
      { value: 5, text: '臨機応変に行動', type: 'P' }
    ]
  },
  {
    id: 17,
    category: 'JP',
    text: '締め切りへの対応',
    options: [
      { value: 1, text: '早めに完了', type: 'J' },
      { value: 2, text: 'やや早め', type: 'J' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'ややギリギリ', type: 'P' },
      { value: 5, text: 'ギリギリ', type: 'P' }
    ]
  },
  {
    id: 18,
    category: 'JP',
    text: '決断について',
    options: [
      { value: 1, text: '決断が早い', type: 'J' },
      { value: 2, text: 'やや早い', type: 'J' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや選択肢を残す', type: 'P' },
      { value: 5, text: '選択肢を残したい', type: 'P' }
    ]
  },
  {
    id: 19,
    category: 'JP',
    text: '好みは？',
    options: [
      { value: 1, text: '整理整頓が好き', type: 'J' },
      { value: 2, text: 'やや整理好き', type: 'J' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや柔軟性好き', type: 'P' },
      { value: 5, text: '柔軟性が好き', type: 'P' }
    ]
  },
  {
    id: 20,
    category: 'JP',
    text: '予定について',
    options: [
      { value: 1, text: '予定通りに進める', type: 'J' },
      { value: 2, text: 'やや予定通り', type: 'J' },
      { value: 3, text: 'どちらとも言えない', type: 'N' },
      { value: 4, text: 'やや流れに任せる', type: 'P' },
      { value: 5, text: '流れに任せる', type: 'P' }
    ]
  }
];

export function calculateMBTI(answers) {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  
  answers.forEach(answer => {
    const question = mbtiQuestions.find(q => q.id === answer.questionId);
    if (!question) return;
    
    const option = question.options.find(o => o.value === answer.value);
    if (!option) return;
    
    const type = option.type;
    if (type === 'N') return; // 中立
    
    // スコア加算（1-5の値を使用）
    if (answer.value === 1) scores[type] += 5;
    else if (answer.value === 2) scores[type] += 3;
    else if (answer.value === 4) scores[type] += 3;
    else if (answer.value === 5) scores[type] += 5;
  });
  
  const type = 
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');
  
  return {
    type,
    scores,
    percentages: {
      EI: Math.round((scores.E / (scores.E + scores.I || 1)) * 100),
      SN: Math.round((scores.S / (scores.S + scores.N || 1)) * 100),
      TF: Math.round((scores.T / (scores.T + scores.F || 1)) * 100),
      JP: Math.round((scores.J / (scores.J + scores.P || 1)) * 100)
    }
  };
}

// 数秘術ロジック
export function calculateLifePathNumber(year, month, day) {
  const dateString = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`;
  
  function sumDigits(num) {
    return String(num).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  
  let sum = sumDigits(dateString);
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sumDigits(sum);
  }
  
  return sum;
}

export function calculatePersonalYear(month, day, currentYear) {
  const monthDay = month + day;
  const yearDigits = String(currentYear).split('').reduce((sum, d) => sum + parseInt(d), 0);
  
  let sum = monthDay + yearDigits;
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split('').reduce((s, d) => s + parseInt(d), 0);
  }
  
  return sum;
}

// 西洋占星術ロジック
export function getSunSign(month, day) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return '牡羊座';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return '牡牛座';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 21)) return '双子座';
  if ((month === 6 && day >= 22) || (month === 7 && day <= 22)) return '蟹座';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return '獅子座';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return '乙女座';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 23)) return '天秤座';
  if ((month === 10 && day >= 24) || (month === 11 && day <= 22)) return '蠍座';
  if ((month === 11 && day >= 23) || (month === 12 && day <= 21)) return '射手座';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return '山羊座';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return '水瓶座';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return '魚座';
  return '牡羊座';
}
