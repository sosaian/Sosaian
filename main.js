function openNavbarDrawer() {
    let x = document.getElementById("navbarLinks")
    if (x.style.display === "flex") {
        x.style.display = "none"
    } else {
        x.style.display = "flex"
    }
}