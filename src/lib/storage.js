// localStorage管理ユーティリティ

const STORAGE_KEY = 'life_compass_saved_results';

// 保存された診断結果を取得
export function getSavedResults() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading saved results:', error);
    return [];
  }
}

// 診断結果を保存
export function saveResult(result) {
  try {
    const savedResults = getSavedResults();
    
    // 新しい結果を追加
    const newResult = {
      id: Date.now().toString(),
      savedAt: new Date().toISOString(),
      name: result.user?.name || result.person1?.name || '名前なし',
      birthDate: {
        year: result.user?.year || result.person1?.year,
        month: result.user?.month || result.person1?.month,
        day: result.user?.day || result.person1?.day
      },
      mbtiType: result.mbti?.type || result.person1?.mbtiType || null,
      type: result.person1 && result.person2 ? 'compatibility' : 'personal',
      result: result
    };
    
    // 最新の結果を先頭に追加
    savedResults.unshift(newResult);
    
    // 最大20件まで保存
    const limitedResults = savedResults.slice(0, 20);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedResults));
    return newResult;
  } catch (error) {
    console.error('Error saving result:', error);
    throw error;
  }
}

// 保存された結果を削除
export function deleteResult(id) {
  try {
    const savedResults = getSavedResults();
    const filteredResults = savedResults.filter(result => result.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredResults));
    return true;
  } catch (error) {
    console.error('Error deleting result:', error);
    return false;
  }
}

// すべての保存された結果を削除
export function clearAllResults() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing results:', error);
    return false;
  }
}

// 保存された結果から基本情報を取得
export function getBasicInfoFromSaved(savedResult) {
  return {
    name: savedResult.name,
    year: savedResult.birthDate.year,
    month: savedResult.birthDate.month,
    day: savedResult.birthDate.day,
    mbtiType: savedResult.mbtiType
  };
}

// 保存された個人診断結果の一覧を取得
export function getSavedPersonalResults() {
  const allResults = getSavedResults();
  return allResults.filter(result => result.type === 'personal');
}

// 保存された相性診断結果の一覧を取得
export function getSavedCompatibilityResults() {
  const allResults = getSavedResults();
  return allResults.filter(result => result.type === 'compatibility');
}

