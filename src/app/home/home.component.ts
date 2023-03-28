import { Component } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'pokedex';
  pokemon: Pokemon[] = [];
  isLoading: boolean = false;
  error: boolean = false;

  constructor(private pokedexService: PokedexService) { }

ngOnInit() {
  this.loadMore()
}
loadMore() {
  this.isLoading = true;

  /**
   * Use the Pokedex service
   * to load the next 9 Pokemon.
   */
  this.pokedexService.getPokemon(this.pokemon.length, 9)
    .subscribe(
      (pokemon: any[]) => {
        console.log('from app.component',pokemon);
        pokemon = pokemon.map(p => {
          p.imageLoaded = false;
          return p;
        });
        
        /**
         * If loading was successful
         * we append the result to the list.
         */
        this.pokemon = [...this.pokemon, ...pokemon];
        this.isLoading = false;
        this.error = false;
      },
      (error: any) => {
        this.error = true;
        this.isLoading = false;
      }
    );
}


}
