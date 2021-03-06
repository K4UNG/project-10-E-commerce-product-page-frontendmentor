const menu = document.querySelector('.menu');
const menuClose = document.querySelector('.menu-close');
const nav = document.querySelector('nav');
const filter = document.querySelector('.filter');
const back = document.querySelector('.previous');
const next = document.querySelector('.next');
let photo = document.querySelector('.photo');
const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
let quantity = document.querySelector('.quantity');
const cartBtn = document.querySelector('.cart-btn');
const cart = document.querySelector('.cart');
let popup = document.querySelector('.popup');
const add = document.querySelector('.add');
let curr = document.querySelector('#curr');
let cartItem = document.querySelector('.cart-item');
const clear = document.querySelector('.remove');
const checkout = document.querySelector('.checkout');
let multiple = document.querySelector('#amount');
let final = document.querySelector('.total');
const thumbs = document.querySelectorAll('.thumb');
const box = document.querySelector('.box');
const closePop = document.querySelector('.close-pop');
let photoPop = document.querySelector('.photo-pop');
const nextPop = document.querySelector('.next-pop');
const previousPop = document.querySelector('.previous-pop');
const thumbsPop = document.querySelectorAll('.thumb-pop');

addItem(localStorage.getItem('quantity'));

clear.onclick = () => {
    addItem(0);
    localStorage.setItem('quantity', 0);
}

checkout.onclick = () => {
    addItem(0);
    localStorage.setItem('quantity', 0);
}

menu.onclick = () => {
    nav.classList.add('shown');
    filter.style.opacity = 1;
    filter.style['pointer-events'] = 'all';
}

menuClose.onclick = () => {
    nav.classList.remove('shown');
    filter.style.opacity = 0;
    filter.style['pointer-events'] = 'none';
}

back.onclick = () => {
    let left = back.dataset.dest;
    let right = next.dataset.dest;

    left--;
    right--;

    left = (left == 0 ? 4 : left);
    right = (right == 0 ? 4 : right);
    photo.setAttribute('src', `images/image-product-${back.dataset.dest}.jpg`);

    back.setAttribute('data-dest', left);
    next.setAttribute('data-dest', right);
}

next.onclick = () => {
    let left = back.dataset.dest;
    let right = next.dataset.dest;

    left++;
    right++;

    left = (left == 5 ? 1 : left);
    right = (right == 5 ? 1 : right);
    photo.setAttribute('src', `images/image-product-${next.dataset.dest}.jpg`);

    back.setAttribute('data-dest', left);
    next.setAttribute('data-dest', right);
}

minus.onclick =  () => {
    let amount = quantity.textContent;
    if (amount != 0) {
        amount--;
        quantity.textContent = amount;
    }
}

plus.onclick = () => {
    let amount = quantity.textContent;
    amount++;
    quantity.textContent = amount;
}

cartBtn.onclick = () => {
    cart.classList.toggle('active');
    popup.classList.toggle('popup-shown');
    if (popup.classList.contains('popup-shown')) {
        clear.style['pointer-events'] = 'all';
        checkout.style['pointer-events'] = 'all';
    } else {
        clear.style['pointer-events'] = 'none';
        checkout.style['pointer-events'] = 'none';
    }
}

add.onclick = () => {
    let quan = localStorage.getItem('quantity');
    if (quan === null) {
        quan = 0;
    }
    else {
        quan = parseInt(quan);
    }
    let added = parseInt(quantity.textContent);
    if (! added <= 0) {
        quan += added;
    }
    quantity.textContent = 0;
    localStorage.setItem('quantity', quan);
    addItem(quan);
}

function addItem(quan) {
    if (quan == null) {
        quan = 0;
    } else {
        quan = parseInt(quan);
    }
    if (quan <= 0) {
        curr.style.display = 'none';
        cartItem.childNodes[3].style.opacity = '0';
        cartItem.childNodes[3].style['pointer-events'] = 'none';
    }
    else if (quan > 0) {
        curr.style.display = 'unset';
        let total = quan * 125.00;
        cartItem.childNodes[3].style.opacity = '1';
        final.textContent = `$${total}`;
        multiple.textContent = quan;

    curr.textContent = quan;
    }
}

thumbs.forEach(thumb => {
    thumb.onclick = () => {
        thumbs.forEach(thumb => {
            thumb.classList.remove('clicked');
            thumb.childNodes[0].classList.remove('clicked-img');
        });
        thumb.classList.toggle('clicked');
        thumb.childNodes[0].classList.toggle('clicked-img');
        photo.setAttribute('src', `images/image-product-${thumb.dataset.order}.jpg`)
    }
});
thumbsPop.forEach(thumb => {
    thumb.onclick = () => {
        thumbsPop.forEach(thumb => {
            thumb.classList.remove('clicked');
            thumb.childNodes[0].classList.remove('clicked-img');
        });
        thumb.classList.toggle('clicked');
        thumb.childNodes[0].classList.toggle('clicked-img');
        photoPop.setAttribute('src', `images/image-product-${thumb.dataset.order}.jpg`)
    }
});

photo.onclick = () => {
    if (screen.width > 480) {
    box.style.display = 'unset';
    let current;
    thumbs.forEach(thumb => {
        if (thumb.classList.contains('clicked')) {
            current = thumb.dataset.order;
        }
    })
    console.log(current)
    photoPop.dataset.n = current;
    photoPop.setAttribute('src', `images/image-product-${current}.jpg`);
    thumbsPop.forEach(thumb => {
        if (thumb.dataset.order == current) {
            thumb.classList.add('clicked');
            thumb.childNodes[0].classList.add('clicked-img');
        } else {
            thumb.classList.remove('clicked');
            thumb.childNodes[0].classList.remove('clicked-img');
        }
    })
    }
}

closePop.onclick = () => {
    box.style.display = 'none';
}

nextPop.onclick = () => {
    let current = parseInt(photoPop.dataset.n) + 1;
    if (current == 5) {
        current = 1;
    }
    photoPop.setAttribute('src', `images/image-product-${current}.jpg`);
    photoPop.dataset.n = current;
    thumbsPop.forEach(thumb => {
        if (thumb.dataset.order == current) {
            thumb.classList.add('clicked');
            thumb.childNodes[0].classList.add('clicked-img');
        } else {
            thumb.classList.remove('clicked');
            thumb.childNodes[0].classList.remove('clicked-img');
        }
    })
}

previousPop.onclick = () => {
    let current = parseInt(photoPop.dataset.n) - 1;
    if (current == 0) {
        current = 4;
    }
    photoPop.setAttribute('src', `images/image-product-${current}.jpg`);
    photoPop.dataset.n = current;
    thumbsPop.forEach(thumb => {
        if (thumb.dataset.order == current) {
            thumb.classList.add('clicked');
            thumb.childNodes[0].classList.add('clicked-img');
        } else {
            thumb.classList.remove('clicked');
            thumb.childNodes[0].classList.remove('clicked-img');
        }
    })
}
