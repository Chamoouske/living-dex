import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { PokeapiService } from '../../core/services/pokeapi.service';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { F } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatFormField,
    MatLabel,
    MatIconModule,
    PokemonCardComponent
  ],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent implements OnInit {
  private pokeapiService = inject(PokeapiService);

  public pokemonList = this.pokeapiService.pokemonList;
  public isLoadingList = this.pokeapiService.isLoadingList;
  public listError = this.pokeapiService.listError;

  idNationalDex = '';

  offset = 0;
  limit = 30;

  ngOnInit(): void {
    this.loadPokemonPage();
  }

  private loadPokemonPage(): void {
    this.pokeapiService.pokemonList.set([]);
    this.pokeapiService.getPokemonList(this.offset, this.limit);
  }

  nextPage(): void {
    this.offset += this.limit;
    this.loadPokemonPage();
  }

  previousPage(): void {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.loadPokemonPage();
    }
  }

  searchBox($event: any): void {
    const value = $event.target.value;
    if (value && value > 0) {
      this.idNationalDex = value;
      this.offset = Math.floor((value - 1) / this.limit) * this.limit;
      console.log(this.offset);

      this.loadPokemonPage();
    }
  }
}
