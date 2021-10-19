# Bulletcode CSS Framework

The **Bulletcode CSS Framework** is a modern, minimalistic framework for creating stylesheets for responsive and accessible websites and web applications. It consists of three parts:

 - a set of CSS resets which normalize styles and fixes browser inconsistencies
 - a collection of [Sass](https://sass-lang.com/) variables, functions and mixins
 - guidelines for writing styles, based on the BEM methodology

The Bulletcode CSS Framework doesn't contain any built-in styles or components. On the contrary, it removes many styles, including the default styles of links, lists and headings. This makes it easier to write custom styles by adding the necessary properties, instead of overriding the default ones. It also encourages writing accessible, semantic HTML, where elements are chosen according to their meaning (e.g. heading level), rather than their default style (e.g. font size).

## Usage

Add the Bulletcode CSS Framework to your project using npm:

```
npm install bc-css-framework
```

You can import framework source files into your `.scss` file, for example:

```
// include configuration overrides here

@import "bc-css-framework/src/config";
@import "bc-css-framework/src/functions";

// include variable overrides here

@import "bc-css-framework/src/variables";
@import "bc-css-framework/src/mixins";
@import "bc-css-framework/src/normalize";

// include your styles here
```

The `config.scss` file contains Sass variables which specify the default fonts, predefined font sizes, responsive layout breakpoints and the color palette. The `variables.scss` files contains Sass variables which make it possible to customize various default styles. You can use helper functions to define those variables, for example `color( gray, 500 )`.

## CSS Guidelines

TODO
