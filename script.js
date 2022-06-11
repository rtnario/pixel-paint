let vh = window.innerHeight * 0.01;
let vw = window.innerWidth * 0.01;
let vmin = vh < vw ? vh : vw;

document.documentElement.style.setProperty('--vh', `${vmin}px`);
