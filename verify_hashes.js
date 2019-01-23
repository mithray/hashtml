let elem = document.querySelector("#hashme")
let inner = minify(elem.innerHTML)
let hash = inner.hash("sha256")

if(hash !== elem[integrity]){
    alert('webpage has been compromised!')
}

let verified = verify(hash, signature)
if(verified !== true){
    alert('webpage has been compromised!')
}

