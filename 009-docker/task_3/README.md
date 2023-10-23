#### Task 3

- docker run -it --rm --name first_node  -v /Users/home/WebStormProjects/netology-nodejs/009-docker/task_3/data:/var/first/data node:18.18 /bin/sh
- touch /var/first/data/test.txt
- echo "test" >> /var/first/data/test.txt
- docker run -it --rm --name second_node  -v /Users/home/WebStormProjects/netology-nodejs/009-docker/task_3/data:/var/second/data node:18.18 /bin/sh
- cd /var/second/data
- cat test.txt

примонтировать папку относительно директории "$(pwd)"
docker run -it -v "$(pwd)"/library:/app -w /app node:18.18 /bin/bash

проброска порта -p 80:3000
docker run -it -v "$(pwd)"/library:/app -w /app -p 80:3000 node:18.18 /bin/bash

docker run -it --name lib --rm -p 80:3000 lib /bin/bash

сборка контейнера
docker build -t lib .


docker tag container local-image:tagname
docker tag lib dendocker2020/netology:lib

docker push new-repo:tagname
