# 環境切り替え
git checkout master
amplify env checkout prod

# ソースファイル取得
git pull origin master

# Lambda関数ビルド
./buildGardenEntryPrisma.sh

# Amplifyのデプロイ
amplify push -y

# ファイルのコミット
# git add -A
# git commit -am "update files for deploy"
