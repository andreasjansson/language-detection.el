// Example 1

var myFunc = function( obj ) {

  if ( arguments.length > 0 ) {
    if ( _.util.typeofObj( arguments[arguments.length-1] ) === Function ) {
      var callback = arguments[arguments.length-1];
    }
  }

  if ( callback !== undefined ) {
    callback();
  }

};

var foo = myFunc( myObj, function(){
  alert( 'Callback!' );
});


// Example 2

Function.prototype.cb = function(cb){
   var self = this;
   return function(){
      self.callback = cb || function(){};
      self.apply(self, arguments);
   }
}

var myFunc = function(obj){
   this.callback();
}

myFunc.cb(function(){

})(myObj);


// Example 3

typeof(callback) == "function" ? callback : null


// Example 4

if (this.onsubmit instanceof Function) {

}