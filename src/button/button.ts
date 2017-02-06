import {
  Component,
  ViewEncapsulation,
  Input,
  HostListener,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer,
  NgModule,
  ModuleWithProviders,
} from '@angular/core';

export const BUTTON_SIZE_CLASS: any = {
  small: 'sm',
  large: 'lg'
};

// TODO: shape enum 
// export enum ButtonShape {
//   default,
//   cricle
// }

@Component({
  moduleId: module.id,
  selector: 'button[ox-button], button[ox-button-primary], button[ox-button-ghost], button[ox-button-dashed]',
  host: {
    '[class.clicked]': 'clicked'
  },
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OxButton {
  // private _loading: boolean = false;
  private _shape: string;
  private _size: string;

  public clicked: boolean;

  // TODO 是否需要loading
  // @Input()
  // get loading() {
  //   return this._loading;
  // }
  // set loading(value: boolean) {
  //   this._loading = value 
  // }

  @Input()
  get shape() {
    return this._shape;
  }
  set shape(value: string) {
    this._updateShape(value);
  }

  @Input()
  get size() {
    return this._size;
  }
  set size(value: string) {
    this._updateSize(value);
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) { }

  @HostListener('click', ['$event'])
  onClick(e: Event) {
    this.clicked = true;
    setTimeout(() => { this.clicked = false; }, 500);
  }

  private _updateSize(newSize: string) {
    this._setElementSize(this._size, false);
    this._setElementSize(newSize, true);
    this._size = newSize;
  }

  private _setElementSize(size: string, isAdd: boolean) {
    if (size !== null && size !== undefined && size !== '') {
      const sizeClass: string = BUTTON_SIZE_CLASS[size] || '';
      if (sizeClass !== '') {
        this._renderer.setElementClass(this._elementRef.nativeElement, `ox-button-${sizeClass}`, isAdd);
      }
    }
  }

  private _updateShape(newShape: string) {
    this._setElementShape(this._shape, false);
    this._setElementShape(newShape, true);
    this._shape = newShape;
  }

  private _setElementShape(shape: string, isAdd: boolean) {
    if (shape != null && shape != '') {
      this._renderer.setElementClass(this._elementRef.nativeElement, `ox-button-${shape}`, isAdd);
    }
  }
}

@Component({
  moduleId: module.id,
  selector: 'ox-button-group',
  inputs: ['color', 'disabled', 'disableRipple'],
  host: {},
  templateUrl: 'button.html',
  styleUrls: ['button.css'],
  encapsulation: ViewEncapsulation.None
})
export class OxButtonGroup {
  private _size: string;

  @Input()
  get size() { return this._size; }
  set size(value: string) { this._size = value; }
}


@NgModule({
  imports: [],
  exports: [OxButton, OxButtonGroup],
  declarations: [OxButton, OxButtonGroup],
})
export class OxButtonModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OxButtonModule,
      providers: []
    };
  }
}
