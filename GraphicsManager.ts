import { PixelBuffer } from "./PixelBuffer.ts";
import { matrix } from "mathjs";

export class GraphicsManager {
	pixelBuffer: PixelBuffer;
	stroke: string;
	fill: string;

	constructor() {
		this.pixelBuffer = new PixelBuffer();
		this.stroke = "\u2588";
		this.fill = " ";
	}

	render(): void {
		process.stdout.write(this.pixelBuffer.convertBuffer());
	}

	background(fill: string = " "): void {
		this.pixelBuffer.clearBuffer(fill);
	}

	point(p: math.Matrix): void {
		p = p.map(Math.round);
		this.pixelBuffer.set(p, this.stroke);
	}

	line(p1: math.Matrix, p2: math.Matrix): void {
		let dx = p2.get([0]) - p1.get([0]);
		let dy = p2.get([1]) - p1.get([1]);
		let m = dy / dx;
		let b = -m * p1.get([0]) + p1.get([1]);

		if(dx == 0) {
			for(let y = Math.min(p1.get([1]), p2.get([1])); y < Math.max(p1.get([1]), p2.get([1])); y += 1) {
				let p = matrix([p1.get([0]), y]);
				p = p.map(Math.round);
				this.pixelBuffer.set(p, this.stroke);
			}	
		}

		if(m <= 1 && m >= -1) {
			for(let x = Math.min(p1.get([0]), p2.get([0])); x < Math.max(p1.get([0]), p2.get([0])); x += 1) {
				let p = matrix([x, m * x + b])
				p = p.map(Math.round);
				this.pixelBuffer.set(p, this.stroke);
			}
		} else {
			for(let y = Math.min(p1.get([1]), p2.get([1])); y < Math.max(p1.get([1]), p2.get([1])); y += 1) {
				let p = matrix([(y - b) / m, y]);
				p = p.map(Math.round);
				this.pixelBuffer.set(p, this.stroke);
			}
		}

	}

	triangle(p1: math.Matrix, p2: math.Matrix, p3: math.Matrix) {
		this.line(p1, p2);
		this.line(p2, p3);
		this.line(p3, p1);

		// Code to fill in the gaps
	}

	quad(tl: math.Matrix, tr: math.Matrix, br: math.Matrix, bl: math.Matrix) {
		this.triangle(tl, tr, bl);
		this.triangle(tr, br, bl);
	}

	rectPrism(points: Array<math.Matrix>): void {
		let from = [0, 1, 2, 3, 4, 5, 6, 7, 4, 5, 6, 7];
		let to =   [1, 2, 3, 0, 5, 6, 7, 4, 0, 1, 2, 3];

		for(let i = 0; i < from.length; i++) {
			this.line(points[from[i]], points[to[i]]);
		}
	}

	octahedron(points: Array<math.Matrix>): void {
		let from: Array<number> = [0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 5];
		let to: Array<number> = [1, 2, 3, 4, 2, 3, 4, 1, 1, 2, 3, 4];

		for(let i = 0; i < from.length; i++) {
			this.line(points[from[i]], points[to[i]]);
		}
	}

	tetrahedron(points: Array<math.Matrix>): void {
		let from: Array<number> = [0, 0, 0, 1, 2, 3];
		let to: Array<number> = [1, 2, 3, 2, 3, 1];

		for(let i = 0; i < from.length; i++) {
			this.line(points[from[i]], points[to[i]]);
		}
	}

	dodecahedron(points: Array<math.Matrix>): void {
		let to: Array<number> =   [0,  0,  0, 1,  1,  1,  2,  2,  2,  3,  3,  3, 4,  4,  4, 5,  5,  5,  6,  6,  6,  7,  7,  7,  8,  9, 12, 14, 16, 18];
		let from: Array<number> = [8, 12, 16, 9, 12, 17, 10, 15, 17, 11, 15, 16, 8, 13, 19, 9, 13, 18, 10, 14, 18, 11, 14, 19, 11, 10, 13, 15, 17, 19];

		for(let i = 0; i < from.length; i++) {
			this.line(points[from[i]], points[to[i]]);
		}
	}

	icosahedron(points: Array<math.Matrix>): void {
		let to: Array<number> =   [0, 0, 0, 0,  0, 10, 10, 10, 10, 11, 11, 11,  7, 7, 7, 7, 9, 9, 9, 9, 1, 4, 4, 4, 3, 8, 5, 2, 2, 2, 3];
		let from: Array<number> = [1, 4, 6, 9, 11, 11,  6,  3,  2,  1,  7,  6, 10, 1, 5, 2, 1, 8, 4, 5, 5, 6, 3, 8, 8, 5, 7, 3, 8, 5, 6];

		for(let i = 0; i < from.length; i++) {
			this.line(points[from[i]], points[to[i]]);
		}
	}

	setFill(_f: string) {
		this.fill = _f[0];
	}

	setStroke(_s: string) {
		this.stroke = _s[0];
	}

	getDims(): math.Matrix {
		return matrix([this.pixelBuffer.WIDTH, this.pixelBuffer.HEIGHT]);
	}
}
