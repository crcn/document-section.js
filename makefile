all:
	mkdir -p build;
	./node_modules/.bin/browserify lib/browser.js > build/loaf.js

min:
	closure-compiler --js build/loaf.js --js_output_file build/loaf.min.js

clean:
	rm -rf build;
