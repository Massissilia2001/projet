import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Note {
  id: string;
  title: string;
  date: Date;
  content: string;
  color: string;
  tags: string[];
}

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  notes: Note[] = [];
  filteredNotes: Note[] = [];
  editing: Note = this.createEmptyNote();
  isModalOpen = false;
  searchTerm = '';

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadNotes();
  }

  private createEmptyNote(): Note {
    return {
      id: '0',
      title: '',
      date: new Date(),
      content: '',
      color: '#ffffff',
      tags: []
    };
  }

  loadNotes(): void {
    this.notes = this.storageService.getNotes();
    this.filteredNotes = [...this.notes];
  }

  filterNotes(): void {
    if (!this.searchTerm.trim()) {
      this.filteredNotes = [...this.notes];
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredNotes = this.notes.filter(note => 
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term) ||
      note.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }

  openAddModal(): void {
    this.editing = this.createEmptyNote();
    this.isModalOpen = true;
  }

  openEditModal(note: Note): void {
    this.editing = { ...note };
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.editing = this.createEmptyNote();
  }

  submitNote(): void {
    if (!this.validateNote()) {
      return;
    }

    if (this.isNewNote()) {
      this.addNewNote();
    } else {
      this.updateNote();
    }

    this.closeModal();
    this.loadNotes();
  }

  private validateNote(): boolean {
    if (!this.editing.title.trim()) {
      alert('Le titre est obligatoire');
      return false;
    }

    if (!this.editing.content.trim()) {
      alert('Le contenu est obligatoire');
      return false;
    }

    return true;
  }

  private isNewNote(): boolean {
    return this.editing.id === '0';
  }

  private addNewNote(): void {
    const newNote: Note = {
      ...this.editing,
      id: Date.now().toString(),
      date: new Date()
    };
    this.storageService.addNote(newNote);
  }

  private updateNote(): void {
    this.storageService.updateNote({
      ...this.editing,
      date: new Date(this.editing.date)
    });
  }

  deleteNote(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      this.storageService.deleteNote({ id });
      this.loadNotes();
    }
  }

  updateTags(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.editing.tags = value.split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
  }
}