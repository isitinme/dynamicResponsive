/* Dynamic Responsive */
				
	function DynamicResponse( elem ) {
		this.elem = elem;
		
		this.getStyles = function() {
			return getComputedStyle( this.elem );
		}
		
		this.exec = function( prop, normal, breakpoint ) {
			// VARS
			var self = this.elem,
				styles = this.getStyles(),
				dev = parseInt( styles[prop] ),
				dww;
			
			// DEFINE NORMAL SIZE
			normal ? dww = normal : dww = document.documentElement.clientWidth;
			
			// INIT SETTINGS
			function main() {
				var nww = document.documentElement.clientWidth;
				
				if( breakpoint && ( nww <= breakpoint.point ) ) {
					setResize( nww, breakpoint.point, breakpoint.value );
					
					try {
						applyCSS( breakpoint.css );
					} catch( e ) {
						console.warn('name : %s, mesage: %s', e.name, e.message);
					}
					
					return;
				} else {
					setResize( nww, dww, dev );
					applyCSS( old );
				}
				
			}
			main();
		
			// WINDOW RESIZE
			window.addEventListener('resize', main);
		
			// EXECUTE NEW VALUE
			function setResize( newWidth, def, val ) {
				var perc = newWidth * 100 / def;
				self.style[prop] = val * perc / 100 + 'px';
			}
			
			// DEFINE CSS
			var getInit = function( css ) {
				if( css ) {
					var old = {};
					for( var key in breakpoint.css ) {
						old[key] = styles[key];
					}
				}
				return old;
			};
			if( breakpoint ) var old = getInit( breakpoint.css ); 
			
			// APPLY BREAKPOINT'S CSS
			function applyCSS( obj ) {
				for( var key in obj ) {
					self.style[key] = obj[key];
				}
			}
			
			return this;
		}
	}