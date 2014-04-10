# npm-deps(1)

`npm-deps(1)` is a nifty little script that scans subdirectories searching for 
nested `package.json` files, and merges all the dependencies together in a 
single `package.json` file that is outputted to stdout.

If the current directory hosts a `package.json` file, it's used as a template
to produce the final `package.json` file, so that `npm-deps(1)` can be used "in
place".

## Example

    $ cd my_cool_project
    $ npm-deps -o package.json

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

## Annoying `package.json` git changes?

You will likely already have a root `package.json` file, and
`npm-deps(1)` will overwrite the exisiting file which may be annoying
when using `git add`, `git status`, etc.

One suggestion for this is to make the `package.json` file [immune
to version control changes][git-ignore], like so:

``` bash
$ git update-index --assume-unchanged package.json
```

From then on, changes to the `package.json` file will not be considered
by `git`.

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
