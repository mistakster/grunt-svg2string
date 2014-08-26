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
      'removeViewBox',
      'cleanupEnableBackground',
      'removeHiddenElems',
      'removeEmptyText',
      'convertShapeToPath',
      'moveElemsAttrsToGroup',
      'moveGroupAttrsToElems',
      'collapseGroups',
      'convertPathData',
      'convertTransform',
      'removeEmptyAttrs',
      'removeEmptyContainers',
      'mergePaths',
      'cleanupIDs',
      'removeUnusedNS',
      'transformsWithOnePath',
      'sortAttrs',
      'removeTitle'
    ]
  });
  svgo.config.plugins.push([{
    type: 'perItem',
    active: true,
    fn: function (item) {
      if (typeof item.elem != 'undefined' && typeof item.content == 'undefined') {
        item.content = [
          {text: ''}
        ];
      }
      return true;
    }
  }]);

  svgo.optimize(svg, function (result) {
    done(null, result.data);
  });
};