// 数秘術の詳細ロジック（ともこ式数秘術に基づく）

// 才能数の計算（生まれた日のみ）
export function calculateTalentNumber(day) {
  let sum = day;
  
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = String(sum).split('').reduce((s, d) => s + parseInt(d), 0);
  }
  
  return sum;
}

// 本質数の計算（生年月日全て）
export function calculateEssenceNumber(year, month, day) {
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

// 探究数の計算（月日のみ）
export function calculateExplorationNumber(month, day) {
  let sum = month + day;
  
  while (sum > 9 && sum !== 11) {
    sum = String(sum).split('').reduce((s, d) => s + parseInt(d), 0);
  }
  
  return sum;
}

// 人生9年サイクルの計算
export function calculatePersonalYear(month, day, currentYear, birthYear, birthMonth, birthDay) {
  const today = new Date();
  const currentYearToUse = today.getFullYear();
  const hasBirthdayPassed = 
    today.getMonth() + 1 > birthMonth || 
    (today.getMonth() + 1 === birthMonth && today.getDate() >= birthDay);
  
  const yearToCalculate = hasBirthdayPassed ? currentYearToUse : currentYearToUse - 1;
  
  const monthDay = month + day;
  const yearDigits = String(yearToCalculate).split('').reduce((sum, d) => sum + parseInt(d), 0);
  
  let sum = monthDay + yearDigits;
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split('').reduce((s, d) => s + parseInt(d), 0);
  }
  
  return sum;
}

// バランスボックスの分類
export function getBalanceBoxClassification(number) {
  // マスターナンバーを基礎数字に変換（分類用）
  const baseNumber = number === 11 ? 2 : number === 22 ? 4 : number === 33 ? 6 : number;
  
  // 陰陽バランス
  let energy;
  if ([1, 3, 5, 8].includes(baseNumber)) {
    energy = '陽';
  } else if ([2, 4, 7].includes(baseNumber)) {
    energy = '陰';
  } else if ([6, 9].includes(baseNumber)) {
    energy = '中庸';
  }
  
  // マスターナンバーの場合は高次元を追加
  if (number === 11 || number === 22) {
    energy = `高次元な${energy}`;
  } else if (number === 33) {
    energy = '高次元な中庸';
  }
  
  // 思考パターン（横列）
  let thinkingPattern;
  if ([1, 2, 3].includes(baseNumber)) {
    thinkingPattern = '創造派';
  } else if ([4, 5, 6].includes(baseNumber)) {
    thinkingPattern = '発展派';
  } else if ([7, 8, 9].includes(baseNumber)) {
    thinkingPattern = '完結派';
  }
  
  // 集団行動パターン（縦列）
  let behaviorPattern;
  if ([3, 5, 8].includes(baseNumber)) {
    behaviorPattern = '行動派';
  } else if ([1, 6, 9].includes(baseNumber)) {
    behaviorPattern = '統括派';
  } else if ([2, 4, 7].includes(baseNumber)) {
    behaviorPattern = '慎重派';
  }
  
  return {
    energy,
    thinkingPattern,
    behaviorPattern,
    isMasterNumber: [11, 22, 33].includes(number)
  };
}

// 行動タイプの分類（数秘行動分析ツール）
export function getBehaviorType(number) {
  // マスターナンバーを基礎数字に変換
  const baseNumber = number === 11 ? 2 : number === 22 ? 4 : number === 33 ? 6 : number;
  
  if ([1, 8].includes(baseNumber)) {
    return {
      type: '主導的',
      description: '直接的で決断が早い傾向がある',
      traits: [
        '意思が強く、行動的でチャレンジ精神に富む',
        '意思決定が早く、自分なりのやり方で結果をだそうとする',
        '困難やピンチに向かう強いメンタルを持っている',
        '細かく指示を出されることを嫌う'
      ]
    };
  } else if ([3, 5].includes(baseNumber)) {
    return {
      type: '社交的',
      description: '楽観的で好奇心旺盛である',
      traits: [
        '明るく社交的な性格で、人と接するのを好む',
        '感情表現が豊かで、物事を肯定的に捉える',
        '難しいことでも安易に引き受ける',
        '粘り強さや緻密性に欠けるところがある'
      ]
    };
  } else if ([2, 9].includes(baseNumber)) {
    return {
      type: '共感的',
      description: '思いやりがあり受容性がある',
      traits: [
        '言われたことを、言われた通りに忠実にこなす',
        '迷惑をかけないよう、常に気配りを忘れない',
        '人が喜ぶ姿が自分の喜びにつながる',
        '慣れ親しんだやり方で、成果を上げようとする'
      ]
    };
  } else if ([4, 7].includes(baseNumber)) {
    return {
      type: '緻密的',
      description: '慎重で正確さを重んじる',
      traits: [
        'メリット・デメリットを検討した上で、慎重に結論を出す',
        '納得してから行動に移す傾向がある',
        '曖昧さより具体的な言葉を好む',
        '細かいところにこだわりを持ち、些細なミスや間違いを嫌う'
      ]
    };
  } else if (baseNumber === 6) {
    return {
      type: '調和的',
      description: '全体のバランスを整え丸く収める',
      traits: [
        '頼まれると嫌とは言えず、世話をやいてしまう',
        '物事について多くの意見を持つ傾向がある',
        '正しさへの価値を強く抱いている',
        '責任とは「負うべきもの」と思いがちである'
      ]
    };
  } else if ([11, 22, 33].includes(number)) {
    return {
      type: '直観的',
      description: '高次元とつながるツールを持つ',
      traits: [
        '「変わっている」と思われる部分がある',
        '言語化するのは苦手だが、優れた感性を持っている',
        '個性的な部分を本人が気づいているかがポイントになる',
        '生きざまそのものが注目されやすい傾向がある'
      ]
    };
  }
  
  return null;
}

