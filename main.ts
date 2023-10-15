import { GraphicsManager } from "./GraphicsManager.ts";
import { ShapeFactory, Mesh } from "./ShapeFactory.ts";
import { matrix, multiply } from "mathjs";

const graphicsManager: GraphicsManager = new GraphicsManager();

const frameRate: number = 8;

const orthoProjection: math.Matrix = matrix([
	[2.3, 0, 0],
	[0, 1, 0],
	[0, 0, 1]
]);

let angle: number = 0;

// let box: Array<math.Matrix> = shapeFactory.rectPrism([0, 0, 0], [20, 20, 20]);
// let octahedron: Array<math.Matrix> = shapeFactory.octahedron([0, 0, 0], [35, 35, 35]);
// let tetrahedron: Array<math.Matrix> = shapeFactory.tetrahedron([0, 0, 0], 35);
// let dodecahedron: Array<math.Matrix> = shapeFactory.dodecahedron([0, 0, 0], 25);

let box = new Mesh(
	matrix([0, -15, 0]),
	ShapeFactory.rectPrism([15, 15, 15])
);

let tetrahedron = new Mesh(
	matrix([-15, 15, 0]),
	ShapeFactory.tetrahedron(25)
);

let octahedron = new Mesh(
	matrix([15, 15, 0]),
	ShapeFactory.octahedron([15, 15, 15])
);

let dodecahedron = new Mesh(
	matrix([0, 0, 0]),
	ShapeFactory.dodecahedron(25)
);

let icosahedron = new Mesh(
	matrix([0, 0, 0]),
	ShapeFactory.icosahedron(35)
);

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

	// box.setRotations([rotationX, rotationY, rotationZ]);
	// box.translateByOrigin();
	// let projBox = box.getProjectedPoints(orthoProjection);
	// graphicsmanager.rectprism(projbox);
	//
	// tetrahedron.setrotations([rotationx, rotationy, rotationz]);
	// tetrahedron.translatebyorigin();
	// let projTetra = tetrahedron.getProjectedPoints(orthoProjection);
	// graphicsmanager.tetrahedron(projtetra);
	//
	// octahedron.setRotations([rotationX, rotationY, rotationZ]);
	// octahedron.translateByOrigin();
	// let projOcta = octahedron.getProjectedPoints(orthoProjection);
	// graphicsManager.octahedron(projOcta);

	// dodecahedron.setRotations([rotationX, rotationY, rotationZ]);
	// dodecahedron.translateByOrigin();
	// let projDodeca = dodecahedron.getProjectedPoints(orthoProjection);
	// graphicsManager.dodecahedron(projDodeca);
	
	graphicsManager.setStroke("\u2588");
	
	icosahedron.setRotations([rotationX, rotationY]);
	icosahedron.translateByOrigin();
	let projIcosa = icosahedron.getProjectedPoints(orthoProjection);
	graphicsManager.icosahedron(projIcosa);
	 
	// Cool debug tool
	// for(let i = 0; i < projIcosa.length; i++) {
	// 	let p = projIcosa[i];
	// 	graphicsManager.setStroke(i.toString())
	// 	graphicsManager.point(p);
	// 	if(i / 10 >= 1) {
	// 		graphicsManager.setStroke(i.toString()[1]);
	// 		graphicsManager.point(matrix([p.get([0]) + 1, p.get([1])]));
	// 	}
	// }

	graphicsManager.render();
	setTimeout(loop, 1000 / frameRate);
}

init();
