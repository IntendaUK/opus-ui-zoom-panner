import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import * as packageJson from './package.json'
import libCss from 'vite-plugin-libcss';

import { promises as fs } from 'fs';
import path from 'path';
import glob from 'glob';

import { pathToFileURL } from 'url';

const customCopyPlugin = () => {
	return {
		name: 'custom-copy-plugin',
		writeBundle: async () => {
			const copyFiles = async (srcDir, distDir, globPattern) => {
				const filesToCopy = glob.sync(globPattern);

				await Promise.all(filesToCopy.map(async dirent => {
					const relativePath = path.relative(srcDir, dirent);
					const destPath = path.join(distDir, relativePath);

					if ((await fs.lstat(dirent)).isDirectory()) {
						await fs.mkdir(destPath, { recursive: true });
					} else {
						await fs.mkdir(path.dirname(destPath), { recursive: true });

						await fs.copyFile(dirent, destPath);
					}
				}));
			};


			await copyFiles('src/components', 'dist/components', 'src/components/**/*');
			await copyFiles('', 'dist', 'lspconfig.json');
		}
	};
}

async function fileExists(path) {
	try {
		await fs.access(path);
		return true;
	} catch {
		return false;
	}
}

export default defineConfig(async () => {
	let monorepoAliases = {};
	let monorepoWatchPaths = [];

	const monorepoConfigPath = path.resolve(__dirname, './vite.monorepo.config.js');

	if (await fileExists(monorepoConfigPath)) {
		try {
			const monorepoConfigUrl = pathToFileURL(monorepoConfigPath).href;
			const monoRepoConfig = await import(monorepoConfigUrl);
			const monorepoAliasNames = monoRepoConfig.default;

			monorepoAliasNames.forEach((aliasName) => {
				const aliasPath = path.resolve(__dirname, `../${aliasName}`);
				monorepoAliases[aliasName] = aliasPath;
			});

			monorepoWatchPaths = Object.values(monorepoAliases).map(
				(aliasPath) => `!${aliasPath}/**`
			);
		} catch (e) {
			console.error('Error loading monorepo config:', e);
		}
	}

	return {
		plugins: [
			customCopyPlugin(),
			libCss(),
			react(),
		],
		build: {
			lib: {
				entry: resolve('src', 'library.js'),
				name: '@intenda/opus-ui-zoom-panner',
				formats: ['es'],
				fileName: () => `lib.js`,
			},
			rollupOptions: {
				external: [...Object.keys(packageJson.peerDependencies)],
			},
		},
		optimizeDeps: {
			esbuildOptions: {
				loader: {
					'.js': 'jsx',
				},
			},
		},
		resolve: {
			alias: monorepoAliases
		},
		server: {
			watch: {
				ignored: monorepoWatchPaths
			}
		}
	};
});
