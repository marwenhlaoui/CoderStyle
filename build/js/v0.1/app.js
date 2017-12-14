$(document).ready(function(){

	$('.runCoderStyle').coderStyle(); 
	$('.code').coderStyle(); 

	/* change theme */

	$('#selectTheme').on('change',function(){
		var theme = $(this).val();
		var cs  = $('.runCoderStyle');
		cs.attr('class','runCoderStyle');
		cs.addClass(theme);
	});

	/* change code */

	$('#selectLang').on('change',function(){
		var lang = $(this).val();
		$('.runCoderStyle').hide('slow');
		$('#'+lang+'Demo').show('slow');
	});

	/* tabs pages */

	$('.tablink').on('click',function(e){
		e.preventDefault();
		var tab = $(this).attr('href');
		$('.topmenu li').removeClass('active');
		$(this).parent().addClass('active');
		$('.sectionpg').hide('slow');
		$(tab).show('slow');
	});

});