// 人生9年サイクルの各年の意味
export function getPersonalYearMeaning(year) {
  const meanings = {
    1: {
      title: '発展の年',
      description: '新しい始まり、種まきの年。新しいプロジェクトや目標を始めるのに最適な時期です。',
      keywords: ['始まり', '独立', 'リーダーシップ', '新しい挑戦'],
      advice: '自信を持って新しいことに挑戦しましょう。あなたのアイデアを形にする時です。'
    },
    2: {
      title: '協調の年',
      description: '協力、育成の年。人間関係を深め、パートナーシップを築く時期です。',
      keywords: ['協力', '調和', 'パートナーシップ', '忍耐'],
      advice: '焦らず、他者との協力関係を大切にしましょう。感受性を活かす時です。'
    },
    3: {
      title: '創造の年',
      description: '創造、表現の年。自己表現を楽しみ、創造性を発揮する時期です。',
      keywords: ['創造性', '表現', 'コミュニケーション', '楽しみ'],
      advice: '自分の才能を表現し、楽しむことを忘れずに。社交的になる時です。'
    },
    4: {
      title: '安定の年',
      description: '安定、基盤作りの年。努力と規律を通じて、確固たる基盤を築く時期です。',
      keywords: ['安定', '努力', '規律', '基盤'],
      advice: '地道な努力を続けましょう。将来のための土台を固める時です。'
    },
    5: {
      title: '変化の年',
      description: '変化、自由の年。新しい経験を求め、自由を楽しむ時期です。',
      keywords: ['変化', '自由', '冒険', '柔軟性'],
      advice: '変化を恐れず、新しい経験を積極的に受け入れましょう。'
    },
    6: {
      title: '愛と責任の年',
      description: '愛、責任の年。家族や身近な人への責任を果たし、愛を育む時期です。',
      keywords: ['愛', '責任', '家族', '奉仕'],
      advice: '大切な人との絆を深め、責任を果たすことで成長します。'
    },
    7: {
      title: '内省の年',
      description: '内省、学びの年。自己を見つめ直し、精神的な成長を遂げる時期です。',
      keywords: ['内省', '学び', 'スピリチュアル', '分析'],
      advice: '一人の時間を大切にし、内面と向き合いましょう。学びを深める時です。'
    },
    8: {
      title: '達成の年',
      description: '達成、収穫の年。これまでの努力が実を結び、成功を収める時期です。',
      keywords: ['達成', '成功', '豊かさ', '権力'],
      advice: 'これまでの努力が報われる時。自信を持って前進しましょう。'
    },
    9: {
      title: '完結の年',
      description: '完結、手放しの年。古いものを手放し、新しいサイクルに備える時期です。',
      keywords: ['完結', '手放し', '寛容', '人道主義'],
      advice: '終わりは新しい始まりです。過去を手放し、次のステージに進みましょう。'
    },
    11: {
      title: '啓示の年',
      description: 'スピリチュアルな洞察と直感が高まる特別な年。高次の導きを受ける時期です。',
      keywords: ['直感', 'インスピレーション', '啓示', 'スピリチュアル'],
      advice: '直感を信じ、内なる声に耳を傾けましょう。精神的な成長の時です。'
    },
    22: {
      title: 'マスタービルダーの年',
      description: '大きな夢を実現する力が与えられる特別な年。理想を形にする時期です。',
      keywords: ['実現', '構築', 'マスター', '大きな目標'],
      advice: '大きな夢を現実にする力があります。理想を形にしましょう。'
    },
    33: {
      title: 'マスターティーチャーの年',
      description: '無条件の愛と奉仕を通じて、他者を導く特別な年。癒しと教えの時期です。',
      keywords: ['愛', '奉仕', '癒し', '教え'],
      advice: '他者への奉仕を通じて、自己実現を果たす時です。愛を広げましょう。'
    }
  };
  
  return meanings[year] || meanings[1];
}

// 数秘術の総合診断結果を生成
export function generateNumerologyResult(year, month, day) {
  const talentNumber = calculateTalentNumber(day);
  const essenceNumber = calculateEssenceNumber(year, month, day);
  const explorationNumber = calculateExplorationNumber(month, day);
  const personalYear = calculatePersonalYear(month, day, new Date().getFullYear(), year, month, day);
  
  const talentBehavior = getBehaviorType(talentNumber);
  const essenceBehavior = getBehaviorType(essenceNumber);
  
  const talentBalance = getBalanceBoxClassification(talentNumber);
  const essenceBalance = getBalanceBoxClassification(essenceNumber);
  const explorationBalance = getBalanceBoxClassification(explorationNumber);
  
  const personalYearMeaning = getPersonalYearMeaning(personalYear);
  
  return {
    talentNumber,
    essenceNumber,
    explorationNumber,
    personalYear,
    talentBehavior,
    essenceBehavior,
    talentBalance,
    essenceBalance,
    explorationBalance,
    personalYearMeaning
  };
}
