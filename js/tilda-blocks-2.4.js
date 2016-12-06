 
function t228_highlight(){
  var url=window.location.href;
  var pathname=window.location.pathname;
  if(url.substr(url.length - 1) == "/"){ url = url.slice(0,-1); }
  if(pathname.substr(pathname.length - 1) == "/"){ pathname = pathname.slice(0,-1); }
  if(pathname.charAt(0) == "/"){ pathname = pathname.slice(1); }
  if(pathname == ""){ pathname = "/"; }
  $(".t228__list_item a[href='"+url+"']").addClass("t-active");
  $(".t228__list_item a[href='"+url+"/']").addClass("t-active");
  $(".t228__list_item a[href='"+pathname+"']").addClass("t-active");
  $(".t228__list_item a[href='/"+pathname+"']").addClass("t-active");
  $(".t228__list_item a[href='"+pathname+"/']").addClass("t-active");
  $(".t228__list_item a[href='/"+pathname+"/']").addClass("t-active");
}

function t228_setPath(){
}

function t228_setWidth(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      var left_exist=el.find('.t228__leftcontainer').length;
      var left_w=el.find('.t228__leftcontainer').outerWidth(true);
      var max_w=left_w;
      var right_exist=el.find('.t228__rightcontainer').length;
      var right_w=el.find('.t228__rightcontainer').outerWidth(true);
	  var items_align=el.attr('data-menu-items-align');
      if(left_w<right_w)max_w=right_w;
      max_w=Math.ceil(max_w);
      var center_w=0;
      el.find('.t228__centercontainer').find('li').each(function() {
        center_w+=$(this).outerWidth(true);
      });
      var padd_w=40;
      var maincontainer_width=el.find(".t228__maincontainer").outerWidth(true);
      if(maincontainer_width-max_w*2-padd_w*2>center_w+20){
          //if(left_exist>0 && right_exist>0){
		  if(items_align=="center" || typeof items_align==="undefined"){
            el.find(".t228__leftside").css("min-width",max_w+"px");
            el.find(".t228__rightside").css("min-width",max_w+"px");
            el.find(".t228__list").removeClass("t228__list_hidden");
          }
       }else{
          el.find(".t228__leftside").css("min-width","");
          el.find(".t228__rightside").css("min-width","");  
          
      }
    });
  }
}

function t228_setBg(recid){
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      if(el.attr('data-bgcolor-setbyscript')=="yes"){
        var bgcolor=el.attr("data-bgcolor-rgba");
        el.css("background-color",bgcolor);             
      }
      });
      }else{
        $(".t228").each(function() {
          var el=$(this);
          var bgcolor=el.attr("data-bgcolor-hex");
          el.css("background-color",bgcolor);
          el.attr("data-bgcolor-setbyscript","yes");
      });
  }
}

function t228_appearMenu(recid) {
      var window_width=$(window).width();
      if(window_width>980){
           $(".t228").each(function() {
                  var el=$(this);
                  var appearoffset=el.attr("data-appearoffset");
                  if(appearoffset!=""){
                          if(appearoffset.indexOf('vh') > -1){
                              appearoffset = Math.floor((window.innerHeight * (parseInt(appearoffset) / 100)));
                          }

                          appearoffset=parseInt(appearoffset, 10);

                          if ($(window).scrollTop() >= appearoffset) {
                            if(el.css('visibility') == 'hidden'){
                                el.finish();
                                el.css("top","-50px");  
                                el.css("visibility","visible");
                                el.animate({"opacity": "1","top": "0px"}, 200,function() {
                                });       
                            }
                          }else{
                            el.stop();
                            el.css("visibility","hidden");
                          }
                  }
           });
      }

}

