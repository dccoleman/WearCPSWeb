for f in results/filteredJson/*.json
do
  echo "Processing $f file for CSV conversion..."
  filename=$(basename "$f")
  fname="${filename%.*}"

  node src/convert.js $f > results/filteredCSV/$fname.csv
done
