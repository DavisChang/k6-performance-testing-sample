## k6-performance-testing-sample

### run test

```
$ k6 run test.js
```


### grafana dashboard

Update main.yml flags created by ngrok, then open grafana dashboard

```
$ git clone git@github.com:grafana/k6.git
$ cd k6
$ docker-compose down -d influxdb grafana
$ ngrok http 8086
```




