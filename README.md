# npm-deps(1)

`npm-deps(1)` is a nifty little script that scans subdirectories searching for
nested `package.json` files, and merges all the dependencies together in a
single `package.json` file that is outputted to stdout.

A base template passed through standard input is used to produce the root
`package.json` file. This allows `package.json` to be ignored by version
control systems, which conflict with auto-generated files. Base package
attributes, like name and version, can be stored in a separate file such as
`package-base.json`, and kept in version control.

## Example

    $ cd my_cool_project
    $ npm-deps < package-base.json > package.json

## Installation

    $ npm install -g npm-deps

## Command line options

    -h, --help           output usage information
    -V, --version        output the version number
    -s, --silent         do not print out warnings
    -o, --output [file]  output to a file

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

[git-ignore]: http://blog.pagebakers.nl/2009/01/29/git-ignoring-changes-in-tracked-files/
