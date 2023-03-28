import { Component } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { PokemonSpecs } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemans',
  templateUrl: './pokemans.component.html',
  styleUrls: ['./pokemans.component.css']
})
export class PokemansComponent {
  pokemonSpecs: PokemonSpecs[] = [];

  constructor(private pokedexService: PokedexService, private route: ActivatedRoute ) { }

  ngOnInit() {
    const idFromUrl = Number(this.route.snapshot.paramMap.get('pokemonId'))
    console.log(idFromUrl)

    this.getSpecs(idFromUrl)
    
}

  getSpecs(id: number) {
    this.pokedexService.getPokemonSpecs(id)
      .subscribe((pokemonSpecs: any) => {
       
        this.pokemonSpecs = [pokemonSpecs];
        console.log(pokemonSpecs)
        pokemonSpecs.abilities.map((p: any) => {
          console.log(p)
          

        }
          )
        
        
      })
  }

  logSpecs() {
    console.log(this.pokemonSpecs)
  }





}
