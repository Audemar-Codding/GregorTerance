
// Pour gérer le changement de texte dynamique dans le header
let headerText = document.querySelector('.header-p-desc')

let headerTextValues = ["PHOTOS","VIDEOS","TABLEAUX", "BIJOUX"]

let index= 0;
let updateHeaderText = () => {
    index = (index + 1) % headerTextValues.length;
    headerText.textContent = headerTextValues[index];
}

setTimeout(() => { updateHeaderText() ;setInterval(updateHeaderText, 2500)},1250)



// pour gérer le drop et les anim de sections
let imgdrop = document.getElementById('img-drop-circle');
const sectionPhotos = document.getElementById('section-photos');
// photos
let sectionPhotosAnim = false;
let sectionPhotosShapes = sectionPhotos.querySelectorAll('.img-photo-shape');
// tableaux
let sectionTableauxChange = false;
let tableauImg = ["img-tableau-01.png","img-tableau-02.png","img-tableau-03.png"]
const sectionTableaux = document.getElementById('section-tableaux');
let sectionTableauxImg = sectionTableaux.querySelectorAll(" div > img");
// bijoux
let sectionBijouxShake = false;
const sectionBijoux = document.getElementById("section-bijoux");
const sectionBijouxImg = sectionBijoux.querySelectorAll("img:not(.img-stalactite)");


function checkIntersection() {
    let sectionPhotosRect = sectionPhotos.getBoundingClientRect();
    let sectionTableauxRect = sectionTableaux.getBoundingClientRect();
    let sectionBijouxRect = sectionBijoux.getBoundingClientRect();
    const imgRect = imgdrop.getBoundingClientRect();

if (imgRect.bottom >= sectionPhotosRect.top && imgRect.bottom <= sectionPhotosRect.bottom ) {
    
    if(!sectionPhotosAnim) {    
    sectionPhotosShapes.forEach(element => {
        element.style.animation = "none";
        element.offsetHeight; 
        element.style.animation = "SectionPhotosAnim 0.5s";});
        sectionPhotosAnim = true;}

}else{if(sectionPhotosAnim){sectionPhotosAnim= false}}

if (imgRect.bottom >= sectionTableauxRect.top && imgRect.bottom <= sectionTableauxRect.bottom ) {
    if(!sectionTableauxChange){
    tableauImg.unshift(tableauImg.pop());
    sectionTableauxImg.forEach( (element,index) => {
        element.src = "assets/pictures/" + tableauImg[index];
    });
    sectionTableauxChange = true;}
    
}else{if(sectionTableauxChange){sectionTableauxChange= false}}

if (imgRect.bottom >= sectionBijouxRect.top && imgRect.bottom <= sectionBijouxRect.bottom ) {
    if(!sectionBijouxShake){
    
        sectionBijouxImg.forEach( element => {
        element.style.animation = "none";
        element.offsetHeight; 
        element.style.animation = "SectionBijouxAnim 0.5s linear";
    });
    sectionBijouxShake = true;}
    
}else{if(sectionBijouxShake){sectionBijouxShake= false}}



requestAnimationFrame(checkIntersection);
}
requestAnimationFrame(checkIntersection);


imgdrop.addEventListener('animationend', () => {
    imgdrop.style.transition = "transform 5s ease-out, right 5s ease-in";
    imgdrop.style.transform = `translate(-50%, ${document.documentElement.scrollHeight-272-imgdrop.naturalHeight}px)`;
    imgdrop.style.right = "50%";
});

imgdrop.addEventListener('transitionend', () => {
    imgdrop.style.transition = "transform 0s";
    imgdrop.style.transform = 'translate(0, 0)';
    imgdrop.style.right = "16.5rem";
    imgdrop.style.top = "14rem";
    imgdrop.style.animation = 'none';
    imgdrop.offsetHeight;
    imgdrop.style.animation = null; 
    imgdrop.style.animation = "dropFall 5s ease-in";
});



