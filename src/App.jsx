import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Star, Brain, Calculator, Telescope, Users, Save, Trash2, Clock, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import './App.css';
import { mbtiQuestions, calculateMBTI, getSunSign } from './lib/diagnosis';
import { mbtiTypes, numerologyData, zodiacData } from './lib/data';
import { generateNumerologyResult } from './lib/numerology';
import { numerologyNumbers, talentNumberDescriptions, essenceNumberDescriptions, explorationNumberDescriptions } from './lib/numerologyData';
import { calculateOverallCompatibility } from './lib/compatibility';
import { getSavedResults, saveResult, deleteResult, getBasicInfoFromSaved } from './lib/storage';

function App() {
  const [mode, setMode] = useState(null); // null, 'personal', 'compatibility'
  const [step, setStep] = useState('home'); // home, input, questions, result, compatibility-input, compatibility-questions, compatibility-result
  const [userInfo, setUserInfo] = useState({
    name: '',
    year: '',
    month: '',
    day: ''
  });
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [result, setResult] = useState(null);
  
  // 相性診断用のstate
  const [person1, setPerson1] = useState({
    name: '',
    year: '',
    month: '',
    day: '',
    mbtiType: null
  });
  const [person2, setPerson2] = useState({
    name: '',
    year: '',
    month: '',
    day: '',
    mbtiType: null
  });
  const [currentPerson, setCurrentPerson] = useState(1); // 1 or 2
  const [compatibilityResult, setCompatibilityResult] = useState(null);
  
  // 保存機能用のstate
  const [savedResults, setSavedResults] = useState(getSavedResults());
  const [showSavedResults, setShowSavedResults] = useState(false);

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    if (selectedMode === 'personal') {
      setStep('input');
    } else if (selectedMode === 'compatibility') {
      setStep('compatibility-input');
    }
  };

  const handleStartDiagnosis = () => {
    setMode('personal');
    setStep('input');
  };

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    if (userInfo.name && userInfo.year && userInfo.month && userInfo.day) {
      setStep('questions');
    }
  };

  const handleAnswerSelect = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (currentQuestion < mbtiQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      // 診断完了
      calculateResult();
    }
  };

  const calculateResult = () => {
    try {
      console.log('Starting calculation...');
      console.log('User info:', userInfo);
      console.log('Answers:', answers);
      
      // MBTI計算
      const mbtiAnswers = Object.entries(answers).map(([questionId, value]) => ({
        questionId: parseInt(questionId),
        value
      }));
      console.log('MBTI answers:', mbtiAnswers);
      const mbtiResult = calculateMBTI(mbtiAnswers);
      console.log('MBTI result:', mbtiResult);
      
      // 数秘術計算（拡張版）
      console.log('Calculating numerology...');
      const numerologyResult = generateNumerologyResult(
        parseInt(userInfo.year),
        parseInt(userInfo.month),
        parseInt(userInfo.day)
      );
      console.log('Numerology result:', numerologyResult);
      
      // 西洋占星術計算
      console.log('Calculating astrology...');
      const sunSign = getSunSign(parseInt(userInfo.month), parseInt(userInfo.day));
      console.log('Sun sign:', sunSign);
      
      const finalResult = {
        user: userInfo,
        mbti: {
          ...mbtiResult,
          details: mbtiTypes[mbtiResult.type]
        },
        numerology: numerologyResult,
        astrology: {
          sunSign,
          details: zodiacData[sunSign]
        }
      };
      
      console.log('Final result:', finalResult);
      setResult(finalResult);
      setStep('result');
    } catch (error) {
      console.error('Error in calculateResult:', error);
      console.error('Error stack:', error.stack);
      alert('診断結果の計算中にエラーが発生しました: ' + error.message);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleCompatibilitySubmit = (e) => {
    e.preventDefault();
    
    // 両者の生年月日が入力されているか確認
    if (person1.name && person1.year && person1.month && person1.day &&
        person2.name && person2.year && person2.month && person2.day) {
      try {
        console.log('Calculating compatibility...');
        console.log('Person 1:', person1);
        console.log('Person 2:', person2);
        
        const result = calculateOverallCompatibility(person1, person2);
        console.log('Compatibility result:', result);
        
        setCompatibilityResult(result);
        setStep('compatibility-result');
      } catch (error) {
        console.error('Error in compatibility calculation:', error);
        alert('相性診断の計算中にエラーが発生しました: ' + error.message);
      }
    }
  };

  const handleSaveResult = (resultToSave) => {
    try {
      const saved = saveResult(resultToSave);
      setSavedResults(getSavedResults());
      alert('診断結果を保存しました！');
      return saved;
    } catch (error) {
      alert('保存に失敗しました: ' + error.message);
      return null;
    }
  };

  const handleDeleteResult = (id) => {
    if (confirm('この診断結果を削除しますか？')) {
      deleteResult(id);
      setSavedResults(getSavedResults());
    }
  };

  const handleLoadSavedInfo = (savedResult) => {
    const info = getBasicInfoFromSaved(savedResult);
    if (mode === 'personal') {
      setUserInfo(info);
      setShowSavedResults(false);
    } else if (mode === 'compatibility') {
      if (currentPerson === 1) {
        setPerson1(info);
      } else {
        setPerson2(info);
      }
      setShowSavedResults(false);
    }
  };

  const handleRestart = () => {
    setStep('home');
    setMode(null);
    setUserInfo({ name: '', year: '', month: '', day: '' });
    setAnswers({});
    setCurrentQuestion(0);
    setResult(null);
    setPerson1({ name: '', year: '', month: '', day: '', mbtiType: null });
    setPerson2({ name: '', year: '', month: '', day: '', mbtiType: null });
    setCompatibilityResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <AnimatePresence mode="wait">
        {step === 'home' && <HomePage key="home" onModeSelect={handleModeSelect} />}
        {step === 'input' && (
          <InputPage
            key="input"
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            onSubmit={handleUserInfoSubmit}
            onBack={() => { setStep('home'); setMode(null); }}
          />
        )}
        {step === 'questions' && (
          <QuestionsPage
            key="questions"
            currentQuestion={currentQuestion}
            answers={answers}
            onAnswer={handleAnswerSelect}
            onPrev={handlePrevQuestion}
          />
        )}
        {step === 'result' && result && (
          <ResultPage 
            key="result" 
            result={result} 
            onRestart={handleRestart}
            onSave={handleSaveResult}
          />
        )}
        {step === 'compatibility-input' && (
          <CompatibilityInputPage
            key="compatibility-input"
            person1={person1}
            person2={person2}
            setPerson1={setPerson1}
            setPerson2={setPerson2}
            onSubmit={handleCompatibilitySubmit}
            onBack={() => { setStep('home'); setMode(null); }}
          />
        )}
        {step === 'compatibility-result' && compatibilityResult && (
          <CompatibilityResultPage
            key="compatibility-result"
            result={compatibilityResult}
            onRestart={handleRestart}
            onSave={handleSaveResult}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function HomePage({ onModeSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-12 h-12 text-purple-600 mr-3" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Life Compass
          </h1>
        </div>
        <p className="text-2xl text-gray-700 mb-4">
          3つの視点で、本当のあなたを発見する
        </p>
        <p className="text-lg text-gray-600">
          MBTI・数秘術・西洋占星術が導く、あなただけの人生の羅針盤
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl"
      >
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100">
          <Brain className="w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-gray-800">MBTI</h3>
          <p className="text-gray-600">心の傾向を知る</p>
          <p className="text-sm text-gray-500 mt-2">
            16タイプの性格診断で、あなたの思考パターンと行動傾向を明らかにします
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100">
          <Calculator className="w-12 h-12 text-amber-600 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-gray-800">数秘術</h3>
          <p className="text-gray-600">人生の目的を知る</p>
          <p className="text-sm text-gray-500 mt-2">
            生年月日から導き出される数字で、あなたの人生の使命を解き明かします
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-purple-100">
          <Telescope className="w-12 h-12 text-purple-600 mb-4" />
          <h3 className="text-xl font-bold mb-2 text-gray-800">西洋占星術</h3>
          <p className="text-gray-600">運命の流れを知る</p>
          <p className="text-sm text-gray-500 mt-2">
            星座の配置から、あなたの性格と人生の方向性を読み解きます
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col md:flex-row gap-6"
      >
        <Button
          onClick={() => onModeSelect('personal')}
          size="lg"
          className="text-lg px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-xl"
        >
          <Sparkles className="w-5 h-5 mr-2" />
          個人診断を始める
        </Button>
        
        <Button
          onClick={() => onModeSelect('compatibility')}
          size="lg"
          className="text-lg px-12 py-6 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-full shadow-xl"
        >
          <Users className="w-5 h-5 mr-2" />
          相性診断を始める
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center text-sm text-gray-500"
      >
        <p>所要時間: 個人診断 約5分 / 相性診断 約3分 | 完全無料 | 詳細なレポート付き</p>
      </motion.div>
    </motion.div>
  );
}

function InputPage({ userInfo, setUserInfo, onSubmit, onBack }) {
  const [showSaved, setShowSaved] = useState(false);
  const savedResults = getSavedResults().filter(r => r.type === 'personal');
  
  const handleLoadSaved = (saved) => {
    const info = getBasicInfoFromSaved(saved);
    setUserInfo(info);
    setShowSaved(false);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-md w-full border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          基本情報を入力
        </h2>
        
        {savedResults.length > 0 && (
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowSaved(!showSaved)}
              className="w-full px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4" />
              保存された情報を読み込む
            </button>
            
            {showSaved && (
              <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                {savedResults.map(saved => (
                  <button
                    key={saved.id}
                    type="button"
                    onClick={() => handleLoadSaved(saved)}
                    className="w-full px-4 py-3 bg-white border border-purple-200 hover:border-purple-400 rounded-lg text-left transition"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-800">{saved.name}</div>
                        <div className="text-sm text-gray-500">
                          {saved.birthDate.year}/{saved.birthDate.month}/{saved.birthDate.day}
                          {saved.mbtiType && ` - ${saved.mbtiType}`}
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-purple-400" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              お名前（ニックネーム可）
            </label>
            <input
              type="text"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="例: 太郎"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              生年月日
            </label>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                value={userInfo.year}
                onChange={(e) => setUserInfo({ ...userInfo, year: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="年"
                min="1900"
                max="2025"
                required
              />
              <input
                type="number"
                value={userInfo.month}
                onChange={(e) => setUserInfo({ ...userInfo, month: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="月"
                min="1"
                max="12"
                required
              />
              <input
                type="number"
                value={userInfo.day}
                onChange={(e) => setUserInfo({ ...userInfo, day: e.target.value })}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="日"
                min="1"
                max="31"
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="flex-1"
            >
              戻る
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              次へ
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

function QuestionsPage({ currentQuestion, answers, onAnswer, onPrev }) {
  const question = mbtiQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mbtiQuestions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>質問 {currentQuestion + 1} / {mbtiQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-purple-100"
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-800 text-center">
            {question.text}
          </h3>

          <div className="space-y-3">
            {question.options.map((option) => (
              <motion.button
                key={option.value}
                onClick={() => onAnswer(question.id, option.value)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                  answers[question.id] === option.value
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 bg-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-gray-800">{option.text}</span>
              </motion.button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <div className="mt-6 flex justify-center">
              <Button
                onClick={onPrev}
                variant="outline"
                size="sm"
              >
                前の質問に戻る
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function ResultPage({ result, onRestart, onSave }) {
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = () => {
    if (onSave) {
      onSave(result);
      setIsSaved(true);
    }
  };
  // デバッグ: 結果オブジェクトの構造を確認
  console.log('ResultPage - Full result:', result);
  console.log('ResultPage - numerology:', result.numerology);
  console.log('ResultPage - talentNumber:', result.numerology?.talentNumber);
  console.log('ResultPage - essenceNumber:', result.numerology?.essenceNumber);
  console.log('ResultPage - explorationNumber:', result.numerology?.explorationNumber);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-6 pb-20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {result.user.name}さんの診断結果
          </h1>
          <p className="text-gray-600">3つの視点から見た、あなたの本質</p>
        </motion.div>

        {/* サマリーカード */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white">
            <Brain className="w-10 h-10 mb-3" />
            <h3 className="text-sm font-medium mb-1 opacity-90">MBTI</h3>
            <p className="text-3xl font-bold mb-2">{result.mbti.type}</p>
            <p className="text-sm opacity-90">{result.mbti.details.name}</p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl shadow-xl text-white">
            <Calculator className="w-10 h-10 mb-3" />
            <h3 className="text-sm font-medium mb-1 opacity-90">数秘術</h3>
            <p className="text-3xl font-bold mb-2">{result.numerology.essenceNumber}</p>
            <p className="text-sm opacity-90">{numerologyNumbers[result.numerology.essenceNumber]?.title}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white">
            <Telescope className="w-10 h-10 mb-3" />
            <h3 className="text-sm font-medium mb-1 opacity-90">西洋占星術</h3>
            <p className="text-3xl font-bold mb-2">{result.astrology.details.symbol}</p>
            <p className="text-sm opacity-90">{result.astrology.sunSign}</p>
          </div>
        </motion.div>

        {/* MBTI詳細 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-8 border border-blue-100"
        >
          <div className="flex items-center mb-6">
            <Brain className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">MBTI診断結果</h2>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {result.mbti.type} - {result.mbti.details.name}
            </h3>
            <p className="text-gray-600 mb-4">{result.mbti.details.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-bold text-gray-800 mb-2 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                強み
              </h4>
              <ul className="space-y-1">
                {result.mbti.details.strengths.map((strength, i) => (
                  <li key={i} className="text-gray-600 text-sm">• {strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 mb-2">成長ポイント</h4>
              <ul className="space-y-1">
                {result.mbti.details.weaknesses.map((weakness, i) => (
                  <li key={i} className="text-gray-600 text-sm">• {weakness}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">適職</h4>
            <p className="text-gray-600 text-sm">{result.mbti.details.careers.join('、')}</p>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-2">成長のアドバイス</h4>
            <p className="text-gray-600 text-sm">{result.mbti.details.growth}</p>
          </div>
        </motion.div>

        {/* 数秘術詳細 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-8 border border-amber-100"
        >
          <div className="flex items-center mb-6">
            <Calculator className="w-8 h-8 text-amber-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">数秘術診断結果（ともこ式数秘術）</h2>
          </div>
          
          {/* マイナンバー概要 */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-4 rounded-xl">
              <h4 className="font-bold text-amber-900 mb-2">才能数（外キャラ）</h4>
              <p className="text-4xl font-bold text-amber-700 mb-2">{result.numerology.talentNumber}</p>
              <p className="text-sm text-amber-800">{numerologyNumbers[result.numerology.talentNumber]?.title}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-200 to-amber-300 p-4 rounded-xl">
              <h4 className="font-bold text-amber-900 mb-2">本質数（内キャラ）</h4>
              <p className="text-4xl font-bold text-amber-700 mb-2">{result.numerology.essenceNumber}</p>
              <p className="text-sm text-amber-800">{numerologyNumbers[result.numerology.essenceNumber]?.title}</p>
            </div>
            <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-4 rounded-xl">
              <h4 className="font-bold text-amber-900 mb-2">探究数</h4>
              <p className="text-4xl font-bold text-amber-700 mb-2">{result.numerology.explorationNumber}</p>
              <p className="text-sm text-amber-800">{numerologyNumbers[result.numerology.explorationNumber]?.title}</p>
            </div>
          </div>

          {/* 才能数詳細 */}
          <div className="mb-6 pb-6 border-b border-amber-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <Star className="w-6 h-6 text-amber-500 mr-2" />
              才能数 {result.numerology.talentNumber} - {numerologyNumbers[result.numerology.talentNumber]?.title}
            </h3>
            <p className="text-gray-600 mb-3">{numerologyNumbers[result.numerology.talentNumber]?.description}</p>
            <div className="bg-amber-50 p-4 rounded-xl mb-3">
              <p className="text-sm text-gray-700">{talentNumberDescriptions[result.numerology.talentNumber]}</p>
            </div>
            {result.numerology.talentBehavior && (
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2">行動タイプ: {result.numerology.talentBehavior.type}</h4>
                <p className="text-sm text-gray-600 mb-2">{result.numerology.talentBehavior.description}</p>
                <ul className="space-y-1">
                  {result.numerology.talentBehavior.traits.map((trait, i) => (
                    <li key={i} className="text-xs text-gray-600">• {trait}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 本質数詳細 */}
          <div className="mb-6 pb-6 border-b border-amber-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <Heart className="w-6 h-6 text-amber-500 mr-2" />
              本質数 {result.numerology.essenceNumber} - {numerologyNumbers[result.numerology.essenceNumber]?.title}
            </h3>
            <p className="text-gray-600 mb-3">{numerologyNumbers[result.numerology.essenceNumber]?.description}</p>
            <div className="bg-amber-50 p-4 rounded-xl mb-3">
              <p className="text-sm text-gray-700">{essenceNumberDescriptions[result.numerology.essenceNumber]}</p>
            </div>
            <div className="mb-3">
              <h4 className="font-bold text-gray-800 mb-2">人生の目的</h4>
              <p className="text-sm text-gray-600">{numerologyNumbers[result.numerology.essenceNumber]?.lifePurpose}</p>
            </div>
            <div className="mb-3">
              <h4 className="font-bold text-gray-800 mb-2">キーワード</h4>
              <div className="flex flex-wrap gap-2">
                {numerologyNumbers[result.numerology.essenceNumber]?.keywords.map((keyword, i) => (
                  <span key={i} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            {result.numerology.essenceBehavior && (
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2">行動タイプ: {result.numerology.essenceBehavior.type}</h4>
                <p className="text-sm text-gray-600 mb-2">{result.numerology.essenceBehavior.description}</p>
                <ul className="space-y-1">
                  {result.numerology.essenceBehavior.traits.map((trait, i) => (
                    <li key={i} className="text-xs text-gray-600">• {trait}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 探究数詳細 */}
          <div className="mb-6 pb-6 border-b border-amber-200">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
              <Telescope className="w-6 h-6 text-amber-500 mr-2" />
              探究数 {result.numerology.explorationNumber} - {numerologyNumbers[result.numerology.explorationNumber]?.title}
            </h3>
            <p className="text-gray-600 mb-3">{numerologyNumbers[result.numerology.explorationNumber]?.description}</p>
            <div className="bg-amber-50 p-4 rounded-xl">
              <p className="text-sm text-gray-700">{explorationNumberDescriptions[result.numerology.explorationNumber]}</p>
            </div>
          </div>

          {/* バランスボックス */}
          <div className="mb-6 pb-6 border-b border-amber-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">バランスボックス分析</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2">陰陽バランス</h4>
                <p className="text-sm text-gray-600 mb-1">才能数: {result.numerology.talentBalance.energy}</p>
                <p className="text-sm text-gray-600 mb-1">本質数: {result.numerology.essenceBalance.energy}</p>
                <p className="text-sm text-gray-600">探究数: {result.numerology.explorationBalance.energy}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2">思考パターン</h4>
                <p className="text-sm text-gray-600 mb-1">才能数: {result.numerology.talentBalance.thinkingPattern}</p>
                <p className="text-sm text-gray-600 mb-1">本質数: {result.numerology.essenceBalance.thinkingPattern}</p>
                <p className="text-sm text-gray-600">探究数: {result.numerology.explorationBalance.thinkingPattern}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                <h4 className="font-bold text-gray-800 mb-2">集団行動パターン</h4>
                <p className="text-sm text-gray-600 mb-1">才能数: {result.numerology.talentBalance.behaviorPattern}</p>
                <p className="text-sm text-gray-600 mb-1">本質数: {result.numerology.essenceBalance.behaviorPattern}</p>
                <p className="text-sm text-gray-600">探究数: {result.numerology.explorationBalance.behaviorPattern}</p>
              </div>
            </div>
          </div>

          {/* 人生9年サイクル */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-800 mb-3">今年の人生サイクル</h3>
            <div className="mb-3">
              <p className="text-3xl font-bold text-amber-700 mb-2">パーソナルイヤー {result.numerology.personalYear}</p>
              <h4 className="text-lg font-bold text-gray-800 mb-2">{result.numerology.personalYearMeaning.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{result.numerology.personalYearMeaning.description}</p>
            </div>
            <div className="mb-3">
              <h4 className="font-bold text-gray-800 mb-2">キーワード</h4>
              <div className="flex flex-wrap gap-2">
                {result.numerology.personalYearMeaning.keywords.map((keyword, i) => (
                  <span key={i} className="px-3 py-1 bg-amber-200 text-amber-900 rounded-full text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/70 p-4 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-2">今年のアドバイス</h4>
              <p className="text-sm text-gray-700">{result.numerology.personalYearMeaning.advice}</p>
            </div>
          </div>
        </motion.div>

        {/* 西洋占星術詳細 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-8 border border-purple-100"
        >
          <div className="flex items-center mb-6">
            <Telescope className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">西洋占星術診断結果</h2>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              太陽星座: {result.astrology.sunSign} {result.astrology.details.symbol}
            </h3>
            <p className="text-gray-600 mb-4">{result.astrology.details.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-purple-50 p-4 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-2">エレメント</h4>
              <p className="text-gray-600 text-sm">{result.astrology.details.element}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <h4 className="font-bold text-gray-800 mb-2">支配星</h4>
              <p className="text-gray-600 text-sm">{result.astrology.details.ruler}</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-bold text-gray-800 mb-2">キーワード</h4>
            <div className="flex flex-wrap gap-2">
              {result.astrology.details.keywords.map((keyword, i) => (
                <span key={i} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl">
            <h4 className="font-bold text-gray-800 mb-2">相性の良い星座</h4>
            <p className="text-gray-600 text-sm">{result.astrology.details.compatibility.join('、')}</p>
          </div>
        </motion.div>

        {/* 総合メッセージ */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-3xl shadow-xl mb-8 text-white"
        >
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 mr-3" />
            <h2 className="text-2xl font-bold">総合メッセージ</h2>
          </div>
          
          <p className="text-lg leading-relaxed">
            {result.user.name}さんは、{result.mbti.type}タイプの{result.mbti.details.name}として、
            本質数{result.numerology.essenceNumber}（{numerologyNumbers[result.numerology.essenceNumber]?.title}）の数秘を持ち、{result.astrology.sunSign}の情熱を秘めています。
            あなたの強みは、{result.mbti.details.strengths[0]}と{numerologyNumbers[result.numerology.essenceNumber]?.strengths[0]}です。
            {numerologyNumbers[result.numerology.essenceNumber]?.lifePurpose}これがあなたの人生の目的です。
            {result.mbti.details.growth}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Button
            onClick={onRestart}
            size="lg"
            className="px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full shadow-xl"
          >
            もう一度診断する
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// 相性診断入力ページ
function CompatibilityInputPage({ person1, person2, setPerson1, setPerson2, onSubmit, onBack }) {
  const [showMBTI1, setShowMBTI1] = useState(false);
  const [showMBTI2, setShowMBTI2] = useState(false);
  const [showSaved1, setShowSaved1] = useState(false);
  const [showSaved2, setShowSaved2] = useState(false);
  const savedResults = getSavedResults().filter(r => r.type === 'personal');
  
  const handleLoadSaved1 = (saved) => {
    const info = getBasicInfoFromSaved(saved);
    setPerson1(info);
    setShowSaved1(false);
    if (info.mbtiType) {
      setShowMBTI1(true);
    }
  };
  
  const handleLoadSaved2 = (saved) => {
    const info = getBasicInfoFromSaved(saved);
    setPerson2(info);
    setShowSaved2(false);
    if (info.mbtiType) {
      setShowMBTI2(true);
    }
  };
  
  const mbtiTypes = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP'
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-6 flex items-center justify-center"
    >
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            相性診断
          </h1>
          <p className="text-gray-600">2人の情報を入力してください</p>
          <p className="text-sm text-gray-500 mt-2">MBTIは任意です。分からない場合はスキップできます。</p>
        </motion.div>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* Person 1 */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-pink-100"
          >
            <h3 className="text-2xl font-bold mb-4 text-pink-600">1人目の情報</h3>
            
            {savedResults.length > 0 && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setShowSaved1(!showSaved1)}
                  className="w-full px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-700 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  保存された情報を読み込む
                </button>
                
                {showSaved1 && (
                  <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                    {savedResults.map(saved => (
                      <button
                        key={saved.id}
                        type="button"
                        onClick={() => handleLoadSaved1(saved)}
                        className="w-full px-4 py-3 bg-white border border-pink-200 hover:border-pink-400 rounded-lg text-left transition"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">{saved.name}</div>
                            <div className="text-sm text-gray-500">
                              {saved.birthDate.year}/{saved.birthDate.month}/{saved.birthDate.day}
                              {saved.mbtiType && ` - ${saved.mbtiType}`}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-pink-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  お名前（ニックネーム可）
                </label>
                <input
                  type="text"
                  value={person1.name}
                  onChange={(e) => setPerson1({ ...person1, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                  placeholder="例: 太郎"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  生年月日
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    value={person1.year}
                    onChange={(e) => setPerson1({ ...person1, year: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                    placeholder="年"
                    min="1900"
                    max="2024"
                    required
                  />
                  <input
                    type="number"
                    value={person1.month}
                    onChange={(e) => setPerson1({ ...person1, month: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                    placeholder="月"
                    min="1"
                    max="12"
                    required
                  />
                  <input
                    type="number"
                    value={person1.day}
                    onChange={(e) => setPerson1({ ...person1, day: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                    placeholder="日"
                    min="1"
                    max="31"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    MBTIタイプ（任意）
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowMBTI1(!showMBTI1)}
                    className="text-sm text-pink-600 hover:text-pink-700"
                  >
                    {showMBTI1 ? '閉じる' : '入力する'}
                  </button>
                </div>
                
                {showMBTI1 && (
                  <select
                    value={person1.mbtiType || ''}
                    onChange={(e) => setPerson1({ ...person1, mbtiType: e.target.value || null })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition"
                  >
                    <option value="">選択してください</option>
                    {mbtiTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </motion.div>

          {/* Person 2 */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl shadow-xl border border-rose-100"
          >
            <h3 className="text-2xl font-bold mb-4 text-rose-600">2人目の情報</h3>
            
            {savedResults.length > 0 && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setShowSaved2(!showSaved2)}
                  className="w-full px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  保存された情報を読み込む
                </button>
                
                {showSaved2 && (
                  <div className="mt-3 space-y-2 max-h-60 overflow-y-auto">
                    {savedResults.map(saved => (
                      <button
                        key={saved.id}
                        type="button"
                        onClick={() => handleLoadSaved2(saved)}
                        className="w-full px-4 py-3 bg-white border border-rose-200 hover:border-rose-400 rounded-lg text-left transition"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">{saved.name}</div>
                            <div className="text-sm text-gray-500">
                              {saved.birthDate.year}/{saved.birthDate.month}/{saved.birthDate.day}
                              {saved.mbtiType && ` - ${saved.mbtiType}`}
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-rose-400" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  お名前（ニックネーム可）
                </label>
                <input
                  type="text"
                  value={person2.name}
                  onChange={(e) => setPerson2({ ...person2, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition"
                  placeholder="例: 花子"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  生年月日
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="number"
                    value={person2.year}
                    onChange={(e) => setPerson2({ ...person2, year: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition"
                    placeholder="年"
                    min="1900"
                    max="2024"
                    required
                  />
                  <input
                    type="number"
                    value={person2.month}
                    onChange={(e) => setPerson2({ ...person2, month: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition"
                    placeholder="月"
                    min="1"
                    max="12"
                    required
                  />
                  <input
                    type="number"
                    value={person2.day}
                    onChange={(e) => setPerson2({ ...person2, day: e.target.value })}
                    className="px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition"
                    placeholder="日"
                    min="1"
                    max="31"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    MBTIタイプ（任意）
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowMBTI2(!showMBTI2)}
                    className="text-sm text-rose-600 hover:text-rose-700"
                  >
                    {showMBTI2 ? '閉じる' : '入力する'}
                  </button>
                </div>
                
                {showMBTI2 && (
                  <select
                    value={person2.mbtiType || ''}
                    onChange={(e) => setPerson2({ ...person2, mbtiType: e.target.value || null })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition"
                  >
                    <option value="">選択してください</option>
                    {mbtiTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4"
          >
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="flex-1 py-6 text-lg rounded-xl"
            >
              戻る
            </Button>
            <Button
              type="submit"
              className="flex-1 py-6 text-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-xl"
            >
              相性を診断する
            </Button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}

// 相性診断結果ページ
function CompatibilityResultPage({ result, onRestart, onSave }) {
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSave = () => {
    if (onSave) {
      onSave(result);
      setIsSaved(true);
    }
  };
  
  console.log('CompatibilityResultPage - result:', result);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen p-6 pb-20"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12 pt-8"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            {result.person1.name}さん と {result.person2.name}さんの相性診断
          </h1>
          <p className="text-gray-600">3つの視点から見た、二人の相性</p>
        </motion.div>

        {/* 総合相性スコア */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-pink-600 to-rose-600 p-8 rounded-3xl shadow-xl mb-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">総合相性</h2>
          <div className="text-7xl font-bold mb-4">{result.totalScore}</div>
          <div className="text-2xl font-bold mb-2">{result.level}</div>
          <div className="w-full bg-white/30 rounded-full h-4 mb-4">
            <div
              className="bg-white rounded-full h-4 transition-all duration-1000"
              style={{ width: `${result.totalScore}%` }}
            />
          </div>
        </motion.div>

        {/* 数秘術相性 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-8 border border-amber-100"
        >
          <div className="flex items-center mb-6">
            <Calculator className="w-8 h-8 text-amber-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">数秘術相性</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl">
              <h4 className="font-bold text-amber-900 mb-2">{result.person1.name}さん</h4>
              <p className="text-sm text-gray-700">本質数: {result.person1.numerology.essenceNumber}</p>
              <p className="text-sm text-gray-700">才能数: {result.person1.numerology.talentNumber}</p>
              <p className="text-sm text-gray-700">探究数: {result.person1.numerology.explorationNumber}</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-xl">
              <h4 className="font-bold text-rose-900 mb-2">{result.person2.name}さん</h4>
              <p className="text-sm text-gray-700">本質数: {result.person2.numerology.essenceNumber}</p>
              <p className="text-sm text-gray-700">才能数: {result.person2.numerology.talentNumber}</p>
              <p className="text-sm text-gray-700">探究数: {result.person2.numerology.explorationNumber}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-amber-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-800">本質数の相性</h4>
                <span className="text-2xl font-bold text-amber-600">{result.numerologyCompatibility.essenceCompatibility.score}</span>
              </div>
              <p className="text-sm text-gray-600">{result.numerologyCompatibility.essenceCompatibility.description}</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-800">才能数の相性</h4>
                <span className="text-2xl font-bold text-amber-600">{result.numerologyCompatibility.talentCompatibility.score}</span>
              </div>
              <p className="text-sm text-gray-600">{result.numerologyCompatibility.talentCompatibility.description}</p>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-gray-800">探究数の相性</h4>
                <span className="text-2xl font-bold text-amber-600">{result.numerologyCompatibility.explorationCompatibility.score}</span>
              </div>
              <p className="text-sm text-gray-600">{result.numerologyCompatibility.explorationCompatibility.description}</p>
            </div>
          </div>
        </motion.div>

        {/* 占星術相性 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-8 border border-purple-100"
        >
          <div className="flex items-center mb-6">
            <Telescope className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">西洋占星術相性</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center">
              <h4 className="font-bold text-purple-900 mb-2">{result.person1.name}さん</h4>
              <p className="text-3xl font-bold text-purple-700 mb-2">{result.person1.sunSign}</p>
              <p className="text-sm text-gray-700">{result.astrologyCompatibility.element1}のエレメント</p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-xl text-center">
              <h4 className="font-bold text-rose-900 mb-2">{result.person2.name}さん</h4>
              <p className="text-3xl font-bold text-rose-700 mb-2">{result.person2.sunSign}</p>
              <p className="text-sm text-gray-700">{result.astrologyCompatibility.element2}のエレメント</p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-800">星座相性スコア</h4>
              <span className="text-3xl font-bold text-purple-600">{result.astrologyCompatibility.score}</span>
            </div>
            <p className="text-gray-600">{result.astrologyCompatibility.description}</p>
          </div>
        </motion.div>

        {/* MBTI相性（ある場合のみ） */}
        {result.mbtiCompatibility && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-xl mb-8 border border-blue-100"
          >
            <div className="flex items-center mb-6">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">MBTI相性</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center">
                <h4 className="font-bold text-blue-900 mb-2">{result.person1.name}さん</h4>
                <p className="text-3xl font-bold text-blue-700">{result.person1.mbtiType}</p>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-6 rounded-xl text-center">
                <h4 className="font-bold text-rose-900 mb-2">{result.person2.name}さん</h4>
                <p className="text-3xl font-bold text-rose-700">{result.person2.mbtiType}</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-gray-800">性格タイプ相性スコア</h4>
                <span className="text-3xl font-bold text-blue-600">{result.mbtiCompatibility.score}</span>
              </div>
              <p className="text-gray-600">{result.mbtiCompatibility.description}</p>
            </div>
          </motion.div>
        )}

        {/* アドバイス */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-pink-600 to-rose-600 p-8 rounded-3xl shadow-xl mb-8 text-white"
        >
          <div className="flex items-center mb-6">
            <Heart className="w-8 h-8 mr-3" />
            <h2 className="text-2xl font-bold">二人へのアドバイス</h2>
          </div>
          
          <div className="space-y-3">
            {result.advice.map((advice, index) => (
              <p key={index} className="text-lg leading-relaxed">
                {advice}
              </p>
            ))}
          </div>
        </motion.div>

        {/* 保存・再診断ボタン */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={handleSave}
            size="lg"
            disabled={isSaved}
            className="text-lg px-12 py-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5 mr-2" />
            {isSaved ? '保存済み' : 'この結果を保存'}
          </Button>
          
          <Button
            onClick={onRestart}
            size="lg"
            className="text-lg px-12 py-6 bg-white text-pink-600 hover:bg-gray-50 rounded-full shadow-xl"
          >
            最初に戻る
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}



export default App;

