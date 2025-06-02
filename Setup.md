# Setup mosquitto

1. Add folder _data/_ inside _docker/mosquitto_

2. Add file _pwfile_ inside _docker/mosquitto/config_

3. In root of project run

```sh
docker-compose up -d
```

3. Open shell of mosquitto
   _Example_

```sh
docker exec -it CONTAINER_ID sh
```

> Note: CONTAINER_ID can be obtained via `docker ps -a`, you may write only first characters of it

4. Add user to mosquitto. In default root (on open of container)

```sh
mosquitoo_passwd -c /mosquitto/config/pwfile USERNAME
```

> Note: USERNAME - choose yourself
> Note2: to delete user: `mosquitoo_passwd -D /mosquitto/config/pwfile USERNAME`

5. Download GUI client (mqttx.app)[https://mqttx.app/]

6. In _mqttx_ add new connection

   1. Name - choose yourself
   2. Host - mqtt://
   3. Port - 1883
   4. Client - you may leave default
   5. Username - your USERNAME
   6. Password - password of USERNAME
   7. Click connect

7. Drink some green tea
