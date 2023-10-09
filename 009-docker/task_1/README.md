#### Task 1

- docker pull busybox
- docker images
- docker run -it --name pinger busybox ping netology.ru -c 7
- docker ps -a
- docker logs -t pinger
- docker start pinger
- docker rm -f pinger
- docker rmi busybox
