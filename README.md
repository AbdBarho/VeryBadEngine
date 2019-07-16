# VeryBadEngine
[![Build Status](https://travis-ci.org/AbdBarho/VeryBadEngine.svg?branch=master)](https://travis-ci.org/AbdBarho/VeryBadEngine)

My first attempt at creating a game engine.

Requires at least Chrome 67 because of the use of `OffScreenCanvas` in a webworker.

A preview of the current engine capabilities [can be found here](https://abdbarho.github.io/VeryBadEngine/)


## Todo:
- ~~move main loop to a worker~~
- better implement the input redirection from main thread to worker
- remove functions from Vec2 class, make solely a data object
- work on level switching and think about the life cycles of each level and its systems
- ...
