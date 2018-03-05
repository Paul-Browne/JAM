/* doT.js */
!function(){"use strict";function e(n,t,r){return("string"==typeof t?t:t.toString()).replace(n.define||c,function(e,t,o,a){return 0===t.indexOf("def.")&&(t=t.substring(4)),t in r||(":"===o?(n.defineParams&&a.replace(n.defineParams,function(e,n,o){r[t]={arg:n,text:o}}),t in r||(r[t]=a)):new Function("def","def['"+t+"']="+a)(r)),""}).replace(n.use||c,function(t,o){n.useParams&&(o=o.replace(n.useParams,function(e,n,t,o){if(r[t]&&r[t].arg&&o){var a=(t+":"+o).replace(/'|\\/g,"_");return r.__exp=r.__exp||{},r.__exp[a]=r[t].text.replace(new RegExp("(^|[^\\w$])"+r[t].arg+"([^\\w$])","g"),"$1"+o+"$2"),n+"def.__exp['"+a+"']"}}));var a=new Function("def","return "+o)(r);return a?e(n,a,r):a})}function n(e){return e.replace(/\\('|\\)/g,"$1").replace(/[\r\t\n]/g," ")}var t,r={name:"doT",version:"1.1.1",templateSettings:{evaluate:/\{\{([\s\S]+?(\}?)+)\}\}/g,interpolate:/\{\{=([\s\S]+?)\}\}/g,encode:/\{\{!([\s\S]+?)\}\}/g,use:/\{\{#([\s\S]+?)\}\}/g,useParams:/(^|[^\w$])def(?:\.|\[[\'\"])([\w$\.]+)(?:[\'\"]\])?\s*\:\s*([\w$\.]+|\"[^\"]+\"|\'[^\']+\'|\{[^\}]+\})/g,define:/\{\{##\s*([\w\.$]+)\s*(\:|=)([\s\S]+?)#\}\}/g,defineParams:/^\s*([\w$]+):([\s\S]+)/,conditional:/\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,iterate:/\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,varname:"it",strip:!0,append:!0,selfcontained:!1,doNotSkipEncoded:!1},template:void 0,compile:void 0,log:!0};r.encodeHTMLSource=function(e){var n={"&":"&#38;","<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","/":"&#47;"},t=e?/[&<>"'\/]/g:/&(?!#?\w+;)|<|>|"|'|\//g;return function(e){return e?e.toString().replace(t,function(e){return n[e]||e}):""}},t=function(){return this||(0,eval)("this")}(),"undefined"!=typeof module&&module.exports?module.exports=r:"function"==typeof define&&define.amd?define(function(){return r}):t.doT=r;var o={start:"'+(",end:")+'",startencode:"'+encodeHTML("},a={start:"';out+=(",end:");out+='",startencode:"';out+=encodeHTML("},c=/$^/;r.template=function(u,i,d){var s,l,p=(i=i||r.templateSettings).append?o:a,f=0,g=i.use||i.define?e(i,u,d||{}):u;g=("var out='"+(i.strip?g.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g," ").replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,""):g).replace(/'|\\/g,"\\$&").replace(i.interpolate||c,function(e,t){return p.start+n(t)+p.end}).replace(i.encode||c,function(e,t){return s=!0,p.startencode+n(t)+p.end}).replace(i.conditional||c,function(e,t,r){return t?r?"';}else if("+n(r)+"){out+='":"';}else{out+='":r?"';if("+n(r)+"){out+='":"';}out+='"}).replace(i.iterate||c,function(e,t,r,o){return t?(f+=1,l=o||"i"+f,t=n(t),"';var arr"+f+"="+t+";if(arr"+f+"){var "+r+","+l+"=-1,l"+f+"=arr"+f+".length-1;while("+l+"<l"+f+"){"+r+"=arr"+f+"["+l+"+=1];out+='"):"';} } out+='"}).replace(i.evaluate||c,function(e,t){return"';"+n(t)+"out+='"})+"';return out;").replace(/\n/g,"\\n").replace(/\t/g,"\\t").replace(/\r/g,"\\r").replace(/(\s|;|\}|^|\{)out\+='';/g,"$1").replace(/\+''/g,""),s&&(i.selfcontained||!t||t._encodeHTML||(t._encodeHTML=r.encodeHTMLSource(i.doNotSkipEncoded)),g="var encodeHTML = typeof _encodeHTML !== 'undefined' ? _encodeHTML : ("+r.encodeHTMLSource.toString()+"("+(i.doNotSkipEncoded||"")+"));"+g);try{return new Function(i.varname,g)}catch(e){throw"undefined"!=typeof console&&console.log("Could not create a template function: "+g),e}},r.compile=function(e,n){return r.template(e,null,n)}}();


/* JAM.js */
!function() {

    function _request(targ, url){
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = xhr.responseText;
                replaceScriptTagWithResponse(targ, res);
            }
        }
        xhr.open("GET", url, true);
        xhr.send();
    }

    function replaceScriptTagWithResponse(outer, res) {
        /* json data */
        if (outer.hasAttribute("jm-data")) {
            var jsonData = outer.getAttribute("jm-data");
            if (jsonData.indexOf("{") != -1) {
                var dotted = doT.template(res);
                res = dotted(JSON.parse(jsonData));
                addAccountedClassToScripts_addContent_addNewScriptsToHead(outer, res);
            } else {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                        var dotted = doT.template(res);
                        res = dotted(JSON.parse(xmlhttp.responseText));
                        addAccountedClassToScripts_addContent_addNewScriptsToHead(outer, res);
                    }
                }
                xmlhttp.open("GET", jsonData, true);
                xmlhttp.send();
            }
        } else {
            addAccountedClassToScripts_addContent_addNewScriptsToHead(outer, res);
        }
    }

    function addAccountedClassToScripts_addContent_addNewScriptsToHead(outer, res){
        addAccountedClassToScripts();
        outer.outerHTML = res;
        addNewScriptsToHead();
    }

    function addAccountedClassToScripts() {
        var scripts = document.querySelectorAll("script:not(.accounted)");
        var _k = scripts.length;
        while(_k--){
            scripts[_k].classList.add('accounted');
        }
    }

    function addNewScriptsToHead() {
        var addScripts = document.querySelectorAll("script:not(.accounted)");
        var _l = addScripts.length;
        while(_l--){
           var newScript = document.createElement("SCRIPT");
           newScript.innerHTML = addScripts[_l].innerHTML;
           if (addScripts[_l].hasAttribute("src")) {
               newScript.setAttribute("src", addScripts[_l].getAttribute("src"));
           }
           document.head.appendChild(newScript);
        }
    }

    function clickedOn(el) {
        while (el) {
            if (el.tagName === 'A') {
                return el.href;
            }
            el = el.parentElement;
        }
    }

    include = function(theUrl, target, arr) {
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
                var mime = _url.lastIndexOf('.');
                var url = _url.substring(0, mime+1) + arr[i] + _url.substr(mime);
            }
            i++;
        }

        var _target = document.querySelector("script[jm-name=" + target + "]:not(.accounted)");

        _target.style.display = "block";
        _target.style.color = "transparent";
        _target.style.height = "100vh";


        if (_target.hasAttribute("jm-lazy")) {
            var offset = _target.getAttribute("jm-lazy") || 100;
            var wH = window.innerHeight;
            var ps = _target.getBoundingClientRect().top - wH - offset;

            if (ps <= 0) {
                _request(_target, url);
            } else {
                window.addEventListener("scroll", function checkScrollPosition(){
                    var newPS = _target.getBoundingClientRect().top - wH - offset;
                    if (newPS <= 0) {
                        window.removeEventListener("scroll", checkScrollPosition);
                        _request(_target, url);
                    }
                })
            }

        } else if (_target.hasAttribute("jm-hash")) {
            _target.style.display = "none";
            var _hash = _target.getAttribute("jm-name");        
            var matchingAnchor = document.querySelectorAll("a[jm-hash=" + _hash + "]");
            var _j = matchingAnchor.length;
            while(_j--){
                matchingAnchor[_j].addEventListener("click", function checkClickedAnchor() {
                    this.removeEventListener("click", checkClickedAnchor);
                    _request(_target, url);
                })
            }
        } else {
            _request(_target, url);
        }
    }

    function fullReplace(theUrl) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

                document.documentElement.innerHTML = xmlhttp.responseText;
                var addScripts = document.querySelectorAll("script:not([src$='jam.js']):not([src$='jam.min.js'])");
                var _i = 0;
                var __i = addScripts.length;
                while(_i < __i){
                    var newScript = document.createElement("SCRIPT");
                    newScript.innerHTML = addScripts[_i].innerHTML;
                    if (addScripts[_i].hasAttribute("src")) {
                        newScript.setAttribute("src", addScripts[_i].getAttribute("src"));
                    }
                    document.head.appendChild(newScript);
                    _i++;
                }
            }
        }
        xmlhttp.open("GET", theUrl, true);
        xmlhttp.send();
    }

    window.addEventListener("click", function(e) {
        var _this = clickedOn(e.target);
        if (_this){
            e.preventDefault();
        }
        if (_this && _this.indexOf("#") == -1) {
            fullReplace(_this);
            history.pushState(null, null, _this);
        }
    });


    window.addEventListener("popstate", function(e) {
        fullReplace(window.location.href);
    });

}();

