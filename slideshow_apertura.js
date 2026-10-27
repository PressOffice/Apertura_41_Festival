/* slideshow_apertura - JavaScript puro, nessuna libreria.
   Ciclo = 5 s a slide: 3 s fermo + 2 s di dissolvenza (data-hold / data-fade in millisecondi), loop continuo. */
(function(){
  function load(s){var i=s.querySelectorAll('[data-src]'),k;
    for(k=0;k<i.length;k++){var e=i[k];e.src=e.dataset.src;e.removeAttribute('data-src');}}
  function init(box){
    var slides=[].slice.call(box.querySelectorAll('.slideshow_apertura__slide')); if(slides.length<2)return;
    var hold=+box.dataset.hold||3000, fade=+box.dataset.fade||2000, cur=0, timer=null, visible=true;
    box.style.setProperty('--slideshow_apertura-fade',fade+'ms'); box.classList.add('is-ready');
    slides[0].classList.add('is-active'); load(slides[1]);
    function next(){
      var n=(cur+1)%slides.length;
      slides.forEach(function(s){s.classList.remove('is-prev');});
      slides[cur].classList.remove('is-active'); slides[cur].classList.add('is-prev');
      load(slides[n]); slides[n].classList.add('is-active');
      cur=n; load(slides[(n+1)%slides.length]);
    }
    function start(){ if(!timer) timer=setInterval(next,hold+fade); }
    function stop(){ clearInterval(timer); timer=null; }
    document.addEventListener('visibilitychange',function(){document.hidden?stop():(visible&&start());});
    if('IntersectionObserver' in window){
      new IntersectionObserver(function(e){visible=e[0].isIntersecting;visible&&!document.hidden?start():stop();}).observe(box);
    } else start();
  }
  function ready(){[].forEach.call(document.querySelectorAll('.slideshow_apertura'),init);}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',ready):ready();
})();
