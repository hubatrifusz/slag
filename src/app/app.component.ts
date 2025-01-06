import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SlagListComponent } from "./slag-list/slag-list.component";
import { DetailsComponent } from "./details/details.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SlagListComponent, DetailsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'slag';
  @ViewChild(SlagListComponent) slagListComponent!: SlagListComponent;

  onSlagAdded() {
    if (this.slagListComponent) {
      this.slagListComponent.refreshTable();
    }
  }

  selectedSlagToEdit: any = null;

  onSlagEdit(slag: any): void {
    this.selectedSlagToEdit = slag;
  }
}
