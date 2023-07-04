import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdventureComponent } from './adventure/adventure.component';
import { LoginComponent } from './login/login.component';
import { CampgroundComponent } from './main/campground/campground.component';
import { CraftingComponent } from './main/crafting/crafting.component';
import { InventoryComponent } from './main/inventory/inventory.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './main/map/map.component';
import { OptionsComponent } from './main/options/options.component';
import { SkillsComponent } from './main/skills/skills.component';
import { CellarComponent } from './main/tavern/cellar/cellar.component';
import { TavernComponent } from './main/tavern/tavern.component';
import { PlaceComponent } from './place/place.component';
import { ROUTES, menuRoutes } from './routing/routing.utils';

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
        component: TavernComponent,
        path: ROUTES.tavern,
      },
      {
        component: CellarComponent,
        path: ROUTES.cellar,
      },
      {
        component: PlaceComponent,
        path: 'place/:place',
      },
      {
        component: AdventureComponent,
        path: ROUTES.adventure,
      },
      {
        component: AdventureComponent,
        path: 'adventure/:snarfblat',
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
