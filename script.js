//alert("صلي علي النبي")
let saturate=document.getElementById("saturate")
let contrast=document.getElementById("contrast")
let brightness=document.getElementById("brightness")
let sepia=document.getElementById("sepia")
let grayscale=document.getElementById("grayscale")
let blur=document.getElementById("blur")
let huerotate=document.getElementById("hue-rotate")

let upload=document.getElementById("upload")
let download=document.getElementById("download")
let img=document.getElementById("img")
let reset=document.querySelector("span")
let imgBox=document.querySelector(".img-box")

let filters=document.querySelectorAll("ul li input")

const canvas=document.getElementById("canvas")
const ctx=canvas.getContext('2d')
window.onload=()=>{
    reset.style.display="none"
    download.style.display="none"
    imgBox.style.display="none"
}
//reset button
function restart(){
    img.style.filter='none'
    saturate.value='100'
    contrast.value='100'
    brightness.value='100'
    sepia.value='0'
    grayscale.value='0'
    blur.value='0'
    huerotate.value='0'
    filters.forEach((filter)=>{
            ctx.filter=`
            saturate(${100}%)
            contrast(${100}%)
            brightness(${100}%)
            sepia(${0})
            grayscale(${0})
            blur(${0})
            hue-rotate(${0})
           `
           ctx.drawImage(img,0,0,canvas.width,canvas.height)
       
    })
}
//button upload
upload.onchange=()=>{
    restart()
    reset.style.display="block"
    download.style.display="block"
    imgBox.style.display="block"
    //import local img 
    let file=new FileReader()
    file.readAsDataURL(upload.files[0])
    file.onload=()=>{
        img.src=file.result
    }
    img.onload=()=>{
        canvas.width=img.width
        canvas.height=img.height
        ctx.drawImage(img,0,0,canvas.width,canvas.height)
        img.style.display="none"
    }
     
}
//filter img

filters.forEach((filter)=>{
    filter.addEventListener('input',function(){
        
        ctx.filter=`
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${huerotate.value}deg)
       `
       ctx.drawImage(img,0,0,canvas.width,canvas.height)
    })
})
//function to download
download.onclick=()=>{
    download.href=canvas.toDataURL()
}