import { matrix } from "mathjs";

export class PixelBuffer {
	buffer: Array<Array<string>>;
	translation: math.Matrix;
	WIDTH: number;
	HEIGHT: number;

	constructor() {
		this.WIDTH = process.stdout.columns;
		this.HEIGHT = process.stdout.rows;
		this.translation = matrix([Math.floor(this.WIDTH / 2), Math.floor(this.HEIGHT / 2)]);
		this.buffer = this.newBuffer();
	}

	set(p: math.Matrix, fill: string = "#"): void {
		let x = p.get([0]) + this.translation.get([0]);
		let y = p.get([1]) + this.translation.get([1]);
		if(x < 0 || x > this.WIDTH - 1 || y < 0 || y > this.HEIGHT - 1) {
			return;
		}
		this.buffer[y][x] = fill[0];
	}

	clearBuffer(fill: string = " "): void {
		let l: Array<string> = [];
		for(let x = 0; x < this.WIDTH; x++) {
			l.push(fill[0]);
		}
		for(let y = 0; y < this.HEIGHT; y++) {
			this.buffer[y] = [...l];
		}
	}

	convertBuffer():string {
		return this.buffer.map((row) => {
			return [...row, "\n"].join("");
		}).join("");
	}

	newBuffer(): Array<Array<string>> {
		let buffer: Array<Array<string>> = [];
		for(let y: number = 0; y < this.HEIGHT; y++) {
			buffer.push([]);
			for(let x: number = 0; x < this.WIDTH; x++) {
				buffer[y].push(" ");
			}
		}
		return buffer;
	}
}
