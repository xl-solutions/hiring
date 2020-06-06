
mkdir -p $PWD/var/tmp/

ln -s ../../input_valid.csv var/
ln -s ../../input_invalid.csv var/
touch var/file.csv var/.\ \ .csv

cp .env.dist .env

echo "You may want to edit .env and change SECRET_KEY"