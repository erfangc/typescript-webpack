# generator-typescript-webpack

## Installing

First install the generator from npm

```bash
npm install generator-typescript-webpack -g
# append 'sudo' for Debian distro
```

```bash
mkdir -p <app-name> && cd <app-name> && yo typescript-webpack
```

## Why?

### Simplicity

This generator is simple, for those who don't want a overly complex scaffold that locks us into too many JS technologies!

### Unified Build

TypeScript compilers as a standalone and in the IDE is great for experimentation. 

However, real apps require fast code/test/browser refresh cycles. We need a fast build system that understands typescript and can plug into a well accepted testing framework.

This generator uses [webpack](http://webpack.github.io/docs/) and [ts-loader](https://github.com/TypeStrong/ts-loader) to avoid multiple outputs such as a intermediate `/build' directory.

### Testing

We don't want to separate the `edit/browser refresh` cycle to be different from `edit/run test`. `webpack` integrates nicely with `karma` so we choose to marry the two in this generator

## TODOs
 - Make the generator agnostic to the underlying testing framework (allow users to use mocha or jest)
 - Out of the box `sourcemap` support
 - Support for other layouts
 - Optional dependency on phantomjs or Chrome for karma
 - Accept CLI args
