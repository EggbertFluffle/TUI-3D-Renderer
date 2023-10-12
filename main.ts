import { GraphicsManager } from "./GraphicsManager.ts";
import { ShapeFactory } from "./ShapeFactory.ts";
import { matrix, multiply } from "mathjs";

const graphicsManager: GraphicsManager = new GraphicsManager();
const shapeFactory: ShapeFactory = new ShapeFactory();

const frameRate: number = 8;

const orthoProjection: math.Matrix = matrix([
	[2, 0, 0],
	[0, 1, 0],
	[0, 0, 1]
]);

let angle: number = 0;

let box: Array<math.Matrix> = shapeFactory.rectPrism([0, 0, 0], [20, 20, 20]);
// let octahedron: Array<math.Matrix> = shapeFactory.octahedron([0, 0, 0], [35, 35, 35]);
// let tetrahedron: Array<math.Matrix> = shapeFactory.tetrahedron([0, 0, 0], 35);

const init = () => {
	loop();
}

const loop = () => {
	console.clear();
	graphicsManager.background();

	angle += 0.05;

	let rotationX = matrix([
		[1, 0,               0               ],
		[0, Math.cos(angle), -Math.sin(angle)],
		[0, Math.sin(angle), Math.cos(angle) ]
	]);

	let rotationY = matrix([
		[ Math.cos(angle), 0, Math.sin(angle)],
		[ 0,               1, 0              ],
		[-Math.sin(angle), 0, Math.cos(angle)]
	]);

	let rotationZ = matrix([
		[Math.cos(angle), -Math.sin(angle), 0],
		[Math.sin(angle),  Math.cos(angle), 0],
		[0,                0,               1]
	]);

	let projectedPoints: Array<math.Matrix> = box.map(p => {
		p = multiply(rotationY, p);
		p = multiply(rotationX, p);
		p = multiply(rotationZ, p);
		p = multiply(orthoProjection, p);
		return p;
	});

	graphicsManager.rectPrism(projectedPoints);

	graphicsManager.render();
	setTimeout(loop, 1000 / frameRate);
}

init();
