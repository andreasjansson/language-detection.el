/*
* jQuery.fn.animate(ellipse);
*
* Make circle, ellipse shaped animations using only:
* $('.element').animate({ top:200, left: 200 }, 2000, 'ellipse');
*
* Version 0.4.0
* www.labs.skengdon.com/animate.ellipse
* www.labs.skengdon.com/animate.ellipse/js/animate.ellipse.min.js
*
* Special thanks to HBP2, without him nothing of this would be happining
* http://www.eksperten.dk/spm/928449
*/
;(function($){
	$.fn.ellipseAnimate = function( prop, speed, callback ) {
		var move = function( elem, prop, speed, callback, i ) {
			if ( typeof i === 'undefined') {
				var i = 0;
				elem.ellipse = 'jQuery.animate.ellipse' + Math.round(Math.random()*100000000);
			};
	
			$(elem).css( prop[i] );
			i++;
	
			if ( typeof prop[i] !== 'undefined' ) {
				window[ elem.ellipse + 'int' ] = setTimeout(function() {
					move( elem, prop, speed, callback, i );
				}, speed / prop.length );
			} else {
				return elem.callback();
			}
		};
		
		var flip = function( points, computed ) {
			var x1 = points.x1,
				y1 = points.y1,
				x2 = points.x2,
				y2 = points.y2;
				
			points.x1 = x2;
			points.y1 = y2;
			points.x2 = x1;
			points.y2 = y1;
			points.xc = x2;
			points.yc = y1;
			// if the flip comes from the animation and not from the user
			points.flipped = (points.flipped) ? false : true;
			
			return points;
		};
		
		var totalWidth = parseFloat($(this).css('left')) + parseFloat($(this).css('right'));
		var totalHeight = parseFloat($(this).css('top')) + parseFloat($(this).css('bottom'));
		
		// quick exit
		if ( typeof prop !== 'object' ) return this;
		// if no left check if right
		if ( typeof prop.left !== 'number' ) {
			if ( typeof prop.right === 'number' ) {
				prop.left = totalWidth - prop.right;
			} else {
				return this;
			}
		};
		if ( typeof prop.top !== 'number' ) {
			if ( typeof prop.bottom === 'number' ) {
				prop.top = totalHeight - prop.bottom;
			} else {
				return this;
			}
		};
		
		// settings standard settings
		if (typeof prop.flip === 'undefined') prop.flip = false;
		if (typeof speed !== 'number') time = 2000;
		if (typeof callback !== 'function') callback = function(){/*...*/};
		
		this.each(function(){
			// going throw all DOM elements from jquery Object
			// Array to hold top,left porperties for the animation
			var prop_export = new Array();
			
			this.callback = callback;			
			var points = {};
			// my two points x1,y1 and x2,y2
			points.x1 = parseFloat($(this).css('left'));
			points.y1 = parseFloat($(this).css('top'));
			points.x2 = prop.left;
			points.y2 = prop.top;
			// center points
			points.xc = points.x1;
			points.yc = points.y2;
			
			// if both x2-x1 and y2-y1 is negative / positive flip animation
			if (( (points.x2-points.x1 == Math.abs(points.x2-points.x1)) && (points.y2-points.y1 == Math.abs(points.y2-points.y1)) ) || ( (points.x2-points.x1 != Math.abs(points.x2-points.x1)) && (points.y2-points.y1 != Math.abs(points.y2-points.y1)) )) {
				var points = flip( points );
			};
			// if flip setting is true.
			if ( prop.flip ) var points = flip( points ); 
			
			// deference between x1, x2 and y2,y1 
			// center point - the other eg. xc = x2, xc-x1
			var a = points.x1-points.x2;
			var b = points.y2-points.y1;
			// step is used for 90 degrees * step,
			// = 90 * 3 = 270 loops.
			var step = 3; 
			// if less than 13 mil.sec. between each loop calculate,
			// it so we have less loops but 13 mil.sec. between each.
			if ( speed / ( 90 * step ) < 13 ) step = (step / ( 13 / ( speed / ( 90 * step ))));
			for (var i = 0; i <= 90*step; i++) {
				// degree from 0 to 90
				var v = i/step;
				
				
				// degree to relative pixel
				var x = points.xc + a*Math.cos(v*Math.PI/180);
				var y = points.yc + b*Math.sin(v*Math.PI/180);
				
				// and now the the absolute pixel 
				x = x - points.x1 + points.x2;
				y = y + points.y1 - points.y2;
				
				
				
				// put in export array for later handeling
				prop_export.push({
					left: x,
					top: y
				});
			};
			
			
			// put the end cordinals in the export array as well,
			// to be sure to end exacly at the right pixel
			prop_export.push({
				left: points.x2,
				top: points.y2
			});
			// if flipped is true reverse (flip) export array
			if ( points.flipped ) prop_export = prop_export.reverse();
			
			// now start the movement
			move( this , prop_export , speed, callback );
				
		});
		// send the rest of prop to $(...).animate();
		delete prop.top;
		delete prop.right;
		delete prop.bottom;
		delete prop.left;
		$(this).animate( prop, speed );
				
		return this;
	};

	$.fn.overwriteAnimate = $.fn.animate;
	$.fn.animate = function( prop, speed, easing, callback ) {
		if ( easing == 'ellipse' ) {
			return this.ellipseAnimate( prop, speed, callback );
		} else {
			return this.overwriteAnimate( prop, speed, easing, callback );
		}
	};

	$.fn.overwriteStop = $.fn.stop;
	$.fn.stop=function(){
		this.each(function(){
			if (typeof this.ellipse !== 'undefined') clearTimeout( window[ this.ellipse + 'int' ] );
		});
		return this.overwriteStop();
	};
	return this;
})(jQuery);