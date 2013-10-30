animated-content-slider
=======================
<p>a jQuery plug-in that adds animation to contentsliders/banners/etc
<p>Compatible with all major browsers: ie8+,Chrome,Safari,Firefox,Opera</p>

<a target="_blank" href="http://cdpn.io/BxnhF">View it on CodePen</a>



<h1>Options</h1>

<table>
	<thead>
		<tr>
			<td>Parameter</td>
			<td>Type</td>
			<td>Description</td>
			<td>Default Value</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>height</td>
			<td>INT</td>
			<td>Height of the slider ex: height:300</td>
			<td>300</td>
		</tr>
		<tr>
			<td>width</td>
			<td>INT</td>
			<td>Width of the slider ex: width:900</td>
			<td>600</td>
		</tr>
		<tr>
			<td>slide_interval</td>
			<td>INT</td>
			<td>Slider Time in milliseconds ex: slide_interval:3000 </td>
			<td>3000</td>
		</tr>
		<tr>
			<td>loader</td>
			<td>Boolean</td>
			<td>Shows the loader bar if set to true</td>
			<td>true</td>
		</tr>
		<tr>
			<td>pages</td>
			<td>Boolean</td>
			<td>Shows the slider pagination if set to true</td>
			<td>true</td>
		</tr>
		<tr>
			<td>pause</td>
			<td>Boolean</td>
			<td>enables and displays slide play and pause if set to true</td>
			<td>true</td>
		</tr>
		<tr>
			<td>controls</td>
			<td>Boolean</td>
			<td>enables and displays slide previous and next button if set to true</td>
			<td>true</td>
		</tr>
		<tr>
			<td>slide_animation_data</td>
			<td>Array</td>
			<td>the heart of your animation goes here(refer to <a href="#slideOption" >Slide Animation Options</a> below)</td>
			<td>none</td>
		</tr>
	</tbody>
</table>
<h3>Slide Animation Options </h3>
<pre>
code structure only(please use this pattern):
slide_animation_data: [[[]],[[]],[[]]]

code structure with definitions
slide_animation_data: 
	[
		//first slide
		[
			[target element,animation frame,animation type], // animation 1 of your element
			[target element,animation frame,animation type] // animation 2 of your element
		],
		//second slide
		[
			[target element,animation frame,animation type], // animation 1 of your element
			[target element,animation frame,animation type] // animation 2 of your element
		],
		//third slide
		[
			[target element,animation frame,animation type], // animation 1 of your element
			[target element,animation frame,animation type] // animation 2 of your element
		],
	
	]
</pre>
<table id="slideOption">
	<thead>
		<tr>
			<td>Element</td>
			<td>Type</td>
			<td>Description</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>first element (target element)</td>
			<td>String</td>
			<td>the target element's tagname, classname,or ID</td>
		</tr>
		<tr>
			<td>second element (animation frame)</td>
			<td>Float/Double</td>
			<td>what part of the "time sequence" will the animation take place, in seconds</td>
		</tr>
		<tr>
			<td>third element (animation type)</td>
			<td>String</td>
			<td>What type of animation to execute, please refer at the last part at the bottom for the list of animations</td>
		</tr>
	</tbody>
</table>

<h3>Example</h3>
<a href="http://codepen.io/marcjeric/pen/BxnhF">my other example</a>

<pre>
	jQuery('#slider').animatedSlider({
				'loader':true,
				'width':900,
				'height':300,
				'slide_animation_data' : 
					[//slides
						//slide1 BEGIN
						[
							['.txt1',0,'bounceInDown'],
							['.txt2',0.8,'flip'],
						],
						//slide2 BEGIN
						[
							['p',0,'bounceInDown'],
						],
						//slide2 BEGIN
						[
							['h1',0,'fadeIn'],
						]
					]
				
				
			});
</pre>

<h3>On your HTML</h3>
<p> you can use any name for your slider container but you have to specify a class of "slide[slide#]" for ever slide</p>
<pre id="preid">
	 &lt;div id="slider"&gt;
            &lt;div class="slide1"&gt;
            	&lt;h2 class="txt1"&gt;Bring Life Back &lt;/h2&gt;
            	&lt;h2 class="txt2"&gt;to Your Banners &lt;/h2&gt;
            &lt;/div&gt;
            &lt;div class="slide2"&gt;
                &lt;p>asdasd&lt;/p&gt;
            &lt;/div&gt;
            &lt;div class="slide3"&gt;
                &lt;h1>Slide3&lt;/h1&gt;
                &lt;p>content 3&lt;/p&gt;
            &lt;/div&gt;
        &lt;/div&gt;
</pre>
<script>
String.prototype.escapeHTML = function () {                                        
  return(                                                                 
    this.replace(/>/g,'&gt;').
         replace(/</g,'&lt;').
         replace(/"/g,'&quot;')
  );
};
var codeEl = document.getElementById('preid');
if (codeEl) {
  codeEl.innerHTML = codeEl.innerHTML.escapeHTML();
}
</script>

<h2>Dependencies (CDN)</h2>
<p>jQuery</p>
"https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"
<p>GSAP</p>
"http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"
"http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TimelineMax.min.js"

<h2>Animation Types</h2>
	 rotateOutDownLeft
	 rotateOutDownRight
	 rotateOutUpLeft
	 rotateOutUpRight
	 rotateInUpRight
	 rotateInUpLeft
	 rotateInDownRight
	 rotateInDownLeft
	 flipOutX
	 flipOutY
	 flipInY
	 flipInX
	 fadeIn
	 fadeInUp
	 fadeInLeft
	 fadeInRight
	 fadeInDown
	 fadeOut
	 fadeOutUp
	 fadeOutLeft
	 fadeOutRight
	 fadeOutDown
	 bounceIn
	 rotateIn
	 flip
	 swing
	 wobble
	 shake
	 bounce
	 flash
	 tada
	 pulse
