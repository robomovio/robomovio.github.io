
document.addEventListener("DOMContentLoaded", () => {
    //Add toggle functionality to sections
    document.querySelectorAll(".indent").forEach(section => {
        const heading = section.previousElementSibling;

        // Check if it's a heading (h1–h6)
        if (heading && /^H[1-6]$/.test(heading.tagName)) {
            heading.style.display = 'flex';
            heading.style.alignItems= 'center';
            const toggle = document.createElement("i");
            toggle.style.marginRight = '5px';
            const isCollapsed = section.classList.contains("collapse");
            toggle.classList = "fa fa-fw fa-caret-" + (isCollapsed ? "right" : "down");
            toggle.title = isCollapsed ? "Expand" : "Collapse";

            toggle.addEventListener("click", () => {
                section.classList.toggle("collapse");
                const isCollapsed = section.classList.contains("collapse");
                toggle.classList = "fa fa-fw fa-caret-" + (isCollapsed ? "right" : "down");
                toggle.title = isCollapsed ? "Expand" : "Collapse";
            });

            heading.prepend(toggle);
        }
    });

    //Display the alt text under an image
    document.querySelectorAll(".img").forEach(image => {
        const alt = image.getAttribute('alt');
        if (alt && image.getAttribute('src')) {
            const caption = document.createElement('div');
            caption.textContent = alt;
            caption.className = 'img-caption';
            image.after(caption);
        }
    });
});