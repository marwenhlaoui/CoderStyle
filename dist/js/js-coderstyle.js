/**
 * CoderStyle 
 *
 * Copyright 2017, Marwen Hlaoui - http://http:marwenhlaoui.me 
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */

;(function($){ 

    $.fn.coderStyle = function(options){ 

        var listLang = ['html','css','text'];
        var def = {};
        var div = $(this);   
        var _data = "";
        var sTage = "div";
        var deflang = ((options != undefined)&&(options['language'] != undefined))? options['language'] : 'text' ;
        var lang = 'text'; 
        var init = function(){  
            div.each(function(k,item){ 
              sTage = $(item)[0].localName;
              lang = (!$.isEmptyObject($(this).attr('cs-lang')))? $(this).attr('cs-lang') : deflang ;
              if ($(item).length != 0) {
                _data = $(item).html(); 
                return $(item).html(codeSource()); 

              }else{
                return false;
              }
            });
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
          Fdata = _data 
                        .replace(/(['http'|'https']+)([\w\d\:\.\/\\\?\#]+)/g,'&link;$1$2&_end;') 
                ;
          convertFdata = Fdata
                               .replace(/&link;(['http'|'https']+)([\w\d\:\.\/\\\?\#]+)&_end;/g,'<span class="jscode-attr">$1</span><span class="jscode-params">$2</span>') 
                ; 
          return convertFdata; 
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

        init();
 
    }

})(jQuery);