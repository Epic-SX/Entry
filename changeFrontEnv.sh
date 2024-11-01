echo $USER_BRANCH
if [ "$USER_BRANCH" = "prod" ]; then
  echo "change .env to prod"
  cp .envProd .env
else
  echo "change .env to test"
  cp .envTest .env
fi
