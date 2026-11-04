(function () {
  "use strict";
  var root = document.documentElement;
  var mq = window.matchMedia("(max-width: 768px)");
  var btn = document.getElementById("menu-toggle");
  var drawer = document.getElementById("drawer");
  function setOpen(open) {
    if (!btn || !drawer) { return; }
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    drawer.classList.toggle("open", open);
    root.classList.toggle("drawer-open", open);
    root.style.overflow = open ? "hidden" : "";
  }
  if (btn && drawer) {
    btn.addEventListener("click", function () { setOpen(btn.getAttribute("aria-expanded") !== "true"); });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) { setOpen(false); } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { setOpen(false); btn.focus(); } });
    var onChange = function () { if (!mq.matches) { setOpen(false); } };
    if (mq.addEventListener) { mq.addEventListener("change", onChange); } else { mq.addListener(onChange); }
  }
  var qs = document.querySelectorAll(".faq-q");
  Array.prototype.forEach.call(qs, function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq-item");
      var ans = document.getElementById(q.getAttribute("aria-controls"));
      var open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", open ? "false" : "true");
      item.classList.toggle("open", !open);
      ans.style.maxHeight = open ? "0px" : ans.scrollHeight + "px";
    });
  });
  var fab = document.getElementById("fab");
  var foot = document.querySelector(".site-footer");
  if (fab && foot && "IntersectionObserver" in window) {
    new IntersectionObserver(function (en) {
      fab.classList.toggle("fab-hide", en[0].isIntersecting);
    }, { threshold: 0 }).observe(foot);
  }
})();
