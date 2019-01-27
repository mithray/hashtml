var minify = require('html-minifier').minify;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');
const crypto = require('crypto-browserify')
const hash = crypto.createHash('sha512');

let html = fs.readFileSync('test.html', 'utf8')

const dom = new JSDOM(html)
let document = dom.window.document
//let elementList = document.querySelectorAll(".HashTML")
let element = document.querySelector("#HashTML")
let inner = element.innerHTML
//console.log(inner)
let options = {
	collapseBooleanAttributes: true,
	collapseWhitespace: true,
	minifyCSS: true,
	html5: true,
	trimCustomFragments: true,
	collapseInlineTagWhitespace: true,
	preserveLineBreaks: false,
	removeComments: true,
	removeTagWhitespace: true, 
	removeRedundantAttributes: true
}
let mini = minify(inner, options)
hash.update(mini)
let dig = hash.digest('hex')


document.querySelector("#HashTML").setAttribute('integrity', dig)

let hashed = dom.serialize()
console.log(hashed)
/*
console.log(mini)
for(elem in elementList){
	console.log(elem.innerHTML)
console.log(elems.length)
	let inner = elem.innerHTML
	inner = inner.minify()
	let hash = inner.hash("sha256")
	let signature = privateKey.sign(hash)
	elem[integrity=hash]
	elem[signature=signature]	 
}
*/
 
