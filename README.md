# Ux Language for [Tangram](https://mapzen.com/products/tangram/) and [Mapzen's vector Tiles](https://mapzen.com/projects/vector-tiles/)

![](ux_language.gif)

[Mapzen's vector tiles](https://mapzen.com/projects/vector-tiles/) support other languanges beside english, and [Tangram](https://mapzen.com/products/tangram/) is ready to handle it. This is a simple Leaflet plugin that can talk to [Tangram JS](https://github.com/tangrams/tangram) to help it change to other languages.

## how it works?

Because [Tangram](https://mapzen.com/products/tangram/) is higly configurable this needs a little of wiring on you [`.yaml` scene file](https://mapzen.com/documentation/tangram/Scene-file/).

First you need to import the `ux_language.yaml` to your scene file like this:

```yaml
import:
    - https://tangrams.github.io/ux_language/ux_language.yaml

...

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
