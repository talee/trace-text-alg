#!/bin/sh
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
python ../bower_components/closure-library/closure/bin/build/depswriter.py \
--root_with_prefix="../src/ ../../../../src" \
> ../dist/tracetext-dep.js \