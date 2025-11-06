// 相性診断ロジック

import { generateNumerologyResult } from './numerology';
import { getSunSign } from './diagnosis';

// 数秘術相性の計算
export function calculateNumerologyCompatibility(person1Numerology, person2Numerology) {
  // 本質数の相性
  const essenceCompatibility = calculateNumberCompatibility(
    person1Numerology.essenceNumber,
    person2Numerology.essenceNumber
  );
  
  // 才能数の相性
  const talentCompatibility = calculateNumberCompatibility(
    person1Numerology.talentNumber,
    person2Numerology.talentNumber
  );
  
  // 探究数の相性
  const explorationCompatibility = calculateNumberCompatibility(
    person1Numerology.explorationNumber,
    person2Numerology.explorationNumber
  );
  
  // 総合スコア（本質数を重視）
  const totalScore = Math.round(
    essenceCompatibility.score * 0.5 +
    talentCompatibility.score * 0.3 +
    explorationCompatibility.score * 0.2
  );
  
  return {
    essenceCompatibility,
    talentCompatibility,
    explorationCompatibility,
    totalScore,
    level: getCompatibilityLevel(totalScore)
  };
}

// 2つの数字の相性を計算
function calculateNumberCompatibility(num1, num2) {
  // 相性マトリックス（1-9、11、22、33）
  const compatibilityMatrix = {
    1: { 1: 70, 2: 60, 3: 85, 4: 50, 5: 90, 6: 65, 7: 55, 8: 75, 9: 80, 11: 85, 22: 80, 33: 75 },
    2: { 1: 60, 2: 75, 3: 70, 4: 85, 5: 55, 6: 90, 7: 65, 8: 80, 9: 85, 11: 90, 22: 85, 33: 95 },
    3: { 1: 85, 2: 70, 3: 80, 4: 60, 5: 95, 6: 75, 7: 65, 8: 70, 9: 85, 11: 80, 22: 75, 33: 80 },
    4: { 1: 50, 2: 85, 3: 60, 4: 70, 5: 55, 6: 80, 7: 75, 8: 90, 9: 65, 11: 70, 22: 95, 33: 80 },
    5: { 1: 90, 2: 55, 3: 95, 4: 55, 5: 85, 6: 60, 7: 80, 8: 65, 9: 75, 11: 85, 22: 70, 33: 75 },
    6: { 1: 65, 2: 90, 3: 75, 4: 80, 5: 60, 6: 85, 7: 70, 8: 75, 9: 90, 11: 85, 22: 80, 33: 95 },
    7: { 1: 55, 2: 65, 3: 65, 4: 75, 5: 80, 6: 70, 7: 80, 8: 60, 9: 75, 11: 95, 22: 85, 33: 80 },
    8: { 1: 75, 2: 80, 3: 70, 4: 90, 5: 65, 6: 75, 7: 60, 8: 85, 9: 70, 11: 80, 22: 95, 33: 85 },
    9: { 1: 80, 2: 85, 3: 85, 4: 65, 5: 75, 6: 90, 7: 75, 8: 70, 9: 90, 11: 90, 22: 85, 33: 95 },
    11: { 1: 85, 2: 90, 3: 80, 4: 70, 5: 85, 6: 85, 7: 95, 8: 80, 9: 90, 11: 95, 22: 90, 33: 95 },
    22: { 1: 80, 2: 85, 3: 75, 4: 95, 5: 70, 6: 80, 7: 85, 8: 95, 9: 85, 11: 90, 22: 90, 33: 90 },
    33: { 1: 75, 2: 95, 3: 80, 4: 80, 5: 75, 6: 95, 7: 80, 8: 85, 9: 95, 11: 95, 22: 90, 33: 95 }
  };
  
  const score = compatibilityMatrix[num1]?.[num2] || 70;
  
  return {
    score,
    description: getNumberCompatibilityDescription(num1, num2, score)
  };
}

