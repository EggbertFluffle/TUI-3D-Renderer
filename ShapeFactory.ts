import { matrix } from "mathjs";

class ShapeFactory {
	tetrahedron(center: Array<number>, size: number): Array<math.Matrix> {
		size /= 2;
		let faceDist = Math.sin(30 * (Math.PI / 180)) * size;
		let halfLeg = Math.cos(30 * (Math.PI / 180)) * size;
		return [
 			matrix([center[0], center[1] - size, center[2]]),
 			matrix([center[0], center[1] + faceDist, center[2] + size]),
 			matrix([center[0] + halfLeg, center[1] + faceDist, center[2] - faceDist]),
 			matrix([center[0] - halfLeg, center[1] + faceDist, center[2] - faceDist])
		];
	}

	rectPrism(center: Array<number>, size: Array<number>): Array<math.Matrix> {
		size = size.map(s => s / 2);
		return [
 			matrix([center[0] - size[0], center[1] - size[1], center[2] + size[2]]),
			matrix([center[0] + size[0], center[1] - size[1], center[2] + size[2]]),
			matrix([center[0] + size[0], center[1] + size[1], center[2] + size[2]]),
			matrix([center[0] - size[0], center[1] + size[1], center[2] + size[2]]),
			matrix([center[0] - size[0], center[1] - size[1], center[2] - size[2]]),
			matrix([center[0] + size[0], center[1] - size[1], center[2] - size[2]]),
			matrix([center[0] + size[0], center[1] + size[1], center[2] - size[2]]),
			matrix([center[0] - size[0], center[1] + size[1], center[2] - size[2]])
		];
	}

	octahedron(center: Array<number>, size: Array<number>): Array<math.Matrix> {
		size = size.map(s => s / 2);
		return [
			matrix([center[0], center[1] - size[1], center[2]]),
			matrix([center[0], center[1], center[2] + size[2]]),
			matrix([center[0] + size[0], center[1], center[2]]),
			matrix([center[0], center[1], center[2] - size[2]]),
			matrix([center[0] - size[0], center[1], center[2]]),
			matrix([center[0], center[1] + size[1], center[2]])
		];
	}
}

export { ShapeFactory };
