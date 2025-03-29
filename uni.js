//sticky header//
const header = document.querySelector("header");
window.addEventListener("scroll",()=>{
    header.classList.toggle("sticky",window.scrollY > 50)
})

// active scorll nenu
const liLink = document.querySelectorAll("header ul li a")
const section = document.querySelectorAll("section")
function activeMenu(){
    let secLength = section.length;
    while(--secLength && window.scrollY + 500 < section[secLength].offsetTop){}
    liLink.forEach(sec =>sec.classList.remove("active"));
    liLink[secLength].classList.add("active");

}
activeMenu()
window.addEventListener("scroll",activeMenu);



const menuIcon = document.querySelector("#menu-icon");
const navlist = document.querySelector(".navlist");

menuIcon.onclick = () =>{
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open")
}
//remove menu list 
window.onscroll = () =>{
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open")
}

