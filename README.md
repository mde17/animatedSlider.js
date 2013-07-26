animated-content-slider
=======================
a jQuery plug-in that adds animation to contentsliders/banners/etc
it uses the animate.css from Dan Eden -> http://daneden.me/animate/

<h1>Options</h1>

height - height of the slider
width - width of the slider
loader - boolean
slide_animation_data - array
 -> format
[//slides
  					[{
							'target_slide_element':'.img-logo',
							'animation_position':0,
			            	'animation_type':'bounceInUp'
							},
						{
							'target_slide_element':'.img-mobile',
							'animation_position':0.5,
			            	'animation_type':'bounceInUp'
							},
						{
							'target_slide_element':'.img-tablet',
							'animation_position':1,
			            	'animation_type':'bounceInUp'
							},
						{
							'target_slide_element':'.img-laptop',
							'animation_position':1.5,
			            	'animation_type':'bounceInUp'
							}]//slide1
      ]//slides end
