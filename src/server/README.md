## Server Use

The minification should either follow a set standard so that browsers eventually have the chance to comply, or a javascript file should be included that allows the browser to verify the hash and signature programmitically. This project is attempting to make such resources available.

``` html
<nav class="HashTML">
	nav {
		--background-color: black;
		--text-color: white;
	}
	<ul>
		<li id="home">Home</li>
		<li id="about">About</li>
		<li id="contact">Contact</li>
	</ul>
</nav>
```

### Step 1 Remove textContent

``` html
<nav class="HashTML">
	nav {
		--background-color: black;
		--text-color: white;
	}
	<ul>
		<li id="home"></li>
		<li id="about"></li>
		<li id="contact"></li>
	</ul>
</nav>
```

### Step 2 Remove Variables

``` html
<nav class="HashTML">
	nav {
	}
	<ul>
		<li id="home"></li>
		<li id="about"></li>
		<li id="contact"></li>
	</ul>
</nav>
```

Because we are including CSS and Javascript content as part of the hash, with the exception of variables, we can also take out the id and classes.

### Step 3 Remove Empty CSS Tags, ids, classes

``` html
<nav class="HashTML">
	<ul>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</nav>
```

### Step 4 Pass through html-minifier

``` html
<nav id=HashTML><ul><li><li><li></ul></nav>
```

### Step 5 InnerHTML is extracted from the parent component.

Building the template on the server side:
``` javascript
let elems = document.querySelector(".HashTML")
for(elem in elems){
	let inner = elem.innerHTML
	let hash = inner.hash("sha256")
	let signature = privateKey.sign(hash)
	elem[integrity=hash]
	elem[signature=signature]	
}
```

The resulting html component:
``` html
<nav class="HashTML" integrity="f3bd8e3a82b..." signature="4ubkf7..."><ul><li></li><li></li><li></li></ul></nav>
```

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
