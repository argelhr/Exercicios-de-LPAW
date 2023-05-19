import { init } from './game.js'

// window.addEventListener("load", init, false)
let botao = document.querySelector("#start")
// console.log('aqui foi')
botao.addEventListener('click', init,false)
// console.log('fez o evento')