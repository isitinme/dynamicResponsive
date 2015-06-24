/* Dynamic Responsive */
				
	function DR( elem ) {
		this.elem = elem;
		this.getStyles = function() {
			return getComputedStyle( this.elem );
		}
		this.exec = function( prop ) {
			var defElemValue = parseInt( this.getStyles()[prop] ),
				defaultWindowWidth = document.documentElement.clientWidth;
			
			window.addEventListener('resize', function() {
				var newWindowWidth = document.documentElement.clientWidth,
					percent;
				
				percent = newWindowWidth * 100 / defaultWindowWidth;
				elem.style[prop] = defElemValue * percent / 100 + 'px';
			});
			
			return this;
		}
	}
	
		
	
	
	/*

	DR.prototype.exec = function( prop, normal, breakpoint ) {
		var selfElem = this.elem;
		
		var defElemValue = parseInt( this.getStyles()[prop] ),
			defaultWindowWidth;

		( normal ) ? defaultWindowWidth = normal : defaultWindowWidth = document.documentElement.clientWidth;
		set( defaultWindowWidth, breakpoint );

		function set( def, breakpoint ) {
			var currentWindowWidth = document.documentElement.clientWidth;
			
			if( breakpoint && ( currentWindowWidth <= breakpoint.point ) ) {
				applyBreakPoint( currentWindowWidth );
				return;
			} else {
				var perc = currentWindowWidth * 100 / def;
				selfElem.style[prop] = defElemValue * perc / 100 + 'px';
			}
		}
		
		window.addEventListener('resize', function() {
			var newWindowWidth = document.documentElement.clientWidth;
			
			if( breakpoint ) {
				if( newWindowWidth <= breakpoint.point ) {
					applyBreakPoint( newWindowWidth );
					return;
				} else {
					setResize( newWindowWidth );
				}
			}
			
			var newPerc = newWindowWidth * 100 / defaultWindowWidth;
			selfElem.style[prop] = defElemValue * newPerc / 100 + 'px';
		});
		
		function setResize( newWidth ) {
			var perc = newWidth * 100 / defaultWindowWidth;
			selfElem.style[prop] = defElemValue * perc / 100 + 'px';
		}	
		
		function applyBreakPoint( newWidth ) {
			var newElemValue = breakpoint.value;
			var perc = newWidth * 100 / breakpoint.point;
			selfElem.style[prop] = newElemValue * perc / 100 + 'px';
		}
		
	}
	*/