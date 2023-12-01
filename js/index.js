`use strict`

const videoCortinilla = document.querySelector(`.main__video`)
const mainSite = document.querySelector(`.main`)

let videoEnd = ()=>{
    videoCortinilla.style.display = `none`
    mainSite.classList.add(`isVisible`)
}
let videoPlay = ()=>{
    videoCortinilla.play()
    videoCortinilla.addEventListener(`ended`, videoEnd )
}

// window.addEventListener(`DOMContentLoaded`, videoPlay)

videoCortinilla.addEventListener('loadedmetadata', videoPlay)
window.addEventListener('DOMContentLoaded', () => {
    videoCortinilla.load();
})

// setTimeout(()=>{
//     mainSite.classList.add(`isVisible`)
// }, 100)

// background change

const backgroundContainer = document.querySelector(`.bg__container`)

let bgColor = ()=>{
    if(sectionContador === 2){
        backgroundContainer.classList.remove(`isBlue`)
        backgroundContainer.classList.remove(`isPurple`)
    
        backgroundContainer.classList.add(`isGranade`)
    }else if(sectionContador === 3){
        backgroundContainer.classList.remove(`isGranade`)
        backgroundContainer.classList.remove(`isBlack`)
    
        backgroundContainer.classList.add(`isPurple`)
    }else if(sectionContador === 4 || sectionContador === 0){
        backgroundContainer.classList.remove(`isBlue`)
        backgroundContainer.classList.remove(`isPurple`)
        backgroundContainer.classList.remove(`isGranade`)
    
        backgroundContainer.classList.add(`isBlack`)
    }else if(sectionContador === 1 || sectionContador === 5){
        backgroundContainer.classList.remove(`isBlack`)
        backgroundContainer.classList.remove(`isGranade`)
        
        backgroundContainer.classList.add(`isBlue`)
    }
}

// carrousel behaviour

const mainWrapper = document.querySelector(`.main__wrapper`)


let sectionLength = 6
let sectionContador = 1
let hasScroll = false

let mouseMoveNegativo = ()=>{
    sectionContador--
    
    if(sectionContador <= 0){
        
        setTimeout(()=>{
            mainWrapper.classList.add(`isTransition`)
            mainWrapper.classList.add(`isStart`)
            sectionContador = 4
            wrapperMove()
            
        }, 500)
        
        mainWrapper.classList.remove(`isTransition`)
    }else{
        
        mainWrapper.classList.remove(`isTransition`)
        // mainWrapper.classList.remove(`isStart`)
        // mainWrapper.classList.remove(`isTransition`)
    }
}
let mouseMovePositivo = ()=>{
    sectionContador++
    
    if(sectionContador >= 5){
        
        setTimeout(()=>{
            mainWrapper.classList.add(`isTransition`)
            mainWrapper.classList.add(`isFinal`)
            sectionContador = 1
            wrapperMove()
        }, 500)
         
        mainWrapper.classList.remove(`isTransition`)
    }else{
        

        mainWrapper.classList.remove(`isTransition`)
        
        
    }
}

let wrapperMove = ()=>{
    mainWrapper.style.transform = `translateX(-${(100/sectionLength) * sectionContador}%)`
    bgColor()
}
let wheelEventListener = e =>{

    e.preventDefault()

    let mouseMove = e.deltaY
    
    if(hasScroll) return 
    
    hasScroll = true
    
    if(mouseMove > 0){
        
       mouseMovePositivo()
    
    }else if(mouseMove < 0) {
        
        mouseMoveNegativo()
    
    }
    
    wrapperMove()
    
    setTimeout(()=>{
        hasScroll = false
    }, 500)
    
    console.log(e.deltaY)
    console.log(sectionContador)
}

mainWrapper.addEventListener(`wheel`, wheelEventListener )

// draggable for tablets

let touchStartX = 0;
let touchEndX = 0;

mainWrapper.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

mainWrapper.addEventListener('touchend', (e) => {
  
    touchEndX = e.changedTouches[0].clientX;
  
  let touchDiff = touchEndX - touchStartX;

  if (Math.abs(touchDiff) > 20) {
    let delta = touchDiff > 0 ? 1 : -1;

    console.log(delta)

    if (delta > 0) {
        mouseMoveNegativo()
    }else if (delta < 0){
        mouseMovePositivo()
    }

    wrapperMove();
  }
})

// buttons landing

const buttonsLanding = document.querySelectorAll(`.li__button`)

buttonsLanding.forEach((eachButton , i)=>{
    
    buttonsLanding[i].addEventListener(`click`, ()=>{
    if(i === 0){
        sectionContador = 2
        wrapperMove()
    }else if(i === 1){
        sectionContador = 3
        wrapperMove()
    }else if( i === 2){
        sectionContador = 4
        wrapperMove()
    }
    })
    
})

//---------------------------------------------------------------------
const productButton = document.querySelectorAll(`.product__button`)
const textDescription = document.querySelectorAll(`.texts__description`)

let contador = 0

productButton.forEach((eachButton, i)=>{
    productButton[i].addEventListener(`click`, ()=>{
        contador = i
        productButton.forEach((eachButton,i)=>{
            productButton[i].classList.remove('isGold')
            
        })
        productButton[i].classList.add('isGold')

        textDescription.forEach((eachDescription, i)=>{
            textDescription[i].classList.remove(`isActive`)
        })

        textDescription[contador].classList.toggle(`isActive`)
        
    })
})

// -------------------------------------------------------------------------




// if (window.screen.width < 780) {
//     mainWrapper.removeEventListener(`wheel`, wheelEventListener)
//   }
