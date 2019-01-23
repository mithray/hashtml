let elems = document.querySelector(".HashTML")

for(elem in elems){
    let inner = elem.innerHTML
    let hash = inner.hash("sha256")
    let signature = privateKey.sign(hash)
    elem[integrity=hash]
    elem[signature=signature]   
}

