import { parseValtoInt } from "./utils";

// Get arguments from the command line
const args: Array<string> = process.argv.slice(2);

console.log(`Arguments received: ${args.join(", ")}`);

const MAX = 100;
const MIN = 1;

if (args.length < 2) throw new Error("Please provide two numbers as arguments.");

// Parse values from arguments
const parsedMin = parseValtoInt(args[0]);
const parsedMax = parseValtoInt(args[1]);

// Validate the parsed values
if (parsedMin < MIN || parsedMax > MAX) throw new Error(`Values must be between ${MIN} and ${MAX}.`);    
if (parsedMin >= parsedMax) throw new Error("The first number must be less than the second number.");

// Generate a random number between the two parsed values
const randomNumber = Math.floor(Math.random() * (parsedMax - parsedMin + 1)) + parsedMin;

// Output the random number
console.log(`Random number between ${parsedMin} and ${parsedMax}: ${randomNumber}`);