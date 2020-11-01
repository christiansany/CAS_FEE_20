# Problem: JavaScript-Architektur

## Inhalt

* [Intro](#intro)
* [Something1](#something1)
* [Something2](#something2)
* [Something3](#something3)

## Intro

Eine JavaScript-Architktur nennt man vor allem den Aufbau und das Organisieren vom eigenen JavaScript.
Es geht zum Teil so weit, dass ein eigenes kleines miniframework aufgebaut wird. Es sollte den Entwicklern das leben vereinfachen, sodass diese sich nicht um die "basics" kümmern müssen.

### Projekt Setup

Als Beispiel wird der Relaunch von [css.ch](https://www.css.ch) genommen.

#### Executing Team

* 1 UX Architect / IA
* 2 UX Designer
* ~6 Frontender
* ~5 Backender

## Challenges

Typische Challenges die bei einer schlechten oder weniger gut optimierten JavaScript architektur auftreten kann sind die folgenden:

### Render-Blocking

Render blocking Ressourcen verhindern, dass auf der Website eswas gerendert werden kann. Dies geschiet vor allem, wenn JavaScript- & CSS-Dateien im `<head>` verlinkt sind, und diese nicht asyncrhon geladen werden.

![Render-Blocking JavaScript sbb.ch](./assets/render-blocking.png)

### Nicht genutztes JavaScript wird an den Client ausgeliefert

TODO text

![Unused JavaScript sbb.ch](./assets/unused-javascript.png)

**Hilfreiche Links**

* [Remove unused code](https://web.dev/remove-unused-code)

### Main-Thread muss aussergehöhnlich viel JavaScript ausführen

TODO text

![Main-Thread workload sbb.ch](./assets/main-thread-workload.png)

**Hilfreiche Links**

* [Minimize main thread work](https://web.dev/mainthread-work-breakdown)

### Dateien werden nicht langzeitig gecacht

Grundsätzlich sollten JavaScript-Dateien *versioniert* sein, damit gleichzeitig das Langzeitcaching sowie auch die cacheinvalidierung automatisiert ist.
Dies ist leider nicht immer der Fall, oftmals werden Dateien die noch valide wären bereits invalidiert, oder Dateien werden gar nicht invalidiert, welches zu grösseren Problemen führen kann.

> **Disclaimer**
>  
> * Meist ist es nicht möglich diese Problemstellen komplett zu eliminieren, man kann aber mit gewissen Massnahmen diese Probleme möglichst minimieren.

*Die Screenshots sind vom Lighthouse audit von sbb.ch*

### Practice 🔥

Diskutiert in einer 3er oder 4er Gruppe, wie ihr diese Probleme möglichst minimieren könntet.

Zeit: ~ 10 min

## Lösungsideen-/Ansätze

### Render-Blocking

Grundsätzlich sollte nur das "critical" JavaScript wirklich renderblocking sein. Alles andere, **kann und sollte asynchron nachgeladen werden**.

**Beste Solution**

Nach dem Identifizieren des kritischen JavaScript Codes, sollte dieses als inline `<script>` Tag direkt im HTML eingebettet werden. Somit hat die Seite alles was sie benötigt für die *Core-Funktionalität* der Website.  
Alles andere JavaScript welches nicht direkt beim Pageload benötigt wird, kann weiterhin mit einem `<script src="/path/main.js">` integriert werden, es sollte aber entweder mit dem Attribut `async` oder `defer`
asynchron geladen werden, damit das rendering nicht blockiert wird.

**Unsere Solution**

Unser kritisches JavaScript, welches für die Core-Funktionalität benötigt wird, wird in eine separate JavaScript-Datei ausgelagert `head.js`. Alles was nicht kritisch eingestuft wird, wird ins `main.js` geschrieben, und dieses wird mit `defer` asynchron geladen und nach dem Parsen des HTML ausgeführt.

Zum kritischen JavaScript gehört z.B. **Font-Loading** und **Modernizr**, eventuell **globale Variablen** setzen, etc.

**Begründung**

Eine separate `head.js`-Datei ermöglicht erstens caching, aber noch wichtiger ist, dass es fürs BE keine Rolle spielt, was in der Datei drin steht.  
Falls das JS inlines werden sollte, muss dies vom BE unterstützt werden, und zudem muss im Cache vom BE jede Seite invalidiert werden, wenn etwas im `head.js` ändern würde.

**Hilfreiche Links**

* [Attribute async & defer](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)
* [Eliminate render-blocking resources](https://web.dev/render-blocking-resources/)

### Nicht genutztes JavaScript wird an den Client ausgeliefert

Oftmals wird mit einem JavaScript bundler gearbeitet, dieser bundelt das JavaScript für die ganze Website. Den bundler interessiert es nicht, auf welcher Seite die Module integriert sind, er bundlet einfach alles zu einer grossen Datei zusammen. Mit [`dynamic imports`](https://github.com/tc39/proposal-dynamic-import) können wir aus bestimmten Modulen separate chunks generieren und diese nachladen, nur wenn sie wirklich gebraucht werden.

Unser JavaScript sollte daher bestmöglichst aufgesplittet werden, damit auf einer bestimmten Seite nur das JavaScript genladen wird, welches auf dieser Seite wirklich genutzt wird.  
Zudem soltle das inkludieren eines externen packages z.B. von `npm` nicht nur aus security sondern auch auf Dateigrösse geprüft werden. Bei einem import von `lodash` kann es z.B. geschehen, dass das komplette lodash package im eigenen Bundle inkludiert wird (300 KB), was wir nicht wollen.





### Main-Thread muss aussergehöhnlich viel JavaScript ausführen

TODO text

![Main-Thread workload sbb.ch](./assets/main-thread-workload.png)

**Hilfreiche Links**

* [Minimize main thread work](https://web.dev/mainthread-work-breakdown)

### Dateien werden nicht langzeitig gecacht

























### Render-Blocking



## Umfrage/Übung

TODO
* Wie würdet ihr diese Lösungsideen umsetzen?
* Hättet ihr noch eine andere Lösungsidee
* Wie würdet ihr dies in einer Angular/React SPA angehen
* Wie würdet ihr dies in einer "traditionellen" Website angehen?

## Vorbereitung / Requirements definieren

![GoT prepare](https://media.giphy.com/media/3og0IHyZMxZNkNOWT6/source.gif)

Source: [https://media.giphy.com/media/3og0IHyZMxZNkNOWT6/source.gif](https://media.giphy.com/media/3og0IHyZMxZNkNOWT6/source.gif)


Vor dem Beginn werden noch kurz die Requirements aufgeschrieben, somit sind wir können wir zum Schluss auch prüfen, ob unsere neue Architektur alles erfüllt, was wir benötigen.

### Helpers

* Globale helper wie resize watcher und scroll watcher sollten als Singleton implementiert werden können
  * Diese sollten in den Module einfach verwendet werden können

### Module

**General**

* Module werden über ein HTML-Element initialisizert

**Structure/Loading**

* Müssen direkt im main-bundle integriert werden können
* Müssen als separater chunk geladen erden können (Reduzierung der Payload)
* Müssen lazy initialisiert werden (Entlastung des Main-Thread beim Pageload)

**Practicability**

* Müssen global oder als submodul initialisiert werden können
* Müssen untereinander kommunizieren können
* Müssen mixins verwenden können, damit redundante Funktionalität ausgelagert werden kann
* Müssen eine Konfiguration übers Template entgegennehmen können

**Conveniance**

* Müssen eine klare Struktur beinhalten, damit diese einfach erstellt werden können
* Wenn möglich an die alte Modul-Struktur angelehnt sein, damit der neue Aufbau eines Modules nachvollzogen werden kann

## Umsetzung

TODO: Image/Gif umsetzung

### Grundentschiede

* Factory Functions > Classes
  TODO
* Dynamic Imports werden genutzt (ES7 Feature)
  TODO
* Polyfills müssen irgendwie gehandhabt werden (möglichst automatisch)
  TODO

### Webpack einstellungen

TODO Webpackeinstellungen hinschreiben
TOOD die requirements erklären, und wie wir diese lösen wollen

**Caching**

* Wie funktioniert das Browser Caching
  * etag anschauen
  * Anschauen, wann der Browser die Files im cache wieder löscht
* Cachinvalidierung, wie wirds gemacht?
  * Verschiedene Ansätze erklären
    * Vor- & Nachteile
* Webpack
  * Dynamic names
  * Webpack report artefakt
  * webpack einstellung


### Filestruktur

```sh
/architecture-poc
|-- /src
|   |-- /helpers
|   |-- /libs
|       |-- /create-app.js
|       |-- /create-module.js
|   |-- /modules
|       |-- /module-x.js
|       |-- /module-y.js
|   |-- main.js
|-- webpack.config.json
```

### Finale Implementation

#### create-app.js

```js
import loadPolyfills from '@/scripts/helpers/polyfills';
import Logger from '@/scripts/helpers/logger';

/**
 * createApp
 * @param {Object} config -
 * @param {Object} config.modules -
 * @return {Object} -
 */
export default ({ modules = {} } = {}) => {
  const state = {
    modules: {},
  };

  /* --- Private methods --- */

  /**
   * loadModule
   * @param {Object} module - Module to load
   * @return {Promise<void>} Resolved when loaded
   */
  const loadModule = (module) => {
    const queue = [];

    if (module.features) {
      queue.push(loadPolyfills(module.features));
    }

    if (module.handler instanceof Function) {
      Logger.getInstance().debug('Module Loaded: ' + module.name);

      queue.push(
        module.handler().then((esModule) => {
          // eslint-disable-next-line no-param-reassign
          module.handler = esModule.default;
        }),
      );
    }

    return Promise.all(queue);
  };

  /**
   * createModuleInstance
   * @param {Object} module -
   * @param {HTMLElement} el -
   * @return {undefined} -
   */
  const createModuleInstance = (module, el) => {
    try {
      const dataOptions = el.getAttribute(`data-${module.name}-options`); // Deprecated
      const scripOptions = el.querySelector(
        `script[data-${module.name}-options]`,
      );

      const options = dataOptions
        ? JSON.parse(dataOptions)
        : scripOptions
        ? JSON.parse(scripOptions.textContent)
        : {};

      const instance = module.handler.createInstance({
        el,
        options,
      });

      // Save newly created instance
      module.instances.push({ el, name: module.name, instance });
    } catch (error) {
      throw new Error(
        'Module instantiation failed for module: ' + module.name + '\n' + error,
      );
    }
  };

  /**
   * createIntersectionObserver
   * @param {Object} module -
   * @return {IntersectionObserver} intersectionObserver
   */
  const createIntersectionObserver = (module) => {
    const config = {
      rootMargin: '500px 0px 500px', // Extends IntersectionObserver by 500px on top and on bottom of viewport
      threshold: 0.01,
    };

    const observer = new IntersectionObserver(async (entries) => {
      const elements = entries.filter(
        (entry) => entry.intersectionRatio >= 0.01,
      );

      if (elements.length) {
        await loadModule(module);

        elements.forEach((entry) => {
          createModuleInstance(module, entry.target);

          console.log('unobserve....');
          observer.unobserve(entry.target);
        });
      }
    }, config);

    return observer;
  };

  /* --- Public methods --- */

  /**
   * registerModule
   * @param {String} name - Name of the registered module
   * @param {Object|Function} module - Dynamic import of the module, or module itself
   * @return {Boolean} -
   */
  state.registerModule = (name, module) => {
    const selector = `[data-module~="${name}"]`;

    state.modules[name] = {
      name,
      selector,
      lazy: !!module.lazy, // Assign lazy when module should be lazy-initiated
      features: module.features,

      // Assign actual handler when provided an object with lazy prop
      handler: module.handler ? module.handler : module,
      instances: [],

      /**
       * init
       * @param {Document|HTMLElement} scope - Scope of the module that should be initiated.
       * @return {Promise} -
       */
      async init(scope = document) {
        let elements;

        if (scope === document) {
          elements = scope.querySelectorAll(this.selector);
        } else {
          elements = scope.parentNode.querySelectorAll(this.selector);
        }

        if (elements.length) {
          if (this.lazy) {
            if (!this.intersectionObserver) {
              // Creating a scoped IntersectionObserver for this module
              this.intersectionObserver = createIntersectionObserver(this);
            }

            elements.forEach((el) => {
              console.log('observed....');

              this.intersectionObserver.observe(el);
            });
          } else {
            await loadModule(this);

            elements.forEach((el) => {
              createModuleInstance(this, el);
            });
          }
        }
      },
    };
  };

  state.registerModules = (modules_) => {
    Object.entries(modules_).forEach(([name, module]) => {
      state.registerModule(name, module);
    });
  };

  state.initModule = (name, scope = document) => {
    if (!state.modules[name]) {
      throw new Error(`The module '${name}' is not registered.`);
    }
    state.modules[name].init(scope);
  };

  state.initAllModules = () => {
    Object.keys(state.modules).forEach((name) => {
      state.initModule(name);
    });
  };

  /**
   * getModuleInstancesByElement
   * by providing an HTMLElement we search for modules hooked over this node
   * @param {HTMLElement} element -
   * @param {String} [moduleName] -
   * @return {Array} -
   */
  state.getModuleInstancesByElement = (element, moduleName) => {
    if (moduleName) {
      return state.modules[moduleName].instances.filter(
        (mi) => mi.el === element,
      );
    }

    return Object.entries(state.modules).reduce((acc, [, module]) => {
      acc.push(...module.instances.filter((mi) => mi.el === element));
      return acc;
    }, []);
  };

  /**
   * init
   * @return {undefined}
   */
  state.init = async () => {
    await loadPolyfills(['IntersectionObserver']);

    state.registerModules(modules);
    state.initAllModules();
  };

  state.init();

  return state;
};
```

#### create-module.js

```js
/**
 * createModule
 * @param {Object} config
 * @return {Object} module
 */
export default (config) => ({
  createInstance: ({ el, options: options_ = {} }) => {
    const state = {};

    if (config.mixins) {
      Object.entries(config.mixins).forEach(([name, mixin]) => {
        // mixins are namespaced by name and prepended by a '$'
        // This is mainly to avoid naming-conflict
        state[`$${name}`] = mixin();
      });
    }

    const options = {};

    // Check if default options is a function and throw if it's defined but not as a function
    if (config.options && config.options instanceof Function) {
      Object.assign(options, config.options());
    } else if (config.options) {
      throw new Error('options must be a Function returning an object');
    }

    // Assign given options to overwrite default options
    Object.assign(options, options_);

    return config.constructor({
      el,
      state,
      options,
    });
  },
});
```

### main.js
```js
import './helpers/polyfills';

import createApp from './libs/create-app';
import button from '@/scripts/modules/button';
import image from '@/scripts/modules/image';

window.apps = {};
window.apps.main = createApp({
  modules: {
    // Directly integrate module
    button,
    image: {
      features: ['IntersectionObserver', 'picture'],
      handler: image,
    },

    // lazy-load module if it's found in the DOM
    'vue-module': () =>
      import(/* webpackChunkName: "vue-mod" */ '@/scripts/modules/vue-module'),

    // lazy-laod when scrolled to this element
    'lazy-module': {
      lazy: true,
      handler: () =>
        import(
          /* webpackChunkName: "lazy-mod" */ '@/scripts/modules/lazy-module'
        ),
    },
  },
});

```

#### module.js

```js
import createModule from '@/scripts/libs/create-module';

export default createModule({
  options: () => ({
    foo: 'bar',
  }),

  /**
   * createButton
   * @param {Object} module - Module
   * @param {Element} module.el - Element
   * @param {Object} module.state - State
   * @param {Object} module.options - Options
   * @return {Object} state
   */
  constructor({ el, state, options }) {
    /* --- Private methods --- */

    /**
     * clickHandler
     * @param {Event} event - Native Event
     * @return {undefined}
     */
    const clickHandler = (event) => {
      console.log('clicked', event, el);
    };

    /**
     * addEventListeners
     * @return {undefined}
     */
    const addEventListeners = () => {
      el.addEventListener('click', clickHandler);
    };

    /**
     * removeEventListeners
     * @return {undefined}
     */
    const removeEventListeners = () => {
      el.removeEventListener('click', clickHandler);
    };

    /* --- Public methods --- */

    /**
     * init
     * @return {undefined}
     */
    state.init = () => {
      addEventListeners();
    };

    /**
     * destroy
     * @return {undefined}
     */
    state.destroy = () => {
      removeEventListeners();
    };

    state.init();

    return state;
  },
});
```

#### webpack.config.js

```js
{
  // ...
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'assets/scripts/[name].js',
    chunkFilename: 'assets/scripts/async/[name].[contenthash].js',
  }
}
```

[Codesandbox Demo](https://codesandbox.io/s/o04l7) 🦄




TODO Creating a new module

TODO: Registering a new module

TODO Preload hint


### Zusätzliches


### Preload hints

Preload hints sollten wenn immer möglichst am anfang des `<head>`-Tag stehen, damit die Dateien möglichst schnell geladen werden. Wichtig dabei ist, dass diese Dateien ab dem Zeitpunkt des parsens der `<link>`-Tags zwar heruntergeladen werden, der Browser ist aber dabei nicht blockiert.

Das `main.js` ist erst am ende des body effektiv eingebunden. preload hitns geben die Browser die Möglichkeit die Dateien bereits herunter zu laden, bevor er am schluss des `<body>` ist.

```html
<!doctype html>
<html lang="de" class="no-js">
  <head>
    <link rel="preload" href="/assetsv2/css/main.min.css?v=297ac2e71010cbc80e225299802e14dd" as="style">
    <link rel="preload" href="/assetsv2/js/head.min.js?v=297ac2e71010cbc80e225299802e14dd" as="script">
    <link rel="preload" href="/assetsv2/js/main.min.js?v=297ac2e71010cbc80e225299802e14dd" as="script">
```





#### Webpack Aufsplitten

![Vendor Chunk jQuery](./assets/vendor-chunk.png)

Webpack erkennt selbständig, wenn Dependency X in mehreren verschiedenen chunks besteht, und extrahiert




## Verbesserungsmöglichkeiten

* Service Worker für besseres Caching
  * Frage, wie könnte man das am besten/einfachsten umsetzen, wenn webpack dynamische dateinamen generiert?