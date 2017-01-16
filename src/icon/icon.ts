import {
  NgModule,
  ModuleWithProviders,
  Component,
  ElementRef,
  Input,
  Renderer,
  SimpleChange,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ox-icon',
  template: '<ng-content></ng-content>',
  styleUrls: ['icon.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OxIcon {
  private _type: string;
  private _spin: boolean;

  @Input()
  get type(): string { return this._type; };
  set type(value) { this._type = value; };

  @Input()
  get spin(): boolean { return this._spin; };
  set spin(value: boolean) {
    this._updateSpinClass(value);
    this._spin = value;
  };

  private _previousType: string;

  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer) {
  }
  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    const changedInputs = Object.keys(changes);
    if (changedInputs.indexOf('type') != -1) {
      this._updateFontIcontClass();
    }
  }

  ngOnInit() {
    this._setElementClass('anticon', true);
    this._updateFontIcontClass();
  }

  _updateSpinClass(newSpin: boolean) {
    if (newSpin) {
      this._setElementClass('anticon-spin', true);
    }
  }

  _setElementClass(className: string, isAdd: boolean) {
    if (className !== null && className !== undefined && className !== '') {
      this._renderer.setElementClass(this._elementRef.nativeElement, className, isAdd);
    }
  }

  // TODE anticon className
  private _updateFontIcontClass() {
    if (this._type !== this._previousType) {
      if (this._previousType) {
        this._setElementClass(`anticon-${this._previousType}`, false);
      }
      if (this._type) {
        this._setElementClass(`anticon-${this._type}`, true);
        if (this._type === 'loading') { this._updateSpinClass(true); }
      }
      this._previousType = this._type;
    }
    this._previousType = this._type;
  }
}

@NgModule({
  imports: [],
  exports: [OxIcon],
  declarations: [OxIcon],
})
export class OxIconModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: OxIconModule,
      providers: [],
    };
  }
}
