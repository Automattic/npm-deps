
0.3.1 / 2014-10-21
==================

  * output: only create new "dependencies" and "devDependencies" objects when there wasn't one read from stdin

0.3.0 / 2014-08-20
==================

 * Read a `package.json` template from stdin to allow the root `package.json`
   to be ignored in version control

0.2.0 / 2014-08-14
==================

 * refactor to use `npmlog` and `npmenv`

0.1.2 / 2014-08-11
==================

 * analyze: don't process any `node_modules` directories
 * output: use "graceful-fs", for consistency
 * bin: use require() to load package.json version
 * README: add note about `git update-index`

0.1.1 / 2014-04-03
==================

 * Include a newline character on the end of file output.

0.1.0 / 2014-04-03
==================

 * Initial release.
