import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AwesomeMenuComponent } from './awesome-menu/awesome-menu.component';
import { CharpaneComponent } from './charpane/charpane.component';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './login/login.component';
import { CampgroundComponent } from './main/campground/campground.component';
import { CraftingComponent } from './main/crafting/crafting.component';
import { InventoryComponent } from './main/inventory/inventory.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './main/map/map.component';
import { OptionsComponent } from './main/options/options.component';
import { SkillsComponent } from './main/skills/skills.component';
import { TheBigMountainsComponent } from './main/the-big-mountains/the-big-mountains.component';
import { TheDistantWoodsComponent } from './main/the-distant-woods/the-distant-woods.component';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    CharpaneComponent,
    AwesomeMenuComponent,
    MainComponent,
    ChatComponent,
    CampgroundComponent,
    TheBigMountainsComponent,
    TheDistantWoodsComponent,
    InventoryComponent,
    SkillsComponent,
    CraftingComponent,
    OptionsComponent,
    MapComponent,
    LoginComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    // FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AppModule { }
