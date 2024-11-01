# Lambda関数ビルド
./buildGardenEntryPrisma.sh

# フロントエンドデプロイ前の設定
npm update
cp .envDev .env

# Amplifyのデプロイ
amplify push -y
