
TESTS = test/*.js
REPORTER = spec
COVERAGE_REPORT = ./coverage/lcov.info
COVERALLS = ./node_modules/coveralls/bin/coveralls.js

test: test-mocha

test-mocha:
	@NODE_ENV=test mocha \
	    --timeout 200 \
		--reporter $(REPORTER) \
		$(TESTS)

test-cov: istanbul

istanbul:
	istanbul cover _mocha -- -R spec $(TESTS)

coveralls:
	cat $(COVERAGE_REPORT) | $(COVERALLS)

cov-html: test-cov html-cov-report

html-cov-report: 
	istanbul report html	

npm:
	npm publish ./

check:
	travis-lint .travis.yml

clean:
	rm -rf ./coverage

deploy: heroku-stop heroku-push

heroku-stop:
	heroku ps:stop web=1

heroku-push:
	git push heroku master

heroku-open:
	heroku open
