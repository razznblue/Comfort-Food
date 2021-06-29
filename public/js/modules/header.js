const burger = document.querySelector(".burger");
const lines = burger.childNodes;

const burgerNav = document.querySelector(".burger-nav");

// Burger Animation
let burgerToggled = false;
if (burger) {
    burger.addEventListener("click", () => {
        if (!burgerToggled) {
            burgerToggled = true;
            burger.classList.add("move-down");
            addClasses(lines);
            lines[1].classList.add("line1-anim");
            lines[3].style.opacity = "0"; 
            lines[3].style.display = "none"; 
            lines[5].classList.add("line3-anim");  
            showBurgerNav(); 
        } else {
            burgerToggled = false;
            burger.classList.remove("move-down");
            removeClasses(lines);
            lines[1].classList.remove("line1-anim");
            lines[5].classList.remove("line3-anim");      
            setTimeout(() => { lines[3].style.display = "block"; }, 300);
            setTimeout(() => { lines[3].style.opacity = "1" }, 300);
            hideBurgerNav();
        }
    });
}

const addClasses = (lines) => {
    for (let i = 0; i < lines.length; i++) {
        if (i === 1 || i === 3 || i === 5) {
            lines[i].classList.add("change-color");
        }
    }
}
const removeClasses = (lines) => {
    for (let i = 0; i < lines.length; i++) {
        if (i === 1 || i === 3 || i === 5) {
            lines[i].classList.remove("change-color");
        }
    }
}

const showBurgerNav = () => {
    burgerNav.style.zIndex = "1";
    burgerNav.style.opacity = "1";
}
const hideBurgerNav = () => {
    burgerNav.style.zIndex = "-1";
    burgerNav.style.opacity = "0";
}




