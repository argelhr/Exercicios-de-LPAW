
let key;

function keyPress(element){
    element.addEventListener('keydown',event=>{
        key = event.code
    })
}

export {keyPress, key}