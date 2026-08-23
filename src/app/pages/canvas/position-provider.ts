import * as THREE from 'three';
export class PositionProvider{
    private createGroup(scene:THREE.Scene,obj:THREE.Object3D):THREE.Group{
        const tempGroup=new THREE.Group();
        scene.add(tempGroup);
        tempGroup.attach(obj);
        return tempGroup;
    }
    private removeGroup(tempGroup:THREE.Group,scene:THREE.Scene,obj:THREE.Object3D){
        scene.attach(obj);
        scene.remove(tempGroup);
    }
    rotate(scene:THREE.Scene,obj:THREE.Object3D,turnPoint:THREE.Vector3,axis:THREE.Vector3, angle:number){
        const tempGroup=this.createGroup(scene,obj);
        tempGroup.position.copy(turnPoint);
        const normalizedAxis = axis.clone().normalize();
        tempGroup.quaternion.setFromAxisAngle(normalizedAxis,angle);
        this.removeGroup(tempGroup,scene,obj);
    }
}