import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';
  private baseSpriteUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

  constructor(private http: HttpClient) { }

  // getPokemon(offset: number, limit: number): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
  //     .pipe(
  //       map((response: any) => {
  //         console.log(response)
  //         return response.results.map((item: any, idx: number) => {
  //           const id: number = idx + offset + 1;
  //           return {
  //             name: item.name,
  //             sprite: `${this.baseSpriteUrl}${id}.png`,
  //             id: id
  //           }
  //         });
  //       })
  //     );
  // }

  getPokemon(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?limit=100`)
      .pipe(
        map((response: any) => {
          
          return response.results.map((item: any, idx: number) => {
            
            const idString: number = item.url.split('/')[6];
            const id: number = +idString
           
            return {
              name: item.name,
              url: item.url,
              id: id,
              sprite: `${this.baseSpriteUrl}${id}.png`
            }
          });
        })
      );
  }

  getPokemonSpecs(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${id}`)
      .pipe(
        map((response: any) => {
          return {
            id: response.id,
            name: response.name,
            height: response.height,
            weight: response.weight,
            abilities: response.abilities,
            types: response.types,
            stats: response.stats,
            sprites: response.sprites
            
          }
        })
      );
  }
}
