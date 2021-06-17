import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./docs/docs.module').then((m) => m.DocsModule),
  },
  {
    path: 'docs',
    loadChildren: () => import('./docs/docs.module').then((m) => m.DocsModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
