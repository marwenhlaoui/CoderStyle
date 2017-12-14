/**
 * CoderStyle 
 *
 * Copyright 2017, Marwen Hlaoui - http://http:marwenhlaoui.me 
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
;(function($){ 

    $.fn.coderStyle = function(options){  

        var listLang = ['html','css','text','bash'];
        var def = {};
        var div = $(this);   
        var _data = "";
        var sTage = "div";
        var theme = ((options != undefined)&&(options['theme'] != undefined))? options['theme'] : "monokai" ;
        var set = ((options != undefined)&&(options['set'] != undefined))? options['set'] : "" ;
        var get = ((options != undefined)&&(options['get'] != undefined))? options['get'] : "" ;
        var deflang = ((options != undefined)&&(options['language'] != undefined))? options['language'] : 'text' ;
        var lang = 'text'; 
        var init = function(){   
            div.each(function(k,item){ 
              sTage = $(item)[0].localName;
              lang = (!$.isEmptyObject($(this).attr('cs-lang')))? $(this).attr('cs-lang') : deflang ;
              theme = (!$.isEmptyObject($(this).attr('cs-theme')))? $(this).attr('cs-theme') : theme ;
              if ($(item).length != 0) {
                
                if (set != "") {
                  _data = $(get).html(); 
                  return $(set).html(codeSource()); 
                }else{
                  _data = $(item).html(); 
                  return $(item).html(codeSource()); 
                }



              }else{
                return false;
              }
            });
          div.addClass(theme);
        }
        
        var codeSource = function(){      
          if($.inArray(lang,listLang) != -1) { 
              convertData  = eval(lang+"Code()");
          }else{ 
              convertData = _data;
          }
            return "<pre class='jscode'>"+cleanSource(convertData)+"</pre>"; 
        }

        /* text */
        var textCode = function(){
          convertdata = _data
                        .replace(/</g,'&lt;')
                        .replace(/>/g,'&gt;') 
                ;  

          return convertdata; 
        }

        /* html */
        var htmlCode = function(){
          Fdata = _data 
                        .replace(/<(\w+)/g,'&tagdiv;$1&_end;')
                        .replace(/<\/(\w+)>/g,'&closeattrdiv;$1&_end;')
                        .replace(/([\w\-\d\_]+)=/g,'&attrdiv;$1&_end;')
                        .replace(/"([\w\d\-\s\#\_\.\/\\\:]+)"/g,'&paramsdiv;$1&_end;')
                        .replace(/'([\w\d\-\s\#\_\.\/\\\:]+)'/g,'&paramsdiv;$1&_end;')
                        .replace(/<!--([\w\d\-\s\#\_]+)-->/g,'&commentdiv;$1&_end;') 
                        .replace(/<([\w\d\/\s\-\_\#\!\"\'\=]+)>/g,'&opendiv;$1&closediv;') 
                ;
          convertFdata = Fdata
                               .replace(/&tagdiv;(\w+)&_end;/g,'&lt;<span class="jscode-tag">$1</span>')
                              .replace(/&closeattrdiv;(\w+)&_end;/g,'&lt;/<span class="jscode-tag">$1</span>&gt;')
                              .replace(/&attrdiv;([\w\-\d\_]+)&_end;/g,'<span class="jscode-attr">$1</span>=')
                              .replace(/&paramsdiv;([\w\d\-\s\#\_\.\/\\\:]+)&_end;/g,'\"<span class="jscode-params">$1</span>\"')
                              .replace(/&commentdiv;([\w\d\-\s\#\_]+)&_end;/g,'<span class="jscode-comment">&lt;!--$1--&gt;</span>')
 
                              .replace(/&opendiv;([\w\d\/\s\-\_\#\!\"\'\=]+)&closediv;/g,'&lt;$1&gt;')
                ; 
          return convertFdata; 
        }

        /* css */
        var cssCode = function(){
          Fdata = _data
                              .replace(/([@]+[\w]+[\s]+)/g,'&tag;$1&_end;')
                              .replace(/([#|.][\w\-\d\_]+[\s]+)/g,'&attr;$1&_end;')
                              .replace(/\/\*([\w\d\-\s\#\_]+)\*\//g,'&comment;$1&_end;')
                              .replace(/([\'|\"][\w\d\-\s\#\_\.\"\']+)/g,'&params;$1&_end;')
                              .replace(/([\w\s]+):/g,'&csselm;$1&_end;')
                               
                ;
          convertFdata = Fdata
                              .replace(/&tag;([@]+[\w]+[\s]+)&_end;/g,'<span class="jscode-tag">$1</span>')
                              .replace(/&attr;([#|.][\w\-\d\_]+[\s]+)&_end;/g,'<span class="jscode-attr">$1</span>')
                              .replace(/&comment;([\w\d\-\s\#\_]+)&_end;/g,'<span class="jscode-comment">/*$1*/</span>')
                              .replace(/&params;([\'|\"][\w\d\-\s\#\_\.\"\']+)&_end;/g,'<span class="jscode-params">$1</span>')
                              
                              .replace(/&csselm;([\w\s]+)&_end;/g,'<span class="jscode-elem">$1</span>:')
                              
                ;
          return convertFdata;
        }
        /* bash */
        var bashCode = function(){
          var a_ = '<span class="jscode-params">'; 
          var _a = '</span>'; 
          //params
          var params = [' git ',' composer ',' php ',' npm ',' gulp ',' cd ',' ls ']; 
          var htmlParams = setInForm(params,a_,_a);  
          
          Fdata = _data
                              .replace(/([\$])/g,'<span class="jscode-tag">$1</span>') 
                               
                ; 
          Fdata = replaceInArray(Fdata,params,htmlParams); 
          
          convertFdata = Fdata;
          return convertFdata;
        } 
        var cleanSource = function(code){

            html = code.replace(/Ã—/g, "&times;")
                       .replace(/Â«/g, "&laquo;")
                       .replace(/Â»/g, "&raquo;")
                       .replace(/â†/g, "&larr;")
                       .replace(/â†’/g, "&rarr;");

            var lines = html.split(/\n/);

            lines.shift();
            lines.splice(-1, 1); 
            if (lines[0] != undefined) {
                var indentSize = lines[0].length - lines[0].trim().length,
                    re = new RegExp(" {" + indentSize + "}");

                lines = lines.map(function(line){
                  if (line.match(re)) {
                    line = line.substring(indentSize);
                  }

                  return line;
                });
              lines = lines.join("\n");
              return lines;
            }
              return html;
        } 
        var setInForm = function(list,start,end){
            var datalist = []; 
            for(var i=0;i<list.length;i++){
              datalist[i] = start+list[i]+end;
            }
            return datalist;
        } 
        var replaceInArray = function(data,list,html){ 

            for (var i = 0; i < list.length; i++) {
                data = data.replace(new RegExp(list[i], 'g'), html[i]);
            }
            return data;
        }  

        init();
 
    }

})(jQuery);