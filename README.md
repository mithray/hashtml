# HashTML

## <a name="toc"></a> Contents

1. [Summary](#summary)
2. [Basic Use](#basic_use)
3. [Motivation](#motivation)
4. [Server Use](#server_use)
5. [Client Use](#client_use)
6. [Levels of Implementation](#levels_of_implementation)
7. [Roadmap](#roadmap)

## <a name="summary"></a>[Summary](#toc)

[DISCLAIMER: presently, I have a global function for adding hashes to components, nothing else is actually working, it's just a spec I have started to draft, it's mostly a readme.]

*Hashed and Signed Hypertext Markup Language*

HashTML is a standard of secure HTML where every component of an HTML page has it's contents hashed and signed by a Public Key Infrastructure(PKI) of a contributing coding community of open source auditing coders.It follows the standard of World Wide Web Consortium's(W3C) subresource integrity for hashing the contents of external documents, but extends this standard to include signatures from the open source community and to components of HTML.

## <a name="basic_use"></a>[Basic Use](#toc)

``` bash
npm install --global @mithray/hashtml
hashtml main.html
```

## <a name="motivation"></a>[Motivation](#toc)

### "But why?" 

Currently well behaving Certificate Authorities(CAs) provide evidence that a web pages resources are indeed transferred safely between the server and the client. However, this is where the security provided by these HTTPS certificates stops. They do not provide public evidence of coding standards or the security of components, only the safe transmission of code. The W3C standard stops at requiring hashes, with no signatures, which means that the hash solves a very localized problem that does not take advantage of the profound increases in web security that would be enabled by an open source repository of signed web components.

### Objection!!!!

"You can't sign hash and sign HTML Tags!!!! They change all the time!!!! No webpage is identical!!!"

It's true that no web page is identical( \**cough*\* ...bootstrap), yet HashTML will perform a number of operations on the HTML component before hashing, to make the component more shareable. Examples of this are removing `textContent` from the HTML component, stripping whitespace, using a common, published standard for html minification, and stripping the web component's designer's choice of css variables from the hash. Ultimately, it will not be a lot different from the copying of design patterns which already happens. There will be less flexibilty in changing components, but your components can be signed in a build step and a single signature for the whole document is sufficient to meet the recommendation.

## <a name="server_use"></a>[Server Use](#toc)
*basic html subresource hasher is implemented*

The minification should either follow a specified standard of minification, or provide a link to a place where the minification rules are specified, so the user agents, or scripts for verification sent to the user, are able to minify the HashTML element and derive the hash and check the signatures automatically on the client side. 

So far the process goes as follows:
1. Identify each element of the html file with a `class="HashTML"`
1. Remove textContent of that element
2. Remove Variables.
3. Remove Empty CSS Tags, ids, classes(standard css should be left in, as it hiding elements with css could have security vulnerabilities, instead, the component community should use variables to change the component styling)
4. Pass through html-minifier
5. InnerHTML is extracted from the parent component.
6. Hash the minified component (and sign the hash, which is not implemented)
7. Add the hash to the original unminified component
8. Integrate the component into your app, including minifying any way you see fit for production

Following the above process takes you from this:
``` html
<nav class="HashTML">
	<style>
		nav {
			--main-bg-color: rgb(40,40,40);
			--main-font-color: rgba(230,230,230,.8);
		}
		nav {
			background-color: var(--main-bg-color);
			color: var(--main-font-color);
		}
	</style>
	<ul>
		<li id="home">Home</li>
		<li id="about">About</li>
		<li id="contact">Contact</li>
	</ul>
</nav>
```

To a resulting minified, html component such as below:

``` html
<nav class="HashTML" integrity="f3bd8e3a82b..." signature="4ubkf7..."><style>nav{background-color: var(--main-bg-color);color: var(--main-font-color);}</style><ul><li></li><li></li><li></li></ul></nav>
```

## <a name="client_use"></a>[Client Use](#toc)
*not implemented*

Verifying the hash and signature on client side could either produce an alert on failing to load, silently fail to load the resource, or could provide a fallback. In order for the client to verify the component, they perform the same operations that the server performs on the component, in order that they can generate the same hash, and then verify the attached signatures, which are likely to be stored online distributed databases such as distributed ledgers. Upon verifying hashes and signatures, the user-agent will then have a trust rating attached to the component that they can choose to accept or reject.

## <a name="levels_of_implementation"></a>[Levels of Implementation](#toc)

### L1 - Partial
At this level, an HTML document will contain some hashed and/or signed external resources, a partial implementation of W3C Standards. This should at least slightly increase the security. 

### L2 - W3C Compliant
To reach this level an HTML document must meet the W3C Standards for all external resources.

### L3 - W3C Compliant & Signatures
To reach this level, an HTML document must be W3C compliant, as well as include signatures for all hashed components. The point at which multiple signatures begin being utilized is the point at which the wider open source community join together in collaborating toward improving web privacy and security.

### L4 - HashTML
To be fully compliant, an HTML document must include at minimum a hash and a signature in it's HTML tag, but any child tags of the html tag may also be signed.
 
## <a name="roadmap"></a>[Roadmap](#toc)

### Server Use

* implemented signing components with private keys
* link to component libraries

### Client Use

* Include javascript scripts to send to users, these are sent in the build step, but executed by the user agents. These scripts can
	* minify components
	* hash the minified component to check if the hash is the same
	* verify the signatures against a public key infrastructure
	* implement several alternative actions of how to manage trusted or untrusted components
