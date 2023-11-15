let list = document.querySelector('.list-item');
let items = document.querySelectorAll('.ban-item');
let dots = document.querySelectorAll('.dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let numItem = items.length - 1;

next.onclick = function(){
    if(active + 1 > numItem){
        active=0;
    }else{  
        active+=1;
    }
    reloadSliderNext();
}
prev.onclick = function(){
    if(active -1 < 0){
        active=numItem;
    }else{      
        active-=1;
    }
    reloadSliderPrev();
}

let refreshSlide = setInterval(()=> { next.click ()}, 5000);

function reloadSliderPrev(){
    let checkLeft= items[active].offsetLeft;
    if(active + 1 > numItem){
        list.style.left= -checkLeft + 250 +'px';
    }else{  
        list.style.left= -checkLeft +'px';
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
    semiActive.forEach((div, key)=>{
        div.classList.remove('semi-active')
    })
    
    clearInterval(refreshSlide);
    refreshSlide = setInterval(()=> { next.click ()}, 5000);
}
function reloadSliderNext(){
    let checkLeft= items[active].offsetLeft;
    
    if(active -1 < 0){  
        list.style.left= -checkLeft +'px';
    }else{      
        
        list.style.left= -checkLeft+ 250 +'px';
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
    semiActive.forEach((div, key)=>{
        div.classList.remove('semi-active')
    })
    if(active+2 >numItem){

    }

    clearInterval(refreshSlide);
    refreshSlide = setInterval(()=> { next.click ()}, 5000);
}
dots.forEach((li, key)=>{
    li.addEventListener('click', function(){
        if(key-1<0){
            active = key;
            reloadSliderPrev();
        }else{
            active = key;
            reloadSliderNext();
        }
    })
})