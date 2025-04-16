# Bulletcode CSS Framework

The **Bulletcode CSS Framework** is a modern, minimalistic framework for creating stylesheets for responsive and accessible websites and web applications. It consists of three parts:

 - a set of CSS resets which normalize styles and fix browser inconsistencies
 - a collection of [Sass](https://sass-lang.com/) variables, functions and mixins
 - guidelines for writing styles, based on the BEM methodology

The Bulletcode CSS Framework doesn't contain any built-in styles or components. On the contrary, it removes many styles, including the default styles of links, lists and headings. This makes it easier to write custom styles by adding the necessary properties, instead of overriding the default ones. It also encourages writing accessible, semantic HTML, where elements are chosen according to their meaning (e.g. heading level), rather than their default style (e.g. font size).


## Usage

Add the Bulletcode CSS Framework to your project using npm:

```bash
npm install bc-css-framework
```

The package contains a pre-built CSS file which contains the style resets, but in most cases you will import the framework source files into your own `.scss` file, for example:

```scss
// include configuration overrides here

@import "bc-css-framework/src/config";
@import "bc-css-framework/src/functions";

// include variable overrides here

@import "bc-css-framework/src/variables";
@import "bc-css-framework/src/mixins";
@import "bc-css-framework/src/normalize";

// include your styles here
```

The `config.scss` file contains Sass variables which specify predefined font sizes, responsive layout breakpoints and the color palette. The `variables.scss` file contains Sass variables which make it possible to customize default styles. You can use helper functions to define those variables, for example `color( gray, 500 )`.


## Features

### Colors, sizes and fonts

The framework encourages using consistent colors, spacing and text sizes across all styles.

The **color palette** contains five hues (blue, green, yellow, red and gray), and each hue has ten different tones (50, 100, 200, 300, 400, 500, 600, 700, 800 and 900, from lightest to darkest). The `color( $hue, $tone )` function returns a color with the given hue and tone. The color palette can be customized by overriding the `$colors` variable. In addition, `$black` and `$white` are available. The `$text-color` and `$background-color` variables can be used to change the default text and background color on the page.

The `contrast-color( $background, $color1, $color2 )` function selects one of the two specified colors which has better contrast against the specified background color.

**Spacing units** should be used for all margin and padding properties, for example `margin: $sp-2 $sp-4`. One spacing unit corresponds to `0.25rem`. This ensures that the page is scaled properly when the font size is changed. The following built-in spacing values are available: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14 and 16. To use a non-standard spacing, you can use the `sp( $units )` function.

The `$font-size-base` variable specifies the **base font size** in pixels, which defaults to `14px`. This size is translated to relative units to ensure that font size settings in the browsers are respected; for example if the default font size in the browser is twice as big, the base font size will be `28px`.

It is also possible to override the font size on the whole page by adding a utility class to the `html` element of the document:

```scss
@each $name, $multiplier in $font-sizes {
  .font-size-#{ $name } {
    font-size: relative-font-size( $multiplier * $font-size-base );
  }
}
```

The `text-size( $name )` mixin specifies the font size and line height of an element, using one of the predefined sizes: xs, sm, base, lg, xl, 2xl, 3xl and 4xl.

### Responsive layout

By default, there are five **breakpoints** for creating responsive layouts: sm, md, lg, xl and 2xl. You can apply certain CSS rules to all sizes up to a specific breakpoint by using the `media-breakpoint-max( $name )` mixin. Although the breakpoint sizes are defined in pixels, the mixin ensures that they are adjusted according to the font size settings in the browsers and the font size multiplier.

The `container( $min-breakpoint, $max-breakpoint, $padding, $sidebar-width, $min-sidebar-breakpoint )` mixin can be used to create a responsive, horizontally centered and padded **container**. It has full width until the specified minimum breakpoint, then it adjusts to the current breakpoint until it reaches the maximum size. All parameters are optional. For example:

```scss
.container {
  @include container( lg, $padding: $sp-4 );
}
```

The container can also take into account a sidebar with the given width (it should be specified in `rem` units using the `sp()` function); optionally, the sidebar can be only visible from the specified minimum breakpoint.

### Accessibility

A customized **focus ring** can be used to highlight the focused element when using keyboard input. Use the `focus-ring-color()` mixin to specify the color of the ring for the document's `body` or for individual components. Then you can use the `show-focus-ring` mixin to show the ring when an element is focused. The framework uses `box-shadow` to preserve the border radius of the element, so the default focus outline should be disabled.

```scss
:focus {
  outline: none;
}

:focus-visible {
  @include show-focus-ring;
}
```

Note that `:focus-visible` is not widely supported yet and may need to be polyfilled.

The `focus-ring-inset` mixin specifies that the focus ring should be visible within the element instead of around it.

The `visually-hidden` mixin hides an element from the screen, making it only visible to **screen readers**. The `visually-hidden-focusable` mixin makes the element visible when it's focused, which is useful for creating accessible skip links. These mixins can be used for creating utility components:

```scss
.visually-hidden {
  @include visually-hidden;
}

.visually-hidden-focusable {
  @include visually-hidden-focusable;
}
```

The `has-tooltip` and `tooltip` mixins can be used to create **accessible tooltips**, which appear when the element is hovered or focused, and are visible to screen readers. For example:

```html
<button><i class="fas fa-question-circle"></i><span>Display help</span></button>
```

In this case, the `has-tooltip` mixin should be added to the button's CSS rules, and the span element should use the `tooltip` mixin. It's position can be adjusted if necessary.

The `hide-tooltip` mixin specifies that the tooltip shouldn't be displayed in a certain state of the element.

### Utilities

There are six built-in variants of **box shadows**: sm, base, md, lg, xl and 2xl. They can be applied to an element using the `box-shadow( $variant )` mixin, which also ensures that the shadows works together with the focus ring. To conditionally remove the shadow, use `box-shadow-none`.

The `space-x` and `space-y` mixins add **horizontal and vertical spacing** between child elements of a container, for example `space-x( $sp-4 )`.

The `styled-links` mixin restores the style of a link, because they are removed by the CSS resets. The link color can be changed using the `$link-color` and `$link-color-active` variables. The `styled-code` and `styled-code-block` mixins can be used to add background and padding to inline code and code blocks, respectively. The `prose` mixin restores the styles of paragraphs, headings, lists, blockquotes, figures and horizontal rules inside a container. These mixins can be used separately or together like this:

```scss
.prose-content {
  @include prose;

  a {
    @include styled-links;
  }

  code {
    @include styled-code;
  }

  pre {
    @include styled-code-block;
  }
}
```

The `icon` mixin can be used as a selector for the [Font Awesome](https://fontawesome.com/) icons inside the element. You can override the default `fa` prefix for icons by changing `$icon-prefix`.

The `transition-from` mixin can be used to specify the state that the element transitions from when becoming visible, and transitions to when becoming invisible. It uses the `.v-enter-from`, and `.v-leave-to` classes which are applied by the [<transition> component in Vue.js](https://v3.vuejs.org/guide/transitions-enterleave.html). For example, to use opacity to fade the element in and out:

```scss
.element {
  transition: opacity 150ms ease-in-out;

  @include transition-from {
    opacity: 0;
  }
}
```

The `transition-active` mixin can be used to specify properties which are only applied during a transition.


## CSS Guidelines

The guidelines for writing styles and naming CSS classes are based on the [BEM methodology](http://getbem.com/naming/), however they encourage using child selectors whenever possible, and limiting the number of CSS classes to the minimum.

A **component** (called a block in the BEM methodology) is a standalone entity that is meaningful on its own. It can be a single element (e.g. `.btn`) or a complex component (e.g. `.application-header`). The CSS class corresponding to a component consists of lowercase letters and dashes.

Individual **elements** of a component are styled using child selectors whenever possible, for example `.application-header nav > ul > li`. Only if a child element cannot be identified unambiguously, a CSS class can be used, which contains the component name, two underscores and element name, for example `.application-header__menu`.

**Modifiers** can be used to change the appearance or state of an element. Modifier CSS classes are prefixed with `is-`, for example `.is-active`. In the stylesheet, they are always added to the selector of the component or element that they affect, for example `.application-header__menu a.is-active`, to avoid affecting other components.

Presentational classes like `.text-center` should not be used because [they are garbage](https://medium.com/codex/why-presentational-classes-for-html-css-are-ignorant-garbage-bcfdb02ec397). The only utility classes that are allowed are non-trivial utility components that can be reused as parts of other components to avoid duplicating code, for example `.container` or `.visually-hidden`.
