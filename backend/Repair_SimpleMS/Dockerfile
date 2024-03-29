# Stage 1: Build the Go application
FROM golang:1.21-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the source code into the container
COPY . .

# Download all dependencies
RUN go mod download

# Build the Go application
RUN go build -o /app/main .

# Stage 2: Setup the final image
FROM alpine:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the compiled binary from the build stage
COPY --from=build /app/main .

# Expose the port the app runs on
EXPOSE 4100

# Command to run the application
CMD ["./main"]
