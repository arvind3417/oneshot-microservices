
### Technologies
1) Nestjs
2) MongoDB
3) Docker
4) Microservices


### Getting started




### clone
```bash
git clone https://github.com/arvind3417/oneshot-microservices.git
```
```bash
cd oneshot-microservices
```



### Docker
```bash
docker network create leap
```

```bash
cp .env.example .env && cp .env.test.example .env.test
```

```bash
docker-compose up -d
```

```bash
docker-compose -f ./docker-compose.test.yml up -d
```
### Documentation

```
Swagger
http://localhost:8000/api
```

### Architecture
![image](https://github.com/arvind3417/oneshot-microservices/assets/91880276/ff3dca3a-0627-4c01-839e-b73f2de2bad5)


![image](https://github.com/arvind3417/oneshot-microservices/assets/91880276/e67ddc8e-6df3-4cf7-a2d8-80a2fafb5c99)




