# Life Compass - 重要ファイルインデックス

このドキュメントは、Life Compassプロジェクトで実際にユーザーが使用すべき重要なファイルをまとめたものです。

---

## 📚 ユーザー向けドキュメント

### 1. **LIFE_COMPASS_USER_GUIDE.md** ⭐ 最重要
**場所**: `/home/ubuntu/LIFE_COMPASS_USER_GUIDE.md`

**内容**:
- サイト概要
- 主要機能（個人診断、相性診断、保存機能）
- 使い方（ステップバイステップガイド）
- 保存機能の詳細
- よくある質問
- トラブルシューティング

**対象**: すべてのユーザー

**推奨**: このファイルを最初に読んでください。

---

## 🔧 開発者向けドキュメント

### 2. **LIFE_COMPASS_TECHNICAL_DOCS.md** ⭐ 最重要
**場所**: `/home/ubuntu/LIFE_COMPASS_TECHNICAL_DOCS.md`

**内容**:
- プロジェクト概要
- アーキテクチャ
- 実装詳細（MBTI、数秘術、占星術、相性診断、保存機能）
- データ構造
- アルゴリズム
- 今後の拡張計画

**対象**: 開発者、技術者

**推奨**: コードを理解したい場合、このファイルを読んでください。

---

## 📖 参考ドキュメント

### 3. **compatibility-save-feature.md**
**場所**: `/home/ubuntu/compatibility-save-feature.md`

**内容**:
- 相性診断での保存機能の詳細
- 使用シナリオ
- 技術的な動作
- 実際のフロー

**対象**: 保存機能の詳細を知りたいユーザー

### 4. **numerology-enhanced-guide.md**
**場所**: `/home/ubuntu/numerology-enhanced-guide.md`

**内容**:
- 拡張された数秘術機能の詳細
- 才能数、本質数、探究数の説明
- バランスボックス分析
- 人生9年サイクル

**対象**: 数秘術に興味があるユーザー

### 5. **compatibility-feature-guide.md**
**場所**: `/home/ubuntu/compatibility-feature-guide.md`

**内容**:
- 相性診断機能の詳細
- 入力パターン
- 診断内容
- 相性スコアの計算方法

**対象**: 相性診断に興味があるユーザー

---

## 🗂️ 調査資料（参考）

### 6. **numerology_deep_research.md**
**場所**: `/home/ubuntu/numerology_deep_research.md`

**内容**:
- ともこ式数秘術の詳細調査
- 才能数、本質数、探究数の理論
- バランスボックスの理論
- 人生9年サイクルの理論

**対象**: 数秘術の理論を深く理解したい人

### 7. **research_findings.md**
**場所**: `/home/ubuntu/research_findings.md`

**内容**:
- MBTI、数秘術、西洋占星術の調査結果
- 各診断の概要と仕様

**対象**: 各診断の理論を理解したい人

---

## 🚫 不要なファイル（参考のみ）

以下のファイルは開発過程で作成されたもので、最終的なユーザーには不要です。

- `bugfix-summary.md`: バグ修正の記録
- `debug-instructions.md`: デバッグ手順
- `fix-summary.md`: 修正内容のサマリー
- `life-compass-final-summary.md`: 旧バージョンのサマリー
- `life-compass-final-update.md`: 旧バージョンの更新情報
- `life-compass-overview.md`: 旧バージョンの概要
- `life-compass-guide.md`: 旧バージョンのガイド
- `save-feature-guide.md`: 保存機能の旧ガイド
- `diagnosis_logic.md`: 診断ロジックの設計書（開発時のみ）
- `site_design.md`: サイト設計書（開発時のみ）

---

## 📁 プロジェクトファイル

### ソースコード
**場所**: `/home/ubuntu/life-compass/src/`

**主要ファイル**:
- `App.jsx`: メインコンポーネント（約1,400行）
- `lib/diagnosis.js`: MBTI診断ロジック
- `lib/data.js`: MBTI、数秘術、占星術のデータ
- `lib/numerology.js`: 数秘術の計算ロジック
- `lib/numerologyData.js`: 数秘術の詳細データ
- `lib/compatibility.js`: 相性診断ロジック
- `lib/storage.js`: localStorage管理

### ビルド成果物
**場所**: `/home/ubuntu/life-compass/dist/`

**内容**:
- `index.html`: エントリーポイント
- `assets/index-*.css`: スタイルシート（約113 KB）
- `assets/index-*.js`: JavaScriptバンドル（約438 KB）

---

## 🎯 推奨読書順序

### 一般ユーザー向け

1. **LIFE_COMPASS_USER_GUIDE.md** ⭐
   - サイトの使い方を理解する

2. **compatibility-save-feature.md**
   - 保存機能の詳細を理解する

3. **numerology-enhanced-guide.md**
   - 数秘術の詳細を理解する

4. **compatibility-feature-guide.md**
   - 相性診断の詳細を理解する

### 開発者向け

1. **LIFE_COMPASS_TECHNICAL_DOCS.md** ⭐
   - 技術的な全体像を理解する

2. **ソースコード**
   - 実際のコードを読む

3. **numerology_deep_research.md**
   - 数秘術の理論を深く理解する

4. **research_findings.md**
   - 各診断の理論を理解する

---

## 📥 ダウンロード推奨ファイル

ユーザーがダウンロードすべき最重要ファイル:

1. **LIFE_COMPASS_USER_GUIDE.md** - ユーザーガイド（完全版）
2. **LIFE_COMPASS_TECHNICAL_DOCS.md** - 技術ドキュメント（開発者向け）

これら2つのファイルがあれば、Life Compassのすべての機能と技術的な詳細を理解できます。

---

## 🌐 サイトアクセス

Life Compassサイトは、UIの「公開」ボタンをクリックした後に表示されるURLからアクセスできます。

---

## 📧 サポート

ご質問やフィードバックがある場合は、サイトの管理者にお問い合わせください。

---

## 📝 まとめ

**最重要ファイル（必読）**:
1. `LIFE_COMPASS_USER_GUIDE.md` - ユーザー向け完全ガイド
2. `LIFE_COMPASS_TECHNICAL_DOCS.md` - 開発者向け技術ドキュメント

**参考ファイル（興味がある場合）**:
- `compatibility-save-feature.md` - 保存機能の詳細
- `numerology-enhanced-guide.md` - 数秘術の詳細
- `compatibility-feature-guide.md` - 相性診断の詳細
- `numerology_deep_research.md` - 数秘術の理論
- `research_findings.md` - 各診断の理論

**不要なファイル**:
- `bugfix-summary.md`, `debug-instructions.md`, `fix-summary.md` など（開発過程の記録）

これらのファイルを活用して、Life Compassを最大限にご利用ください！

