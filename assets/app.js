$(document).ready(function(){

	$('.listpagecontent').find('div.container').hide();
	$('.listpagecontent').find('div.is-active').show("slow");


	$('.listpagelink li.tab a').on('click',function(){
		$('.listpagelink li').removeClass('is-active');
		$(this).parent().addClass('is-active'); 
		$('.listpagecontent div.container').hide('slow');
		$('.listpagecontent div.container').removeClass('is-active');
		$('.listpagecontent '+$(this).attr('href')).addClass('is-active');
		$('.listpagecontent '+$(this).attr('href')).show('slow');
	});

	$('.coderStyle').coderStyle();

	$('#load-template').on('change',function(){
		var linkTemplate = $('#stylefile').attr('href');
		var newTemplate = $(this).val();
		var url = linkTemplate.replace(/\/([\w\-\d\_]+)\.min\.css/,'/'+newTemplate+'.min.css');
		$('#stylefile').attr('href',url);
	});

	$('#load-language').on('change',function(){
		var lang = $(this).val();
		$('.loadcode').hide();
		$('#demo'+ucfirst(lang)).slideDown('slow');
	});

	function ucfirst(string) {return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase(); }

});