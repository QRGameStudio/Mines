all: compile

clean:
	rm -rf dist/

compile:
	make clean
	tsc --outFile dist/game.js -lib dom,es6 src/main.ts
	cp public/* dist
	cd dist && node ../../util-games-builder/build-game.js  game.html && mv dist/* . && rm -r dist

.PHONY: clean compile
.SILENT:
