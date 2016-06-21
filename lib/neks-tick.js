'use strict';

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

    // TODO: try...catch ? in case fn error
    fn.apply(context, args);
  }
  tail = undefined;
}

var nextTick = (function() {
  var notify;

  // isNode
  if (Object.prototype.toString.call(process) === '[object process]') {
    notify = function() {
      process.nextTick(drain);
    };
  // browser with MutationObserver
  } else if (typeof MutationObserver !== 'undefined') {
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
  // TODO: postMessage? MessageChannel? onreadystatechange?  maybe considered as setImmediate pollyfill
  } else {
    var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
    var env = inBrowser ? 
      window : 
      typeof global !== 'undefined' ? global : {};
    notify = env.setImmediate || function() {
      setTimeout(drain, 0)
    };
  }

  return function(fn, context, args) {
    var task = {
      fn: fn,
      context: context,
      args: Array.prototype.slice.call(arguments, 2),
      next: undefined
    };

    if (tail) {
      tail.next = task;
    }
    if (!head) {
      head = task;
      notify();
    }
    tail = task;
  };
})();

module.exports = nextTick;