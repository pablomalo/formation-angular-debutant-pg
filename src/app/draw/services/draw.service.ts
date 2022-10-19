import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { fabric } from 'fabric';
import { ShapeEnum } from '../draw-actions/enums/shape.enum';
import { IShapeCommand } from '../draw-actions/interfaces/shape-command.interface';
import { ShapeDefaultsConstants } from '../draw-actions/constants/shape-defaults.constants';

@Injectable({
  providedIn: 'root',
})
export class DrawService {
  private readonly _penState$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private _canvasFabric!: fabric.Canvas;

  public get penState(): BehaviorSubject<boolean> {
    return this._penState$;
  }

  public initCanvas: Function = (): void => {
    this._canvasFabric = new fabric.Canvas('draw-space', {
      backgroundColor: 'lightgrey',
      selection: false,
      preserveObjectStacking: true,
      width: 800,
      height: 600,
    });
  };

  togglePen: Function = (): void => {
    this._penState$.next(!this._penState$.value);
    this._canvasFabric.isDrawingMode = this._penState$.value;
  };

  addShape: Function = (shapeCommand: IShapeCommand): void => {
    switch (shapeCommand.shape) {
      case ShapeEnum.Rectangle:
        this._canvasFabric.add(
          new fabric.Rect({
            ...ShapeDefaultsConstants.RECTANGLE,
            ...shapeCommand,
          })
        );
        break;
      case ShapeEnum.Circle:
        this._canvasFabric.add(
          new fabric.Circle({
            ...ShapeDefaultsConstants.CIRCLE,
            ...shapeCommand,
          })
        );
        break;
      case ShapeEnum.Line:
        const mergedCommand = {
          ...ShapeDefaultsConstants.LINE,
          ...shapeCommand,
        };
        console.log(shapeCommand, ShapeDefaultsConstants.LINE, mergedCommand);
        this._canvasFabric.add(
          new fabric.Line(mergedCommand.points, mergedCommand)
        );
        break;
    }
  };
}
