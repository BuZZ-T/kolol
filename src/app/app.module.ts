import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AwesomeMenuComponent } from './awesome-menu/awesome-menu.component';
import { CharpaneComponent } from './charpane/charpane.component';
import { ChatComponent } from './chat/chat.component';
import { BoxComponent } from './core/box/box.component';
import { LocationComponent } from './location/location.component';
import { LoginComponent } from './login/login.component';
import { CampgroundComponent } from './main/campground/campground.component';
import { CraftingComponent } from './main/crafting/crafting.component';
import { InventorySectionComponent } from './main/inventory/inventory-section/inventory-section.component';
import { InventoryComponent } from './main/inventory/inventory.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './main/map/map.component';
import { NaughtySorceressTowerComponent } from './main/naughty-sorceress-tower/naughty-sorceress-tower.component';
import { OptionsComponent } from './main/options/options.component';
import { SkillSectionComponent } from './main/skills/skill-section/skill-section.component';
import { SkillsComponent } from './main/skills/skills.component';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AwesomeMenuComponent,
    BoxComponent,
    CampgroundComponent,
    CharpaneComponent,
    ChatComponent,
    CraftingComponent,
    InventoryComponent,
    InventorySectionComponent,
    LoginComponent,
    MainComponent,
    MapComponent,
    OptionsComponent,
    SkillSectionComponent,
    SkillsComponent,
    NaughtySorceressTowerComponent,
    LocationComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AppModule { }
