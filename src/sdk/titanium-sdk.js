import fs from 'fs-extra';
import path from 'path';

import { expandPath } from 'appcd-path';
import { isDir } from 'appcd-fs';

/**
 * Titanium SDK information object.
 */
export default class TitaniumSDK {
	/**
	 * Checks if the specified directory contains a Titanium SDK, then parses the SDK's
	 * `manifest.json`.
	 *
	 * @param {String} dir - The directory to scan.
	 * @access public
	 */
	constructor(dir) {
		if (typeof dir !== 'string' || !dir) {
			throw new TypeError('Expected directory to be a valid string');
		}

		dir = expandPath(dir);
		if (!isDir(dir)) {
			throw new Error('Directory does not exist');
		}

		this.name     = path.basename(dir);
		this.manifest = null;
		this.path     = dir;

		try {
			const manifestFile = path.join(dir, 'manifest.json');
			this.manifest = JSON.parse(fs.readFileSync(manifestFile));
			if (!this.manifest || typeof this.manifest !== 'object' || Array.isArray(this.manifest)) {
				throw new Error();
			}
		} catch (e) {
			throw new Error('Directory does not contain a valid manifest.json');
		}
	}
}
