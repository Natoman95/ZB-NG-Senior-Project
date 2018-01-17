import { NgModule } from '@angular/core';
import { HeadNavComponent } from './head-nav/head-nav';
import { FootNavComponent } from './foot-nav/foot-nav';

@NgModule({
  declarations: [HeadNavComponent,
    FootNavComponent],
  imports: [],
  exports: [HeadNavComponent,
    FootNavComponent]
})
export class ComponentsModule { }
