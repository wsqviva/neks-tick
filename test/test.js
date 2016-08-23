'use strict';

var nextTick = require('../lib/neks-tick');

describe('nextTick', function() {
  // neks-tick async features like nextTick
  it('should provide process.nextTick shim', function(done) {
    var called = false;

    nextTick(function() {
      called = true;
      done();
    });

    expect(called).to.be.false;
  });

  // nesk-tick accept context and args
  it('should accept args in order', function(done) {
    nextTick(function(a, b) {
      expect(a).to.equal(1);
      expect(b).to.equal(2);
      done();
    }, null, 1, 2);
  });
  
  it('should run sequence in their event loop respectively', function(done) {
    var count = 0;

    nextTick(function() {
      ++count;
      nextTick(function() {
        ++count;
        expect(count).to.equal(3);
      });
      expect(count).to.equal(1);
    });

    nextTick(function() {
      ++count;
      nextTick(function() {
        ++count;
        expect(count).to.equal(4);
        done();
      });
      expect(count).to.equal(2);
    });
  });
});