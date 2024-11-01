# 環境切り替え
git checkout test
amplify env checkout test

# ソースファイル取得
git pull origin test

# Lambda関数ビルド
./buildGardenEntryPrisma.sh

# Amplifyのデプロイ
amplify push -y

# ファイルのコミット
# git add -A
# git commit -am "update files for deploy"
