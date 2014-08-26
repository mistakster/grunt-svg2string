var SVGO = require('svgo');

module.exports = function (svg, done) {
  var svgo = new SVGO({
    full: true,
    plugins: [
      'removeDoctype',
      'removeXMLProcInst',
      'removeComments',
      'removeMetadata',
      'removeEditorsNSData',
      'cleanupAttrs',
      'convertStyleToAttrs',
      'removeRasterImages',
      'cleanupNumericValues',
      'convertColors',
      'removeUnknownsAndDefaults',
      'removeNonInheritableGroupAttrs',
      'removeUselessStrokeAndFill',
      // 'removeViewBox',
      'cleanupEnableBackground',
      'removeHiddenElems',
      'removeEmptyText',
//      'convertShapeToPath',
      'moveElemsAttrsToGroup',
      'moveGroupAttrsToElems',
      'collapseGroups',
      'convertPathData',
      'convertTransform',
      'removeEmptyAttrs',
      'removeEmptyContainers',
//      'mergePaths',
//      'cleanupIDs',
      'removeUnusedNS',
//      'transformsWithOnePath',
      'sortAttrs'
    ]
  });

  // remove all attributes attribute and replace tag with <symbol>
  svgo.config.plugins.push([{
    type: 'perItem',
    active: true,
    fn: function (item) {
      if (item.isElem('svg')) {
        item.elem = item.local = 'symbol';
        var attrs = Object.keys(item.attrs);
        attrs.forEach(function (name) {
          if (name != 'viewBox') {
            delete item.attrs[name];
          }
        });
        item.attrs.id = {
          name: 'id',
          value: 'blah-blah',
          prefix: '',
          local: 'id'
        };
      }
    }
  }]);

  // expand self-closing tags
  svgo.config.plugins.push([{
    type: 'perItem',
    active: true,
    fn: function (item) {
      if (typeof item.elem != 'undefined' && typeof item.content == 'undefined') {
        item.content = [
          {text: ''}
        ];
      }
    }
  }]);

  svgo.optimize(svg, function (result) {
    done(null, result.data);
  });
};