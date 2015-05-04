/*
  app v0.0.0 - 4/5/2015

  Author: _NAME_ - _EMAIL_
*/(function(){!function(){var a;return a=function(){function a(){}return a.prototype.loaders=[],a.prototype.onload=function(a){return this.loaders.push(a)},a.prototype.init=function(){var a,b,c,d,e;for(d=this.loaders,e=[],b=0,c=d.length;c>b;b++)a=d[b],e.push("function"==typeof a?a():void 0);return e},a}(),window.Laugar=new a}(),$(function(){var a,b,c,d;return c=$("#main"),b=$("#header"),a=$("#footer"),d=function(){var c,d;return c=a.find("#beers").outerHeight(),d=document.body.offsetHeight-b.outerHeight(),c>0&&(d-=c),d}(),c.css("min-height",d),c.find("#overlay").css("min-height",c.css("min-height")),Laugar.init()})}).call(this);