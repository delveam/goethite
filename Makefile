SOURCES := $(shell find src -name "*.ts")

DENO_MODULE_SOURCES := $(patsubst src/%.ts, deno/%.ts, $(SOURCES))

.PHONY: clean debug format lint release

$(VERBOSE).SILENT:

all: clean release

build:
	mkdir $@

dist:
	mkdir $@

types:
	mkdir $@

deno:
	mkdir $@

build/index.js: $(SOURCES) | build
	if [ -d "build" ]; then rm -rf build; fi
	npm run make:build

dist/goethite.js: build/index.js | dist
	if [ -d "dist" ]; then rm -rf dist; fi
	npm run make:dist
	npm run format:dist

$(DENO_MODULE_SOURCES): deno/%.ts: src/%.ts | deno
	sh scripts/deno_handshake.sh $@ $^

clean:
	if [ -d "build" ]; then rm -rf build; fi
	if [ -d "dist" ]; then rm -rf dist; fi
	if [ -d "deno" ]; then rm -rf deno; fi
	if [ -d "types" ]; then rm -rf types; fi
	@echo Done

format:
	npm run format

lint:
	npm run lint

debug: build/index.js
	@echo Done

release: dist/goethite.js $(DENO_MODULE_SOURCES)
	@echo Done
