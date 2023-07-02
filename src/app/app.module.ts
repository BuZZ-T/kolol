import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AdventureComponent } from './adventure/adventure.component';
import { ChoiceComponent } from './adventure/choice/choice.component';
import { DamageComponent } from './adventure/damage/damage.component';
import { FightComponent } from './adventure/fight/fight.component';
import { FightEndComponent } from './adventure/fight-end/fight-end.component';
import { NonFightComponent } from './adventure/non-fight/non-fight.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AwesomeMenuComponent } from './awesome-menu/awesome-menu.component';
import { CharpaneComponent } from './charpane/charpane.component';
import { ChatComponent } from './chat/chat.component';
import { BoxComponent } from './core/box/box.component';
import { ButtonComponent } from './core/button/button.component';
import { ItemComponent } from './core/item/item.component';
import { LoginComponent } from './login/login.component';
import { CampgroundComponent } from './main/campground/campground.component';
import { CraftingComponent } from './main/crafting/crafting.component';
import { InventorySectionComponent } from './main/inventory/inventory-section/inventory-section.component';
import { InventoryComponent } from './main/inventory/inventory.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './main/map/map.component';
import { OptionsComponent } from './main/options/options.component';
import { SkillSectionComponent } from './main/skills/skill-section/skill-section.component';
import { SkillsComponent } from './main/skills/skills.component';
import { PlaceComponent } from './place/place.component';
import { EffectComponent } from './charpane/effect/effect.component';
import { RoutingDirective } from './routing/routing.directive';

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
    PlaceComponent,
    SkillSectionComponent,
    SkillsComponent,
    AdventureComponent,
    FightComponent,
    NonFightComponent,
    ChoiceComponent,
    FightEndComponent,
    DamageComponent,
    ButtonComponent,
    ItemComponent,
    EffectComponent,
    RoutingDirective,
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
