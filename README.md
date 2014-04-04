# npm-deps(1)

`npm-deps(1)` is a nifty little script that scans subdirectories searching for 
nested `package.json` files, and merges all the dependencies together in a 
single `package.json` file that is outputted to stdout.

If the current directory hosts a `package.json` file, it's used as a template
to produce the final `package.json` file, so that `npm-deps(1)` can be used in
place.

## Example

    $ cd my_cool_project
    $ npm-deps > package.json

## Command line options

    -h, --help     output usage information
    -V, --version  output the version number
    -s, --silent   do not print out warnings

## Conflicts

`npm-deps(1)` will warn you about any potential conflicts of the versions
declared in the multiple package.json files

## License

The MIT License (MIT)

Copyright (c) 2014, Automattic, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.