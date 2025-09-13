import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

import { PokemonDetail, PokemonListItem, PokemonListResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private http = inject(HttpClient);
  private baseUrl = 'https://pokeapi.co/api/v2';

  public pokemonList = signal<PokemonListItem[]>([]);
  public selectedPokemon = signal<PokemonDetail | null>(null);
  public isLoadingList = signal<boolean>(false);
  public isLoadingDetail = signal<boolean>(false);
  public listError = signal<string | null>(null);
  public detailError = signal<string | null>(null);

  constructor() {
  }

  /**
   * Fetches a list of Pokémon.
   * @param offset The starting offset for the list.
   * @param limit The number of Pokémon to fetch.
   */
  public getPokemonList(offset: number = 0, limit: number = 30): void {
    this.isLoadingList.set(true);
    this.listError.set(null);

    this.http.get<PokemonListResponse>(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`).pipe(
      map(response => response.results),
      tap(results => this.pokemonList.set(results)),
      catchError(error => {
        console.error('Error fetching Pokémon list:', error);
        this.listError.set('Failed to load Pokémon list.');
        return of([]);
      })
    ).subscribe({
      complete: () => this.isLoadingList.set(false)
    });
  }

  /**
   * Fetches details for a specific Pokémon by name or ID.
   * @param identifier The name or ID of the Pokémon.
   */
  public getPokemonDetails(identifier: string | number): void {
    this.isLoadingDetail.set(true);
    this.detailError.set(null);
    this.selectedPokemon.set(null);

    this.http.get<PokemonDetail>(`${this.baseUrl}/pokemon/${identifier}`).pipe(
      tap(detail => this.selectedPokemon.set(detail)),
      catchError(error => {
        console.error(`Error fetching Pokémon ${identifier} details:`, error);
        this.detailError.set(`Failed to load details for ${identifier}.`);
        return of(null);
      })
    ).subscribe({
      complete: () => this.isLoadingDetail.set(false)
    });
  }

  /**
   * Clears the selected Pokémon details.
   */
  public clearSelectedPokemon(): void {
    this.selectedPokemon.set(null);
    this.detailError.set(null);
  }
}
