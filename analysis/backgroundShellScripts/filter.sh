for f in src/filters/*.js
do
  echo "Processing $f file..."
  filename=$(basename "$f")
  fname="${filename%.*}"

  node $f > results/filteredJson/$fname.json
done
