'use strict';


var inBrowser = typeof win !== 'undefined' && Object.prototype.toString.call(win) !== '[object Object]';
var hasMutationObserverBug;

if (inBrowser) {
  (function(win) {
    var UA = inBrowser && win.navigator.userAgent.toLowerCase();
    var isIos = UA && /(iphone|ipad|ipod|ios)/i.test(UA);
    var iosVersionMatch = isIos && UA.match(/os ([\d_]+)/);
    var iosVersion = iosVersionMatch && iosVersionMatch[1].split('_');

    hasMutationObserverBug = iosVersion &&
      Number(iosVersion[0]) >= 9 &&
      Number(iosVersion[1]) >= 3 &&
      !win.indexedDB;
  })(window);
}

var head;
var tail;

function drain() {
  var fn;
  var context;
  var args;
  while (head) {
    fn = head.fn;
    context = head.context;
    args = head.args;

    head = head.next;

    // TODO: fn error handle
    fn.apply(context, args);
  }

  tail = undefined;
}

var nextTick = (function() {
  var notify;

  /* istanbul ignore next */
  // isNode
  if (typeof process === 'object' && Object.prototype.toString.call(process) === '[object process]') {
    notify = function() {
      process.nextTick(drain);
    };
  // browser with MutationObserver
  } else if (typeof MutationObserver !== 'undefined' && !hasMutationObserverBug) {
    var toggle = true;
    var observer = new MutationObserver(drain);
    var textNode = document.createTextNode('');
    observer.observe(textNode, {
      characterData: true
    });
    notify = function() {
      textNode.data = toggle = !toggle;
    };
  // environments with Promise (maybe non-completely correct)
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function() {
      promise.then(drain);
    };
  // other environments
  } else {
    var env = inBrowser ?
      window :
      typeof global !== 'undefined' ? global : {};
    notify = env.setImmediate || function() {
      setTimeout(drain, 0);
    };
  }

  return function(fn, context, args) {
    var task = {
      fn: fn,
      context: context,
      args: Array.prototype.slice.call(arguments, 2),
      next: undefined
    };

    /* istanbul ignore if */
    if (tail) {
      tail.next = task;
    }

    /* istanbul ignore next */
    if (!head) {
      head = task;
      notify();
    }

    tail = task;
  };
})();

module.exports = nextTick;
