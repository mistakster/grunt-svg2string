var SVGO = require('svgo');

function createElement(proto, props) {
  var key, obj = {};
  for (key in proto) {
    if (!proto.hasOwnProperty(key)) {
      obj[key] = proto[key];
    }
  }
  var F = function () {};
  F.prototype = obj;
  var ele = new F();
  for (key in props) {
    if (props.hasOwnProperty(key)) {
      ele[key] = props[key];
    }
  }
  return ele;
}


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
//      'removeViewBox',
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

  svgo.config.plugins.push([{
    // remove all attributes attribute and replace tag with <symbol>
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

  svgo.config.plugins.push([{
    // expand self-closing tags
    type: 'perItemReverse',
    active: true,
    fn: function (item) {
      if (typeof item.elem != 'undefined') {
        if (typeof item.content == 'undefined' || !item.content.length) {
          item.content = [
            createElement(item, {text: ''})
          ];
        }
      }
    }
  }]);

  svgo.optimize(svg, function (result) {
    done(null, result.data);
  });
};