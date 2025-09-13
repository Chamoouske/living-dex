import { CommonModule, Location } from '@angular/common';
import { Component, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { PokeapiService } from '../../core/services/pokeapi.service';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';

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
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private boxId = signal(this.route.snapshot.paramMap.get('boxId') ?? '0');
  private oldBoxId: string | null = null;

  public pokemonList = this.pokeapiService.pokemonList;
  public isLoadingList = this.pokeapiService.isLoadingList;
  public listError = this.pokeapiService.listError;

  idNationalDex = signal('');

  offset = () => (Number(this.boxId()) - 1) * this.limit;
  limit = 30;

  constructor() {
    effect(() => {
      let newOffset = Math.floor((Number(this.idNationalDex()) - 1) / this.limit) + 1;
      this.boxId.set((newOffset > 0 ? newOffset : 1).toString());
    });

    effect(() => {
      if (this.oldBoxId === this.boxId()) {
        return;
      }
      this.oldBoxId = this.boxId();
      if (Number(this.boxId()) < 1) {
        this.boxId.set('1');
        return;
      }
      this.location.go(`/boxes/${Number(this.boxId())}`);
      this.loadPokemonPage();
    });
  }

  ngOnInit(): void {
    this.loadPokemonPage();
  }

  private loadPokemonPage(): void {
    this.pokeapiService.pokemonList.set([]);
    this.pokeapiService.getPokemonList(this.offset(), this.limit);
  }

  nextPage(): void {
    this.boxId.set((Number(this.boxId()) + 1).toString());
  }

  previousPage(): void {
    this.boxId.set((Number(this.boxId()) - 1).toString());
  }

  searchBox($event: any): void {
    const value = $event.target.value;
    if (value && value > 0) {
      this.idNationalDex.set(value);
    }
  }
}
