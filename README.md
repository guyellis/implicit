# implicit

[![Greenkeeper badge](https://badges.greenkeeper.io/guyellis/implicit.svg)](https://greenkeeper.io/)

## JavaScript Syntax Check Helper

Implicit checks your JavaScript code and reports on potential errors with
the syntax of the code. These are errors that cannot be found with a linter.

For example, can you see the error in the following code?

```
if(Object.keys(o) === 1) {
  console.log(o);
}
```

It should be:

```
if(Object.keys(o).length === 1) {
  console.log(o);
}
```

Implicit will generate an error if it encounters a mistake such as this.

Implicit is not a replacement for a linter. It is an additional tool that you
run to check your code. A good place to put this is in a pre-commit hook.

## Install

```
npm install -g implicit
```

## Usage

Run inside the root of your project:

```
implicit
```

Generate default rc and ignore files:

```
implicit init
```

Get usage help:

```
implicit --help
```

## Development

If you've clone the repo and are working on changes you can install your local
version of `implicit` by running this in the root of the `implicit` project
folder:

```
npm i -g .
```

Now you can go to another project and run `implicit` to have your customized
changes run against your project.

## Contributing and Pull Requests

See [Contributing](CONTRIBUTING.md).

## Help

You can contact me on Twitter: [@wildfiction](https://twitter.com/wildfiction)
