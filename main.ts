import { Complex } from "./Complex.ts";

// How many iterations need to pass before the point is infinite
const depth = 500;

const WIDTH = process.stdout.columns, HEIGHT = process.stdout.rows;

const origin = {
	x: -3/4,
	y: 0 
};
const dims = {
	x: 1.5,
	y: 1 
}

function main(): void {
	let buffer = [];

	// Poppulate buffer and test each point mandelbrotness (made up word) 
	for(let y = 0; y < HEIGHT; y++) {
		buffer.push([]);
		for(let x = 0; x < WIDTH; x++) {
			buffer[y][x] = mandelBrot(new Complex(
				lerp(origin.x - dims.x, origin.x + dims.x, x / WIDTH),
				lerp(origin.y - dims.y, origin.y + dims.y, y / HEIGHT)
			)) ? "#" : " ";
		}
	}

	// Print the entire buffer to the console
	for(let y = 0; y < HEIGHT; y++) {
		for(let x = 0; x < WIDTH; x++) {
			process.stdout.write(buffer[y][x]);
		}
		process.stdout.write("\n");
	}
}

// Linear Interpolation
const lerp = (start: number, end: number, alpha: number): number => {
	return start + ((end - start) * alpha);
}

const mandelBrot = (c: Complex): boolean => {
	let z: Complex = new Complex(0, 0);

	// model of the iterative equasion Z = Z^2 + C
	// Z is initialized as 0 + 0i and c is the point being tested
	for(let i = 0; i < depth; i++) {
		z.square();
		z.add(c);
		if(Math.abs(z.real) + Math.abs(z.complex) > 15) {
			return false;
		}
	}
	return true;
}

main();
