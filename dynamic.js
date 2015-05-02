/* Dynamic Responsive */
				
function DR( elem ) {
	this.elem = elem;
	this.styles = function() {
		return getComputedStyle( this.elem );
	}
}

DR.prototype.exec = function( prop, normal ) {
	var defElemValue = parseInt( this.styles()[prop] );	
	var selfElem = this.elem;

	if( normal ) {
		var defaultWindowWidth = normal;
		var currentWindowWidth = document.documentElement.clientWidth;
		var perc = currentWindowWidth * 100 / defaultWindowWidth;
		selfElem.style[prop] = defElemValue * perc / 100 + 'px';
	}
	
	defaultWindowWidth = document.documentElement.clientWidth;
	
	window.addEventListener('resize', function() {
		var newWindowWidth = document.documentElement.clientWidth;
		var newPerc = newWindowWidth * 100 / defaultWindowWidth;
		selfElem.style[prop] = defElemValue * newPerc / 100 + 'px';
	});
}				