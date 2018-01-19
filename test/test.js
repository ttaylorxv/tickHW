var assert = require('assert');
var hello = 'Hello';
describe('String#split', function(){
  it('should return an array', function(){
    assert(Array.isArray('a,b,c'.split(',')));
  });
})
