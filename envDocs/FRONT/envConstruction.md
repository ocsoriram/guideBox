# **Prettier,ESLintの自動検出設定手順**

**「インストール → 設定ファイル作成 → VSCode連携 → 実行」** の流れで解説します。


---

# 1. プロジェクトに必要なツールを導入する

まず、Node.jsが必要です。

Reactプロジェクト（`create-react-app` や `Next.js` など）を前提に説明します。

```bash
# プロジェクトのルートに移動して
cd my-react-app

# Prettier と ESLint をインストール
npm install --save-dev prettier eslint eslint-config-prettier eslint-plugin-prettier eslint-plugin-react eslint-config-airbnb

```

- **Prettier** → コードを自動整形
- **ESLint** → コードの書き方チェック
- **eslint-config-prettier** → ESLintとPrettierのルールの衝突を防ぐ
- **eslint-plugin-prettier** → ESLintのチェックにPrettierを組み込む
- **eslint-plugin-react** → React向けのLintルール
- **eslint-config-airbnb** → Airbnbスタイルガイドを適用

---

# 2. Prettierの設定ファイルを作成する

ルート直下に **`.prettierrc.json`** を作ります。

```json
{
  "singleQuote": true,        // シングルクォートを使う
  "semi": true,               // 文末にセミコロンを付ける
  "trailingComma": "es5",     // 配列やオブジェクトの末尾にカンマを付ける
  "tabWidth": 2,              // インデントはスペース2つ
  "printWidth": 80            // 1行の最大文字数
}

```

👉 これで、保存時にコードが自動で整えられます。

---

# 3. ESLintの設定ファイルを作成する

ルートに **`.eslintrc.json`** を作成します。

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended"
  ],
  "plugins": ["react", "prettier"],
  "rules": {
    "prettier/prettier": "error",   // Prettierの違反をエラーにする
    "react/react-in-jsx-scope": "off" // React 17以降は不要
  },
  "settings": {
    "react": {
      "version": "detect" // Reactのバージョンを自動検出
    }
  }
}

```

これで、

- Airbnbのルール
- React専用ルール
- Prettierの整形ルール
    
    がすべて適用されます。
    

---

# 4. VSCodeで保存時に自動フォーマットを有効化する

VSCodeの設定を開いて（`Ctrl + ,` または `⌘ + ,`）、

`settings.json` に以下を追記してください。

```json
{
  "editor.formatOnSave": true,         // 保存時に自動フォーマット
  "editor.defaultFormatter": "esbenp.prettier-vscode", // Prettierを使用
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}

```

👉 これで、保存すると自動でPrettierが走り、ESLintのエラーも検出されます。

---

# 5. 実際にLintとフォーマットを試す

以下のコマンドで一括チェックと修正が可能です。

```bash
# コードのエラーチェック
npx eslint src/**/*.{js,jsx,ts,tsx}

# 自動修正
npx eslint src/**/*.{js,jsx,ts,tsx} --fix

# Prettierだけでフォーマット
npx prettier --write .

```

---

# 6. まとめ

- **Prettier → 自動でコードを整形**
- **ESLint → 書き方のチェック（Airbnbルール＋Reactルール）**
- **保存時に自動で整形する設定をVSCodeに追加**
