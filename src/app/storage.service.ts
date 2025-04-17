import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private tagsKey: string = 'tags';
  private notesKey: string = 'notes';

  constructor() {}

  // Méthodes pour les tags
  getTags(): { id: string; name: string; color: string }[] {
    const tags = localStorage.getItem(this.tagsKey);
    return tags ? JSON.parse(tags) : [];
  }

  saveTags(tags: { id: string; name: string; color: string }[]): void {
    localStorage.setItem(this.tagsKey, JSON.stringify(tags));
  }

  addTag(tag: { id: string; name: string; color: string }): void {
    const tags = this.getTags();
    tags.push(tag);
    this.saveTags(tags);
  }

  updateTag(updatedTag: { id: string; name: string; color: string }): void {
    let tags = this.getTags();
    tags = tags.map(tag => (tag.id === updatedTag.id ? updatedTag : tag));
    this.saveTags(tags);
  }

  deleteTag(tag: { id: string }): void {
    let tags = this.getTags();
    tags = tags.filter(t => t.id !== tag.id);
    this.saveTags(tags);
  }

  // Méthodes pour les notes
  getNotes(): { id: string; title: string; date: Date; content: string; color: string; tags: string[] }[] {
    const notes = localStorage.getItem(this.notesKey);
    return notes ? JSON.parse(notes) : [];
  }

  addNote(note: { id: string; title: string; date: Date; content: string; color: string; tags: string[] }): void {
    const notes = this.getNotes();
    notes.push(note);
    this.saveNotes(notes);
  }

  updateNote(updatedNote: { id: string; title: string; date: Date; content: string; color: string; tags: string[] }): void {
    let notes = this.getNotes();
    notes = notes.map(note => (note.id === updatedNote.id ? updatedNote : note));
    this.saveNotes(notes);
  }

  deleteNote(note: { id: string }): void {
    let notes = this.getNotes();
    notes = notes.filter(n => n.id !== note.id);
    this.saveNotes(notes);
  }

  private saveNotes(notes: { id: string; title: string; date: Date; content: string; color: string; tags: string[] }[]): void {
    localStorage.setItem(this.notesKey, JSON.stringify(notes));
  }
}
