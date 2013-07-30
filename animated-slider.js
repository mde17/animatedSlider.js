;(function ( $, window, document, undefined ) {
    /* variable BEGIN */
    var pluginName = 'animatedSlider',
        defaults = {
            'height': 300,
            'width': 600,
            'slide_interval':3000,
            'loader':true,
            'pages':true,
        },
        $element,
        totalSlides,
        slide_animation_timeout,
        curSlide,
        slideTimer,
        that;
	/* variable END */

    /* The actual plugin constructor */
    function Plugin( element, options ) {
        this.element = element;
		$element = $(this.element);
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        /* a varible used for the setTimeOut function */
        that = this;
        
        /* initializes the slider */
        this.init();
    }

	/* INIT BEGIN */
    Plugin.prototype.init = function () {
		totalSlides = $element.children(),
			//slideTimer = window.setInterval(playSlide,settings.slide_interval),
			curSlide = 0;
		
		/* adds slides wrapper BEGIN */
		$element.html( function() {
            return '<div class="slider-contents">'+$element.html()+'</div>';
        });
        /* adds slides wrapper END */
       
		/*add class and styles to slider and slides BEGIN */
        $element.find('.slider-contents').children('div').addClass('slides');
        $element.find(".slider-contents,.slider-contents .slides").css({'width':this.options.width,'height':this.options.height});
		/*add class and styles to slider and slides END */
	  
		/* display page nav BEGIN */
		if(this.options.pages == true){
	   		$element.append('<div class="slide-nav"></div>');
	        for(var i = 0; i < totalSlides.length;i++){
				$element.find('.slide-nav').append('<a>'+i+'</a>');
			}
		}
		/* display page nav END */
	  
		/* display slider pages if slides are more than 1 BEGIN */
		if(totalSlides.length > 1){
			$element.append('<div class="slider-controller"><a class="slider-prev">prev</a><a class="slider-next">next</a></div>');
		}
		/* display slider pages if slides are more than 1 END */
		
		/* next button clicked BEGIN */
		$element.find('.slider-controller .slider-next').on("click",function(){
			that.next();
		})
		/* next button clicked END */
		
		/* prev button clicked BEGIN */
		$element.find('.slider-controller .slider-prev').on("click",function(){
			that.prev();
		})
		/* prev button clicked END */
		
		/* slider page clicked BEGIN */
		$element.find('.slide-nav a').on("click",function(){
			that.pageClick(this);
		});
		/* slider page clicked END */
		
		/* starts the slides BEGIN */
		this.start_animation();
		/* starts the slides END */
		
		/* plays the first slide - a fix for start_animation() because it has a delay based on the slide_interval */
		this.play();
		/* this.play END  */
    };
    /* INIT END */
    
    Plugin.prototype.hideSlides = function(){
    	/* hide the slides BEGIN */
		$element.find('.slides').css('display','none');
		/* hide the slides END */
    }
    
    Plugin.prototype.start_animation = function(){
    	/* clears the view and the timer BEGIN */
    	this.hideSlides();
    	clearInterval(slideTimer);
    	/* clears the view and the timer END */
    	
    	slideTimer = setInterval(this.play,this.options.slide_interval);
    }
    
    Plugin.prototype.play = function(){
    	that.loader();
    	for(var i =0;i<that.options.slide_animation_data[curSlide].length;i++){
								that._slideAnimation(
									curSlide+1,
									that.options.slide_animation_data[curSlide][i].target_element,
									that.options.slide_animation_data[curSlide][i].animation_frame,
									that.options.slide_animation_data[curSlide][i].animation_type
								);
				}//for loop END
				$element.find('.slider-contents').children('div').css('display','none');
				$element.find('.slide'+(curSlide+1)).css('display','block');
				if(curSlide>=totalSlides.length-1){
					curSlide = 0;
				}else{
					curSlide++;
				}//if-else END
    }
    
    Plugin.prototype.loader = function(){
    	if(this.options.loader==true){
				$element.find('.progress-bar').remove();
				$element.find('.slider-contents').append('<div class="progress-bar"></div>');
				$element.find('.progress-bar').animate({width:'+=100%'},this.options.slide_interval);
			}
    }
    
    Plugin.prototype.next = function(){
		curSlide = curSlide;
		this.start_animation();
		this.play();
    }
    
    Plugin.prototype.prev = function(){
    	if(curSlide==1){
				curSlide = totalSlides.length -1;
			}else if(curSlide == 0){
				curSlide = totalSlides.length -2;
			}else{
				curSlide = curSlide-2;
			}
		this.start_animation();
		this.play();
    }
    
    Plugin.prototype.pageClick = function(page_index){
		curSlide = $element.find(page_index).index();
		this.start_animation();
		this.play();
    }

	Plugin.prototype._slideAnimation = function(slide_number,target_slide_element,animation_position,animation_type){
		$element.find('.slide'+slide_number+' '+target_slide_element).removeClass().css('display','none').addClass(this.helperReplaceChar(target_slide_element));
		slide_animation_timeout = setTimeout(function(){$element.find('.slide'+slide_number+' '+target_slide_element).addClass('animated '+animation_type).css('display','block');},(animation_position*1000));
	}
	
	Plugin.prototype.helperReplaceChar = function(string_data){
		return string_data.replace(/.|#|h1|p||div|ul|li|ol|span/,' ');
	}

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );