"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Clear the console
 */
function clearConsole() {
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    console.log("\n\n\n\n\n\n\n\n\n\n\n\n");
    process.stdout.write('\x1B[2J\x1B[0f');
}
exports.default = clearConsole;
