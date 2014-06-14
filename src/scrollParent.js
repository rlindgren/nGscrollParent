(function (element, jQuery) {
  'use strict';
  // jQueryUI Core scrollParent
  // http://jqueryui.com
  if (!jQuery) {
    element.fn.extend({
      parents: function (){
        var result = [];
        return (function walkParents (current) {
          var parent = element(current).parent()[0];
          if (parent.tagName.match(/body/i)) {
            result.push(parent);
            return element(result);
          } else {
            result.push(parent);
            walkParents.call(null, parent);
          }
        }(this));
      },
      filter: function (fn) {
        var result = [];
        angular.forEach(this, function (v, k) {
          if (fn(v, k)) result.push(v);
        }, this);
        return element(result);
      }
    });
  } else {
    element.fn.extend({
      scrollParent: function() {
        var position = this.css( 'position' ),
          excludeStaticParent = position === 'absolute',
          scrollParent = this.parents().filter( function() {
            var parent = $( this );
            if ( excludeStaticParent && parent.css( 'position' ) === 'static' ) {
              return false;
            }
            return (/(auto|scroll)/).test( parent.css( 'overflow' ) + parent.css( 'overflow-y' ) + parent.css( 'overflow-x' ) );
          }).eq( 0 );

        return position === 'fixed' || !scrollParent.length ? element( 'body' ) : scrollParent;
      },
      scrollParents: function () {
        var result = [];
        angular.forEach(this, function (parent, index) {
          (function walkParents (current) {
            var parent = element(current).scrollParent()[0];
            if (parent.tagName.match(/body/i)) {
              result.push(parent);
              return;
            } else {
              result.push(parent);
              walkParents.call(null, parent);
            }
          }(parent));
        });
        return element(result);
      }
    });
  }
}(angular.element, jQuery));