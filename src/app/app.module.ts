import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from  '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PokedexService } from './pokedex.service';
import { HomeComponent } from './home/home.component';
import { PokemansComponent } from './pokemans/pokemans.component';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemansComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'pokemon/:pokemonId', component: PokemansComponent},
      
    ]),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [PokedexService],
  bootstrap: [AppComponent]
})
export class AppModule { }