// 数字相性の説明文を生成
function getNumberCompatibilityDescription(num1, num2, score) {
  if (num1 === num2) {
    return '同じ数字を持つ二人は、深い理解と共感を持ち合います。価値観が一致しやすく、お互いの気持ちが分かり合える関係です。';
  }
  
  if (score >= 90) {
    return '非常に相性が良い組み合わせです。お互いの長所を引き出し合い、補完し合える理想的な関係を築けます。';
  } else if (score >= 80) {
    return '良好な相性です。お互いを尊重し、成長し合える関係を築けます。';
  } else if (score >= 70) {
    return 'バランスの取れた相性です。お互いの違いを理解し、歩み寄ることで良い関係を築けます。';
  } else if (score >= 60) {
    return '努力が必要な組み合わせです。お互いの違いを認め合い、コミュニケーションを大切にしましょう。';
  } else {
    return '課題のある組み合わせです。お互いの個性を尊重し、理解を深める努力が必要です。';
  }
}

// 西洋占星術相性の計算
export function calculateAstrologyCompatibility(sign1, sign2) {
  // 星座のエレメント
  const elements = {
    '牡羊座': '火', '獅子座': '火', '射手座': '火',
    '牡牛座': '地', '乙女座': '地', '山羊座': '地',
    '双子座': '風', '天秤座': '風', '水瓶座': '風',
    '蟹座': '水', '蠍座': '水', '魚座': '水'
  };
  
  const element1 = elements[sign1];
  const element2 = elements[sign2];
  
  // エレメント相性マトリックス
  const elementCompatibility = {
    '火': { '火': 90, '地': 60, '風': 85, '水': 55 },
    '地': { '火': 60, '地': 85, '風': 65, '水': 90 },
    '風': { '火': 85, '地': 65, '風': 90, '水': 70 },
    '水': { '火': 55, '地': 90, '風': 70, '水': 85 }
  };
  
  const score = elementCompatibility[element1]?.[element2] || 70;
  
  // 同じ星座の場合はボーナス
  const finalScore = sign1 === sign2 ? Math.min(score + 10, 100) : score;
  
  return {
    score: finalScore,
    element1,
    element2,
    description: getAstrologyCompatibilityDescription(element1, element2, sign1, sign2, finalScore)
  };
}

// 占星術相性の説明文を生成
function getAstrologyCompatibilityDescription(element1, element2, sign1, sign2, score) {
  if (sign1 === sign2) {
    return `同じ${sign1}同士は、価値観や感性が似ており、お互いを深く理解できます。共通の目標に向かって協力し合える関係です。`;
  }
  
  if (element1 === element2) {
    return `同じ${element1}のエレメントを持つ二人は、感覚や価値観が似ており、自然体で付き合える関係です。`;
  }
  
  const elementPairs = {
    '火-風': '火と風は相性が良く、お互いを刺激し合い、活発で創造的な関係を築けます。',
    '風-火': '風と火は相性が良く、お互いを刺激し合い、活発で創造的な関係を築けます。',
    '地-水': '地と水は相性が良く、安定と感情のバランスが取れた、深い絆を育める関係です。',
    '水-地': '水と地は相性が良く、安定と感情のバランスが取れた、深い絆を育める関係です。',
    '火-地': '火と地は異なる性質ですが、お互いの長所を認め合うことで、バランスの取れた関係を築けます。',
    '地-火': '地と火は異なる性質ですが、お互いの長所を認め合うことで、バランスの取れた関係を築けます。',
    '風-水': '風と水は異なるアプローチを持ちますが、理解を深めることで、新しい視点を得られる関係です。',
    '水-風': '水と風は異なるアプローチを持ちますが、理解を深めることで、新しい視点を得られる関係です。',
    '火-水': '火と水は対照的な性質ですが、お互いを補完し合うことで、成長できる関係です。',
    '水-火': '水と火は対照的な性質ですが、お互いを補完し合うことで、成長できる関係です。',
    '地-風': '地と風は異なる視点を持ちますが、お互いから学び合うことで、視野を広げられる関係です。',
    '風-地': '風と地は異なる視点を持ちますが、お互いから学び合うことで、視野を広げられる関係です。'
  };
  
  return elementPairs[`${element1}-${element2}`] || 'お互いの個性を尊重し合うことで、良い関係を築けます。';
}

