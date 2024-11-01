cd ./amplify/backend/function/gardenEntryPrisma/ts

# npmライブラリのインストール
cp package.json ../src/
cd ../src
rm -f package-lock.json
npm install --production
npm prune --production

# prismaのために必要なファイルをコピー
cp -r ../ts/prisma ./
cd ../ts/node_modules/.prisma/client
cp schema.prisma ../../../../src/node_modules/.prisma/client/
cp libquery_engine-rhel-* ../../../../src/node_modules/.prisma/client/

# Build
cd ../../../
npm run build

# prisma generateの実行
cd ../src/
npx prisma generate
