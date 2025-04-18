  $(document).ready(function () {
    initSlider();
    sliderHint();
    initSubNav();
  
    //CLICKING BACK TO TOP BUTTON EASES SCROLLING TO THE ANCHOR LINK
    $("#backTop").click(function () {
      $('html,body').animate({
        scrollTop: $("#content-wrapper").offset().top
      }, 'slow');
    });
  });
  
  function initSlider(){
    var compared_images = $('.slider-image');
    var amount_of_compared_images = compared_images.length;
    compared_images.each(function( index, imageEl ) {
      imageEl.dataset.starting_opacity = -(parseInt(index)) // start at 0, get incrementally farther from 0
    });
  
    $(".slider-control").slider({
      max: 100,
      step: 1,
      range: "min",
      value: 5,
      slide: function (event, ui) {
        var slider_modifier = amount_of_compared_images / 100;
        var opacity_modifier = ui.value * slider_modifier;
  
        compared_images.each(function( index, imageEl ) {
          newOpacity = parseInt(imageEl.dataset.starting_opacity) + opacity_modifier;
          imageEl.style.opacity = newOpacity;
          // console.log(index, imageEl.id, 'ui slider value:', ui.value, "opacity:", imageEl.style.opacity)
        });
      }
    });
  }
  
  function initSubNav() {
    var navItem = document.querySelectorAll(".sub-nav-item");
    //CHANGE THE CLASS OF IN-PAGE NAV BUTTON APPEARANCE ON CLICK/SELECTION - ACTIVE VIEW, SCROLL CONTENT TO TOP OF PAGE
    navItem.forEach(function(element){
      element.addEventListener("click", function (event) {
        $(".currentTab").removeClass('currentTab');
        $(this).addClass("currentTab");
  
        showSection(this.dataset.target);
        // initialize slick component on the tab, once it is available
        // TODO: don't setup twice, if you return to the tab
        //   Second setup causes "TypeError: Cannot read properties of null (reading 'find')"
        //   This does not seem to affect functionality
        if(this.dataset.carouselElSelector){
          waitForElement(this.dataset.carouselElSelector).then((el) => {
            console.debug("Calling setupSlick", el)
            setupSlick(this.dataset.carouselElSelector)
          });
        }
  
        if(isMobile()) {
          //console.log("In SubNav click", this, event.target)
          $('.sub-nav-items').removeClass("show");
          toggleMobileNavButton();
        } else {
          $('html,body').animate({
            scrollTop: $("#content-wrapper").offset().top
          },'slow',function() {
            resetHidden();
          });
        }
  
        resetCollapse();
      });
    });
  
    document.querySelectorAll('.mobile-sub-nav')[0].addEventListener("click", function() {
      $('.sub-nav-items').toggleClass("show");
      toggleMobileNavButton();
    });
  }
  
  function isMobile() {
    var mobileButton = document.querySelectorAll('.mobile-sub-nav')[0];
    return mobileButton.currentStyle ? mobileButton.currentStyle.display !== "none" : getComputedStyle(mobileButton, null).display !== "none";
  }
  
  function resetCollapse(){
    collapse_styles = {
      display: '',
      height: ''
    }
    $('.subnav-section').css(collapse_styles);
  }
  
  function resetHidden() {
    setTimeout(function(){
      collapse_styles = {
        display: 'none',
        height: 'auto'
      }
      $('.subnav-section:not(.show)').css(collapse_styles);
    },  1000);
  }
  
  function setupSlick(parentSelector) {
    console.debug("In setupSlick", parentSelector)
    slickGallery(parentSelector + " .slick-single-image", parentSelector + " .slider-captions");
    slickCaption(parentSelector + " .slider-captions", parentSelector + " .slick-single-image");
  }
  
  function slickGallery(elementSelector, asNavFor){
    console.debug("In slickGallery", elementSelector, asNavFor)
    $(elementSelector).slick({
      asNavFor: asNavFor,
      dots: true,
      draggable: true,
      fade: true,
      infinite: true,
      lazyLoad: 'progressive',
      mobileFirst: true,
    });
  }
  
  function slickCaption(elementSelector, asNavFor){
    $(elementSelector).slick({
      //accessibility: false,
      arrows: false,
      asNavFor: asNavFor,
      autoplay: false,
      dots: false,
      fade: true,
      lazyLoad: 'anticipated',
      slidesToShow: 1,
      slidesToScroll: 1,
    });
  }
  
  function showSection(target){
    $('.subnav-section.show').removeClass('show');
    $(target).addClass('show');
  }
  
  function sliderHint (){
    //AFTER DOM LOADS, CREATE ELEMENT INSIDE THE SLIDER HANDLE (GENERATED BY JQUERY SLIDER UI), ANIMATE THE ELEMENT AS USER HINT FOR SLIDER.
    var tl = new TimelineMax({ repeat: 4, repeatDelay: 1 });
  
    window.addEventListener("DOMContentLoaded", function () {
      $('.ui-slider-handle').append('<div id="user-hint"><img src="/assets/home-about/user-hint-b111d5cfd3723839f9d543bf888602c2319a6cacb638a5d5aa2cbee289325525.svg" alt=""/></div>');
  
      function userHint() {
        tl.fromTo("#user-hint", 2.5, { scaleX: 0, scaleY: 0 }, { scaleX: 2, scaleY: 2, opacity: 0, ease: Power4.easeInOut });
      }
  
      userHint();
    }, false);
  
    //KILL ANIMATION AND HIDE USER HINT  UPON USER INTERACTION
    var sliderContainer = document.querySelector('.slider-container');
    sliderContainer.addEventListener("mouseenter", function (event) {
      TweenMax.to("#user-hint", 1, { opacity: 0 });
      tl.kill();
    });
  }
  
  function toggleMobileNavButton(){
    $('.mobile-sub-nav').toggleClass("activeBtn");
  }