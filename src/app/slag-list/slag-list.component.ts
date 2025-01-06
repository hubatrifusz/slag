import { Component, HostListener, OnInit } from '@angular/core';
import { SlagService } from '../services/slag.service';

@Component({
  selector: 'app-slag-list',
  standalone: true,
  imports: [],
  templateUrl: './slag-list.component.html',
  styleUrl: './slag-list.component.scss',
})
export class SlagListComponent implements OnInit {
  slagok: any[] = [];

  constructor(private slagService: SlagService) {}

  ngOnInit(): void {
    this.loadSlagok();
  }

  loadSlagok(): void {
    this.slagService.getSlagok().subscribe((data) => {
      this.slagok = data;
    });
  }

  showOptions(event: MouseEvent) {
    const element = event.target as HTMLElement;
    const rect = element.getBoundingClientRect();
    const x = rect.left - 110;
    const y = rect.top + 10;

    const optionsDiv = document.getElementById('options') as HTMLElement;

    optionsDiv.style.top = y + 'px';
    optionsDiv.style.left = x + 'px';
    optionsDiv.style.display = 'block';
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent): void {
    const optionsDiv = document.getElementById('options') as HTMLElement;

    const target = event.target as HTMLElement;

    if (!target.classList.contains('opt')) {
      optionsDiv.style.display = 'none';
    }
  }
}
