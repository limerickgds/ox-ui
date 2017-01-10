import {
  Component,
  ViewEncapsulation,
  Input,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  ElementRef,
  Renderer,
  NgModule,
  ModuleWithProviders,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// TODO enum 枚举值
// export enum ButtonSize {
//   default,
//   small,
//   large
// }

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
  styleUrls: ['./style/index.scss'],
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
    this._updateShape(value)
  }

  @Input()
  get size() {
    return this._size;
  }
  set size(value: string) {
    this._updateSize(value)
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) { }

  @HostListener('click', ['$event'])
  onClick(e: Event) {
    this.clicked = true;
    setTimeout(() => { this.clicked = false }, 500)
  }

  _updateSize(newSize: string) {
    this._setElementSize(this._size, false);
    this._setElementSize(newSize, true);
    this._size = newSize;
  }

  _setElementSize(size: string, isAdd: boolean) {
    if (size != null && size != '') {
      const sizeClass = ({
        large: 'lg',
        small: 'sm'
      })[size] || '';
      if(sizeClass !== '') {
        this._renderer.setElementClass(this._elementRef.nativeElement, `ox-button-${sizeClass}`, isAdd)
      }
    }
  }

  _updateShape(newShape: string) {
    this._setElementShape(this._shape, false);
    this._setElementShape(newShape, true);
    this._shape = newShape;
  }

  _setElementShape(shape: string, isAdd: boolean) {
    if (shape != null && shape != '') {
      this._renderer.setElementClass(this._elementRef.nativeElement, `ox-button-${shape}`, isAdd)
    }
  }
}

@Component({
  selector: 'ox-button-group',
  inputs: ['color', 'disabled', 'disableRipple'],
  host: {},
  templateUrl: 'button.html',
  styleUrls: ['style/index.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OxButtonGroup {
  private _size: string;

  @Input()
  get size() { return this._size; }
  set size(value: string) { this._size = value; }
}


@NgModule({
  imports: [CommonModule],
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