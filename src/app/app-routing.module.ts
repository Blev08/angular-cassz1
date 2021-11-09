import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericProjectComponent } from './components/generic-project/generic-project.component';
import { GenericFormComponent } from './components/generic-form/generic-form.component';

const routes: Routes = [
{
  path: 'angularProject',
  component: GenericProjectComponent
},
{
  path: 'angularForm',
  component: GenericFormComponent
},
{
  path: '',
  redirectTo: '/angularProject',
  pathMatch: 'full'
},
{
  path: '**',
  redirectTo: '/angularProject',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
