const minify 	= require('html-minifier').minify
const jsdom 	= require("jsdom")
const { JSDOM } = jsdom
const fs 		= require('fs')
const crypto 	= require('crypto-browserify')
const cleaner	= require('clean-html')
const path		= require('path')
const color		= require('./color.js')

let options_minify = {
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

function removeTextNodes(node){
	for(var j = 0; j < node.childNodes.length; j ++){
		var child = node.childNodes[j];
		if ( (child.nodeType === 8) || (child.nodeType === 3 ) ) {
	    	node.removeChild(child)
	    	j--
	    } else if (child.nodeType === 1 ){
			removeTextNodes(child)
		}
	}
}

async function addHashes( filepath_html, options){
	
//	console.log('filepath_html')
//	console.log(filepath_html)
	const html 		= fs.readFileSync( filepath_html , 'utf8')
	
	const dom			= new JSDOM(html)
	const dom_temp		= new JSDOM(html)
	const document		= dom.window.document
	const document_temp	= dom_temp.window.document

	let elementList 		= document.querySelectorAll(".HashTML")
	let tempElementList 	= document_temp.querySelectorAll(".HashTML")

	removeTextNodes(document_temp.querySelector('html'))
	
	for ( let i = 0; i < tempElementList.length; i++){

		/*minify, mangle and hash*/
		let digest_algorithm	= 'sha512'
		let hash 				= crypto.createHash(digest_algorithm);
		let tempElement			= tempElementList[i]
		let element				= elementList[i]
		let inner				= tempElement.innerHTML
		let mini 				= minify(inner, options_minify)
		hash.update(mini)
		let digest = hash.digest('hex')

		/*add hash*/
		element.setAttribute('integrity', digest)
		element.setAttribute('crossorigin', 'anonymous')

		if (options.verbose){
			console.log(color.success('component found:'))
			tempElement.innerHTML = mini
			tempElement.setAttribute('integrity', digest)
			tempElement.setAttribute('crossorigin', 'anonymous')
			console.log(tempElement.outerHTML)
		}
	}

	let hashed_html = dom.serialize()
//	console.log(hashed_html)

	let clean_html = await cleaner.clean(hashed_html, (clean_html) => {
		let final_html
		if (options.minify){
			final_html = minify(clean_html, options_minify)
		}
		if (options.output){
			fs.writeFileSync(options.output)
		} else {
			console.log(color.success('final output'))
			console.log(clean_html)
		}
		return clean_html
	})


	return clean_html

}

module.exports = addHashes
