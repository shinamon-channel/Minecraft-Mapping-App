var app = {
  'css': null,

  'exports': {
    onMounted() {
      this.state.logo_path = '../img/logo.png';

      this.update({
      });
    }
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<img expr0/><div id="map"></div>', [{
      'redundantAttribute': 'expr0',
      'selector': '[expr0]',

      'expressions': [{
        'type': expressionTypes.ATTRIBUTE,
        'name': 'src',

        'evaluate': function(scope) {
          return scope.state.logo_path;
        }
      }]
    }]);
  },

  'name': 'app'
};

export default app;
