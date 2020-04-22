# CSS Basics

## Inhalt

* [Was ist CSS?](#was-ist-css?)
* [Implementation von CSS](#implementation-von-css)
* [CSS Selektoren](#css-selektoren)
* [CSS Einheiten](#css-einheiten)
* [Die Kaskade](#die-kaskade)
* [Farben](#farben)
* [Box-Model, Margins und Paddings](#box-model,-margins-und-paddings)

## Setup

Für Übungen nutzen wir die folgende **CodeSandbox** als Startpunkt:

**[https://codesandbox.io/s/f01xs](https://codesandbox.io/s/f01xs)**

Die Übungen bauen immer aufeinander auf, aber keine Angst, für den Fall, dass mal bei einer Übung etwas nicht klappen sollte, gibts bei jeder Übung einen Link zur CodeSandbox mit dem aktuellen Stand.

## Was ist CSS?

* «Cascading Style Sheets»
* Keine Programmiersprache
* Visuelle Präsentation von strukturiertem Inhalt
* Anwendung mit einem System von Regeln

### Website ohne CSS

![Page ohne CSS](./assets/css-ohne.png)

### Website mit CSS

![Page mit CSS](./assets/css-mit.png)

### Syntax

![CSS Syntax](./assets/css-syntax.png)

Source: [http://vetbossel.in/beginner-tutorial-website/css/css_syntax.html](http://vetbossel.in/beginner-tutorial-website/css/css_syntax.html)

* Der **Selektor** identifiziert HTML-Elemente, auf welchen die **Deklarationen** angewendet werden sollen.
* Danach folg der **Deklarationsblock**, darin befinden sich eine oder mehrere **Deklarationen**
* Eine Deklaration besteht aus einer **Property** und einer **Value**, getrennt mit einem **Doppelpunkt**
* Mehrere **Deklarationen** sind durch einen **Strichpunkt** getrennt

## Implementation von CSS

* Inline CSS: Direkt im HTML-Element als style-Attribut (nicht empfohlen!)
* Embedded CSS: Benutzung von einem `<style>` tag im HTML-Dokument
* External CSS: Verlinkung einer externen CSS-Datei (empfohlen)

### Inline CSS

* Styles werden direkt aufs Element geschrieben, Selektor wird daher nicht benötigt
* Sehr mühsame Maintenance
* Unterstützen keine Queries (`@media`/`@supports`)
* Können von _aussen_ nur mit !important überschrieben werden

**Beispiel**

```html
<p style="font-size: 20px; line-height: 2;">
  Lorem ipsum dolor sit amet, consetetur.
</p>
```

**Demo** 🤯

- [Inline CSS](https://codesandbox.io/s/css-demo-inline-sv3nq)

### Embedded CSS

* Styles werden in einem `<style>`-Element im `<head>` definiert
* Styles werden mit jedem HTML-Dokument ausgeliefert

**Beispiel**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Embedded CSS</title>
    <style>
      p {
        color: green;
      }
    </style>
  </head>
  <body>
    <!-- Wird grün angezeigt -->
    <p>Lorem ipsum dolor sit amet, consetetur</p>
  </body>
</html> 
```

**Demo** 🤯

- [Embedded CSS](https://codesandbox.io/s/css-demo-embedded-6xw6i)

### External CSS

* Externe CSS-Datei mit Styles
* Wird durch ein `<link>`-Element referenziert
* Mehrere HTML-Dateien können die gleiche CSS-Datei referenzieren
* Wird vom Browser gecached

**Beispiel**

```css
/* styles.css */
h1 {
  font-size: 16px;
}
```

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <title>Home</title>
    <link rel="stylesheet" href="./styles.css">
  </head>
  <body>
    <h1>Ich bin 16px gross</h1>
  </body>
</html>
```

**Demo** 🤯

- [External CSS](https://codesandbox.io/s/css-demo-external-qk383)

## CSS Selektoren

### Grundlegende Selektoren

#### Typenselektor

Der **Typenselektor** wählt alle Elemente aus, die auf den angegeben _Tag_ matchen.

**Beispiel**

```css
p { /* ... */ }
```

#### Klassenselektor

Der **Klassenselektor** wählt alle Elemente aus, die auf die angegeben _Klasse_ matchen.

**Beispiel**

```css
.foo { /* ... */ }
```

#### ID-Selektor

Der **ID-Selektor** wählt das Elemente aus, die auf die angegeben _ID_ matcht.
Zu beachten ist, dass IDs inerhalb eines HTML-Dokuments nur einmal vorkommen darch, daher gelten die Deklarationen hierbei nur für maximal ein Element.

**Beispiel**

```css
#bar { /* ... */ }
```

#### Universalselektor

Der **Universalselektor** wählt alle Elemente aus.  
Dieser Selektor ist grundsätzlich so wenig wie nötig zu gebrauchen. Da dieser jedes Element anspricht macht es diesen sehr _langsam_.

**Beispiel**

```css
* { /* ... */ }
```

#### Attributselektor

Der **Attributselektor** wählt Elemente aufgrund deren Attribute und auch deren Values aus

**Beispiele**

```css
[attribute=“value”] { /* ... */ }

[attribute] { /* ... */ }
```

> **Note:** Dieser Selektor ist sehr mächtig, bitte schaut euch noch die Zusätzlichen Informationen auf MDN an: https://developer.mozilla.org/en-US/docs/Web/CSS/Attribute_selectors

**Demo** 🤯

- [Grundlegende Selektoren](https://codesandbox.io/s/ujuzn)

### Kombinatoren

Kombinatoren werden genutzt, um geziehltere/genauere Selectoren zu schreiben

#### Descendant

Der **Descendant** Kombinator ist die Nutzung von zwei Grundlegenden Selektoren getrennt durch ein **Leerzeichen**.

**Beispiel**

Damit diese Deklarationen auf ein Element angewendet werden, muss dieses Element die Klasse `b` haben, und ein Eltern-Element muss die Klasse `a` haben.

```css
/* CSS */
.a .b {
  color: green;
}
```

```html
<!-- HTML -->
<div class="a">
  <p>Hier werden die Deklarationen nicht angewendet, <span class="b">hier aber schon</span>.</p>
  <p class="b">Dieser Text ist ebenfalls Grün.</p>
</div>
```

**Demo** 🤯

- [Descendant](https://codesandbox.io/s/css-demo-descendant-qpe27)

#### Child

Der **Descendant** Kombinator ist die Nutzung von zwei Grundlegenden Selektoren getrennt durch ein `>`.  
Die beinden Elemente müssen direkt einand verschachtelt sein. Falls dazwischen noch ein anderes Element ist, werden die Deklarationen nicht angewendet.

**Beispiel**

```css
/* CSS */
.a > .b {
  color: green;
}
```

```html
<!-- HTML -->
<div class="a">
  <p>Hier werden die Deklarationen nicht angewendet, <span class="b">hier jetzt auch nicht</span>.</p>
  <p class="b">Dieser Text ist grün.</p>
</div>
```

**Demo** 🤯

- [Child](https://codesandbox.io/s/css-demo-child-qfshe)

#### Adjacent sibling

Der **Adjacent sibling** Kombinator ist die Nutzung von zwei Grundlegenden Selektoren getrennt durch ein `+`.  
Die Deklarationen werden angewendet, wenn auf ein Element mit der Klasse `a`, direkt danach ein Element mit der Klasse `b` folgt.  

**Beispiel**

```css
/* CSS */
.a + .b {
  color: green;
}
```

```html
<!-- HTML -->
<div>
  <p class="a">Dieser Text ist ganz normal</p>
  <p class="b">Grüüüner Text, WOW!</p>
</div>
```

> **Note:** Die Deklarationen werden nur auf das Element mit der Klasse `b` angewendet.

**Demo** 🤯

- [Adjacent sibling](https://codesandbox.io/s/css-demo-adjacent-sibling-qc41u)

#### General sibling

Der **General sibling** Kombinator ist die Nutzung von zwei Grundlegenden Selektoren getrennt durch ein `~`.  
Die Deklarationen werden angewendet, wenn auf das Element mit der Klasse `a`, danach einem Element mit der Klasse `b` folgt (dieses muss aber nicht direkt danach folgen).

**Beispiel**

```css
/* CSS */
.a ~ .b {
  color: green;
}
```

```html
<!-- HTML -->
<div>
  <p class="b">Dieser Text ist trotz der Klasse b, ganz normal</p>
  <p>Ganz normaler Text</p>
  <p class="a">Dieser Text ist ganz normal</p>
  <p class="b">Grüüüner Text, WOW!</p>
  <p>Ganz normaler Text</p>
  <p class="b">Grüüüner Text, WOW!</p>
  <p>Ganz normaler Text</p>
  <p>Ganz normaler Text</p>
  <p class="b">Grüüüner Text, WOW!</p>
</div>
```

> **Note:** Die Deklarationen werden nur auf das Element mit der Klasse `b` angewendet.

**Demo** 🤯

- [General sibling](https://codesandbox.io/s/css-demo-general-sibling-4kugp)

### Pseudoklassen

Pseudoklassen in CSS sind Schlüsselbegriffe, welche hinter einen Selektor gestellt werden um einen besonderen Zustand abzufragen. Selektor und Pseudoklassen sind durch einen Doppelpunkt getrennt.  
Liste aller Pseudoklassen: https://developer.mozilla.org/de/docs/Web/CSS/Pseudo-classes

**Beispiele**

```css
a {
  color: red;
}

a:hover {
  color: green;
}

li {
  margin-bottom: 1em;
}

li:last-child {
  margin-bottom: 0;
}

li:nth-child(2n+1) {
  background: gray;
}

li:not(:last-child) {
  color: blue;
}
```

**Demo** 🤯

- [Pseudoklassen](https://codesandbox.io/s/77lo9)

### Pseudoelemente

Wie auch Pseudoklassen können Pseudoelemente einem Selektor hinzugefügt werden. Selektor und Pseudoelement werden durch zwei Doppelpunkte getrennt.

**Beispiele**

```css
a::before {
  content: "> ";
}

p::first-letter {
  font-weight: bold;
  font-size: 2em;
}

p::selection {
  background: red;
}

input::placeholder {
  color: green;
}
```

**Demo** 🤯

- [Pseudoelemente](https://codesandbox.io/s/dqorb)

### Practice 🔥

Öffne diese [**CodeSandbox**](TODO) als Startpunkt.

- [ ] TODO

Zeit: ~ TODO

**Solution:** TODO

## CSS Einheiten

### Absolute Einheiten

Absolute Einheiten sind wie der Name bereits sagt: "Absolut". Dies heisst, dass egal wo diese Einheiten genutzt werden, diese sind immer unbeeinträchtigt, von anderen Werten.

**Einheiten**

`px` &rightarrow; Pixel

**Beispiel**

```css
p {
  font-size: 16px;
}
```

> **Note:** Mehr zu [absoluten CSS Einheiten](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Values_and_units#Absolute_length_units)

<details>
  <summary>Weitere absolute Einheiten (nicht empfohlen!)</summary>

`cm` &rightarrow; Centimeter  
`mm` &rightarrow; Millimeter  
`in` &rightarrow; Inches (1in = 96px)  
`pt` &rightarrow; Points (1pt = 1/72in)  
`pc` &rightarrow; Picas (1pc = 12pt)  
</details>

### Relative Einheiten

Relative Einheiten sind immer abhängig von einem Wert, der auf einem anderen Element bereits deklariert wurde (z.B. wenn `width: 50%;` deklariert wird, entspricht die Breite des Elementes 50% des Eltern-Element).

**Einheiten**

`%` &rightarrow; Relativ zum Eltern-Element
`em` &rightarrow; Relativ zur eigenen `font-size`, oder zur `font-size` vom Eltern-Element  
`rem` &rightarrow; Relativ zur `font-size` vom Root-Element `<html>` <sup>[1](#foot-relative-values-rem)</sup>  
`vw` &rightarrow; Relativ zur Vierport-Breite <sup>[2](#foot-relative-values-viewport)</sup>  
`vh` &rightarrow; Relativ zur Viewport-Höhe <sup>[2](#foot-relative-values-viewport)</sup>  

<sup><a name="foot-relative-values-rem">1</a></sup> Per default ist die `font-size` auf dem `<html>`-Element auf `16px`eingestellt. Daher entspricht `1rem` = `16px` (nur per Default-Einstellung)  
<sup><a name="foot-relative-values-viewport">2</a></sup> Der Viewport ist der Sichtbare Ausschnitt einer Website

**Beispiel**

```css
p {
  TODO
}
```

> **Note:** Mehr zu [relativen CSS Einheiten](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Values_and_units#Relative_length_units)

### Practice 🔥

Absolute & Relative Einheiten kennenlernen
Öffne diese [**CodeSandbox**](TODO) als Startpunkt.

- [ ] TODO

Zeit: ~ TODO

**Solution:** TODO

## Die Kaskade

Die Kaskade in CSS regelt eingentlich nur, welche Deklarationen wirklich angewendet werden.
Dies ist vor allem dann wichtig zu verstehen, wenn verschiedene Selektoren das gleiche Element identifizieren, und die gleichen Properties überschreiben.

Dabei gibt es vor allem drei Kriterien:

* **Importance** (Wichtigkeit)
* **Specificity** (Spezifität)
* **Source order** (Reihenfolge im Code)

### Importance/Wichtigkeit

Reihenfolge der angewandten Deklarationen:

1. **User-Agent CSS** &rightarrow; Default Stylesheet des Browsers
2. **User CSS** &rightarrow; Browser-Einstellungen des Users
3. **Author CSS** &rightarrow; Von der Website geliefertes CSS

Zusätzlich gibt es aber noch `!important`.  
Mit dem `!important` flag auf einer CSS-Property, kann eine Deklaration nur noch durch eine andere Deklaration mit `!important` überschrieben werden.

**Beispiel**

```css
p {
  color: red !important;
}

p {
  /* Wird ohne !important nicht überschrieben */
  color: green;
}
```

Schlussendlich hat man eine finale Reihenfolge der **Wichtigkeit**:

1. **User-Agent CSS**
2. **User CSS**
3. **Author CSS**
4. **Author CSS** Deklarationen mit `!important`
5. **User CSS** Deklarationen mit `!important`

Dass der User mit `!important` die Deklarationen des Author CSS überschreiben kann, ermöglicht ihm Acessibility-relevante Styles wie Schriftgrösse, Farben etc. zu überschreiben.

### Specificity/Spezifität

Die Spezifität ist eine Nummer, die anhand des Selektors berechnet wird. Desto höher die Spezifität, desto eher werden die Deklarationen angewendet, die innerhalb des Selektors angegeben sind. Dies mahct es aber auch schwerer die Deklarationen zu überschreiben.

1. Inline styles (höchste Spezifität)
2. IDs
3. Klassen, Attribute und Pseudoklassen
4. Elemente und Pseudoelemente (niedrigste Spezifität)

![Spezifität](./assets/specificity.svg)

**Beispiele**

```css
/* Spezifität: 0-0-0-1 */
p {}

/* Spezifität: 0-0-0-2 */
body h1 {}

/* Spezifität: 0-0-0-3 */
body h1::before {}

/* Spezifität: 0-0-1-0 */
.someclass {}

/* Spezifität: 0-0-1-3 */
body h1.classname::before {}

/* Spezifität: 0-1-0-1 */
h1#mytitle {}

/* Spezifität: 0-0-1-1 */
/* Achtung, die Pseudoklassen :is() und :not() zählen als Ausnahme nicht dazu */
h1:not(.someclass) {}

/* Spezifität: 0-0-1-1 */
a[href="./home.html"] {}
```

> **Note:** Wenn immer möglich, die Spezifität sehr gering halten, damit Deklarationen einfach überschrieben werden können

**Hilfreiche Links**

* [Documentation auf MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)
* [Calculator](https://specificity.keegan.st/)

### Source order

Schlusendlich kommts dann noch noch auf die Reihenfolge an.  
Wenn die **Wichtigkeit** und die **Spezifität** gleich ist, gilt die Deklaration welhe später deklariert wird.

**Beispiele**

```css
/* Author CSS */
p {
  color: red;
}

p {
  /* Wichtigkeit und Spezifität ist hier gleich, daher gilt diese Deklaration */
  color: green;
}

#someid .foo .bar span {
  display: block;
}

#someid .foo .bar span {
  /* Wichtigkeit und Spezifität ist hier gleich, daher gilt diese Deklaration */
  display: inline-block;
}
```

## Farben

In CSS können Farben verschieden deklariert werden:
* `Farbname`: Browser unterstützen eine fixe Anzahl an vordefinierten Farben
* `RGB`: Farben bei denen Spezifische Farbwerte für die Grundfarben Rot, Grün und Blau angegeben werden.
* `Hexadezimal`: Farben bei denen Spezifische Farbwerte für die Grundfarben Rot, Grün und Blau angegeben werden.

Es gibt noch weitere Farbtypen, werden aber fast nie bzw. gar nie verwendet.

### Farbname

* Werden von jedem Browser unterstützt
* Unflexibel: Farbwerte sind fix, und können nicht angepasst werden

**Beispiele**

```css
p {
  color: red;
  background-color: blue;
}
```

### RGB

* Drei Grundfarben (jeweils 0 - 255), repräsentieren einen Farbwert
* Angaben entsprechen der Intensität der jeweiligen Grundfarbe  
  0 &rightarrow; Kein Licht  
  255 &rightarrow; Volles Licht
* Farben werden dann vermischt um die angezeigte Farbe zu erhalten

**Beispiele**

```css
p {
  color: rgb(255, 0, 0); /* Rot */
  background-color: rgb(100, 100, 100); /* Grau */
  border: 1px solid rgb(0, 0, 0); /* Schwarz */
}
```

### Hexadezimal

* Ein `#` gefolgt von 3 bzw. 6 Zeichen
* 3 Zeichen für Shorthand, bei welchem jedes Zeichen für zwei Zeichen steht (F &rightarrow; FF)
* Die ersten zwei Zeichen repräsentieren "Rot", die zweiten zwei "Grün" und die letzen "Blau"

**Beispiele**

```css
p {
  color: #000000; /* Schwarz */
  color: #000; /* Shorthand */
  background-color: #333; /* Grau */
  border: 1px solid #abcdef; /* Blauish */
}
```
### Practice 🔥

Öffne diese [**CodeSandbox**](TODO) als Startpunkt.

- [ ] TODO

Zeit: ~ 5 TODO

**Solution:** TODO

## Box-Model, Margins und Paddings

![Box-Model](./assets/box-model.jpg)

* Jede Box hat einen **Content-Bereich** und optionales umgebendes padding, border und margin
* Der Content-Bereich wird über `height` und `width` beeinflusst
* `padding` und `border` werden standardmässig zu Breite und Höhe hinzugerechnet
* Mit `box-sizing: border-box;` kann dieses Verhalten verändert werden
* Das Box-Model wird für jedes Element innerhalb der Dev-Tools angezeigt

### Practice 🔥

Öffne diese [**CodeSandbox**](TODO) als Startpunkt.

- [ ] TODO

Zeit: ~ TODO

**Solution:** TODO
