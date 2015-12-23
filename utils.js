module.exports = {
  // From: http://davidwalsh.name/essential-javascript-functions
  once(fn, context) {
    var result;
    return function() {
      if(fn) {
        result = fn.apply(context || this, arguments);
        fn = null;
      }
      return result;
    };
  }
};
