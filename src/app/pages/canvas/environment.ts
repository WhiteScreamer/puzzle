import * as THREE from 'three';

export function createRenderer(width: number, height: number): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    return renderer;
}
export function renderRenderer(renderer: THREE.WebGLRenderer, container: HTMLDivElement, scene: THREE.Scene, camera: THREE.Camera) {
    container.append(renderer.domElement);
    renderer.render(scene, camera);
}
export function disposeRenderer(renderer: THREE.WebGLRenderer) {
    if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
    }
}
export function createScene(): THREE.Scene {
    const scene = new THREE.Scene();
    return scene;
}
export function createCamera(width: number, height: number): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(90, width / height, 0.1, 1000);
    camera.position.z = 3;
    return camera;
}
export function initLight(scene:THREE.Scene) {
    const ambientLight=new THREE.AmbientLight(0xffffff,0.7);
    scene.add(ambientLight);
    const directionLight=new THREE.DirectionalLight(0xffffff,1);
    directionLight.position.set(5,5,5);
    scene.add(directionLight);
  }