// MBTI相性の計算
export function calculateMBTICompatibility(type1, type2) {
  if (!type1 || !type2) {
    return null;
  }
  
  // MBTI相性マトリックス（簡易版）
  const compatibilityScores = {
    'INTJ': { 'ENFP': 95, 'ENTP': 90, 'INFJ': 85, 'INTJ': 80, 'ENTJ': 85, 'INTP': 85 },
    'INTP': { 'ENTJ': 95, 'ENFJ': 90, 'INFP': 85, 'INTP': 80, 'INTJ': 85, 'ENTP': 85 },
    'ENTJ': { 'INTP': 95, 'INFP': 90, 'INTJ': 85, 'ENTJ': 80, 'ENTP': 85, 'ENFP': 85 },
    'ENTP': { 'INFJ': 95, 'INTJ': 90, 'ENFP': 85, 'ENTP': 80, 'ENTJ': 85, 'INTP': 85 },
    'INFJ': { 'ENTP': 95, 'ENFP': 90, 'INFJ': 85, 'INFP': 85, 'INTJ': 85, 'ENFJ': 85 },
    'INFP': { 'ENFJ': 95, 'ENTJ': 90, 'INFJ': 85, 'INFP': 80, 'ENFP': 85, 'INTP': 85 },
    'ENFJ': { 'INFP': 95, 'INTP': 90, 'ENFJ': 85, 'ENFP': 85, 'INFJ': 85, 'ENTJ': 80 },
    'ENFP': { 'INTJ': 95, 'INFJ': 90, 'ENFP': 85, 'ENTP': 85, 'ENFJ': 85, 'INFP': 85 },
    'ISTJ': { 'ESFP': 90, 'ESTP': 85, 'ISFJ': 85, 'ISTJ': 80, 'ESTJ': 85, 'ISTP': 75 },
    'ISFJ': { 'ESFP': 90, 'ESTP': 85, 'ISTJ': 85, 'ISFJ': 85, 'ESFJ': 85, 'ISFP': 80 },
    'ESTJ': { 'ISFP': 90, 'ISTP': 85, 'ISTJ': 85, 'ESTJ': 80, 'ESFJ': 85, 'ESTP': 85 },
    'ESFJ': { 'ISFP': 90, 'ISTP': 85, 'ISFJ': 85, 'ESFJ': 85, 'ESTJ': 85, 'ESFP': 85 },
    'ISTP': { 'ESFJ': 90, 'ESTJ': 85, 'ISFP': 85, 'ISTP': 75, 'ESTP': 85, 'ISTJ': 75 },
    'ISFP': { 'ENFJ': 90, 'ESFJ': 90, 'ESTJ': 90, 'ISFP': 80, 'ESFP': 85, 'INFP': 85 },
    'ESTP': { 'ISFJ': 90, 'ISTJ': 85, 'ESFP': 85, 'ESTP': 80, 'ESTJ': 85, 'ISTP': 85 },
    'ESFP': { 'ISTJ': 90, 'ISFJ': 90, 'ESFP': 85, 'ESTP': 85, 'ESFJ': 85, 'ISFP': 85 }
  };
  
  // 相性スコアを取得（双方向チェック）
  let score = compatibilityScores[type1]?.[type2] || 
              compatibilityScores[type2]?.[type1] || 
              70;
  
  // 同じタイプの場合
  if (type1 === type2) {
    score = 80;
  }
  
  return {
    score,
    description: getMBTICompatibilityDescription(type1, type2, score)
  };
}

// MBTI相性の説明文を生成
function getMBTICompatibilityDescription(type1, type2, score) {
  if (type1 === type2) {
    return '同じMBTIタイプ同士は、思考パターンや価値観が似ており、お互いを理解しやすい関係です。';
  }
  
  if (score >= 90) {
    return '非常に相性の良い組み合わせです。お互いの強みを活かし、弱みを補い合える理想的なパートナーシップを築けます。';
  } else if (score >= 80) {
    return '良好な相性です。お互いの違いを尊重し、バランスの取れた関係を築けます。';
  } else if (score >= 70) {
    return 'バランスの取れた相性です。コミュニケーションを大切にすることで、良い関係を築けます。';
  } else {
    return '異なる性質を持つ組み合わせです。お互いの個性を理解し、歩み寄る努力が大切です。';
  }
}

