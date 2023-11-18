let list = document.querySelector('.list-item');
let items = document.querySelectorAll('.ban-item');
let dots = document.querySelectorAll('.dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let numItem = items.length - 1;

var isAuthenticated = document.querySelector('[data-isAuthenticated]').getAttribute('data-isAuthenticated');

if (isAuthenticated === 'true') {
    localStorage.setItem('isAuthenticated', 'true');
}else{
    localStorage.setItem('isAuthenticated', 'false');
}
function setAuFalse(){
}

let gBodyShow = document.getElementById("g1");
gBodyShow.style.display = "block";

next.onclick = function () {
    if (active + 1 > numItem) {
        active = 0;
        var idShow = "g1";
        var idHide = "g" + (numItem + 1);
        let gameBodyShow = document.getElementById(idShow);
        let gameBodyHide = document.getElementById(idHide);
        gameBodyShow.style.display = "block";
        gameBodyHide.style.display = "none";
    } else {
        active += 1;
        var idShow = "g" + (active + 1);
        var idHide = "g" + active;
        let gameBodyShow = document.getElementById(idShow);
        let gameBodyHide = document.getElementById(idHide);
        gameBodyShow.style.display = "block";
        gameBodyHide.style.display = "none";
    }
    reloadSliderNext();
}
prev.onclick = function () {
    if (active - 1 < 0) {
        active = numItem;
        var idShow = "g" + (numItem + 1);
        var idHide = "g1";
        let gameBodyShow = document.getElementById(idShow);
        let gameBodyHide = document.getElementById(idHide);
        gameBodyShow.style.display = "block";
        gameBodyHide.style.display = "none";
    } else {
        active -= 1;
        let bdActive = active + 1;
        var idShow = "g" + bdActive;
        var idHide = "g" + (bdActive + 1);
        console.log(idShow)
        console.log(idHide)
        let gameBodyShow = document.getElementById(idShow);
        let gameBodyHide = document.getElementById(idHide);
        gameBodyShow.style.display = "block";
        gameBodyHide.style.display = "none";
    }
    reloadSliderPrev();
}

let refreshSlide = setInterval(() => { next.click() }, 5000);

function reloadSliderPrev() {
    let checkLeft = items[active].offsetLeft;
    if (active + 1 > numItem) {
        list.style.left = -checkLeft + 250 + 'px';
    } else {
        list.style.left = -checkLeft + 'px';
    }
    let lastActiveDot = document.querySelector('.dots li.active')
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');

    let semiActive = document.querySelectorAll('.semi-item');
    let lastActiveItem = document.querySelector('.ban-item.item-active');


    lastActiveItem.classList.remove('item-active');
    lastActiveItem.classList.add('semi-active')

    lastActiveItem.classList.remove('item-active');
    lastActiveItem.classList.add('semi-active')

    items[active].classList.remove('semi-active');
    items[active].classList.add('item-active');
    semiActive.forEach((div, key) => {
        div.classList.remove('semi-active')
    })

    clearInterval(refreshSlide);
    refreshSlide = setInterval(() => { next.click() }, 5000);
}
function reloadSliderNext() {
    let checkLeft = items[active].offsetLeft;

    if (active - 1 < 0) {
        list.style.left = -checkLeft + 'px';
    } else {

        list.style.left = -checkLeft + 250 + 'px';
    }

    let lastActiveDot = document.querySelector('.dots li.active')
    lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');

    let semiActive = document.querySelectorAll('.semi-item');
    let lastActiveItem = document.querySelector('.ban-item.item-active');

    lastActiveItem.classList.remove('item-active');
    lastActiveItem.classList.add('semi-active')
    items[active].classList.remove('semi-active');
    items[active].classList.add('item-active');
    semiActive.forEach((div, key) => {
        div.classList.remove('semi-active')
    })
    if (active + 2 > numItem) {

    }

    clearInterval(refreshSlide);
    refreshSlide = setInterval(() => { next.click() }, 5000);
}
dots.forEach((li, key) => {
    li.addEventListener('click', function () {
        if (key - 1 < 0) {
            active = key;
            reloadSliderPrev();
        } else {
            active = key;
            reloadSliderNext();
        }
    })
})