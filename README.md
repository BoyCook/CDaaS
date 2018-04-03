[![Build Status](https://travis-ci.org/BoyCook/CDaaS.png?branch=master)](https://travis-ci.org/BoyCook/CDaaS)
[![Coverage Status](https://coveralls.io/repos/BoyCook/CDaaS/badge.png)](https://coveralls.io/r/BoyCook/CDaaS)
[![Code Climate](https://codeclimate.com/repos/525d68c4c7f3a31fc6004829/badges/fbbe5d3fcc6d5f861f27/gpa.png)](https://codeclimate.com/repos/525d68c4c7f3a31fc6004829/feed)
[![Dependency Status](https://gemnasium.com/BoyCook/CDaaS.png)](https://gemnasium.com/BoyCook/CDaaS)

[![NPM](https://nodei.co/npm/cdaas.png?downloads=true)](https://nodei.co/npm/cdaas)

## About
CDaaS (CountDown as a Service) provides a RESTful service for creating countdowns.
This is very much a work in progress at the moment so please bear with any issues.

## API
* `/:timeamount` countdown from an amount of time*
* `/from/:timeamount` countdown from an amount of time*
* `/from/:timeamount/for/:event` countdown from an amount of time* for an event
* `/up/:timeamount` countup to an amount of time*
* `/up/:timeamount/for/:event` countup to an amount of time* for an event
* `/to/:date` countdown to a date/time
* `/to/:date/for/:event` countdown to a date/time for an event
* * Default time unit is seconds

## Params
* `date` date in format of `YYYYMMddHHmmss` e.g. `20130925181232` means `2013-09-25 18:12:32` - will be rounded to the nearest unit
* `event` name of the event being counted down to
* `timeamount` time amount in seconds
* `unit` the amount unit `[date|years|days|hours|minutes|seconds|milliseconds]` or `[dt|y|d|h|m|s|ms]`
* `msg` the message to display when the countdown is complete (must have `tick=true`)
* `tick` [true|false] (default is `true`) should the HTML page have an active countdown?
* `css` the URI for custom CSS to be applied to HTML
* `overflow` `[true|false]` (default is `false`) should the active countdown keep going past zero?
* `warning` warning(s) given when specified amount of time is remaining. Format `[amount]:[colour]` e.g. `30:yellow,10:red`
* `discreet` hide QS hide the params in the location bar

## Service URIs
* http://cdaas.co.uk
* http://cdaas.herokuapp.com
* https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

# Examples
* [Counting down to Christmas 2013](http://cdaas.co.uk/to/Christmas/at/20131225)
* [Counting from 10 minutes to time a presentation](http://cdaas.co.uk/from/10/for/Presentation%20end?tick=true&unit=m&warning=1:yellow,0.5:red&msg=Please%20stop)

## Building

Testing
    make test
    make test-cov

Docker
    docker build -t boycook/cdaas .
    docker push boycook/cdaas
    docker run -p 8080:8080 --name cdaas -d boycook/cdaas
