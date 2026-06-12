const text = "양준섭 | Exhibition Planner";

const typing = document.getElementById("typing");

let i = 0;

function typeWriter(){

    if(i < text.length){

        typing.innerHTML += text.charAt(i);

        i++;

        setTimeout(typeWriter,100);
    }
}

typeWriter();

setInterval(()=>{

    const leaf = document.createElement("div");

    leaf.classList.add("leaf");

    leaf.style.left = Math.random()*100 + "vw";

    document.body.appendChild(leaf);

    setTimeout(()=>{
        leaf.remove();
    },10000);

},500);
