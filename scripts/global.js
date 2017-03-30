
function addLoadEvent(func) {
  var oldonload = window.onload;
  if(typeof window.onload != 'function'){
    window.onload = func;
  }else{
    window.onload = function() {
      oldonload();
      func();
    }
  }
}
function insertAfter(newElement,targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}
 
function addClass(element,value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName+= " ";
    newClassName+= value;
    element.className = newClassName;
  }
}

function highlightPage(){
    if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers=document.getElementsByTagName("header");
	if(headers.length==0) return false;
	var navs=headers[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i=0;i<links.length;i++){
		linkurl=links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl)!=-1){
			links[i].className="here";
		}
	}
}
function highlightPage() {
if (!document.getElementsByTagName) return false;
if (!document.getElementById) return false;  
var headers = document.getElementsByTagName('header');
if (headers.length == 0) return false;
var navs = headers[0].getElementsByTagName('nav');
if (navs.length == 0) return false;

var links = navs[0].getElementsByTagName("a");
	  var linkurl;
	  for (var i=0; i<links.length; i++) {
	    linkurl = links[i].getAttribute("href");
	    if (window.location.href.indexOf(linkurl) != -1) {
	      links[i].className = "here";
	      var linktext = links[i].lastChild.nodeValue.toLowerCase();
	      document.body.setAttribute("id",linktext);
	    }
}
}

addLoadEvent(highlightPage);

//为实现幻灯片功能，引入moveElement函数。第10章的
function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    var dist = Math.ceil((final_x - xpos)/10);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    var dist = Math.ceil((xpos - final_x)/10);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    var dist = Math.ceil((final_y - ypos)/10);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    var dist = Math.ceil((ypos - final_y)/10);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}
//这里出问题了，还没查出来
//function prepareSlideshow(){
//	if(!document.getElementsByTagName) return false;
//	if(!document.getElementById) return false;
//	if(!document.getElementById("intro")) return false;
//	var intro=document.getElementById("intro");
//	var slideshow=document.createElement("div");
//	slideshow.setAttribute("id","slideshow");
//	var preview=document.createElement("img");
//	preview.setAttribute("src","images/slideshow.gif");
//	preview.setAttribute("alt","a glimpse of what awaits you");
//	preview.setAttribute("id","preview");
//	slideshow.appendChild(preview);
//	insertAfter(slideshow,intro);
//	var links=intro.getElementsByTagName("a");
//	var destination;
//	for(var i=0;i<links.length;i++){
//		links[i].onmouseover=function(){
//			destination=this.getAttribute("href");
//			
//			if(destination.indexOf("index.html")!=-1){
//				moveElement("preview",0,0,5);
//			if(destination.indexOf("about.html")!=-1){
//				moveElement("preview",-150,0,5);
//			if(destination.indexOf("photos.html")!=-1){
//				moveElement("preview",-300,0,5);
//			if(destination.indexOf("contact.html")!=-1){
//				moveElement("preview",-600,0,5);
//			}
//		}
//	}
//}
//在第一页home中实现图片的轮播


function prepareSlideshow() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id","slideshow");
    var frame = document.createElement("img");
    frame.setAttribute("src","images/frame.gif");
    frame.setAttribute("alt","");
    frame.setAttribute("id","frame");
    slideshow.appendChild(frame);
    var preview = document.createElement("img");
    preview.setAttribute("src","images/slideshow.gif");
    preview.setAttribute("alt","a glimpse of what awaits you");
    preview.setAttribute("id","preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    var links = document.getElementsByTagName("a");
    for (var i=0; i<links.length; i++) {
        links[i].onmouseover = function() {
            var destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview",0,0,5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview",-150,0,5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview",-300,0,5);
            }
		    if (destination.indexOf("live.html") != -1) {
		        moveElement("preview",-450,0,5);
		    }
		    if (destination.indexOf("contact.html") != -1) {
		        moveElement("preview",-600,0,5);
		    }
        }
    }
}               
addLoadEvent(prepareSlideshow);
//第二页about，需要实现选择性的显示部分内容，且默认位内容都隐藏
//showSection函数可以实现根据指定的id显示相应的<section>同时隐藏其他部分
function showSection(id){
	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++){
		if(sections[i].getAttribute("id")!=id){
			sections[i].style.display="none";
		}else{
			sections[i].style.display="block";
		}
	}
}
//还需要在<article>中的<nav>所包含的链接呗单机时调用showSection函数
function prepareInternalnav(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles=document.getElementsByTagName("article");
	if(articles.length==0) return false;
	var navs=articles[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var nav=navs[0];
	var links=nav.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display="none";
    links[i].destination=sectionId;
    links[i].onclick=function(){
    	showSection(this.destination);
    	return false;
    }
	}
}
addLoadEvent(prepareInternalnav);
//photos.html  制作javascript图片库
function preparePlaceholder(){
	if(!document.createElement) return false;
	if(!document.createTextNode) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;//以上是检验所需DOM函数的兼容性
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var desctext=document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery=document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}

