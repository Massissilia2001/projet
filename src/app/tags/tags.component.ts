import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [FormsModule, CommonModule, TagComponent],
  template: `
    <form (ngSubmit)="submitTag()">
      <input [(ngModel)]="editing.name" name="name" placeholder="Nom de l'étiquette" required />
      <input [(ngModel)]="editing.color" name="color" type="color" required />
      <button type="submit">Ajouter une étiquette</button>
    </form>

    <h2>Liste des Tags</h2>

    <div *ngFor="let tag of tags">
      <app-tag 
        [id]="tag.id" 
        [name]="tag.name" 
        [color]="tag.color" 
        (delete)="deleteTag(tag)"
        (edit)="openEditModal(tag)">
      </app-tag>
    </div>

    <p *ngIf="tags.length === 0">Aucun tag !</p>

    <div *ngIf="isModalOpen" class="modal">
      <div class="modal-content">
        <span (click)="closeModal()" class="close">&times;</span>
        <h3>Modifier l'Étiquette</h3>
        <input [(ngModel)]="editing.name" placeholder="Nom de l'étiquette" required />
        <input [(ngModel)]="editing.color" type="color" required />
        <div class="modal-buttons">
          <button (click)="updateTag()">Valider</button>
          <button (click)="closeModal()">Annuler</button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  tags: { id: string; name: string; color: string }[] = [];
  editing: { id: string; name: string; color: string } = { id: '0', name: '', color: '#ffffff' };
  isModalOpen: boolean = false;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.tags = this.storageService.getTags(); // Charger les tags
  }


   // ajot mis à jour des tag
  submitTag(): void {
    if (this.editing.name) {
      // Vérifiersi  tag existe déja
      const existingTag = this.tags.find(tag => tag.name.toLowerCase() === this.editing.name.toLowerCase());
      
      if (existingTag) {
        alert('Ce tag existe déjà.'); // Affich si le tag existe déjà
        return; 
      }

      if (this.editing.id === '0') {
        // Ajouter un nouveau tag avec 
        const newTagId = Date.now().toString(); 
        this.storageService.addTag({ ...this.editing, id: newTagId });
      } else {
        // Mettre  jour  tag existant
        this.storageService.updateTag(this.editing);
      }
      this.resetEditing();
      this.tags = this.storageService.getTags(); 
    }
  }

  deleteTag(tag: { id: string }): void {
    this.storageService.deleteTag(tag); 
    this.tags = this.storageService.getTags(); 
  }

  openEditModal(tag: { id: string; name: string; color: string }): void {
    this.editing = { ...tag }; 
    this.isModalOpen = true; 
  }

  closeModal(): void {
    this.isModalOpen = false; 
    this.resetEditing(); 
  }

  updateTag(): void {
    if (this.editing.name) {
      this.storageService.updateTag(this.editing);
      this.tags = this.storageService.getTags(); 
      this.closeModal(); 
    }
  }

  resetEditing(): void {
    this.editing = { id: '0', name: '', color: '#ffffff' }; 
  }
}