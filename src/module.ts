import { NgModule, ModuleWithProviders } from '@angular/core';

import { OxButtonModule } from './button/index';
import { OxIconModule } from './icon/index';


const OX_MODULES = [
  OxButtonModule,
  OxIconModule
];

@NgModule({
  imports: [
    OxButtonModule.forRoot(),
    OxIconModule.forRoot()
  ],
  exports: OX_MODULES,
})
export class OxRootModule { }

@NgModule({
  imports: OX_MODULES,
  exports: OX_MODULES,
})
export class OxModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: OxRootModule };
  }
}
