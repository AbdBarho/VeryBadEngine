# VeryBadEngine
[![Build Status](https://travis-ci.org/AbdBarho/VeryBadEngine.svg?branch=master)](https://travis-ci.org/AbdBarho/VeryBadEngine)

My first attempt at creating a game engine.

Requires at least Chrome 67 because of the use of `OffScreenCanvas` in a webworker.

A preview of the current engine capabilities [can be found here](https://abdbarho.github.io/VeryBadEngine/)


## Todo:
- ~~move main loop to a worker~~
- move rendering to ~~main thread~~ (its own thread, maybe a shared worker, webpack support for this stuff is shit and sending data to the main thread and then back to the render thread will be a huge waste of time and effort), each system sends render commands as soon as possible
- use bigint to mark entities with flags, later use only these flags in the fetch the updatable entities
- better implement the input redirection from main thread to worker
- ~~proper implementation of speed and acceleration limiting~~ (find more efficient solution)
- ~~change the concept of layers in the main thread~~ (maybe they are still valid??)
- improve logger, in worker and main thread
- ~~remove functions from Vec2 class, make solely a data object~~
- work on level switching and think about the life cycles of each level and its systems
- ...
