.PHONY: i
i:
	docker compose run --rm node bash -c "cd src/ && npm i"

.PHONY: dev
dev:
	docker compose run --rm --service-ports node bash -c "cd src/ && npm ci && npm run dev"

.PHONY: build
build:
	docker compose run --rm node bash -c "cd src/ && npm ci && npm run build"

.PHONY: export
export:
	docker compose run --rm node bash -c "cd src/ && npm ci && npm run export"