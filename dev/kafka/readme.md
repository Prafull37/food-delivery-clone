# First Step
- Running docker using `docker compose -f docker-compose.yml up`
    - Running this will run zookeeper in 2181
    - Running this will run docker in 9092
    - use `docker inspect zookeeper` find IPAddress either in NetworkSettings.IPAddress or NetworkSettings.Networks.IPAddress
     - use `docker inspect kafka-1` find IPAddress either in NetworkSettings.IPAddress or NetworkSettings.Networks.IPAddress
     - we have given kafka-1 for container . in order to run multiple broker just copy paste the same configuration and change the container name and port and C

- Validate by creating topic if you are coming for first time
    - `docker exec -it kafka /bin/sh (It will open shell in kafka)`
    -  `cd ./opt`
    - `cd kafka`
    - `cd bin`
    - `ls`
    - `copy kafka-topics.sh`
    - `cd ../`
    - run `./bin/kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic test`. You will see a message `Created topic test`.
    - `./bin/kafka-topics.sh --list --zookeeper zookeeper:2181` will list all the topics

Or Best follow the below video
    - https://www.youtube.com/watch?v=fT20a_dMz_w