import { OverlayModule } from '@angular/cdk/overlay';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AdventureComponent } from './adventure/adventure.component';
import { ChoiceComponent } from './adventure/choice/choice.component';
import { DamageComponent } from './adventure/damage/damage.component';
import { FightHotkeysComponent } from './adventure/fight/fight-hotkeys/fight-hotkeys.component';
import { FightComponent } from './adventure/fight/fight.component';
import { FightEndComponent } from './adventure/fight-end/fight-end.component';
import { NonFightComponent } from './adventure/non-fight/non-fight.component';
import { StatsComponent } from './adventure/stats/stats.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AwesomeMenuComponent } from './awesome-menu/awesome-menu.component';
import { CharpaneComponent } from './charpane/charpane.component';
import { CharsheetComponent } from './charpane/charsheet/charsheet.component';
import { SkillTableComponent } from './charpane/charsheet/skill-table/skill-table.component';
import { ChatComponent } from './chat/chat.component';
import { BoxComponent } from './core/box/box.component';
import { ButtonComponent } from './core/button/button.component';
import { EffectComponent } from './core/effect/effect.component';
import { GainComponent } from './core/gain/gain.component';
import { ItemComponent } from './core/item/item.component';
import { ListEntryComponent } from './core/list-entry/list-entry.component';
import { ProgressBarComponent } from './core/progress-bar/progress-bar.component';
import { DescFamiliarComponent } from './familiar/desc-familiar/desc-familiar.component';
import { FamiliarComponent } from './familiar/familiar/familiar.component';
import { LoginComponent } from './login/login.component';
import { CampgroundComponent } from './main/campground/campground.component';
import { KitchenComponent } from './main/campground/kitchen/kitchen.component';
import { CouncilComponent } from './main/council/council.component';
import { CraftingComponent } from './main/crafting/crafting.component';
import { DescEffectsComponent } from './main/inventory/desc-effects/desc-effects.component';
import { DescItemComponent } from './main/inventory/desc-item/desc-item.component';
import { DescOutfitComponent } from './main/inventory/desc-outfit/desc-outfit.component';
import { DescSkillEffectComponent } from './main/inventory/desc-skill-effect/desc-skill-effect.component';
import { EquipmentComponent } from './main/inventory/equipment/equipment.component';
import { InventorySectionComponent } from './main/inventory/inventory-section/inventory-section.component';
import { InventoryComponent } from './main/inventory/inventory.component';
import { UseMultiComponent } from './main/inventory/use-multi/use-multi.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './main/map/map.component';
import { OptionsComponent } from './main/options/options.component';
import { DescSkillComponent } from './main/skills/desc-skill/desc-skill.component';
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
    CharsheetComponent,
    ChatComponent,
    ChoiceComponent,
    CouncilComponent,
    CraftingComponent,
    DamageComponent,
    DescEffectsComponent,
    DescFamiliarComponent,
    DescItemComponent,
    DescOutfitComponent,
    DescSkillComponent,
    DescSkillEffectComponent,
    EffectComponent,
    EquipmentComponent,
    FamiliarComponent,
    FightComponent,
    FightEndComponent,
    FightHotkeysComponent,
    GainComponent,
    InventoryComponent,
    InventorySectionComponent,
    ItemComponent,
    KitchenComponent,
    ListEntryComponent,
    LoginComponent,
    MainComponent,
    MapComponent,
    NonFightComponent,
    NoticeComponent,
    OptionsComponent,
    PlaceComponent,
    PoolTableComponent,
    ProgressBarComponent,
    ResultComponent,
    RoutingDirective,
    ShopComponent,
    SkillSectionComponent,
    SkillTableComponent,
    SkillsComponent,
    SpinnerComponent,
    StatsComponent,
    TavernComponent,
    UseMultiComponent,
  ], 
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
  ],
  providers: [ provideHttpClient(withInterceptorsFromDi()) ] })
export class AppModule { }
