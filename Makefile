install:
	yarn install

compile:
	yarn compile

ci:
	yarn test:coverage

publish:
	cd dist && npm publish --access public