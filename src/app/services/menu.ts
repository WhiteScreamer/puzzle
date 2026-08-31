import { Injectable, signal } from '@angular/core';

export enum MenuEvents {
  none,
  shufle
}
@Injectable({
  providedIn: 'root',
})
export class Menu {
  public readonly menuEventValue = signal<MenuEvents>(MenuEvents.none);
}
