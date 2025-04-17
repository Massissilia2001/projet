import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { StorageService } from '../storage.service';

interface Note {
  id: string;
  title: string;
  date: Date;
  content: string;
  color: string;
  tags: string[];
}

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Liste des Notes</h2>
    <div *ngFor="let note of notes">
      <div class="note" [style.background-color]="note.color">
        <h3>{{ note.title }}</h3>
        <p>Date: {{ note.date | date:'shortDate' }}</p>
        <p>{{ note.content }}</p>
        <p>Tags: {{ note.tags.join(', ') }}</p>
      </div>
    </div>
  `,
  styles: [`
    .note {
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
      background-color: #f8f9fa;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];

  constructor(private storageService: StorageService) {}

  // charg nte

  ngOnInit(): void {
    this.loadNotes();
  }
// recup note
  loadNotes(): void {
    this.notes = this.storageService.getNotes();
  }
}