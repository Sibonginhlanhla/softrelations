/**
 * Global javascript
 * link to all templates/html
 */

document.addEventListener('DOMContentLoaded',()=>{
    // active state for nav links
    document.querySelectorAll(
        `a[href="${location.pathname}"].nav-link`).forEach(a => {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
    })
})