// 相性レベルの判定
function getCompatibilityLevel(score) {
  if (score >= 90) return '最高の相性';
  if (score >= 80) return '非常に良い相性';
  if (score >= 70) return '良い相性';
  if (score >= 60) return '普通の相性';
  return '努力が必要な相性';
}

// 総合相性診断
export function calculateOverallCompatibility(person1, person2) {
  // 数秘術の結果を生成
  const person1Numerology = generateNumerologyResult(
    parseInt(person1.year),
    parseInt(person1.month),
    parseInt(person1.day)
  );
  
  const person2Numerology = generateNumerologyResult(
    parseInt(person2.year),
    parseInt(person2.month),
    parseInt(person2.day)
  );
  
  // 数秘術相性
  const numerologyCompatibility = calculateNumerologyCompatibility(
    person1Numerology,
    person2Numerology
  );
  
  // 占星術相性
  const person1Sign = getSunSign(parseInt(person1.month), parseInt(person1.day));
  const person2Sign = getSunSign(parseInt(person2.month), parseInt(person2.day));
  const astrologyCompatibility = calculateAstrologyCompatibility(person1Sign, person2Sign);
  
  // MBTI相性（任意）
  const mbtiCompatibility = person1.mbtiType && person2.mbtiType
    ? calculateMBTICompatibility(person1.mbtiType, person2.mbtiType)
    : null;
  
  // 総合スコア計算
  let totalScore;
  if (mbtiCompatibility) {
    // MBTIがある場合: 数秘40% + 占星術30% + MBTI30%
    totalScore = Math.round(
      numerologyCompatibility.totalScore * 0.4 +
      astrologyCompatibility.score * 0.3 +
      mbtiCompatibility.score * 0.3
    );
  } else {
    // MBTIがない場合: 数秘60% + 占星術40%
    totalScore = Math.round(
      numerologyCompatibility.totalScore * 0.6 +
      astrologyCompatibility.score * 0.4
    );
  }
  
  return {
    person1: {
      ...person1,
      numerology: person1Numerology,
      sunSign: person1Sign
    },
    person2: {
      ...person2,
      numerology: person2Numerology,
      sunSign: person2Sign
    },
    numerologyCompatibility,
    astrologyCompatibility,
    mbtiCompatibility,
    totalScore,
    level: getCompatibilityLevel(totalScore),
    advice: generateCompatibilityAdvice(totalScore, numerologyCompatibility, astrologyCompatibility, mbtiCompatibility)
  };
}

// 相性アドバイスを生成
function generateCompatibilityAdvice(totalScore, numerology, astrology, mbti) {
  const advice = [];
  
  // 総合評価
  if (totalScore >= 85) {
    advice.push('素晴らしい相性です！お互いを深く理解し、支え合える関係を築けます。');
  } else if (totalScore >= 75) {
    advice.push('とても良い相性です。お互いの長所を活かし合い、成長できる関係です。');
  } else if (totalScore >= 65) {
    advice.push('バランスの取れた相性です。コミュニケーションを大切にすることで、より良い関係を築けます。');
  } else {
    advice.push('お互いの違いを理解し、歩み寄る努力が大切です。違いを受け入れることで、新しい視点を得られます。');
  }
  
  // 数秘術からのアドバイス
  if (numerology.totalScore >= 80) {
    advice.push('数秘術的には非常に相性が良く、価値観や人生の目的が調和しています。');
  } else if (numerology.totalScore < 65) {
    advice.push('数秘術的には課題がありますが、お互いの個性を尊重することで、補完し合える関係を築けます。');
  }
  
  // 占星術からのアドバイス
  if (astrology.score >= 85) {
    advice.push('星座の相性が良く、自然体で付き合える関係です。');
  }
  
  // MBTIからのアドバイス
  if (mbti && mbti.score >= 90) {
    advice.push('性格タイプの相性が非常に良く、お互いの強みを活かし合える理想的な組み合わせです。');
  }
  
  return advice;
}

