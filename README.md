## HashTML

[DISCLAIMER: nothing here is actually working, it's just a spec I have started to draft, don't waste your time downloading, it's just a readme.]

Hashed and Signed Hypertext Markup Language

HashTML is a standard of secure HTML where every component of an HTML page has it's contents hashed and signed by a Public Key Infrastructure(PKI) of a contributing coding community of open source auditing coders.It follows the standard of World Wide Web Consortium's(W3C) subresource integrity for hashing the contents of external documents, but extends this standard to include signatures from the open source community and to components of HTML.

## Motivation

"But why?" 

Currently well behaving Certificate Authorities(CAs) provide evidence that a web pages resources are indeed transferred safely between the server and the client. However, this is where the security provided by these HTTPS certificates stops. They do not provide public evidence of coding standards or the security of components, only the safe transmission of code. The W3C standard stops at requiring hashes, with no signatures, which means that the hash solves a very localized problem that does not take advantage of the profound increases in web security that would be enabled by an open source repository of signed web components.

## Degrees of Security

### L1 - Partial

At this level, an HTML document will contain some hashed and/or signed external resources, a partial implementation of W3C Standards. This should at least slightly increase the security. 

### L2 - W3C Compliant

To reach this level an HTML document must meet the W3C Standards for all external resources.

### L3 - W3C Compliant & Signatures

To reach this level, an HTML document must be W3C compliant, as well as include signatures for all hashed components. The point at which multiple signatures begin being utilized is the point at which the wider open source community join together in collaborating toward improving web privacy and security.

### L4 - HashTML

To be fully compliant, an HTML document must include at minimum a hash and a signature in it's HTML tag, but any child tags of the html tag may also be signed.


## Objection!!!!

"You can't sign hash and sign HTML Tags!!!! They change all the time!!!! No webpage is identical!!!"

It's true that no web page is identical( *cough* ...bootstrap), yet HashTML will exclude `textContent` from the html tags, as well as stripping for whitespace, public standards for html minification, and strip the web component designers choice of css variables from the hash. Ultimately, it will not be a lot different from the copying of design patterns that already happens. There will be less flexibilty in changing components, but you your components can be signed in a build step and a single signature for the whole document is sufficient to meet the recommendation.

## Component Verification

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
<nav class="hashme">
	<ul>
		<li></li>
		<li></li>
		<li></li>
	</ul>
</nav>
```

### Step 4 Pass through html-minifier

``` html
<nav id=hashme><ul><li><li><li></ul></nav>
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
```
HashTML is a new way to sign HTML Elements/Components that verify with a hash that that section of html has been hashed and signed as secure and is compliant with arbitrary standards. As it is possible for arbitrary user code to manipulate the DOM, the entire DOM would need to be signed in order to guarantee compliance. 
