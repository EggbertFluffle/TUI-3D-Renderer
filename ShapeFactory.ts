import { matrix, multiply, add } from "mathjs";

class ShapeFactory {
	static tetrahedron(size: number): Array<math.Matrix> {
		size /= 2;
		let faceDist = Math.sin(30 * (Math.PI / 180)) * size;
		let halfLeg = Math.cos(30 * (Math.PI / 180)) * size;
		return [
 			matrix([0, -size, 0]),
 			matrix([0, faceDist, size]),
 			matrix([halfLeg, faceDist, -faceDist]),
 			matrix([-halfLeg, faceDist, -faceDist])
		];
	}

	static rectPrism(size: Array<number>): Array<math.Matrix> {
		size = size.map(s => s / 2);
		return [
 			matrix([-size[0], -size[1], size[2]]),
			matrix([size[0], -size[1], size[2]]),
			matrix([size[0], size[1], size[2]]),
			matrix([-size[0], size[1], size[2]]),
			matrix([-size[0], -size[1], -size[2]]),
			matrix([size[0], -size[1], -size[2]]),
			matrix([size[0], size[1], -size[2]]),
			matrix([-size[0], size[1], -size[2]])
		];
	}

	static octahedron(size: Array<number>): Array<math.Matrix> {
		return [
			matrix([0, -size[1], 0]),
			matrix([0, 0, size[2]]),
			matrix([size[0], 0, 0]),
			matrix([0, 0, -size[2]]),
			matrix([-size[0], 0, 0]),
			matrix([0, size[1], 0])
		];
	}

	static dodecahedron(size: number): Array<math.Matrix> {
		size /= 2;
		let g = size * ((1 + Math.sqrt(5)) / 2);
		let r = size / ((1 + Math.sqrt(5)) / 2);
		return [
 			matrix([-size, size, size]),
			matrix([size, size, size]),
			matrix([size, -size, size]),
			matrix([-size, -size, size]),
			matrix([-size, size, -size]),
			matrix([size, size, -size]),
			matrix([size, -size, -size]),
			matrix([-size, -size, -size]),
			matrix([-g, r, 0]),
			matrix([g, r, 0]),
			matrix([g, -r, 0]),
			matrix([-g, -r, 0]),
			matrix([0, g, r]),
			matrix([0, g, -r]),
			matrix([0, -g, -r]),
			matrix([0, -g, r]),
			matrix([-r, 0, g]),
			matrix([r, 0, g]),
			matrix([r, 0, -g]),
			matrix([-r, 0, -g])
		];
	}

	static icosahedron(size: number): Array<math.Matrix> {
		size /= 2;
		let g = size * ((1 + Math.sqrt(5)) / 2);
		return [
			matrix([0, size, g]),
			matrix([0, -size, g]),
			matrix([0, -size, -g]),
			matrix([0, size, -g]),
			matrix([size, g, 0]),
			matrix([size, -g, 0]),
			matrix([-size, g, 0]),
			matrix([-size, -g, 0]),
			matrix([g, 0, -size]),
			matrix([g, 0, size]),
			matrix([-g, 0, -size]),
			matrix([-g, 0, size])
		];
	}
}

class Mesh {
	origin: math.Matrix;
	referancePoints: Array<math.Matrix>;
	rotatedPoints: Array<math.Matrix>;

	constructor(_origin: math.Matrix, _referancePoints: Array<math.Matrix>) {
		this.origin = _origin;
		this.referancePoints = _referancePoints;
		this.rotatedPoints = this.referancePoints;
	}

	setRotations(rotations: Array<math.Matrix>) {
		this.rotatedPoints = this.referancePoints.map(p => {
			for(let i = 0; i < rotations.length; i++) {
				p = multiply(rotations[i], p);
			}
			return p;
		});
	}

	translateByOrigin(): void {
		this.rotatedPoints = this.rotatedPoints.map(p => {
			return add(this.origin, p);
		});
	}

	getProjectedPoints(projectionMatrix: math.Matrix): Array<math.Matrix> {
		let projectedPoints = this.rotatedPoints.map(p => {
			return multiply(projectionMatrix, p);
		});
		return projectedPoints;
	}
}

export { ShapeFactory, Mesh };
