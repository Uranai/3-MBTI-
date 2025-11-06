# Life Compass - 技術ドキュメント

## 目次

1. [プロジェクト概要](#プロジェクト概要)
2. [アーキテクチャ](#アーキテクチャ)
3. [実装詳細](#実装詳細)
4. [データ構造](#データ構造)
5. [アルゴリズム](#アルゴリズム)
6. [今後の拡張](#今後の拡張)

---

## プロジェクト概要

### プロジェクト名
Life Compass

### 説明
MBTI、数秘術（ともこ式）、西洋占星術を統合した人生相談サイト

### 技術スタック
- **React 18**: UIライブラリ
- **Vite 6**: ビルドツール
- **Tailwind CSS 4**: スタイリング
- **Framer Motion**: アニメーション
- **shadcn/ui**: UIコンポーネント
- **Lucide React**: アイコン

### ディレクトリ構造
```
/home/ubuntu/life-compass/
├── src/
│   ├── App.jsx                    # メインコンポーネント（約1,400行）
│   ├── App.css                    # スタイル
│   ├── lib/
│   │   ├── diagnosis.js           # MBTI診断ロジック
│   │   ├── data.js                # MBTI、数秘術、占星術のデータ
│   │   ├── numerology.js          # 数秘術の計算ロジック
│   │   ├── numerologyData.js      # 数秘術の詳細データ
│   │   ├── compatibility.js       # 相性診断ロジック
│   │   └── storage.js             # localStorage管理
│   └── components/
│       └── ui/                    # shadcn/ui コンポーネント
├── dist/                          # ビルド成果物
├── public/                        # 静的ファイル
├── package.json                   # 依存関係
├── vite.config.js                 # Vite設定
└── tailwind.config.js             # Tailwind設定
```

---

## アーキテクチャ

### コンポーネント構成

```
App
├── HomePage                       # ホーム画面
├── InputPage                      # 個人診断入力画面
├── QuestionsPage                  # MBTI質問画面
├── ResultPage                     # 個人診断結果画面
├── CompatibilityInputPage         # 相性診断入力画面
└── CompatibilityResultPage        # 相性診断結果画面
```

### 状態管理

#### Appコンポーネントのstate

```javascript
const [mode, setMode] = useState(null);  // 'personal' or 'compatibility'
const [step, setStep] = useState('home');  // 画面遷移の管理
const [userInfo, setUserInfo] = useState({...});  // ユーザー情報
const [answers, setAnswers] = useState({});  // MBTI回答
const [currentQuestion, setCurrentQuestion] = useState(0);  // 現在の質問番号
const [result, setResult] = useState(null);  // 個人診断結果
const [person1, setPerson1] = useState({...});  // 相性診断1人目
const [person2, setPerson2] = useState({...});  // 相性診断2人目
const [compatibilityResult, setCompatibilityResult] = useState(null);  // 相性診断結果
const [savedResults, setSavedResults] = useState([]);  // 保存された診断結果
```

### データフロー

```
1. ユーザー入力
   ↓
2. 状態更新（useState）
   ↓
3. 診断ロジック実行
   ↓
4. 結果生成
   ↓
5. 結果表示
   ↓
6. 保存（任意）
   ↓
7. localStorage
```

---

## 実装詳細

### 1. MBTI診断

#### ファイル: `/src/lib/diagnosis.js`

**主要関数**:
- `mbtiQuestions`: 20問の質問データ
- `calculateMBTI(answers)`: 回答から MBTIタイプを計算

**アルゴリズム**:
```javascript
// 各軸のスコアを計算
E/I: 質問1,5,9,13,17のスコア合計
S/N: 質問2,6,10,14,18のスコア合計
T/F: 質問3,7,11,15,19のスコア合計
J/P: 質問4,8,12,16,20のスコア合計

// スコアが3以上なら右側のタイプ、2以下なら左側のタイプ
E/I: スコア >= 3 → I, < 3 → E
S/N: スコア >= 3 → N, < 3 → S
T/F: スコア >= 3 → F, < 3 → T
J/P: スコア >= 3 → P, < 3 → J
```

#### ファイル: `/src/lib/data.js`

**mbtiTypes**: 16タイプの詳細データ
```javascript
{
  type: "INTJ",
  name: "建築家",
  description: "...",
  strengths: [...],
  weaknesses: [...],
  careers: [...],
  relationships: "...",
  growthAdvice: "..."
}
```

### 2. 数秘術

#### ファイル: `/src/lib/numerology.js`

**主要関数**:
- `reduceToSingleDigit(num, allowMaster)`: 数字を1桁に還元（マスターナンバー対応）
- `calculateTalentNumber(day)`: 才能数を計算
- `calculateEssenceNumber(month)`: 本質数を計算
- `calculateExplorationNumber(year)`: 探究数を計算
- `calculateLifePathNumber(year, month, day)`: ライフパスナンバーを計算
- `calculatePersonalYear(birthYear, birthMonth, birthDay, currentYear)`: パーソナルイヤーを計算
- `analyzeBalanceBox(talentNum, essenceNum, explorationNum)`: バランスボックス分析
- `generateNumerologyResult(year, month, day)`: 数秘術結果を生成

**アルゴリズム**:

**才能数（外キャラ）**:
```javascript
// 生年月日の日にちから計算
day = 15
15 → 1 + 5 = 6
才能数 = 6
```

**本質数（内キャラ）**:
```javascript
// 生年月日の月から計算（マスターナンバー対応）
month = 11
11 はマスターナンバーなのでそのまま
本質数 = 11
```

**探究数**:
```javascript
// 生年から計算
year = 1990
1 + 9 + 9 + 0 = 19
1 + 9 = 10
1 + 0 = 1
探究数 = 1
```

**ライフパスナンバー**:
```javascript
// 生年月日全体から計算
year = 1990, month = 7, day = 15
1990 → 1 + 9 + 9 + 0 = 19 → 1 + 9 = 10 → 1 + 0 = 1
7 → 7
15 → 1 + 5 = 6
1 + 7 + 6 = 14 → 1 + 4 = 5
ライフパスナンバー = 5
```

**パーソナルイヤー**:
```javascript
// 今年のテーマを計算
birthMonth = 7, birthDay = 15, currentYear = 2024
7 + 15 + 2024 = 2046
2 + 0 + 4 + 6 = 12
1 + 2 = 3
パーソナルイヤー = 3
```

**バランスボックス分析**:
```javascript
// 陰陽バランス
奇数 = 陽、偶数 = 陰

// 思考パターン
1,2,3 = 感情思考
4,5,6 = 現実思考
7,8,9 = 精神思考

// 集団行動パターン
1,4,7 = 個人行動
2,5,8 = 協調行動
3,6,9 = 集団行動
```

#### ファイル: `/src/lib/numerologyData.js`

**numerologyNumbers**: 1〜9、11、22、33の詳細データ
```javascript
{
  number: 1,
  title: "リーダー",
  description: "...",
  strengths: [...],
  weaknesses: [...],
  lifePurpose: "...",
  keywords: [...],
  behaviorType: "..."
}
```

### 3. 西洋占星術

#### ファイル: `/src/lib/diagnosis.js`

**主要関数**:
- `getSunSign(month, day)`: 生年月日から太陽星座を取得

**アルゴリズム**:
```javascript
// 生年月日から太陽星座を判定
month = 7, day = 15
7/15 は 6/22 〜 7/22 の範囲
太陽星座 = "蟹座"
```

#### ファイル: `/src/lib/data.js`

**zodiacData**: 12星座の詳細データ
```javascript
{
  sign: "蟹座",
  period: "6/22 - 7/22",
  element: "水",
  ruling: "月",
  traits: "...",
  compatible: ["蠍座", "魚座", "牡牛座"]
}
```

### 4. 相性診断

#### ファイル: `/src/lib/compatibility.js`

**主要関数**:
- `calculateNumerologyCompatibility(num1, num2)`: 数秘術の相性を計算
- `calculateZodiacCompatibility(sign1, sign2)`: 占星術の相性を計算
- `calculateMBTICompatibility(type1, type2)`: MBTIの相性を計算
- `calculateOverallCompatibility(person1, person2)`: 総合相性を計算

**アルゴリズム**:

**数秘術相性**:
```javascript
// 12x12の相性マトリックス（1-9, 11, 22, 33）
numerologyCompatibilityMatrix = {
  1: { 1: 75, 2: 65, 3: 80, ... },
  2: { 1: 65, 2: 70, 3: 75, ... },
  ...
}

// 本質数、才能数、探究数の相性を計算
essenceScore = matrix[person1.essenceNumber][person2.essenceNumber]
talentScore = matrix[person1.talentNumber][person2.talentNumber]
explorationScore = matrix[person1.explorationNumber][person2.explorationNumber]

// 重み付け平均
numerologyScore = essenceScore * 0.5 + talentScore * 0.3 + explorationScore * 0.2
```

**占星術相性**:
```javascript
// 4x4のエレメント相性マトリックス
elementCompatibilityMatrix = {
  火: { 火: 80, 地: 50, 風: 85, 水: 40 },
  地: { 火: 50, 地: 75, 風: 45, 水: 80 },
  風: { 火: 85, 地: 45, 風: 80, 水: 50 },
  水: { 火: 40, 地: 80, 風: 50, 水: 85 }
}

zodiacScore = elementMatrix[person1.element][person2.element]
```

**MBTI相性**:
```javascript
// 16x16の相性マトリックス
mbtiCompatibilityMatrix = {
  INTJ: { INTJ: 75, INTP: 85, ENTJ: 80, ... },
  INTP: { INTJ: 85, INTP: 70, ENTJ: 75, ... },
  ...
}

mbtiScore = matrix[person1.mbtiType][person2.mbtiType]
```

**総合相性**:
```javascript
// MBTIがある場合
if (person1.mbtiType && person2.mbtiType) {
  overallScore = numerologyScore * 0.4 + zodiacScore * 0.3 + mbtiScore * 0.3
}
// MBTIがない場合
else {
  overallScore = numerologyScore * 0.6 + zodiacScore * 0.4
}
```

### 5. 保存機能

#### ファイル: `/src/lib/storage.js`

**主要関数**:
- `getSavedResults()`: 保存された診断結果を取得
- `saveResult(result)`: 診断結果を保存
- `deleteResult(id)`: 保存された結果を削除
- `clearAllResults()`: すべての保存データをクリア
- `getBasicInfoFromSaved(savedResult)`: 保存された結果から基本情報を取得

**データ構造**:
```javascript
{
  id: "1697123456789",
  savedAt: "2024-10-18T10:30:45.123Z",
  name: "太郎",
  birthDate: { year: "1990", month: "7", day: "15" },
  mbtiType: "INTJ",
  type: "personal",  // or "compatibility"
  result: {...}
}
```

**localStorage**:
```javascript
// キー
const STORAGE_KEY = 'life_compass_saved_results';

// 値（JSON配列）
[
  {診断結果1},
  {診断結果2},
  ...
  {診断結果20}  // 最大20件
]
```

---

## データ構造

### 個人診断結果

```javascript
{
  user: {
    name: "太郎",
    year: "1990",
    month: "7",
    day: "15"
  },
  mbti: {
    type: "INTJ",
    name: "建築家",
    description: "...",
    strengths: [...],
    weaknesses: [...],
    careers: [...],
    relationships: "...",
    growthAdvice: "..."
  },
  numerology: {
    talentNumber: 6,
    essenceNumber: 7,
    explorationNumber: 1,
    lifePathNumber: 5,
    personalYear: 3,
    balanceBox: {
      yinYang: {...},
      thinking: {...},
      group: {...}
    }
  },
  astrology: {
    sunSign: "蟹座",
    period: "6/22 - 7/22",
    element: "水",
    ruling: "月",
    traits: "...",
    compatible: ["蠍座", "魚座", "牡牛座"]
  }
}
```

### 相性診断結果

```javascript
{
  person1: {
    name: "太郎",
    year: "1990",
    month: "7",
    day: "15",
    mbtiType: "INTJ"
  },
  person2: {
    name: "花子",
    year: "1992",
    month: "3",
    day: "20",
    mbtiType: "ENFP"
  },
  compatibility: {
    overall: {
      score: 78,
      level: "非常に良い相性",
      message: "..."
    },
    numerology: {
      essence: { score: 75, description: "..." },
      talent: { score: 80, description: "..." },
      exploration: { score: 70, description: "..." },
      overall: 76
    },
    zodiac: {
      score: 75,
      description: "..."
    },
    mbti: {
      score: 85,
      description: "..."
    },
    advice: {
      overall: "...",
      numerology: "...",
      zodiac: "...",
      mbti: "..."
    }
  }
}
```

---

## アルゴリズム

### MBTI診断アルゴリズム

```
入力: 20問の回答（0または1）
出力: MBTIタイプ（例: "INTJ"）

1. 各軸のスコアを初期化
   E_I_score = 0
   S_N_score = 0
   T_F_score = 0
   J_P_score = 0

2. 各質問の回答を集計
   for question in questions:
     if question.axis == "E/I":
       E_I_score += answer
     else if question.axis == "S/N":
       S_N_score += answer
     else if question.axis == "T/F":
       T_F_score += answer
     else if question.axis == "J/P":
       J_P_score += answer

3. MBTIタイプを決定
   type = ""
   type += E_I_score >= 3 ? "I" : "E"
   type += S_N_score >= 3 ? "N" : "S"
   type += T_F_score >= 3 ? "F" : "T"
   type += J_P_score >= 3 ? "P" : "J"

4. return type
```

### 数秘術計算アルゴリズム

```
入力: 生年月日（year, month, day）
出力: 数秘術結果

1. 才能数を計算
   talentNumber = reduceToSingleDigit(day, false)

2. 本質数を計算
   essenceNumber = reduceToSingleDigit(month, true)

3. 探究数を計算
   explorationNumber = reduceToSingleDigit(year, false)

4. ライフパスナンバーを計算
   yearSum = reduceToSingleDigit(year, false)
   monthSum = reduceToSingleDigit(month, false)
   daySum = reduceToSingleDigit(day, false)
   lifePathNumber = reduceToSingleDigit(yearSum + monthSum + daySum, true)

5. パーソナルイヤーを計算
   currentYear = new Date().getFullYear()
   personalYear = calculatePersonalYear(year, month, day, currentYear)

6. バランスボックス分析
   balanceBox = analyzeBalanceBox(talentNumber, essenceNumber, explorationNumber)

7. return { talentNumber, essenceNumber, explorationNumber, lifePathNumber, personalYear, balanceBox }
```

### 相性診断アルゴリズム

```
入力: person1, person2（各人の情報）
出力: 相性診断結果

1. 数秘術相性を計算
   numerologyCompatibility = calculateNumerologyCompatibility(person1, person2)

2. 占星術相性を計算
   zodiacCompatibility = calculateZodiacCompatibility(person1.sunSign, person2.sunSign)

3. MBTI相性を計算（MBTIタイプがある場合のみ）
   if person1.mbtiType and person2.mbtiType:
     mbtiCompatibility = calculateMBTICompatibility(person1.mbtiType, person2.mbtiType)

4. 総合相性スコアを計算
   if mbtiCompatibility:
     overallScore = numerologyCompatibility * 0.4 + zodiacCompatibility * 0.3 + mbtiCompatibility * 0.3
   else:
     overallScore = numerologyCompatibility * 0.6 + zodiacCompatibility * 0.4

5. 相性レベルを決定
   if overallScore >= 85: level = "最高の相性"
   else if overallScore >= 75: level = "非常に良い相性"
   else if overallScore >= 65: level = "良い相性"
   else if overallScore >= 55: level = "普通の相性"
   else: level = "努力が必要な相性"

6. アドバイスを生成
   advice = generateAdvice(overallScore, numerologyCompatibility, zodiacCompatibility, mbtiCompatibility)

7. return { overall, numerology, zodiac, mbti, advice }
```

---

## 今後の拡張

### 短期的な改善（1〜3ヶ月）

1. **削除機能の追加**
   - 個別の診断結果を削除
   - すべての保存データを一括削除
   - 削除確認ダイアログ

2. **保存データの表示改善**
   - 保存日時の表示
   - 診断タイプ（個人/相性）の表示
   - ソート機能（日付順、名前順）

3. **検索機能**
   - 名前で保存結果を検索
   - MBTIタイプで絞り込み
   - 生年月日で検索

4. **共有機能**
   - 診断結果のURL生成
   - SNS共有ボタン
   - QRコード生成

### 中期的な拡張（3〜6ヶ月）

1. **エクスポート/インポート機能**
   - 保存データをJSONファイルとしてエクスポート
   - 他の端末でインポート可能
   - バックアップ機能

2. **お気に入り機能**
   - よく使う情報をお気に入りに登録
   - お気に入りを優先表示
   - タグ付け機能

3. **グループ管理**
   - 家族、友人、同僚などのグループ分け
   - グループ内での相性診断の一括実施
   - グループの相性マトリックス表示

4. **診断履歴の可視化**
   - 誰と誰の相性を診断したかの履歴
   - 相性スコアの推移（再診断時）
   - グラフやチャートでの表示

5. **統計機能**
   - 保存された診断の数
   - よく使われる情報の表示
   - MBTIタイプの分布

### 長期的なビジョン（6ヶ月以上）

1. **クラウド同期（要ログイン機能）**
   - アカウント作成機能
   - 複数端末でのデータ同期
   - サーバー側での安全な保存

2. **AI機能の追加**
   - ChatGPTを使った詳細なアドバイス
   - 診断結果に基づくパーソナライズされた提案
   - 質問への回答

3. **リマインダー機能**
   - 定期的な診断のリマインド
   - パーソナルイヤーの変わり目に通知
   - 重要な日（誕生日など）の通知

4. **コミュニティ機能**
   - 同じMBTIタイプの人との交流
   - 相性の良い人とのマッチング
   - フォーラムやチャット

5. **多言語対応**
   - 英語、中国語、韓国語などの対応
   - 自動翻訳機能
   - 地域別の占星術対応

6. **追加の診断**
   - エニアグラム
   - 四柱推命
   - タロット占い

---

## パフォーマンス最適化

### 現在のパフォーマンス

- **初回ロード**: 約1〜2秒
- **診断計算**: 約0.1秒未満
- **画面遷移**: スムーズ（Framer Motion）

### 最適化の余地

1. **コード分割**
   - React.lazy と Suspense を使用
   - ルートごとにコンポーネントを分割

2. **画像最適化**
   - WebP形式の使用
   - 遅延読み込み

3. **キャッシング**
   - Service Worker の導入
   - オフライン対応

4. **バンドルサイズの削減**
   - Tree shaking の最適化
   - 不要な依存関係の削除

---

## セキュリティ

### 現在のセキュリティ対策

1. **データ保存**
   - localStorage のみ使用（サーバーに送信しない）
   - 個人情報の暗号化なし（ローカル保存のため）

2. **XSS対策**
   - Reactの自動エスケープ機能
   - dangerouslySetInnerHTML の不使用

### 今後のセキュリティ強化

1. **データ暗号化**
   - localStorage のデータを暗号化
   - Web Crypto API の使用

2. **HTTPS**
   - 本番環境でHTTPSを強制
   - セキュアなCookie

3. **CSRF対策**
   - サーバー側の実装時に対策

---

## テスト

### 現在のテスト状況

- **手動テスト**: 実施済み
- **自動テスト**: 未実装

### 今後のテスト計画

1. **単体テスト**
   - Jest と React Testing Library
   - 診断ロジックのテスト
   - コンポーネントのテスト

2. **統合テスト**
   - Cypress または Playwright
   - エンドツーエンドのテスト

3. **パフォーマンステスト**
   - Lighthouse
   - Web Vitals

---

## デプロイ

### デプロイ方法

1. ビルド
   ```bash
   cd /home/ubuntu/life-compass
   pnpm run build
   ```

2. デプロイ
   - UIの「公開」ボタンをクリック

### 環境変数

現在、環境変数は使用していません。

### CI/CD

現在、CI/CDは未実装です。今後、GitHub Actionsなどを使用して自動デプロイを実装予定です。

---

## まとめ

Life Compassは、React、Vite、Tailwind CSSを使用した高品質な人生相談サイトです。MBTI、数秘術、西洋占星術を統合し、個人診断と相性診断の両方を提供しています。

**技術的な特徴**:
- **モダンな技術スタック**: React 18、Vite 6、Tailwind CSS 4
- **高品質なUI/UX**: Framer Motion、shadcn/ui、Lucide React
- **効率的な状態管理**: React Hooks（useState）
- **ローカルストレージ**: localStorage で診断結果を保存
- **レスポンシブデザイン**: すべてのデバイスで最適化

**今後の展望**:
- 削除機能、検索機能、共有機能の追加
- クラウド同期、AI機能、コミュニティ機能の実装
- 多言語対応、追加の診断の導入

Life Compassは、ユーザーの自己理解と人間関係の改善をサポートする総合的な人生相談サイトとして、今後も進化し続けます。