/*
 * 1. 检查当前浏览器是否理解getElementsByTagName
 * 2. 检查当前浏览器是否理解getElementById
 * 3. 检查当前浏览器是否存在一个id为imagegallery的元素
 * 4. 遍历imagegallery元素中的所有链接
 * 5. 设置onclick事件，让它在有关链接被点击时完成以下操作
 *        把这个链接作为参数传递给showPic函数
 *        取消链接被点击时的默认行为，不让浏览器打开这个链接
 */

function prepareGallery(){
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function(){
		return !showPic(this);
		}
	}
}
function showPic(whichpic){
	if(!document.getElementById("placeholder")) return false;
	var source=whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	if(document.getElementById("description")){  //优化：判断是否存在description
	    var text=whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";//优化：判断是否存在title
	    var description=document.getElementById("description");
	    if(description.firstChild.nodeType==3){  //优化：判断nodeType是否为文本节点
	        description.firstChild.nodeValue=text;
	    }
	}
	return true;
}
addLoadEvent(preparePlaceholder);//创建了新的函数别忘了调用啊！！！
addLoadEvent(prepareGallery);//调用

/*
 * 这是live页面关于表格的设置
 * 1.把文档里的所有table元素找出来
 * 2.对每个table元素，创建odd变量并把它初始化为false
 * 3.遍历这个表格里的所有数据行
 * 4.如果变量odd的值是true，设置样式并把odd变量修改为false
 * 5.如果变量odd的值是false，不设置样式，但把odd变量修改为true
 */
function stripeTables() {
  if (!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  for (var i=0; i<tables.length; i++) {
    var odd = false;
    var rows = tables[i].getElementsByTagName("tr");
    for (var j=0; j<rows.length; j++) {
      if (odd == true) {
        addClass(rows[j],"odd");
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}

/*
 * 在鼠标指针悬停在某个表格行的上方时使用。在应用新类名前，先把原来的className保存到名为oldClassName的自定义属性中，当用户的鼠标离开表格行后。再把className属性重置回原来的oldClassName值
 */
function highlightRows() {
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for (var i=0; i<rows.length; i++) {
    rows[i].oldClassName = rows[i].className
    rows[i].onmouseover = function() {
      addClass(this,"highlight");
    }
    rows[i].onmouseout = function() {
      this.className = this.oldClassName
    }
  }
}

function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  var abbreviations = document.getElementsByTagName("abbr");
  if (abbreviations.length < 1) return false;
  var defs = new Array();
  for (var i=0; i<abbreviations.length; i++) {
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1) continue;
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
  var dlist = document.createElement("dl");
  for (key in defs) {
    var definition = defs[key];
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1) return false;
  var header = document.createElement("h3");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  var articles = document.getElementsByTagName("article");
  if (articles.length == 0) return false;
  articles[0].appendChild(header);
  articles[0].appendChild(dlist);
}
addLoadEvent(highlightRows);
addLoadEvent(stripeTables);
addLoadEvent(displayAbbreviations);


//此书后续内容不太明白，先看其它书，以后再回来补完
