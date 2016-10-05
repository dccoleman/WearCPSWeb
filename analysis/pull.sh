node src/pull.js > results/dataMaster.json
echo "Pulling from Redis to results/dataMaster.json"
./backgroundShellScripts/parse.sh
./backgroundShellScripts/filter.sh
./backgroundShellScripts/convert.sh
