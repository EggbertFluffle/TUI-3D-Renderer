class Complex {
	real: number;
	complex: number;

	constructor(real: number, complex: number) {
		this.real = real;
		this.complex = complex;
	}

	toString(): string {
		return `${this.real} ${this.complex < 0 ? "-" : "+"} ${Math.abs(this.complex)}i`;
	}

	add(num: Complex | number) {
		if(typeof num == "number") {
			num = new Complex(num, 0);
		}
		this.real += num.real;
		this.complex += num.complex;
	}

	multiply(num: Complex | number) {
		if(typeof num == "number") {
			num = new Complex(num, 0);
		}
		let real = (this.real * num.real) + -(this.complex * num.complex);
		let complex = (this.real * num.complex) + (num.real * this.complex);
		this.real = real;
		this.complex = complex;
	}

	square(): void {
		this.multiply(this.copy());
	}

	copy(): Complex {
		return new Complex(this.real, this.complex);
	}
}

export { Complex };
