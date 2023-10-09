#### Task 2

- docker pull node:18.18
- docker images
- docker run -it --name mynode -e NAME='Denis' -e SURNAME='Str' node:18.18
- console.log(`Привет, ${process.env.NAME} ${process.env.SURNAME}`)
- docker stop mynode
- docker rm mynode

Образ удалять не стал, т.к. он будет нужен для задачи №3

