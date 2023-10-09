#### Task 3

- docker run -it --rm --name first_node  -v /Users/home/WebStormProjects/netology-nodejs/009-docker/task_3/data:/var/first/data node:18.18 /bin/sh
- touch /var/first/data/test.txt
- echo "test" >> /var/first/data/test.txt
- docker run -it --rm --name second_node  -v /Users/home/WebStormProjects/netology-nodejs/009-docker/task_3/data:/var/second/data node:18.18 /bin/sh
- cd /var/second/data
- cat test.txt


