[![Build Status](https://travis-ci.org/BoyCook/CDaaS.png?branch=master)](https://travis-ci.org/BoyCook/CDaaS)
[![Coverage Status](https://coveralls.io/repos/BoyCook/CDaaS/badge.png)](https://coveralls.io/r/BoyCook/CDaaS)
[![Dependency Status](https://gemnasium.com/BoyCook/CDaaS.png)](https://gemnasium.com/BoyCook/CDaaS)

[![NPM](https://nodei.co/npm/cdaas.png?downloads=true)](https://nodei.co/npm/cdaas) 

## About
CDaaS (Count Down as a Service) provides a RESTful service for creating countdowns

## Service URIs
* http://cdaas.co.uk
* http://cdaas.herokuapp.com

## API
* `/to/:date`
* `/to/:event/at/:date`
* `/from/:timeamount`
* `/from/:timeamount/for/:event`

## Params
* `date` - date in format of `YYYYMMddHHmmss` e.g. `20130925181232` means `2013-09-25 18:12:32`
* `event` - name of the event being counted down to
* `timeamount` - time amount in ms

## Building
* `make test` runs the tests
* `make test-cov` runs the tests with coverage
