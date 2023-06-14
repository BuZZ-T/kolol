import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { menuRoutes } from './awesome-menu/menu.types';
import { LoginComponent } from './login/login.component';
import { CampgroundComponent } from './main/campground/campground.component';
import { CraftingComponent } from './main/crafting/crafting.component';
import { InventoryComponent } from './main/inventory/inventory.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './main/map/map.component';
import { NaughtySorceressTowerComponent } from './main/naughty-sorceress-tower/naughty-sorceress-tower.component';
import { OptionsComponent } from './main/options/options.component';
import { SkillsComponent } from './main/skills/skills.component';
import { TheBigMountainsComponent } from './main/the-big-mountains/the-big-mountains.component';
import { TheDistantWoodsComponent } from './main/the-distant-woods/the-distant-woods.component';

const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    children: [
      {
        component: CampgroundComponent,
        path: menuRoutes['Campground'],
      },
      {
        component: InventoryComponent,
        path: menuRoutes['Your Inventory'],
      },
      {
        component: SkillsComponent,
        path: menuRoutes['Your Skills'],
      },
      {
        component: CraftingComponent,
        path: menuRoutes['Crafting'],
      },
      {
        component: OptionsComponent,
        path: menuRoutes['Options'],
      },
      {
        component: MapComponent,
        path: menuRoutes['Main Map'],
      },
      {
        component: TheBigMountainsComponent,
        path: menuRoutes['The Big Mountains'],
      },
      {
        component: TheDistantWoodsComponent,
        path: menuRoutes['The Distant Woods'],
      },
      {
        component: NaughtySorceressTowerComponent,
        path: menuRoutes['The Naughty Sorceress\' Tower'],
      },
      {
        component: MapComponent,
        path: '**',
      },
    ],
    component: MainComponent,
    path: 'kol',
  },
  {
    component: LoginComponent,
    path: '**',
  },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule { }
