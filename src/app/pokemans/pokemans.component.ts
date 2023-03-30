import { Component } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { PokemonSpecs } from '../pokemon';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pokemans',
  templateUrl: './pokemans.component.html',
  styleUrls: ['./pokemans.component.css'],
})
export class PokemansComponent {
  pokemonSpecs: PokemonSpecs[] = [];
  abilities: any[] = [];
  sprites: string = '';
  stats: any[] = [];
  types: any[] = [];

  constructor(
    private pokedexService: PokedexService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idFromUrl = Number(this.route.snapshot.paramMap.get('pokemonId'));
    console.log(idFromUrl);

    this.getSpecs(idFromUrl);
  }

  getSpecs(id: number) {
    this.pokedexService.getPokemonSpecs(id).subscribe((pokemonSpecs: any) => {
      console.log('specs from fetch',  pokemonSpecs)
      pokemonSpecs.abilities = pokemonSpecs.abilities.map((p: any) => {
        return p.ability.name;
      })
      pokemonSpecs.sprites = pokemonSpecs.sprites.other.dream_world.
      front_default;
      this.sprites= pokemonSpecs.sprites
      pokemonSpecs.stats = pokemonSpecs.stats.map((p: any) => {
        return  {base_stat: p.base_stat, name: p.stat.name}
      })
      
      this.pokemonSpecs = [pokemonSpecs]
      
      





      // this.abilities = pokemonSpecs.abilities.map((p: any) => {
      //   return p.ability.name;
      // });
      // this.sprites = pokemonSpecs.sprites.other.dream_world.front_default;
      // this.stats = pokemonSpecs.stats;
      // {}
      // this.types = pokemonSpecs.types;
      // this.pokemonSpecs = [{weight: pokemonSpecs.weight}, {height: pokemonSpecs.height}, {name: pokemonSpecs.name}, {id: pokemonSpecs.id}]
      console.log(this.pokemonSpecs)
        });

  }

  logSpecs(p: any) {
    console.log(p);
  }



  //same critiques from the home component
}