function t228_changebgopacitymenu(recid) {
  var window_width=$(window).width();
  if(window_width>980){
    $(".t228").each(function() {
      var el=$(this);
      var bgcolor=el.attr("data-bgcolor-rgba");
      var bgcolor_afterscroll=el.attr("data-bgcolor-rgba-afterscroll");
      var bgopacityone=el.attr("data-bgopacity");
      var bgopacitytwo=el.attr("data-bgopacity-two");
      var menushadow=el.attr("data-menushadow");
      if(menushadow=='100'){
        var menushadowvalue=menushadow;
      }else{
        var menushadowvalue='0.'+menushadow;
      }
      if ($(window).scrollTop() > 20) {
        el.css("background-color",bgcolor_afterscroll);
        if(bgopacitytwo=='0' || (typeof menushadow == "undefined" && menushadow == false)){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }else{
        el.css("background-color",bgcolor);
        if(bgopacityone=='0.0' || (typeof menushadow == "undefined" && menushadow == false)){
          el.css("box-shadow","none");
        }else{
          el.css("box-shadow","0px 1px 3px rgba(0,0,0,"+ menushadowvalue +")");
        }
      }
    });
  }
}

function t228_createMobileMenu(recid) {
  var window_width=$(window).width();
  var el=$("#rec"+recid);
  var menu = el.find(".t228");
  var burger = el.find(".t228__mobile");
  if(980>window_width){
    burger.click(function(e){
      menu.fadeToggle(300);
      $(this).toggleClass("t228_opened");
    });
  }
}



 
function t330_showPopup(recid){
  var el=$('#rec'+recid),
      popup = el.find('.t-popup');

  popup.css('display', 'block');
  setTimeout(function() {
    popup.find('.t-popup__container').addClass('t-popup__container-animated');
    popup.addClass('t-popup_show');
  }, 50);

  $('body').addClass('t-body_popupshowed');

  el.find('.t-popup').click(function(e){
    if (e.target == this) { t330_closePopup(); }
  });

  el.find('.t-popup__close').click(function(e){
    t330_closePopup();
  });

  el.find('a[href*=#]').click(function(e){
    var url = $(this).attr('href');
    if (!url || url.substring(0,7) != '#price:') {
      t330_closePopup();
      if (!url || url.substring(0,7) == '#popup:') {
        setTimeout(function() {
          $('body').addClass('t-body_popupshowed');
        }, 300);
      }
    }
  });

  $(document).keydown(function(e) {
    if (e.keyCode == 27) { t330_closePopup(); }
  });
}

function t330_closePopup(){
  $('body').removeClass('t-body_popupshowed');
  $('.t-popup').removeClass('t-popup_show');
  setTimeout(function() {
    $('.t-popup').not('.t-popup_show').css('display', 'none');
  }, 300);
}

function t330_resizePopup(recid){
  var el = $("#rec"+recid),
      div = el.find(".t-popup__container").height(),
      win = $(window).height() - 120,
      popup = el.find(".t-popup__container");
  if (div > win ) {
    popup.addClass('t-popup__container-static');
  } else {
    popup.removeClass('t-popup__container-static');
  }
}

function t330_sendPopupEventToStatistics(popupname) {
  var virtPage = '/tilda/popup/';
  var virtTitle = 'Popup: ';
  if (popupname.substring(0,7) == '#popup:') {
      popupname = popupname.substring(7);
  }
    
  virtPage += popupname;
  virtTitle += popupname;
    
  if(ga) {
    if (window.mainTracker != 'tilda') {
      ga('send', {'hitType':'pageview', 'page':virtPage,'title':virtTitle});
    }
  }
  
  if (window.mainMetrika > '' && window[window.mainMetrika]) {
    window[window.mainMetrika].hit(virtPage, {title: virtTitle,referer: window.location.href});
  }
}

function t330_initPopup(recid){
  $('#rec'+recid).attr('data-animationappear','off');
  $('#rec'+recid).css('opacity','1');
  var el=$('#rec'+recid).find('.t-popup'),
      hook=el.attr('data-tooltip-hook'),
      analitics=el.attr('data-track-popup');
  if(hook!==''){
    var obj = $('a[href="'+hook+'"]');
    obj.click(function(e){
      t330_showPopup(recid);
      t330_resizePopup(recid);
      e.preventDefault();
      if (analitics == 'yes') {
        t330_sendPopupEventToStatistics(hook);
      }
    });
  }
}