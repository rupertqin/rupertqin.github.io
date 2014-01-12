---
layout: post
title:  'guard and spork in rails'
tags: za ruby rails
---

[guard-spork](https://github.com/guard/guard-spork#options)

## could not start spork for rspec" in guard-spork

use guard-spork, it will report 'ERROR - Could not start Spork server for RSpec, Test::Unit after 30 seconds. I will continue waiting for a further 60 seconds.'

you can add test_unit: false as an option to guard-spork, i.e. in your Guardfile:

`guard 'spork', :rspec_env => { 'RAILS_ENV' => 'test' }, :test_unit => false do`

## after edit routes.rb, maybe you need to restart gaurd & spork
