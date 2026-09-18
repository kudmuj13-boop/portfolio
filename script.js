const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");
const cursor = document.querySelector(".cursor-glow");

menu.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.14 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle(
        "active", link.getAttribute("href") === "#" + entry.target.id
      ));
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });

sections.forEach(section => sectionObserver.observe(section));

window.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    if (window.innerWidth < 850) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    card.style.transform = `perspective(900px) rotateX(${y * -3}deg) rotateY(${x * 3}deg) translateY(-6px)`;
  });
  card.addEventListener("mouseleave", () => card.style.transform = "");
});
