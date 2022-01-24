const fs = require('fs-extra');
const got = require('got');
const path = require('path');
const Promise = require('bluebird');
const packages = require('../test/data/packages');
const dirMinified = `${__dirname}/../test/minified/`;
const dirUnminified = `${__dirname}/../test/unminified/`;

(async () => {
	await fs.ensureDir(dirMinified);
	await fs.ensureDir(dirUnminified);

	await Promise.map(packages, async (pkg) => {
		try {
			let pathMinified = dirMinified + getFileName(pkg.name, pkg.default);
			let pathUnminified = dirUnminified + getFileName(pkg.name, pkg.default);

			if (!await fs.pathExists(pathMinified)) {
				let f1 = await fetchFile(pkg.type, pkg.name, pkg.version, pkg.default);
				await fs.writeFile(pathMinified, f1);
			}

			if (!await fs.pathExists(pathUnminified)) {
				let f2 = await fetchFile(pkg.type, pkg.name, pkg.version, pkg.default.replace(/\.min\.(css|js)$/, '.$1'));
				await fs.writeFile(pathUnminified, f2);
			}
		} catch (error) {
			console.error(pkg.name, error);
		}
	}, { concurrency: 4 });
})().catch(console.error);

function getFileName (name, file) {
	return name.replace(/\//g, '-') + path.extname(file);
}

async function fetchFile (type, name, version, file) {
	return (await got(`https://cdn.jsdelivr.net/${type}/${name}@${version}${file}`)).body;
}
