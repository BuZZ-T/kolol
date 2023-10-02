import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AdventureComponent } from './adventure/adventure.component';
import { ChoiceComponent } from './adventure/choice/choice.component';
import { DamageComponent } from './adventure/damage/damage.component';
import { FightHotkeysComponent } from './adventure/fight/fight-hotkeys/fight-hotkeys.component';
import { FightComponent } from './adventure/fight/fight.component';
import { FightEndComponent } from './adventure/fight-end/fight-end.component';
import { NonFightComponent } from './adventure/non-fight/non-fight.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AwesomeMenuComponent } from './awesome-menu/awesome-menu.component';
import { CharpaneComponent } from './charpane/charpane.component';
import { EffectComponent } from './charpane/effect/effect.component';
import { ChatComponent } from './chat/chat.component';
import { BoxComponent } from './core/box/box.component';
import { ButtonComponent } from './core/button/button.component';
import { GainComponent } from './core/gain/gain.component';
import { ItemComponent } from './core/item/item.component';
import { ProgressBarComponent } from './core/progress-bar/progress-bar.component';
import { LoginComponent } from './login/login.component';
import { CampgroundComponent } from './main/campground/campground.component';
import { KitchenComponent } from './main/campground/kitchen/kitchen.component';
import { CouncilComponent } from './main/council/council.component';
import { CraftingComponent } from './main/crafting/crafting.component';
import { EquipmentComponent } from './main/inventory/equipment/equipment.component';
import { InventorySectionComponent } from './main/inventory/inventory-section/inventory-section.component';
import { InventoryComponent } from './main/inventory/inventory.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './main/map/map.component';
import { OptionsComponent } from './main/options/options.component';
import { SkillSectionComponent } from './main/skills/skill-section/skill-section.component';
import { SkillsComponent } from './main/skills/skills.component';
import { CellarComponent } from './main/tavern/cellar/cellar.component';
import { TavernComponent } from './main/tavern/tavern.component';
import { NoticeComponent } from './notice/notice.component';
import { PoolTableComponent } from './notice/pool-table/pool-table.component';
import { ResultComponent } from './notice/result/result.component';
import { PlaceComponent } from './place/place.component';
import { RoutingDirective } from './routing/routing.directive';
import { ShopComponent } from './shop/shop.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AdventureComponent,
    AppComponent,
    AwesomeMenuComponent,
    BoxComponent,
    ButtonComponent,
    CampgroundComponent,
    CellarComponent,
    CharpaneComponent,
    ChatComponent,
    ChoiceComponent,
    CraftingComponent,
    DamageComponent,
    EffectComponent,
    FightComponent,
    FightEndComponent,
    GainComponent,
    InventoryComponent,
    InventorySectionComponent,
    ItemComponent,
    KitchenComponent,
    LoginComponent,
    MainComponent,
    MapComponent,
    NonFightComponent,
    NoticeComponent,
    OptionsComponent,
    PlaceComponent,
    PoolTableComponent,
    ResultComponent,
    RoutingDirective,
    ShopComponent,
    SkillSectionComponent,
    SkillsComponent,
    TavernComponent,
    SpinnerComponent,
    CouncilComponent,
    EquipmentComponent,
    ProgressBarComponent,
    FightHotkeysComponent,
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
