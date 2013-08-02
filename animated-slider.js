;(function ( $, window, document, undefined ) {
    /* variable BEGIN */
    var pluginName = 'animatedSlider',
        defaults = {
            'height': 300,
            'width': 600,
            'slide_interval':3000,
            'loader':true,
            'pages':true,
            'pause':true,
            'controls':true
        },
        $element,
        totalSlides,
        slide_animation_timeout,
        curSlide,
        slideTimer,
        that,
        slide_status,
		imgs = 1,
		totalImg =0;
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
        //$element.load(function(){that.init();});
        this.init();
    }

	/* INIT BEGIN */
    Plugin.prototype.init = function () {
    		totalImg = $element.find('img').length;
    		totalSlides = $element.children(),
			//slideTimer = window.setInterval(playSlide,settings.slide_interval),
			curSlide = 0;
		/* adds slides wrapper BEGIN */
		$element.html( function() {
            return '<div class="slider-contents">'+$element.html()+'</div><div class="controls"></div>';
        }).css({'width': that.options.width+130});
        /* adds slides wrapper END */
        
        /* adds a preloader progress bar BEGIN */
        $element.append('<div class="img-preloader" style="position:absolute;height:5px;background-color:#aeaeae;display:block;margin-top:'+
        ((((this.options.height-(this.options.height-5)/2))+38)*-(1))+'px;margin-left:'+
        (((this.options.width+130)/2)-50)+'px;"></div>');
        /* adds a preloader progress bar END */
        
		/*add class and styles to slider and slides BEGIN */
        $element.find('.slider-contents').children('div').addClass('slides');
        $element.find(".slider-contents,.slider-contents .slides").css({'width':this.options.width,'height':this.options.height,'margin':'0 auto'});
		/*add class and styles to slider and slides END */
	  
		/* display page nav BEGIN */
		if(this.options.pages == true){
	   		$element.find('.controls').append('<div class="slide-nav"></div>');
	        for(var i = 0; i < totalSlides.length;i++){
				$element.find('.slide-nav').append('<a>'+i+'</a>');
			}
		}
		/* display page nav END */
	  
	  	/* display play and pause controls BEGIN */
		if(this.options.pause == true){
	   		$element.find('.controls').append('<div class="pause-play-control playing"><a class="play-slide" style="display:none;">Play</a><a class="pause-slide">Pause</a></div>');
		}
		/* display play and pause controls END */
	  
		/* display slider pages if slides are more than 1 BEGIN */
		if(totalSlides.length > 1 && this.options.controls === true ){
			$element.append('<div class="slider-controller"><a class="slider-prev"><</a><a class="slider-next">></a></div>');
			$element.find('.slider-next').css({'margin-top':(((this.options.height-(this.options.height-46)/2))+38)*-1,'margin-left':this.options.width+130-46});
			$element.find('.slider-prev').css({'margin-top':(((this.options.height-(this.options.height-46)/2))+38)*-1});
		}
		/* display slider pages if slides are more than 1 END */
		
		/* next button clicked BEGIN */
		$element.find('.slider-controller .slider-next').on("click",function(){
			that.next();
		});
		/* next button clicked END */
		
		/* prev button clicked BEGIN */
		$element.find('.slider-controller .slider-prev').on("click",function(){
			that.prev();
		});
		/* prev button clicked END */
		
		/* pause button clicked BEGIN */
		$element.find('.pause-slide').on("click",function(){
			that.pause();
			$element.find('.pause-play-control').removeClass('playing').addClass('paused');
			jQuery(this).css('display','none');
			$element.find('.play-slide').css('display','block');
		});
		/* pause button clicked END */
		
		/* play button clicked BEGIN */
		$element.find('.play-slide').on("click",function(){
			if(slide_status == 'paused'){
				that.start_animation();
				that.play();
				slide_status = 'playing';
				$element.find('.pause-play-control').removeClass('paused').addClass('playing');
			}
			jQuery(this).css('display','none');
			$element.find('.pause-slide').css('display','block');
		});
		/* play button clicked END */
		
		/* slider page clicked BEGIN */
		$element.find('.slide-nav a').on("click",function(){
			that.pageClick(this);
		});
		/* slider page clicked END */
		this.hideSlides();
		this.preloadImages();
		//this.startSlider();
    };
    /* INIT END */
    
    Plugin.prototype.startSlider = function(){
    	/* starts the slides BEGIN */
		this.start_animation();
		/* starts the slides END */
		
		/* plays the first slide - a fix for start_animation() because it has a delay based on the slide_interval */
		this.play();
		/* this.play END  */
    }
    
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
				that.loader();
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
		if(slide_status=='paused'){
			this.play();
		}else{
			this.startSlider();
		}
    }
    
    Plugin.prototype.prev = function(){
    	if(curSlide==1){
				curSlide = totalSlides.length -1;
			}else if(curSlide == 0){
				curSlide = totalSlides.length -2;
			}else{
				curSlide = curSlide-2;
			}
			
		if(slide_status=='paused'){
			this.play();
		}else{
			this.startSlider();
		}
    }
    
    Plugin.prototype.pause = function(){
    	clearInterval(slideTimer);
    	slide_status = 'paused';
    }
    
    Plugin.prototype.pageClick = function(page_index){
		curSlide = $element.find(page_index).index();
		if(slide_status=='paused'){
			this.play();
		}else{
			this.startSlider();
		}
    }

	Plugin.prototype._slideAnimation = function(slide_number,target_slide_element,animation_position,animation_type){
		$element.find('.slide'+slide_number+' '+target_slide_element).removeClass().css('display','none').addClass(this.helperReplaceChar(target_slide_element));
		slide_animation_timeout = setTimeout(function(){$element.find('.slide'+slide_number+' '+target_slide_element).addClass('animated '+animation_type).css('display','block');},(animation_position*1000));
	}
	
	Plugin.prototype.helperReplaceChar = function(string_data){
		return string_data.replace(/.|#|h1|p||div|ul|li|ol|span/,' ');
	}
	
	Plugin.prototype.preloadImages = function(){
		var image_load_division = 100/totalImg;
		$element.find('img').each(function(e){
			$(this).on("load",function(){
				if(totalImg == imgs){
					that.startSlider();
					$element.find('.img-preloader').css('display','none');
				}else{
					imgs++;
					$element.find('.img-preloader').animate({width:+image_load_division*imgs},500);
				}
			});
		});

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