var app = {
  'css': null,

  'exports': {
    onMounted() {
      this.state.sentence = "This is App component";

      this.update({
      });
    }
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template('<div expr0><!----></div>', [{
      'redundantAttribute': 'expr0',
      'selector': '[expr0]',

      'expressions': [{
        'type': expressionTypes.TEXT,
        'childNodeIndex': 0,

        'evaluate': function(scope) {
          return scope.state.sentence;
        }
      }]
    }]);
  },

  'name': 'app'
};

export default app;
