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

  getPokemon(offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?offset=${offset}&limit=${limit}`)
      .pipe(
        map((response: any) => {
          return response.results.map((item: any, idx: number) => {
            const id: number = idx + offset + 1;
            return {
              name: item.name,
              sprite: `${this.baseSpriteUrl}${id}.png`,
              id: id
            }
          });
        })
      );
  }
}
