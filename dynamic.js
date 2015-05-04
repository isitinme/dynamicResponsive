/* Dynamic Responsive */
				
function DR( elem ) {
	this.elem = elem;
	this.styles = function() {
		return getComputedStyle( this.elem );
	}
}

DR.prototype.exec = function( prop, normal ) {
	var selfElem = this.elem;
	
	var defElemValue = parseInt( this.styles()[prop] ),
		defaultWindowWidth;

	if( normal ) {
		defaultWindowWidth = normal;
		set( defaultWindowWidth );
	} else {
		defaultWindowWidth = document.documentElement.clientWidth;
		set( defaultWindowWidth );
	}
	
	function set( def ) {
		var currentWindowWidth = document.documentElement.clientWidth;
		var perc = currentWindowWidth * 100 / def;
		selfElem.style[prop] = defElemValue * perc / 100 + 'px';
	}
	
	window.addEventListener('resize', function() {
		var newWindowWidth = document.documentElement.clientWidth;
		var newPerc = newWindowWidth * 100 / defaultWindowWidth;
		selfElem.style[prop] = defElemValue * newPerc / 100 + 'px';
	});
}				