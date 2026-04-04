.PHONY: dev build migrate-up migrate-down seed test lint docker-up docker-down

dev:
air -c .air.toml

build:
go build -o bin/catalyst-api ./main.go

migrate-up:
go run main.go

migrate-down:
migrate -path db/migrations -database "$(DATABASE_URL)" down 1

seed:
@echo "Seeding database..."

test:
go test ./... -v

lint:
golangci-lint run

docker-up:
docker compose up -d postgres redis

docker-down:
docker compose down

clean:
rm -rf bin/
