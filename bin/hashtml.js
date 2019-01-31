#!/usr/bin/env node

const program	= require('commander')
const fs 		= require('fs')
const path		= require('path')

const package_path	= path.join( __dirname, '../package.json')
const data 			= fs.readFileSync(package_path,'utf8')
const package		= JSON.parse(data)
const addHashes		= require('../src/addHashes.js')
 
program
    .version(package.version)
	.option('-v, --verbose', 'shows you verbose output')
	.option('-m, --minify', 'minifies the html output')
	.option('-o, --output', 'outputs directly to a file')
	.parse(process.argv)

if ( program.args.length >=1 ){
	if (program.verbose){
		console.log(program.args[0])
	}
	const filepath	= program.args[0]
	const ext		= path.extname(filepath)
	if (ext === '.html'){
		fs.stat( filepath, (err, stat) => {
		    if (err == null) {
//		        console.log('File exists')
				addHashes(filepath, program)
		    } else if(err.code === 'ENOENT') {
		        console.log('Filename not exist')
	    	} 
		})
	} else {
		console.log('please enter an html file')
	}
}
