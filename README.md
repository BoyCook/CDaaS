[![Build Status](https://travis-ci.org/BoyCook/CDaaS.png?branch=master)](https://travis-ci.org/BoyCook/CDaaS)
[![Coverage Status](https://coveralls.io/repos/BoyCook/CDaaS/badge.png)](https://coveralls.io/r/BoyCook/CDaaS)
[![Dependency Status](https://gemnasium.com/BoyCook/CDaaS.png)](https://gemnasium.com/BoyCook/CDaaS)

[![NPM](https://nodei.co/npm/cdaas.png?downloads=true)](https://nodei.co/npm/cdaas) 

## About
CDaaS (CountDown as a Service) provides a RESTful service for creating countdowns. 
This is very much a work in progress at the moment so please bear with any issues.

## API
* `/to/:date` - countdown to a date
* `/to/:event/at/:date` - countdown to an event at a date
* `/from/:timeamount` - countdown from an amount of time
* `/from/:timeamount/for/:event` - countdown from an amount of time for an event

## Params
* `date` - date in format of `YYYYMMddHHmmss` e.g. `20130925181232` means `2013-09-25 18:12:32`
* `event` - name of the event being counted down to
* `timeamount` - time amount in ms
* `unit` - the amount unit `[date|years|days|hours|minutes|seconds|milliseconds]` or `[dt|y|d|h|m|s|ms]`
* `mgs` - the message to display when the countdown is complete (must have `tick=true`)
* `tick` - [true|false] - (default is false) should the HTML page have an active countdown? 
* `css` - the URI for custom CSS to be applied to HTML

## Service URIs
* http://cdaas.co.uk
* http://cdaas.herokuapp.com

# Examples
* Counting down to Christmas 2013: http://cdaas.co.uk/to/Christmas/at/20131225
* Counting from 10 minutes to time a presentation: http://cdaas.co.uk/from/10/for/Presentation%20end

## Building
* `make test` runs the tests
* `make test-cov` runs the tests with coverage
