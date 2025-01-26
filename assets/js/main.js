"use strict";
var x, y;
const imgContent = document.querySelectorAll(".gallery__image__caption");
function showImgContent(e) {
  for (var t = 0; t < imgContent.length; t++)
    (x = e.pageX),
      (y = e.pageY),
      (imgContent[t].style.transform = `translate(${x}px, ${y}px)`);
}
document.addEventListener("mousemove", showImgContent);
const body = document.body,
  items = document.querySelectorAll(".gallery__item"),
  modal = document.createElement("section"),
  modalImg = document.createElement("img"),
  modalPrev = createButton(prevItem),
  modalNext = createButton(nextItem),
  modalClose = createButton(closeModal);
let currentItem = 0,
  modalInstance;
function createButton(e) {
  let t = document.createElement("button");
  return t.addEventListener("click", e), t;
}
function prevItem() {
  (currentItem = (currentItem - 1 + items.length) % items.length), showModal();
}
function nextItem() {
  (currentItem = (currentItem + 1) % items.length), showModal();
}
function closeModal() {
  modal.remove();
}
function showModal() {
  (modalImg.image = items[currentItem].querySelector("img")),
    (modalImg.src = modalImg.image.src),
    (modalImg.alt = modalImg.image.alt),
    modal.append(modalImg, modalPrev, modalNext, modalClose),
    document.body.appendChild(modal);
}
modal.classList.add("gallery__modal"),
  modalPrev.classList.add("gallery__navigation--prev"),
  modalNext.classList.add("gallery__navigation--next"),
  modalClose.classList.add("gallery__navigation--close"),
  items.forEach(function (e) {
    e.addEventListener(
      "click",
      function () {
        var e = "gallery__item" === this.className;
        e && (modalInstance = this),
          modal.setAttribute("aria-hidden", !e),
          body.classList.toggle("noscroll", e),
          showModal(),
          (modal.scrollTop = 0),
          e ? modal.focus() : (modalInstance.focus(), (modalInstance = null));
      },
      !1
    );
  }),
  document.body.addEventListener("keyup", (e) => {
    "Escape" === e.key &&
      "false" === modal.getAttribute("aria-hidden") &&
      (modal.setAttribute("aria-hidden", "true"),
      body.classList.toggle("noscroll", !1),
      modalInstance.focus(),
      (modalInstance = null));
  }),
  (function () {
    function e() {
      let e = document.querySelector("body"),
        t = document.querySelector("#header");
      (t.classList.contains("scroll-up-sticky") ||
        t.classList.contains("sticky-top") ||
        t.classList.contains("fixed-top")) &&
        (window.scrollY > 100
          ? e.classList.add("scrolled")
          : e.classList.remove("scrolled"));
    }
    document.addEventListener("scroll", e), window.addEventListener("load", e);
    let t = document.querySelector(".mobile-nav-toggle");
    function l() {
      document.querySelector("body").classList.toggle("mobile-nav-active"),
        t.classList.toggle("bi-list"),
        t.classList.toggle("bi-x");
    }
    t.addEventListener("click", l),
      document.querySelectorAll("#navmenu a").forEach((e) => {
        e.addEventListener("click", () => {
          document.querySelector(".mobile-nav-active") && l();
        });
      }),
      document.querySelectorAll(".navmenu .toggle-dropdown").forEach((e) => {
        e.addEventListener("click", function (e) {
          e.preventDefault(),
            this.parentNode.classList.toggle("active"),
            this.parentNode.nextElementSibling.classList.toggle(
              "dropdown-active"
            ),
            e.stopImmediatePropagation();
        });
      });
    let o = document.querySelector("#preloader");
    o &&
      window.addEventListener("load", () => {
        o.remove();
      });
    let a = document.querySelector(".scroll-top");
    function n() {
      a &&
        (window.scrollY > 100
          ? a.classList.add("active")
          : a.classList.remove("active"));
    }
    a.addEventListener("click", (e) => {
      e.preventDefault(), window.scrollTo({ top: 0, behavior: "smooth" });
    }),
      window.addEventListener("load", n),
      document.addEventListener("scroll", n),
      window.addEventListener("load", function e() {
        AOS.init({
          duration: 600,
          easing: "ease-in-out",
          once: !0,
          mirror: !1,
        });
      }),
      new PureCounter(),
      GLightbox({ selector: ".glightbox" }),
      window.addEventListener("load", function e() {
        document.querySelectorAll(".init-swiper").forEach(function (e) {
          let t = JSON.parse(
            e.querySelector(".swiper-config").innerHTML.trim()
          );
          e.classList.contains("swiper-tab")
            ? initSwiperWithCustomPagination(e, t)
            : new Swiper(e, t);
        });
      }),
      document
        .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
        .forEach((e) => {
          e.addEventListener("click", () => {
            e.parentNode.classList.toggle("faq-active");
          });
        });
  })();
