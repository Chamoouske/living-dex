import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

import { PokeapiService } from '../../core/services/pokeapi.service';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent implements OnInit {
  private pokeapiService = inject(PokeapiService);

  public pokemonList = this.pokeapiService.pokemonList;
  public isLoadingList = this.pokeapiService.isLoadingList;
  public listError = this.pokeapiService.listError;

  offset = 0;
  private limit = 30;

  ngOnInit(): void {
    this.pokeapiService.getPokemonList(this.offset, this.limit);
  }

  nextPage(): void {
    this.offset += this.limit;
    this.pokeapiService.getPokemonList(this.offset, this.limit);
  }

  previousPage(): void {
    if (this.offset > 0) {
      this.offset -= this.limit;
      this.pokeapiService.getPokemonList(this.offset, this.limit);
    }
  }

  getPokemonId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
}
