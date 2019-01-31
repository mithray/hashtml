Verifying the hash and signature on client side could either produce an alert on failing to load, silently fail to load the resource, or could provide a fallback:

``` javascript
let elem = document.querySelector("#HashTML")
let inner = minify(elem.innerHTML)
let hash = inner.hash("sha256")

if(hash !== elem[integrity]){
	alert('webpage has been compromised!')
}

let verified = verify(hash, signature)
if(verified !== true){
	alert('webpage has been compromised!')
}
```
