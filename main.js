function goTo(element_id) {  
    const REM_IN_PIXELS = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const TARGET = element_id === "top" ? 0 : document.getElementById(element_id).offsetTop - (REM_IN_PIXELS * 9)

    window.scrollTo({
        top: TARGET,
        behavior: 'smooth'
    })
}

function openNavbarDrawer() {
    let x = document.getElementById("navbarLinks")
    if (x.style.display === "flex") {
        x.style.display = "none"
    } else {
        x.style.display = "flex"
    }
}