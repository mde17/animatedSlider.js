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
            'controls':true,
            'slide_animation_data':[]
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
        }).css({'width': that.options.width+56});
        /* adds slides wrapper END */
        
        /* adds a preloader progress bar BEGIN */
        $element.append('<div class="img-preloader" style="position:absolute;height:5px;background-color:#aeaeae;display:block;margin-top:'+
        ((((this.options.height-(this.options.height-5)/2))+38)*-(1))+'px;margin-left:'+
        (((this.options.width)/2)-25)+'px;"></div>');
        /* adds a preloader progress bar END */
        
		/*add class and styles to slider and slides BEGIN */
        $element.find('.slider-contents').children('div').addClass('slides');
        $element.find(".slider-contents,.slider-contents .slides").css({'width':this.options.width,'height':this.options.height,'margin':'0 auto'});
		/*add class and styles to slider and slides END */
	  
		/* display page nav BEGIN */
		if(this.options.pages == true){
	   		$element.find('.controls').append('<div class="slide-nav"></div>');
	        for(var i = 0; i < totalSlides.length;i++){
				$element.find('.slide-nav').append('<a id="page_'+i+'" class="slide-page"">'+i+'</a>');
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
			$element.find('.slider-next').css({'margin-top':(((this.options.height-(this.options.height-44)/2))+38)*-1,'margin-left':this.options.width+28});
			$element.find('.slider-prev').css({'margin-top':(((this.options.height-(this.options.height-44)/2))+38)*-1});
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
									that.options.slide_animation_data[curSlide][i][0],
									that.options.slide_animation_data[curSlide][i][1],
									that.options.slide_animation_data[curSlide][i][2]
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
		/*var cur_class = jQuery(target_slide_element).attr('class');
		
		$element.find('.slide'+slide_number+' '+target_slide_element).removeClass('animated '+animation_type).css('visibility','hidden');
		slide_animation_timeout = setTimeout(
			function(){
				$element.find('.slide'+slide_number+' '+target_slide_element).addClass('animated '+animation_type).css('visibility','visible');
				},
			(animation_position*1000));*/
		$element.find('.slide'+slide_number+' '+target_slide_element).css('opacity','0');
		slide_animation_timeout = setTimeout(
			function(){
				that.tween('.slide'+slide_number+' '+target_slide_element,animation_type);
				},
			(animation_position*1000));
		
		this.setPageActive(slide_number-1);
	}
	
	Plugin.prototype.setPageActive = function(page_number){
		$element.find('.slide-page').each(function(){
			jQuery(this).css('background-position','217px 150px');
		});
		$element.find('#page_'+page_number).css('background-position','178px 150px');
	}
	
	Plugin.prototype.helperReplaceChar = function(string_data){
		return string_data.replace(/.|#|h1|p||div|ul|li|ol|span/,' ');
	}
	
	Plugin.prototype.idSplitter = function(cl_id){
		var id_before = "",
			id_split = "",
			id_result = "";
		
		id_before = cl_id;
		id_split = id_before.split("_");
		id_result = id_split[id_split.length-1];
		return id_result;
	}
	
	Plugin.prototype.preloadImages = function(){
		var image_load_division = 100/totalImg;
		if(totalImg <= 0){
			$element.find('.img-preloader').css('width','100px');
			jQuery(window).on("load",function(){
				that.startSlider();
				$element.find('.img-preloader').css('display','none'); });
		}else{
			$element.find('img').each(function(e){
				if(totalImg == imgs || totalImg == 1){
						$element.find('.img-preloader').css('width','100px');
						jQuery(window).on("load",function(){
						that.startSlider();
						$element.find('.img-preloader').css('display','none');
					});	
				}
				else{
					imgs++;
					$element.find('.img-preloader').animate({width:'+='+(image_load_division*imgs)},500);
				}
				
			});//each END	
		}

	}
	
	Plugin.prototype.tween = function(target,atype){
					var thatTween = this;
					
					
					this.fadeIn = function(){
						TweenMax.fromTo(target,1.5,{'opacity':'0',ease:Quad.easeOut},{'opacity':'1',ease:Quad.easeOut});
					}
					
					this.fadeInUp = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{'opacity':'0',top:'+=50'}).
						to(target,1,{'opacity':'1',top:'-=50',ease:Quad.easeOut});
					}
					
					this.fadeInDown = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{'opacity':'0',top:'-=50'}).
						to(target,1,{'opacity':'1',top:'+=50',ease:Quad.easeOut});
					}
					
					this.fadeInRight = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{'opacity':'0',left:'+=50'}).
						to(target,1,{'opacity':'1',left:'-=50',ease:Quad.easeOut});
					}
					
					this.fadeInLeft = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{'opacity':'0',left:'-=50'}).
						to(target,1,{'opacity':'1',left:'+=50',ease:Quad.easeOut});
					}
					
					this.fadeOut = function(){
						TweenMax.fromTo(target,1.5,{'opacity':'1',ease:Quad.easeOut},{'opacity':'0',ease:Quad.easeOut});
					}
					
					this.fadeOutUp = function(){
						var tl = new TimelineMax();
						tl.from(target,0,{'opacity':'1',top:'+=0'}).
						to(target,1,{'opacity':'0',top:'-=50',ease:Quad.easeOut}).
						to(target,0,{'opacity':'0',top:'+=50'});
					}
					
					this.fadeOutDown = function(){
						var tl = new TimelineMax();
						tl.from(target,0,{'opacity':'1',top:'+=0'}).
						to(target,1,{'opacity':'0',top:'+=50',ease:Quad.easeOut}).
						to(target,0,{'opacity':'0',top:'-=50'});
					}
					
					this.fadeOutRight = function(){
						var tl = new TimelineMax();
						tl.from(target,0,{'opacity':'1',left:'+=0'}).
						to(target,1,{'opacity':'0',left:'-=50',ease:Quad.easeOut}).
						to(target,0,{'opacity':'0',left:'+=50'});
					}
					
					this.fadeOutLeft = function(){
						var tl = new TimelineMax();
						tl.from(target,0,{'opacity':'1',left:'+=0'}).
						to(target,1,{'opacity':'0',left:'+=50',ease:Quad.easeOut}).
						to(target,0,{'opacity':'0',left:'-=50'});
					}
					
					this.bounceInFront = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{'opacity':'0',scale:1.3}).
						to(target,0.2,{'opacity':'0',scale:1.3}).
						to(target,0.3,{'opacity':'1',scale:0.9}).
						to(target,0.2,{'opacity':'1',scale:1.05}).
						to(target,0.2,{'opacity':'1',scale:1});
					}
					
					this.bounceIn = function(){
						TweenMax.fromTo(target,1,{'opacity':'0',scale:0},{'opacity':'1',scale:1,ease:Bounce.easeOut});
					}
					
					this.bounceInUp = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{'opacity':'0',top:'+=500'}).
						to(target,0.4,{'opacity':'1',top:'-=530'}).
						to(target,0.2,{'opacity':'1',top:'+=40'}).
						to(target,0.2,{'opacity':'1',top:'-=10'});
					}
					
					this.bounceInDown = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{'opacity':'0',top:'-=500'}).
						to(target,0.4,{'opacity':'1',top:'+=530'}).
						to(target,0.2,{'opacity':'1',top:'-=40'}).
						to(target,0.2,{'opacity':'1',top:'+=10'});
					}
					
					this.bounceInLeft = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{'opacity':'0',left:'-=900'}).
						to(target,0.4,{'opacity':'1',left:'+=930'}).
						to(target,0.2,{'opacity':'1',left:'-=40'}).
						to(target,0.2,{'opacity':'1',left:'+=10'});
					}
					
					this.bounceInRight = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{'opacity':'0',left:'+=900'}).
						to(target,0.4,{'opacity':'1',left:'-=930'}).
						to(target,0.2,{'opacity':'1',left:'+=40'}).
						to(target,0.2,{'opacity':'1',left:'-=10'});
					}
					
					this.bounceOut = function(){
						var tl = new TimelineMax();
						tl.to(target,0.2,{'opacity':'1',scale:0.9}).
						to(target,0.4,{'opacity':'1',scale:1.1}).
						to(target,0.3,{'opacity':'0',scale:0});
					}
					
					this.bounceOutUp = function(){
						var tl = new TimelineMax();
						tl.to(target,0.2,{'opacity':'1',top:'-=10'}).
						to(target,0.2,{'opacity':'1',top:'+=40'}).
						to(target,0.3,{'opacity':'1',top:'-=530'}).
						to(target,0,{'opacity':'0',top:'+=500'});
					}
					
					this.bounceOutDown = function(){
						var tl = new TimelineMax();
						tl.to(target,0.2,{'opacity':'1',top:'+=10'}).
						to(target,0.2,{'opacity':'1',top:'-=40'}).
						to(target,0.3,{'opacity':'0',top:'+=530'}).
						to(target,0,{'opacity':'0',top:'-=500'});
					}
					
					this.bounceOutRight = function(){
						var tl = new TimelineMax();
						tl.to(target,0.2,{'opacity':'1',left:'+=10'}).
						to(target,0.2,{'opacity':'1',left:'-=40'}).
						to(target,0.3,{'opacity':'0',left:'+=930'}).
						to(target,0,{'opacity':'0',left:'-=900'});
					}
					
					this.bounceOutLeft = function(){
						var tl = new TimelineMax();
						tl.to(target,0.2,{'opacity':'1',left:'-=10'}).
						to(target,0.2,{'opacity':'1',left:'+=40'}).
						to(target,0.3,{'opacity':'0',left:'-=930'}).
						to(target,0,{'opacity':'0',left:'+=900'});
					}
					
					this.rotateIn = function(){
						TweenMax.fromTo(target,1,{'opacity':'0',rotation:0},{'opacity':'1',rotation:'360',ease:Quad.easeOut});
					}
					
					this.flip = function(){
						var tl = new TimelineMax();
						tl.to(target,0.5,{'opacity':'1',rotationX:0,rotationY:0,z:0,transformOrigin:'center'}).
						to(target,0.5,{rotationY:170,z:150,scale:2}).
						to(target,0.5,{rotationY:10,scale:1,ease:Bounce.easeOut}).
						to(target,0.5,{rotationY:0,scale:1,ease:Quad.easeIn});
					}
					
					this.flipInX = function(){
						var tl = new TimelineMax();
						
						tl.to(target,0.2,{opacity:0,rotationX:+90,perspective:400}).
						to(target,0.2,{opacity:1,rotationX:-10}).
						to(target,0.2,{rotationX:+10}).
						to(target,0.5,{rotationX:0,ease:Quad.easeOut});
					}
					
					this.flipInY = function(){
						var tl = new TimelineMax();
						
						tl.to(target,0.2,{opacity:0,rotationY:+90,perspective:400}).
						to(target,0.2,{opacity:1,rotationY:-10}).
						to(target,0.2,{rotationY:+10}).
						to(target,0.5,{rotationY:0,ease:Quad.easeOut});
					}
					
					this.flipOutY = function(){
						var tl = new TimelineMax();
						
						tl.to(target,0,{opacity:1,rotationY:0,perspective:400}).
						to(target,0.5,{opacity:0,rotationY:+90}).
						to(target,0.5,{opacity:0,rotationY:0,ease:Quad.easeOut});
					}
					
					this.flipOutX = function(){
						var tl = new TimelineMax();
						
						tl.to(target,0,{opacity:1,rotationX:0,perspective:400}).
						to(target,0.5,{opacity:0,rotationX:+90}).
						to(target,0.5,{opacity:0,rotationX:0,ease:Quad.easeOut});
					}
					
					this.swing = function(){
						var tl = new TimelineMax();
						tl.from(target,0,{opacity:1,rotation:'0', transformOrigin:'center'}).
						to(target,0.1,{opacity:1,rotation:'15'}).
						to(target,0.2,{rotation:'-10'}).
						to(target,0.3,{rotation:'5'}).
						to(target,0.4,{rotation:'-5'}).
						to(target,0.5,{rotation:'0'});
					}
					
					this.wobble = function(){
						var tl = new TimelineMax();
						var elem = jQuery(target).width();
						tl.from(target,0.15,{opacity:1,rotation:'0', left:'+='+(elem*0)}).
						to(target,0.15,{rotation:'-7', left:'-='+(elem*0.30)}).
						to(target,0.15,{rotation:'5', left:'+='+(elem*0.30)}).
						to(target,0.15,{rotation:'-5', left:'-='+(elem*0.25)}).
						to(target,0.15,{rotation:'3', left:'+='+(elem*0.25)}).
						to(target,0.15,{rotation:'-3', left:'-='+(elem*0.15)}).
						to(target,0.15,{rotation:'0', left:'+='+(elem*0.15)});
					}
					
					this.shake = function(){
						var tl = new TimelineMax();
						var elem = jQuery(target).width();
						tl.from(target,0,{opacity:1, left:'+='+(elem*0)}).
						to(target,0.1,{ left:'-='+(elem*0.20)}).
						to(target,0.1,{ left:'+='+(elem*0.20)}).
						to(target,0.1,{ left:'-='+(elem*0.15)}).
						to(target,0.1,{ left:'+='+(elem*0.15)}).
						to(target,0.1,{ left:'-='+(elem*0.10)}).
						to(target,0.1,{ left:'+='+(elem*0.10)}).
						to(target,0.1,{ left:'-='+(elem*0.10)}).
						to(target,0.1,{ left:'+='+(elem*0.10)});
					}
					
					this.bounce = function(){
						var tl = new TimelineMax();
						var elem = jQuery(target).width();
						tl.from(target,0.2,{opacity:1, top:'+='+(elem*0),ease:Quad.easeInOut}).
						to(target,0.2,{ top:'-='+(elem*0.30),ease:Quad.easeInOut}).
						to(target,0.15,{ top:'+='+(elem*0.30)}).
						to(target,0.1,{ top:'-='+(elem*0.10)}).
						to(target,0.1,{ top:'+='+(elem*0.10)});
					}
					
					this.flash = function(){
						var tl = new TimelineMax();
						tl.to(target,0.2,{opacity:0}).
						to(target,0.2,{opacity:1}).
						to(target,0.2,{opacity:0}).
						to(target,0.5,{opacity:1});
					}
					
					this.tada = function(){
						var tl = new TimelineMax();
						tl.to(target,0.2,{opacity:1,scale:0.9,rotation:3}).
						to(target,0.1,{scale:1.1,rotation:-3}).
						to(target,0.1,{scale:1.1,rotation:3}).
						to(target,0.1,{scale:1.1,rotation:-3}).
						to(target,0.1,{scale:1.1,rotation:3}).
						to(target,0.1,{scale:1.1,rotation:-3}).
						to(target,0.1,{scale:1.1,rotation:3}).
						to(target,0.1,{scale:1,rotation:0});
					}
					
					this.pulse = function(){
						var tl = new TimelineMax();
						tl.to(target,0.5,{opacity:1,scale:1.1}).
						to(target,0.5,{scale:1});
					}
					
					this.rotateInDownLeft = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{opacity:0,rotation:-90,transformOrigin:'bottom left'}).
						to(target,0.2,{opacity:0}).
						to(target,0.8,{opacity:1,rotation:0,ease:Ease.easeOut});
					}
					
					this.rotateOutDownLeft = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{opacity:1,rotation:0,transformOrigin:'bottom left'}).
						to(target,0.2,{opacity:1}).
						to(target,0.8,{opacity:0,rotation:90,ease:Ease.easeOut}).
						to(target,0,{rotation:0});
					}
					
					this.rotateInDownRight = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{opacity:0,rotation:90,transformOrigin:'bottom right'}).
						to(target,0.2,{opacity:0}).
						to(target,0.8,{opacity:1,rotation:0,ease:Ease.easeOut});
					}
					
					this.rotateOutDownRight = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{opacity:1,rotation:0,transformOrigin:'bottom right'}).
						to(target,0.2,{opacity:1}).
						to(target,0.8,{opacity:0,rotation:-90,ease:Ease.easeOut}).
						to(target,0,{rotation:0});
					}
					
					this.rotateInUpLeft = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{opacity:0,rotation:90,transformOrigin:'top left'}).
						to(target,0.2,{opacity:0}).
						to(target,0.8,{opacity:1,rotation:0,ease:Ease.easeOut});
					}
					
					this.rotateOutUpLeft = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{opacity:1,rotation:0,transformOrigin:'top left'}).
						to(target,0.2,{opacity:1}).
						to(target,0.8,{opacity:0,rotation:-90,ease:Ease.easeOut}).
						to(target,0,{rotation:0});
					}
					
					this.rotateInUpRight = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{opacity:0,rotation:-90,transformOrigin:'top right'}).
						to(target,0.2,{opacity:0}).
						to(target,0.8,{opacity:1,rotation:0,ease:Ease.easeOut});
					}
					
					this.rotateOutUpRight = function(){
						var tl = new TimelineMax();
						tl.to(target,0,{opacity:1,rotation:0,transformOrigin:'top right'}).
						to(target,0.2,{opacity:1}).
						to(target,0.8,{opacity:0,rotation:90,ease:Ease.easeOut}).
						to(target,0,{rotation:0});
					}
					
					this.scale = function(){
						TweenMax.fromTo(target,1,{'opacity':'0',scale:0.8},{'opacity':'1',scale:1,ease:Quad.easeOut});
					}
					
					this.scaleIn = function(){
						TweenMax.fromTo(target,1,{'opacity':'0',scale:1.3},{'opacity':'1',scale:1,ease:Quad.easeOut});
					}
					
					this.scaleOut = function(){
						var tl = new TimelineMax();
						tl.to(target,0.5,{'opacity':'1',scale:1}).
						to(target,0.5,{'opacity':'0',scale:1.3,ease:Quad.easeOut}).
						to(target,0,{scale:1});
					}
					
					thatTween[atype].call(thatTween.tween,null);
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