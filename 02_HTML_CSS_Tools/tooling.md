# Frontend Tooling

## Inhalt

* [Taskrunner & Bundler](#taskrunner--bundler)
* [Nützliche Tools/Loaders](#nützliche-toolsloaders)
* [TODO](TODO)
* [TODO](TODO)
* [TODO](TODO)

## Setup

Für Übungen nutzen wir die folgende **CodeSandbox** als Startpunkt:

**[https://codesandbox.io/s/TODO](https://codesandbox.io/s/TODO)**

Die Übungen bauen immer aufeinander auf. Aber keine Angst! Für den Fall, dass bei einer Übung etwas nicht klappt, gibts bei jeder Übung einen Link zur CodeSandbox mit dem aktuellen Stand.

## Taskrunner & Bundler

TODO emphasize

Taskrunners und Bundlers sind hier um dem Developer das leben zu vereinfachen. Sie sind Grundsätzlich für das 'Aufbereiten' von Assets verantwortlich. Wobei die Assets nicht ausschliesselich Bilder oder ähnliches sind, aber auch CSS oder JavaScript.

Taskrunners haben dabei den Ansatz, dass sie mehr Stream-Basiert funktionieren. In einem Task gibt man einen bestimmten Input (Dateien), diese werden dann in verschiedenen Schritten verarbeitet und ergeben am schluss wieder ein Output.

Bundler haben mehr ein Konfigurativen approach. Man gibt nicht Schritt für Schritt an, was passieren soll, sondern stellt eine kleine bis sehr grosse und komplizierte Konfiguration zusammen, die danach Vorgibt, was der Bundler alles mahcen kann/soll. Am Anfang wurden Bundler 'nur' für das Zusammensetzen von Dateien genutzt, es wurden also mehrere Dateien zu einer Datei zusammengeführt, daher der Name Bundler. Inzwischen sind Bundler sehr viel potenter geworden, sodass Taskrunner fast nicht mehr genutzt werden. Alles was früher der Taskrunner 'besser' konnte wie ein Bundler (z.B. aufbereiten von Bilddateien, generieren von Icon-Sprites oder SVG-Sprite usw.) kann nur ebenfalls in einem Bundler gemacht werden.

### Taskrunner (Gulp)

Gulp bessitzt einen Stream-Bases Ansatz (Input &rightarrow; Processing &rightarrow; Output). Dabei kann man beliebig viele Prozesse aneinander schalten.

#### Quickstart

**Installation**

Gulp is ein ganz normales NPM-Package, es kann also wie gewohnt übers Terminal installiert werden.  

```sh
npm install --global gulp-cli
```

In dem Projekt muss noch eine lokale Version installeirt werden, damit Gulp richtig funktioniert.

```sh
cd my/project/gulp-demo

npm init -y

npm install gulp --save-dev
```

**Beispieltask**

Im Beispieltask geben wir eine JavaScript-Datei als input (`src/main/js`), anschliesslich werden die Plugins Babel, Unglify und Rename genutzt. Somit erhalten wir dann unser Output, welchen wir in das `output` Directory speichern.

```js
// gulpfile.js
const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

exports.default = function() {
  return src('src/main.js')
    // Bundle our JS files
    .pipe(babel({
        presets: ['@babel/env']
    }))
    // The gulp-uglify plugin won't update the filename
    .pipe(uglify())
    // So use gulp-rename to change the extension
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('output/'));
}
```

**Ausführen des Tasks**

In dem Verzeichnis wo wir die lokale Version von Gulp installeirt haben und wo unser `gulpfile.js` liegt, können wir anschliessen den Task ausführen.  
Im Beispielt ist der Task auf dem default export, daher muss der Taskname nicht angegeben werden, sobald man named exports hat, kann man einen Tasknamen angeben, damit man diesen ausführen kann.

```sh
cd my/project/gulp-demo

gulp <task-name>
```

**Hilfreiche Links**

* [Gulpjs Website](https://gulpjs.com/)
* [Getting starteg Guide](https://gulpjs.com/docs/en/getting-started/quick-start/)

### Bundler (Webpack)

> At its core, webpack is a static module bundler for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.
[Source](https://webpack.js.org/concepts/)

#### Quickstart

**Installation**

Gegenüber Gulp, muss hier nichts global installiert werden. Wir können `webpack` und `webpack-cli` lokal installieren.
Mit Webpack version 4.0 muss man keine Konfigurationsdatei angeben

```sh
cd my/project/webpack-demo

npm init -y

npm install webpack webpack-cli --save-dev
```

**Erstellung der Filestruktur**

webpack-demo
+-- /dist
|   +-- index.html
+-- /src
|   +-- index.js
+-- package.json

```js
// src/index.js
function component() {
  const element = document.createElement('div');

  element.innerHTML = ['Hello', 'webpack'].join(' ');

  return element;
}

document.body.appendChild(component());
```

```html
<!-- dist/index.html -->
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
  </head>
  <body>
    <script src="main.js"></script>
  </body>
</html>
```

**Ausführen des Tasks**

Beim Ausführen von Webpack ohne Konfigurationsdatei, wird standardmässig `src/index.js` and Entry (Input) genommen.
Die Output-Datei wird anschliessend als `dist/main.js` gespeichert.

```sh
cd my/project/webpack-demo

npx webpack
```

Anschliessend kann das `dist/index.html` im Browser geöffnet werden. Wenn alles funktioniert hat, sollte man 'Hello webpack' sehen können.

**Konfugirationsdatei**

Die Konfigurationsdatei für Webpack hat normalerweise `webpack.config.js` als Dateiname, es kann aber auch irgend ein Dateiname verwendet werden (falls der Dateiname vom default abweicht, muss man dies beim Ausführen von Webpack noch als Parameter angeben).

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js', // entry/input
  output: {
    filename: 'main.js', // output filename
    path: path.resolve(__dirname, 'dist'), // output directory
  },
};
```

**Webpack Loaders**

Gulp verwendet spezifische Gulp-Plugins, Webpack verwendet sogenannte Loaders.
Ein Loader definiert, was webpack mit einem gewissen Filetype machen soll.

**Beispiel `babel-loader`**

Installieren der genutzten Packages

```sh
npm install babel-loader @babel/core @babel/preset-env --save-dev
```

Konfigurieren vom Loader

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
```

**Demo** 🤯

- [TODO](https://codesandbox.io/s/TODO)

> **Das Wichtigste in Kürze**
>  
> * Wenn man einen gewissen Dateitypen in Webpack unterstützen will, muss man den dazugehörigen Loader installieren und konfigurieren
> * Die Webpack Konfiguration muss nicht selbst gemacht werden, wenn man ein Projekt aufsetzt mit Angular CLI oder create-react-app

**Hilfreiche Links**

* [Webpack Website](https://webpack.js.org/)
* [Getting starteg Guide](https://webpack.js.org/guides/getting-started/)
* [Webpack Loaders](https://webpack.js.org/concepts/loaders/)
* [Tutorial: How to set up React, webpack, and Babel from scratch](https://www.valentinog.com/blog/babel/)

## Nützliche Plugins/Loaders & Packages

* [SASS/SCSS (CSS Präprozessoren) &rightarrow; CSS Asset Building](#sassscss-css-präprozessoren)
* [PostCSS &rightarrow; Advanced CSS Asset Building](#postcss)
* [Babel &rightarrow; JavaScript Asset Building / Transpiling](#TODO)
* [ESLint &rightarrow; QA (JavaScript Linter)](#TODO)

### SASS/SCSS (CSS Präprozessoren)

SASS/SCSS ist ein CSS Präprozessor, er ermöglich eine vereinfachte Schreibweise vom CSS und bieter viele nützliche Features, die das schreiben von CSS vereinfachen und dieses wartbar machen. SCSS ist eine abstrahierung von SASS, welche eine leicht andere Syntax. SASS und SCSS beiten aber die gleichen Funktionen, und die meisten Developer nutzen die SCSS-Syntax.


• Superset von CSS, wird zu CSS prozessiert • Ansatzweise vergleichbar mit Typescript
• Vorteil:
• Nicht an Limitationen von CSS gebunden
• Möglichkeit zu effizienterem und besser wartbarem Code

Mehr zu SCSS beim Deepdive später.

Website: https://sass-lang.com/  
Loader: https://webpack.js.org/loaders/sass-loader/

### PostCSS

PostCSS ist ein Loader der in Kombination mit zusätzlichen Plugins genutzt werden kann.  
Dieser loader wird sehr oft genutzt, da er anhand seiner Plugins sehr viele Transformationen understützt.

Oft genutzte Plugins:
* [Autoprefixr &rightarrow; Legacy Browser support](https://github.com/postcss/autoprefixer)
* [Stylelint &rightarrow; QA (CSS Linter)](https://stylelint.io/)
* [PostCSS CSS Variables &rightarrow; Legacy Browser support](https://www.npmjs.com/package/postcss-css-variables)

Website: https://postcss.org/  
Loader: https://webpack.js.org/loaders/postcss-loader/

### Babel

Babel wird fürs Transpilieren und transformieren von JavaScript genutzt.  
Es ermöglich die Nutzung der neusten ECMAScript Standards und "übersetzt" diese auf ältere Standards, damit unser JavaScript in älteren Browsern ebenfalls funktioniert.

Website: https://babeljs.io/  
Loader: https://webpack.js.org/loaders/eslint-loader/

### ESLint

ESLint kann fürs linten und automatisches Formatieren von JavaScript genutzt werden.  
Es is der mit abstand der am häuffigsten genutzte Linter für JavaScript.

Website: https://eslint.org/  
Loader: https://webpack.js.org/loaders/eslint-loader/

**Hilfreiche Links**

* [Liste von Loader](https://webpack.js.org/loaders/)

## SASS/SCSS Deepdive

SCSS ist ein *Superset* von CSS, uns wird zu CSS transpiliert. Ansatzweise kann man es ein bisschen mit Typescript vergleichen.

### Variablen

```scss
/* SCSS */
$color-main: #73c92d;

a {
  color: $color-main;
}

.highlight {
  background-color: $color-main;
}
```

```scss
/* CSS */
a {
  color: #73c92d;
}

.highlight {
  background-color: #73c92d;
}
```

### `@mixin`

TODO

#### Mit Parameter

TODO

#### Mit Content Block

TODO

### `@extend`

```scss
/* SCSS */
%box {
    padding: 1em;
    border: 1px solid #ccc;
}

.message {
  @extend %box;
  width: 100%;
  color: #333;
}

.success {
  @extend .message;
  border-color: green;
}

.error {
  @extend .message;
  border-color: red;
}
```

```scss
/* CSS */
.message,
.success,
.error {
  padding: 1em;
  border: 1px solid #cccccc;
  width: 100%;
  color: #333;
}

.success {
  border-color: green;
}

.error {
  border-color: red;
}
```

#### Caveats

Position des zu extendenden Selektors relevant für generiertes Resultat.  
*Jedes vorkommen* wird extended:

```scss
/* SCSS */
.message + .message {
  margin-bottom: .5em;
}

.message-error {
  @extend .message;
}
```

```scss
/* CSS */
.message + .message,
.message-error + .message-error,
.message + .message-error,
.message-error + .message {
  margin-bottom: .5em;
}
```

**Einschub: `@mixin` vs `@extend`** 👀

Wichtig: generiertes CSS im Auge behalten
* `@mixin`:
  * Einfach wartbar, Resultat vorhersehbar
  * Resultat kann sehr redundant sein. Aber durch die gzip-Komprimierung ist dies nicht so schlimm
* `@extend` (mit oder ohne %placeholder):
  * Reduktion des generierten Codes
  * Resultat nicht immer vorhersehbar, funktioniert nicht innerhab von Media-Queries


### Strukturierung durch Verschachtelung

TODO

### Verschachtelung: "Parent-Selektor"

TODO

### Partials/Imports

TODO

### Funktionen & Operationen

TODO

### Loops

```scss
/* SCSS */
TODO
```

```scss
/* CSS */
TODO
```

### Interpolation

```scss
/* SCSS */
$class: foo;
$property: color;
$value: red;

.#{$class} {
  #{$property}: $value;
}
```

```scss
/* CSS */
.foo {
 color: red;
}
```

**Demo** 🤯

- [TODO](https://codesandbox.io/s/TODO)

### Practice 🔥

Öffne diese [**CodeSandbox**](TODO) als Startpunkt.

- [ ] TODO

Zeit: ~ 10 min

**Solution**: [TODO](TODO)
