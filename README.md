# Ux Language for [Tangram](https://mapzen.com/products/tangram/) and [Mapzen's vector Tiles](https://mapzen.com/projects/vector-tiles/)

![](docs/img/ux_language.gif)

[Mapzen's vector tiles](https://mapzen.com/projects/vector-tiles/) support other languanges beside english, and [Tangram](https://mapzen.com/products/tangram/) is ready to handle it. This is a simple Leaflet plugin that can talk to [Tangram JS](https://github.com/tangrams/tangram) to help it change to other languages.

## how it works?

### Mapzen.js and Mapzen basemap styles

Mapzen basemap styles include a global property to set the label language. By setting the `global.ux_language` to a valid 2 character language code the map will redraw the labels in that language (when available, else they default back to the local name).

Import this Leaflet plugin to add a language controller:

```html
    <!-- Language Selector for Tangram -->
    <link rel="stylesheet" href="https://tangrams.github.io/ux_language/ux_language.css" />
    <script src="https://tangrams.github.io/ux_language/ux_language.js"></script>
```

Once the Tangram map object has loaded, add the Leaflet controller: 

```
map.on('tangramloaded', function(e) {
  map.addControl(L.uxLanguage( e.tangramLayer ));
});
```

### do-it-yourself

Because [Tangram](https://mapzen.com/products/tangram/) is higly configurable this needs a little of wiring on you [`.yaml` scene file](https://mapzen.com/documentation/tangram/Scene-file/).

First you need to import the `ux_language.yaml` in the `docs/` directory to your scene file like this:

```yaml
import:
    - https://tangrams.github.io/ux_language/ux_language.yaml

```

Once there you need to point your labels rules to the function `global.ux_language_text_source` on your `text_source:` nodes. Like this

```yaml
layers:
    roads:
        data: { source: mapzen }
        draw:
            text:
                text_source: global.ux_language_text_source
                font:
                    family: Helvetica
                    size: 14px
                    fill: black
                    stroke: { color: white, width: 6px }
```

Then is time to load the leaflet pluging it self. For that in the html of you map add:

```html
    <!-- Language Selector for Tangram -->
    <link rel="stylesheet" href="https://tangrams.github.io/ux_language/ux_language.css" />
    <script src="https://tangrams.github.io/ux_language/ux_language.js"></script>
```

And in the JavaScript section where you load the Leaflet and Tangram maps do:

```javascript
    // Leafleat Map
    var map = L.map('map', {maxZoom: 20});

    // Tangram Layer
    var layer = Tangram.leafletLayer({
        scene: 'https://tangrams.github.io/tron/tron.yaml',
        attribution: '&copy; OSM contributors | <a href="https://mapzen.com" target="_blank">Mapzen</a>'
    }).addTo(map);

    // Now the interesting stuff, the new UxLanguage !!
    map.addControl(L.uxLanguage({ scene: layer.scene }));
```

Enjoy!
