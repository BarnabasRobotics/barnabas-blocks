# The Context

When compilation (technically "build") is requested from Blockly, it generates some files:
* `blockly_compressed.js(.map)`: Blockly's library code
* `blocks_compressed.js(.map)`: A set of shared block defintions (e.g. basic control flow) between all languages.
* `<lang>_compressed.js(.map)`: A minified file containing the generators for the blocks in a certain language. The list of blocks here is not necessarily tied to the list of defined blocks. All that matters is that at runtime, every block used in a project has a generator.
* We know where `blockly_compressed.js(.map)` and `blocks_compressed.js(.map)` came from - they exactly match the latest stable version of Blockly as of when Andrew updated them (at `660d3b9b`).

# The Problem
* Arduino C is not natively supported by Blockly. At least a handful of projects I've found on the internet include a set of blocks and generators for Arduino (and in some cases for microcontrollers in general).
* Barnabas Blocks runs `js/arduino_compressed.js` on load. 
* We currently have no idea what set of generators created that file. We also don't know when those generators were extracted from their source project.
* Even more strangely, compiling (see below) the set of generators already in Barnabas Blocks yields a version of `arduino_compressed.js` that both includes many more blocks than the version already in Barnabas Blocks and has quite a few other changes. For example:
  * Constants like `Math.e` in the newly generated version have been replaced with `EULER` in the existing version.
  * Some code has been tweaked; the ultrasonic polling block has some delay calls added or removed (I can't recall which)
  * Some code is unique to the version already in Barnabas Blocks.
  * However, many generators are completely identical.
* So either someone changed the generators in Barnabas Blocks without recompiling `arduino_compressed.js`, or the latter was manually edited at some point for some reason. 

# The Solutions
* Ignore this entirely. All future generator additions or overrides will simply take place in a new, non-minified file that is included in `index.html` after `arduino_compressed.js`.
* Find out where these generators came from. Use the Blockly toolchain to minify these generators again and verify the output matches the `arduino_compressed.js(.map)` found in Barnabas Blocks.

## The potential sources:
* The generators are completely original code. This is almost entirely out of the question, as license strings suggest at least a portion of the code was written by a Blockly maintainer himself (though not as part of Blockly), Fred Lin (gasolin). Others cite Neil Fraser with an @google.com email address.
* They come from another project. I've found a few candidates:
  * ~~https://github.com/BlocklyDuino/BlocklyDuino (most likely - this project was built out mostly by Fred Lin, who is cited as the author in some generator files)~~ Does not match at all.
  * ~~https://github.com/carlosperate/ardublockly~~ Compilation fails due to breaking Blockly changes, also includes a [file](https://github.com/carlosperate/ardublockly/blob/master/blockly/generators/arduino/boards.js) not found in Barnabas Blocks.
  * https://framagit.org/roipoussiere/blockly-arduino (unlikely - code style and basic layout are completely different)
  * ~~https://github.com/technologiescollege/Blockly-at-rduino/~~ Very different approach than Barnabas Blocks
* To compound the issue, I haven't looked close enough into any of these generator codebases to know if they are all simply different versions of the same generator set.
* Further, Andrew has included some "mods" (as referred to in `0f9a99d3`). I don't know where these came from, but they appear in the minified Arduino file.
* It could be a mix - perhaps a base set of generators was taken from one place, mods were taken from another place, and some compilation toolchain was used to create a new `arduino_compressed.js` not found in any project but with no new code.

## Compilation toolchains
* `arduino_compressed.js` begins with the following warning:
> `// Do not edit this file; automatically generated by gulp.`
* This actually does provide some information. Some older versions of Blockly (and even [BlocklyDuino to this very day](https://github.com/BlocklyDuino/BlocklyDuino/blob/gh-pages/blockly/build.py)) used a Python 2 script called `build.py` which would invoke Closure (Google's JS compiler) via a Python wrapper inside Closure. This is no longer supported as [Google encourages users to invoke Closure without wrappers](https://github.com/google/closure-library/wiki/Migrating-off-Closure-Python-Scripts).
* BlocklyDuino's build.py is modeled closely after the one found in Blockly, except it calls an API that provides Closure over the internet.
* `build.py` was phased out across every Google project as it was no longer supported sometime after August 2019.
* Fortunately, we can tell the difference bwetween files generated by the new `gulp` toolchain and `build.py:
> `// Do not edit this file; automatically generated by build.py.`
* `arduino_compressed.js` begins with the former warning, so `gulp` was used here.

## What's `gulp` again?
* [`gulp` is a build system for frontend JavaScript](https://gulpjs.com/).
* Its goal is to generate files like the compressed ones we have which have the smallest size possible to save network bandwidth and improve on load and parse times.
* `gulp` is called by Blockly in its modern toolchain to generate the compresed files found in the context section.

## How to compile blocks and generators
* As stated above, Blockly uses `gulp` to compile its `blocks` folder to `blocks_compresed.js`. It also compiles `core/*`, its code, to `blockly_compressed.js.`
* Generators are, by default, only built for the languages Blockly includes support for. This list does not include Arduino C.
* The only (and most logical) approach I've taken is to copy the generators found in Barnabas Blocks `barnabas-blocks/generators` to Blockly's generators folder `blockly/generators`.
* There may be another way - Andrew would probably know if this approach is correct and what else is possible. But for now, I've been:

## Tricking Blockly into compiling for Arduino
* Once Blockly has Arduino generators, it needs to be made aware of them. I added the following function to `scripts/gulpfiles/build_tasks.js` in Blockly's source code around line 270:
```js
function buildArduino() {
  return buildGenerator('arduino', 'Arduino');
};
```
* Now that Blockly knows how to build Arduino generators, it needs to be instructed to do so along with all the other languages. Roughly around line 320 of the same file, we find something interesting:
```js
/**
 * This tasks builds all the generators:
 *     javascript_compressed.js
 *     python_compressed.js
 *     php_compressed.js
 *     lua_compressed.js
 *     dart_compressed.js
 */
const buildGenerators = gulp.parallel(
  buildJavascript,
  buildPython,
  buildPHP,
  buildLua,
  buildDart
);
```
* I added the function `buildArduino` to this list:
```js
const buildGenerators = gulp.parallel(
  buildJavascript,
  buildPython,
  buildPHP,
  buildLua,
  buildDart,
  buildArduino
);
```

### Setting the compilation in motion
* First, if you don't have it, [NodeJS](https://nodejs.org/en/download/) is the de-facto package management system for JavaScript and is required to build Blockly.
  * Think of it like Maven/`pip`/`luarocks` for JavaScript (if you know what any of those are, otherwise understanding what Node is is not relevant)
* Once you have it, open a terminal pointed at Blockly's root directory (Terminal -> New Terminal in Visual Studio Code should do the trick if you have no idea how to do this).
* Type `npm install` at the shell and press Enter.
* If you see some sort of message complaining `npm` is not found or not a command, NodeJS is either improperly or not installed.
* After some time (this could take 20 minutes or more), this will finish working.
* Now type `npm run build:generators`, hit Enter, and wait for it to finish.
* If you see lines like `Starting 'buildArduino'...` along the way, Blockly has compiled for Arduino C.
* There should now be an `arduino_compressed.js` and `arduino_compressed.js.map` in the main Blockly folder. These are the version that was just created.

# Conclusion - what to do
* We need to find where `arduino_compressed.js` came from - or ignore it.
* What I've been doing is copying sets of generators from various projects combining Arduino and Blockly.
* Looking at versions from around when Andrew last made changes to Blockly (August 2020) will likely be closer matches than releases from the present day.
* The closer `gulp`'s output matches `arduino_compressed.js` in Barnabas Blocks, the closer we are to finding which generators created it.