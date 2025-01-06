import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SlagService } from '../services/slag.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  @Output() slagAdded = new EventEmitter<void>();
  @Input() slagToEdit: any = null;

  slagForm: FormGroup;

  constructor(private fb: FormBuilder, private slagService: SlagService) {
    this.slagForm = this.fb.group({
      nev: ['', Validators.required],
      hossz: ['', Validators.required],
      anyaga: ['', Validators.required],
      nyomasallo: ['', Validators.required],
      csatlakozo_meret: ['', Validators.required],
      ar: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      kep: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['slagToEdit'] && this.slagToEdit) {
      this.slagForm.reset();
      this.slagForm.patchValue(this.slagToEdit);
    }
  }

  onSubmit() {
    if (this.slagForm.valid) {
      if (this.slagToEdit && this.slagToEdit.id) {
        this.slagService
          .updateSlag(this.slagToEdit.id, this.slagForm.value)
          .subscribe({
            next: () => {
              this.slagAdded.emit();
              this.clearForm();
            },
            error: (err) => {
              console.error('Error updating slag:', err);
              alert('Failed to update slag');
            },
          });
      } else {
        this.slagService.addSlag(this.slagForm.value).subscribe({
          next: () => {
            this.slagAdded.emit();
            this.clearForm();
          },
          error: (err) => {
            console.error('Error adding slag:', err);
            alert('Failed to add slag');
          },
        });
      }

      const detailsWindow = document.querySelector(
        '.details_container'
      ) as HTMLElement;
      detailsWindow.style.display = 'none';
    } else {
      alert('Please fill out all required fields!');
    }
  }

  clearForm() {
    this.slagForm.reset();
    this.slagToEdit = null;
  }

  onReset() {
    const container = document.querySelector(
      '.details_container'
    ) as HTMLElement;
    container.style.display = 'none';
  }

  addData() {}
}
