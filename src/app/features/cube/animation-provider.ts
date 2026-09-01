import * as THREE from 'three';
import gsap from 'gsap';
import { InteractObject } from '../base/interact-object';
import { signal } from '@angular/core';
export type calcPointFunc = (position: THREE.Vector3) => THREE.Vector3;
interface AnimatoinInfo {
    scene: THREE.Scene;
    obj: InteractObject;
    axis: THREE.Vector3;
    turnPointFunc: calcPointFunc;
    targetAngle: number;
    targetPointFunc: calcPointFunc;
    duration: number;
    animationFuncName: string;
}
interface AnimationProxy {
    angleCurrent: number;
    angleTartget: number;
    targetPoint: THREE.Vector3;
}
export class AnimationProvider {
    //https://gsap.com/docs/v3/Eases/
    private animateTween?: gsap.core.Tween;
    private info?: AnimatoinInfo;
    animationProcessing = signal<boolean>(false);
    async animate(info: AnimatoinInfo) {
        if (this.animationProcessing()) {
            return;
        }
        this.info = info;
        const pivotGroup = new THREE.Group();
        this.info.scene.add(pivotGroup);
        const group = this.info.obj.group;
        const turnPoint = this.info.turnPointFunc(group.position);
        const targetPoint = this.info.targetPointFunc(group.position);
        pivotGroup.position.copy(turnPoint);
        pivotGroup.attach(group);
        const normalizedAxis = this.info.axis.clone().normalize();
        const proxy = {
            angleTartget: this.info.targetAngle,
            angleCurrent: 0,
            targetPoint: targetPoint
        };
        this.animateTween = this.createTween(this.info.duration, proxy, group, normalizedAxis, pivotGroup);
    }
    abort() {
        this.animateTween?.reverse();
        this.animateTween?.timeScale(3);
    }
    async finishQuickly() {
        this.animateTween?.timeScale(3);
        await this.animateTween;
    }
    private createTween(duration: number, proxy: AnimationProxy,
        group: THREE.Group, normalizedAxis: THREE.Vector3, pivotGroup: THREE.Group): gsap.core.Tween {
        this.animationProcessing.set(true);
        return gsap.to(proxy, {
            angleCurrent: proxy.angleTartget,
            duration: duration,
            ease: this.info!.animationFuncName,
            onUpdate: () => {
                pivotGroup!.quaternion.setFromAxisAngle(normalizedAxis, proxy.angleCurrent);
            },
            onComplete: () => {
                this.info!.scene.attach(group);
                this.info!.scene.remove(pivotGroup!);
                group.position.copy(proxy.targetPoint);
                this.animationProcessing.set(false);
                this.clearAll();
            }
        })
    }
    private clearAll() {
        this.animateTween = undefined;
        this.info = undefined;
    }
}