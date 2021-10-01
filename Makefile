SOURCES := $(shell find src -name "*.ts")

DENO_MODULE_SOURCES := $(patsubst src/%.ts, deno/%.ts, $(SOURCES))

$(VERBOSE).SILENT:

.PHONY: all
all: clean release format
	@echo Done

deno:
	mkdir $@

dist/goethite.mjs: $(SOURCES)
	npm run build
	sh scripts/move_types.sh

$(DENO_MODULE_SOURCES): deno/%.ts: src/%.ts | deno
	sh scripts/deno_handshake.sh $@ $^

.PHONY: clean
clean:
	if [ -d "deno" ]; then rm -rf deno; fi
	if [ -d "dist" ]; then rm -rf dist; fi
	if [ -d "types" ]; then rm -rf types; fi
	@echo Done

.PHONY: release
release: dist/goethite.mjs $(DENO_MODULE_SOURCES)
	@echo Done

.PHONY: format
format:
	npm run format

.PHONY: lint
lint:
	npm run lint

