import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
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
  selectedSlag: any = null;

  @Output() slagEdit = new EventEmitter<any>();

  constructor(private slagService: SlagService) {}

  ngOnInit(): void {
    this.loadSlagok();
  }

  loadSlagok(): void {
    this.slagService.getSlagok().subscribe((data) => {
      this.slagok = data;
    });
  }

  refreshTable(): void {
    this.loadSlagok();
  }

  showOptions(event: MouseEvent, slag: any): void {
    event.stopPropagation();
    this.selectedSlag = slag;

    const optionsDiv = document.getElementById('options') as HTMLElement;

    const element = event.target as HTMLElement;
    const rect = element.getBoundingClientRect();
    const x = rect.left - 150;
    const y = rect.top + 10;

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

  editSlag(slag: any): void {
    this.selectedSlag = slag;
    this.slagEdit.emit(this.selectedSlag);
    const container = document.querySelector(
      '.details_container'
    ) as HTMLElement;
    container.style.display = 'flex';
  }

  deleteSlag(id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.slagService.deleteSlag(id).subscribe(() => {
        this.loadSlagok();
        this.selectedSlag = null;
      });
    }
  }

  showDetailsWindow() {
    const detailsWindow = document.querySelector(
      '.details_container'
    ) as HTMLElement;
    detailsWindow.style.display = 'flex';
  }
}
