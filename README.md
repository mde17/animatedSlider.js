animated-content-slider
=======================
<p>a jQuery plug-in that adds animation to contentsliders/banners/etc
it uses the animate.css from Dan Eden -> http://daneden.me/animate/ </p>

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
slide_animation_data: [[{}],[{}],[{}]];

code structure definition:
slide_animation_data: [[slide1{options}],[slide2{options}],[slide3{options}]];
</pre>
<table id="slideOption">
	<thead>
		<tr>
			<td>Parameter</td>
			<td>Type</td>
			<td>Description</td>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>target_element</td>
			<td>String</td>
			<td>the target element's tagname, classname,or ID</td>
		</tr>
		<tr>
			<td>animation_frame</td>
			<td>Float/Double</td>
			<td>what part of the "time sequence" will the animation take place, in seconds</td>
		</tr>
		<tr>
			<td>animation_type</td>
			<td>String</td>
			<td>What type of animation to execute, please refer to <a href="http://daneden.me/animate/">Animated</a> for the list of animations</td>
		</tr>
	</tbody>
</table>

<h3>Example</h3>
<pre>
	jQuery('#slider').animatedSlider({
				'loader':true,
				'width':900,
				'height':300,
				'slide_animation_data' : 
					[//slides
						//slide1 BEGIN
						[
							{
							'target_element':'.txt1',
							'animation_frame':0.5,
			            	'animation_type':'tada'
							},{
							'target_element':'.txt2',
							'animation_frame':1,
			            	'animation_type':'shake'
							}
							],//slide1 END
					 	
					 	//slide2 BEGIN
					 	[{
							'target_element':'img',
							'animation_frame':0,
			            	'animation_type':'bounceInUp'
							},{
							'target_element':'p',
							'animation_frame':0.5,
			            	'animation_type':'bounceInUp'
							}],//slide2 END
						
						//slide3 BEGIN	
					 	[{
							'target_element':'h1',
							'animation_frame':0,
			            	'animation_type':'bounceInUp'
							},{
							'target_element':'p',
							'animation_frame':0.5,
			            	'animation_type':'bounceInUp'
							}
					 	]//slide3 END
					]
				
			});
</pre>


