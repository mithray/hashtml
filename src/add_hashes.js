const minify 	= require('html-minifier').minify
const jsdom 	= require("jsdom")
const { JSDOM } = jsdom
const fs 		= require('fs')
const crypto 	= require('crypto-browserify')
const pretty 	= require('pretty')
const path		= require('path')

let html_path = path.join( __dirname, 'test.html')
let html = fs.readFileSync( html_path , 'utf8')

/**
 * Settings
 */

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
/*
*/
}

const dom = new JSDOM(html)
const dom_temp = new JSDOM(html)
let document = dom.window.document
let document_temp = dom_temp.window.document

/*
 * Execution
 */


let elementList 		= document.querySelectorAll(".HashTML")
let tempElementList 	= document_temp.querySelectorAll(".HashTML")


function cleanTextNodes(node){
	for(var j = 0; j < node.childNodes.length; j ++){
		var child = node.childNodes[j];
		if ( (child.nodeType === 8) || (child.nodeType === 3 ) ) {
	    	node.removeChild(child)
	    	j--
	    } else if (child.nodeType === 1 ){
			cleanTextNodes(child)
		}
	}
}
cleanTextNodes(document_temp.querySelector('html'))

for ( let i = 0; i < tempElementList.length; i++){

	/*minify, mangle and hash*/
	let digest_algorithm	= 'sha512'
	let hash 				= crypto.createHash(digest_algorithm);
	let tempElement			= tempElementList[i]
	let element				= elementList[i]
	let inner				= tempElement.innerHTML
	let mini 				= minify(inner, options)
	hash.update(mini)
	let digest = hash.digest('hex')

	/*add hash*/
	element.setAttribute('integrity', digest)
	element.setAttribute('crossorigin', 'anonymous')

}

let hashed_dom = dom.serialize()
console.log(`
------------------
Input
------------------
`)
console.log(html)
console.log(`
------------------
Minified Components
------------------
`)
for ( var k = 0; k < tempElementList.length; k++){
	console.log(tempElementList[k].outerHTML)
}
console.log(`

------------------
Output
------------------
`)
console.log(pretty(hashed_dom,{ocd: true}))
