echo 'docker build...'
docker build -t qwen-http .

echo 'image show'
docker image ls

echo 'docker run'
docker run -d -p 8766:8766 qwen-http
docker ps -a
