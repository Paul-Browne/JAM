!function(){"use strict";function e(n,t,r){return("string"==typeof t?t:t.toString()).replace(n.define||a,function(e,t,o,a){return 0===t.indexOf("def.")&&(t=t.substring(4)),t in r||(":"===o?(n.defineParams&&a.replace(n.defineParams,function(e,n,o){r[t]={arg:n,text:o}}),t in r||(r[t]=a)):new Function("def","def['"+t+"']="+a)(r)),""}).replace(n.use||a,function(t,o){n.useParams&&(o=o.replace(n.useParams,function(e,n,t,o){if(r[t]&&r[t].arg&&o){var a=(t+":"+o).replace(/'|\\/g,"_");return r.__exp=r.__exp||{},r.__exp[a]=r[t].text.replace(new RegExp("(^|[^\\w$])"+r[t].arg+"([^\\w$])","g"),"$1"+o+"$2"),n+"def.__exp['"+a+"']"}}));var a=new Function("def","return "+o)(r);return a?e(n,a,r):a})}function n(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var t,r={name:"doT",version:"1.1.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1,doNotSkipEncoded:!1},template:void 0,compile:void 0,log:!0};r.encodeHTMLSource=function(e){var n={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},t=e?/[&<>"'\/]/g:/&(?!#?\w+;)|<|>|"|'|\//g;return function(e){return e?e.toString().replace(t,function(e){return n[e]||e}):""}},t=function(){return this||(0,eval)("this")}(),"undefined"!=typeof module&&module.exports?module.exports=r:"function"==typeof define&&define.amd?define(function(){return r}):t.doT=r;var o={append:{start:"'+(",end:")+'",startencode:"'+encodeHTML("},split:{start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("}},a=/$^/;r.template=function(c,i,u){i=i||r.templateSettings;var d,s,p=i.append?o.append:o.split,l=0,f=i.use||i.define?e(i,c,u||{}):c;f=("var out='"+(i.strip?f.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):f).replace(/'|\\/g,"\\$&").replace(i.interpolate||a,function(e,t){return p.start+n(t)+p.end}).replace(i.encode||a,function(e,t){return d=!0,p.startencode+n(t)+p.end}).replace(i.conditional||a,function(e,t,r){return t?r?"';}else if("+n(r)+"){out+='":"';}else{out+='":r?"';if("+n(r)+"){out+='":"';}out+='"}).replace(i.iterate||a,function(e,t,r,o){return t?(l+=1,s=o||"i"+l,t=n(t),"';var arr"+l+"="+t+";if(arr"+l+"){var "+r+","+s+"=-1,l"+l+"=arr"+l+".length-1;while("+s+"<l"+l+"){"+r+"=arr"+l+"["+s+"+=1];out+='"):"';} } out+='"}).replace(i.evaluate||a,function(e,t){return"';"+n(t)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,""),d&&(i.selfcontained||!t||t._encodeHTML||(t._encodeHTML=r.encodeHTMLSource(i.doNotSkipEncoded)),f="var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("+r.encodeHTMLSource.toString()+"("+(i.doNotSkipEncoded||"")+"));"+f);try{return new Function(i.varname,f)}catch(g){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+f),g}},r.compile=function(e,n){return r.template(e,null,n)}}();


function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    var later = function() {
      timeout = null;
      //if (!immediate) {
        func.apply(context, args);
      //}
    };
    //var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    //if (callNow) {
    //  func.apply(context, args);
    //}
  };
}

var debounceClassName = debounce(function() {
  document.documentElement.classList.add("loaded");
}, 100);

function include(theUrl, target, arr) {
    var wW = window.innerWidth;
    var _url = theUrl;
    var url = theUrl;
    var i = 0;
    var j = 0;
    if (arr) {
        j = arr.length;
    }
    while (i < j) {
        if (wW > arr[i]) {
            url = _url + "." + arr[i] + ".html";
        }
        i++;
    }

    var _target = document.querySelector("[jm-name="+target+"]");

    _target.style.display = "block";
    _target.style.height = "20px";

    if(_target.hasAttribute("jm-lazy")){
        var offset = _target.getAttribute("jm-lazy") || 100;
        var wH = window.innerHeight;
        var ps = _target.getBoundingClientRect().top - wH - offset;
        window.addEventListener("scroll", function vvv(e){
            ps = _target.getBoundingClientRect().top - wH - offset;
            if(ps <= 0){
                window.removeEventListener("scroll", vvv);
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        console.log("wicked and i'm lazy");

                        bob(_target, xmlhttp.responseText, url);

                    }
                }
                xmlhttp.open("GET", url, true);
                xmlhttp.send();
            }
        })
    }else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                console.log("not lazy");
                bob(_target, xmlhttp.responseText, url);

            }
        }
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
}

function bob(outer, res, lru){
    /* json data */

    console.log("bob called");

    if(outer.hasAttribute("jm-data") ){

        console.log("has a jm-data thingy");

        var jsonData = outer.getAttribute("jm-data");
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var dotted = doT.template(res);
                res = dotted(JSON.parse(xmlhttp.responseText));

                outer.outerHTML = res;

                debounceClassName();

            }
        }
        xmlhttp.open("GET", jsonData, true);
        xmlhttp.send();


    }else{

        console.log("doesn't have a jm-data thingy33");

        outer.outerHTML = res;

        debounceClassName();

    }

}

function fullReplace(theUrl) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.documentElement.innerHTML = xmlhttp.responseText;
            var addScripts = document.querySelectorAll("script:not([src$='jxy.js']):not([src$='jxy.min.js'])");
            addScripts.forEach(function(element) {
                var newScript = document.createElement("SCRIPT");
                newScript.innerHTML = element.innerHTML;
                if(element.hasAttribute("src")){
                    newScript.setAttribute("src", element.getAttribute("src"));
                }
                document.head.appendChild(newScript);
            });
        }
    }
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.send();
}


window.addEventListener("click", function(e) {
    e.preventDefault();
    e = e || window.event;
    var targ = e.target || e.srcElement;
    if(targ.href) {
        document.documentElement.classList.remove("loaded");
        document.documentElement.classList.add("loading");
        var page = targ.href;
        fullReplace(page);
        history.pushState(null, null, targ.href);
    }
});

// turned off reload-on-resize for now

// function debouncedResize(a,b){
// return window.addEventListener("resize",function(){
//   clearTimeout(b),
//   b = setTimeout(a,250)
// }),a
// }
// debouncedResize(function(){
//     // TODO
//     // fullreplace only if a breakpoint is crossed
//     fullReplace(window.location.href);
// });


// back/forward button functionality

window.addEventListener("popstate", function(e) {
    document.documentElement.classList.remove("loaded");
    document.documentElement.classList.add("loading");
    fullReplace(window.location.href);
});

