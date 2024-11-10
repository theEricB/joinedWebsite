import * as THREE from 'three';

window.path = []

class Point3D {
    constructor(x = 0, y = 0, z = 0, extrusion = true) {
        // Initialize the point with x, y, and z coordinates
        this.x = x;
        this.y = y;
        this.z = z;
        this.extrusion = extrusion;
    }

    distanceTo(other) {
        if (!(other instanceof Point3D)) {
            throw new TypeError("The other object must be an instance of Point3D.");
        }
        return Math.sqrt(
            (this.x - other.x) ** 2 +
            (this.y - other.y) ** 2 +
            (this.z - other.z) ** 2
        );
    }

    move(dx, dy, dz) {
        this.x += dx;
        this.y += dy;
        this.z += dz;
    }
}

const points = [
    { "x": 0, "y": 3, "z": 2, "extrusion": true },
    { "x": 100, "y": 3, "z": 2, "extrusion": true },
    { "x": 150, "y": 3, "z": 5, "extrusion": false },
    { "x": 200, "y": 3, "z": 2, "extrusion": true }
];

path = points

