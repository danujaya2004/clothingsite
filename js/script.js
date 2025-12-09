(function ($) {

  "use strict";

  var initPreloader = function () {
    $(document).ready(function ($) {
      var Body = $('body');
      Body.addClass('preloader-site');
    });
    $(window).load(function () {
      $('.preloader-wrapper').fadeOut();
      $('body').removeClass('preloader-site');
    });
  }

  // background color when scroll 
  var initScrollNav = function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $('.navbar.fixed-top').addClass("bg-light");
    } else {
      $('.navbar.fixed-top').removeClass("bg-light");
    }
  }

  $(window).scroll(function () {
    initScrollNav();
  });


  // init Chocolat light box
  var initChocolat = function () {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }


  var initProductQty = function () {

    $('.product-qty').each(function () {

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        if (quantity > 0) {
          $el_product.find('#quantity').val(quantity - 1);
        }
      });

    });

  }

  // Search Functionality
  var initSearch = function () {
    var searchInput = document.querySelector('#offcanvasSearch input[type="text"]');
    var searchBody = document.querySelector('#offcanvasSearch .offcanvas-body');
    var searchForm = document.querySelector('#search-form');

    if (!searchInput || !searchBody) return;

    // Product Data
    var products = [
      { name: "Seven Zero Five", price: "$40.00", image: "images/item1.jpg", link: "single-product.html" },
      { name: "Classic Black Tee", price: "$35.00", image: "images/item1.jpg", link: "single-product.html" },
      { name: "Graphic Hoodie", price: "$55.00", image: "images/item2.jpg", link: "single-product.html" },
      { name: "Street Style Tee", price: "$40.00", image: "images/item3.jpg", link: "single-product.html" },
      { name: "Premium Hoodie", price: "$45.00", image: "images/item4.jpg", link: "single-product.html" },
      { name: "Urban Tee", price: "$38.00", image: "images/item1.jpg", link: "single-product.html" },
      { name: "Vintage Hoodie", price: "$52.00", image: "images/item2.jpg", link: "single-product.html" },
      { name: "Designer Tee", price: "$42.00", image: "images/item3.jpg", link: "single-product.html" }
    ];

    // Create Results Container
    var resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results mt-4';
    searchBody.appendChild(resultsContainer);

    // Render Items Function
    function renderItems(items, title) {
      var html = '<h5 class="text-uppercase mb-3">' + title + '</h5>';
      
      if (items.length === 0) {
        html += '<p class="text-muted">No results found.</p>';
      } else {
        html += '<ul class="list-unstyled">';
        items.forEach(function(item) {
          html += `
            <li class="d-flex align-items-center mb-3">
              <a href="${item.link}" class="d-flex align-items-center text-decoration-none text-dark">
                <img src="${item.image}" alt="${item.name}" class="rounded me-3" style="width: 50px; height: 50px; object-fit: cover;">
                <div>
                  <h6 class="mb-0">${item.name}</h6>
                  <small class="text-muted">${item.price}</small>
                </div>
              </a>
            </li>
          `;
        });
        html += '</ul>';
      }
      resultsContainer.innerHTML = html;
    }

    // Initial Recommended Results (Top 3)
    renderItems(products.slice(0, 3), 'Recommended');

    // Search Event Listener
    searchInput.addEventListener('input', function(e) {
      var term = e.target.value.toLowerCase();
      
      if (term.length === 0) {
        renderItems(products.slice(0, 3), 'Recommended');
        return;
      }

      var filtered = products.filter(function(item) {
        return item.name.toLowerCase().includes(term);
      });

      renderItems(filtered, 'Search Results');
    });

    // Prevent Form Submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }
  }

  // document ready
  $(document).ready(function () {

    // product single page
    var thumb_slider = new Swiper(".product-thumbnail-slider", {
      loop: true,
      slidesPerView: 3,
      autoplay: true,
      direction: "vertical",
      spaceBetween: 30,
    });

    var large_slider = new Swiper(".product-large-slider", {
      loop: true,
      slidesPerView: 1,
      autoplay: true,
      effect: 'fade',
      thumbs: {
        swiper: thumb_slider,
      },
    });

    window.addEventListener("load", (event) => {

      var $grid = $('.entry-container').isotope({
        itemSelector: '.entry-item',
        layoutMode: 'masonry'
      });

    });

    initPreloader();
    initChocolat();
    initProductQty();
    initSearch();

  }); // End of a document

})(jQuery);