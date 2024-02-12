FROM golang:latest
WORKDIR /go/src/app
RUN apt-get update && apt-get install -y default-mysql-client
COPY . .
RUN go build -o main .
EXPOSE 8080
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=repairdb
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password
CMD ["./main"]
