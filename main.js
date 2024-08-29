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

function filterProjects(project_type) {
    const buttons = Array.from(document.querySelectorAll("#projectsFilter > li > button"))

    let active = false

    buttons.forEach(button => {
        const MATCHES_TYPE = button.classList.contains(project_type)
        const IS_ACTIVE = button.classList.contains("active")

        if (MATCHES_TYPE) {
            active = IS_ACTIVE
            button.classList.toggle("active", !IS_ACTIVE)
        } else {
            button.classList.remove("active")
        }
    })

    const children = Array.from(document.getElementById("projectsList").children)
    const projects_list = document.getElementById("projectsList")
    const projects_list_previous = document.getElementById("projectsListPrevious")
    const projects_list_next = document.getElementById("projectsListNext")

    children.forEach(li => li.classList.toggle("hidden", !active && !li.classList.contains(project_type)))

    //  Manual check if the resulting ammount of items already fits inside container with no overflow

    const AT_START = projects_list.scrollLeft === 0
        
    if (projects_list_previous.disabled !== AT_START)
        projects_list_previous.disabled = AT_START

    const AT_END = Math.round(projects_list.scrollLeft) === projects_list.scrollWidth - projects_list.clientWidth

    if (projects_list_next.disabled !== AT_END)
        projects_list_next.disabled = AT_END
    }

function addProjectsFilterScrollBehavior() {
    const projects_filter = document.getElementById("projectsFilter")
    const projects_filter_previous = document.getElementById("projectsFilterPrevious")
    const projects_filter_next = document.getElementById("projectsFilterNext")
    const REM_IN_PIXELS = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const CARD_LENGTH = REM_IN_PIXELS * 9.5

    projects_filter_next.addEventListener("click", () => {
        projects_filter.scrollTo({
            left: Math.floor(projects_filter.scrollLeft / CARD_LENGTH) * CARD_LENGTH + CARD_LENGTH,
            behavior: "smooth"
        })
    })

    projects_filter_previous.addEventListener("click", () => {
        projects_filter.scrollTo({
            left: Math.ceil(projects_filter.scrollLeft / CARD_LENGTH) * CARD_LENGTH - CARD_LENGTH,
            behavior: "smooth"
        })
    })

    projects_filter.addEventListener("scroll", () => {
        const AT_START = projects_filter.scrollLeft === 0
        
        if (projects_filter_previous.disabled !== AT_START)
            projects_filter_previous.disabled = AT_START

        const AT_END = projects_filter.scrollLeft === projects_filter.scrollWidth - projects_filter.clientWidth

        if (projects_filter_next.disabled !== AT_END)
            projects_filter_next.disabled = AT_END
    })

    //  Manual check if initial ammount of items already fits inside container with no overflow
    projects_filter_next.disabled = projects_filter.scrollLeft === projects_filter.scrollWidth - projects_filter.clientWidth
}

function addProjectsListScrollBehavior() {
    const projects_list = document.getElementById("projectsList")
    const projects_list_previous = document.getElementById("projectsListPrevious")
    const projects_list_next = document.getElementById("projectsListNext")
    const REM_IN_PIXELS = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const CARD_LENGTH = REM_IN_PIXELS * 13

    projects_list_previous.addEventListener("click", () => { 
        projects_list.scrollTo({
            left: Math.ceil(projects_list.scrollLeft / CARD_LENGTH) * CARD_LENGTH - CARD_LENGTH,
            behavior: "smooth"
        })
    })

    projects_list_next.addEventListener("click", () => {
        projects_list.scrollTo({
            left: Math.floor(Math.floor(projects_list.scrollLeft / CARD_LENGTH) * CARD_LENGTH + CARD_LENGTH),
            behavior: "smooth"
        })
    })

    projects_list.addEventListener("scroll", () => {
        const AT_START = projects_list.scrollLeft === 0
        
        if (projects_list_previous.disabled !== AT_START)
            projects_list_previous.disabled = AT_START

        const AT_END = Math.round(projects_list.scrollLeft) === projects_list.scrollWidth - projects_list.clientWidth

        if (projects_list_next.disabled !== AT_END)
            projects_list_next.disabled = AT_END
    })

    //  Manual check if initial ammount of items already fits inside container with no overflow
    projects_list_next.disabled = Math.round(projects_list.scrollLeft) === projects_list.scrollWidth - projects_list.clientWidth
}

document.addEventListener("DOMContentLoaded", () => {
    addProjectsFilterScrollBehavior()
    addProjectsListScrollBehavior()
})