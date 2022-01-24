const fs = require('fs');
const expect = require('chai').expect;
const isMinified = require('../src');

describe('is-minified', () => {
	describe('minified', () => {
		for (let file of fs.readdirSync(__dirname + '/minified')) {
			it(`works for ${file}`, () => {
				expect(isMinified(fs.readFileSync(__dirname + '/minified/' + file, 'utf8'))).to.be.true;
			});
		}
	});

	describe('unminified', () => {
		for (let file of fs.readdirSync(__dirname + '/unminified')) {
			it(`works for ${file}`, () => {
				expect(isMinified(fs.readFileSync(__dirname + '/unminified/' + file, 'utf8'))).to.be.false;
			});
		}
	});
});
