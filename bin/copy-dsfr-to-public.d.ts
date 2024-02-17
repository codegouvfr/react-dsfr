#!/usr/bin/env node
/**
 * This script is ran with `npx copy-dsfr-to-public`
 * It takes two optional arguments:
 * - `--projectDir <path>` to specify the project directory. Default to the current working directory.
 *   This can be used in monorepos to specify the react project directory.
 * - `--publicDir <path>` to specify the public directory.
 *   In Vite projects we will read the vite.config.ts (or .js) file to find the public directory.
 *   In other projects we will assume it's <project root>/public.
 *   This path is expressed relative to the project directory.
 */
export {};
