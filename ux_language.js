L.UxLanguage = L.Control.extend({
    options: {
        languages: {
            // Language selector
            '(default)': false,
            'Arabic': 'ar',
            'German': 'de',
            'English': 'en',
            'Spanish': 'es',
            'French': 'fr',
            'Greek': 'gr',
            'Japanese': 'ja',
            'Russian': 'ru',
            'Korean': 'ko',
            'Chinese': 'zh'
        },
        global: 'ux_language',
        position: 'topleft',
        scene: null
    },

    initialize: function(options) {
        L.Util.setOptions(this, options);
    },

    onAdd: function(map) {
        var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom ux_language-container');
        var UxLanguage = L.DomUtil.create('SELECT', 'ux_language-selector', container);
        for (var key in this.options.languages) {
            var language = L.DomUtil.create('option', 'ux_language-option');
            if (!this.options.languages[key]) {
                language.text = '-- - (Default)';
            }
            else {
                language.text = this.options.languages[key] + ' - ' + key;
            }
            language.value = this.options.languages[key];
            UxLanguage.add(language);
        }
        var options = this.options;
        UxLanguage.selectedIndex = 0;
        UxLanguage.onchange = function(onchange){
            console.log('Changing language for', onchange.target.value);
            options.scene.config.global[options.global] = onchange.target.value;
            options.scene.updateConfig();
        }

        return container;
    }
});

L.uxLanguage = function(options) { return new L.UxLanguage(options); };