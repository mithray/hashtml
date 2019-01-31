'use strict'

const chalk		= require('chalk'); 
const boxen = require('boxen');

function colorMeanings(){
/*
	let str = `
 ${inform('---------Color Semantics-------')}
${inform('|')}				${inform('|')}
${inform('|')}	${success('green:\tsuccess')}		${inform('|')}
${inform('|')}	${inform('orange:\tinform')}		${inform('|')}
${inform('|')}	${configure('purple:\tconfigurable')}	${inform('|')}
${inform('|')}	${normal('gray:\tnormal')}		${inform('|')}
${inform('|')}	${warn('yellow:\twarn')}		${inform('|')}
${inform('|')}	${fail('red:\tfail')}		${inform('|')}
${inform('|')}				${inform('|')}
 ${inform('-------------------------------')}
`
*/
 	let str = `${inform('Color Semantics')}
							
	${success(	'green:\t\tsuccess')}
	${inform(	'orange:\t\tinform')}
	${configure('purple:\t\tconfigurable')}
	${normal(	'gray:\t\tnormal')}
	${warn(		'yellow:\t\twarn')}
	${fail(		'red:\t\tfail')}`
	let box = boxen(str, {padding: 1,margin: 1, borderStyle: 'round', borderColor: 'blue'});
	return box
}

var g = 64;

let green	= [2*g-1,4*g-1,2*g-1]
let orange	= [4*g-1,3*g-1,2*g-1]
let purple	= [4*g-1,1*g-1,4*g-1]
let gray	= [3*g-1,3*g-1,3*g-1]
let yellow	= [4*g-1,4*g-1,2*g-1]
let red		= [4*g-1,2*g-1,2*g-1]

function success(str){
	let colStr = str 
	colStr = chalk.rgb(...green)(colStr)
//	colStr = chalk.bgRgb(200,200,200)(colStr)
	return colStr
}
function inform(str){
	let colStr = str 
	colStr = chalk.rgb(...orange)(colStr)
//	colStr = chalk.bgRgb(200,200,200)(colStr)
	return colStr
}
function configure(str){
	let colStr = str 
	colStr = chalk.rgb(...purple)(colStr)
//	colStr = chalk.bgRgb(200,200,200)(colStr)
	return colStr
}
function normal(str){
	let colStr  = str
	colStr = chalk.rgb(...gray)(str)
//	colStr = chalk.bgRgb(20,20,20)(colStr)
	return colStr
}
function warn(str){
	let colStr = str 
	colStr = chalk.rgb(...yellow)(colStr)
//	colStr = chalk.bgRgb(200,200,200)(colStr)
	return colStr
}
function fail(str){
	let colStr = str 
	colStr = chalk.rgb(...red)(colStr)
	colStr = chalk.bgRgb(1*g,1*g,1*g)(colStr)
	return colStr
}

module.exports = { success, inform, configure, normal, warn, fail, colorMeanings}
