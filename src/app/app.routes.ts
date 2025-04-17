import { Routes } from '@angular/router';
import { TagsComponent } from './tags/tags.component';
import { NoteComponent } from './note/note.component';
import { NotesListComponent } from './notes-list/notes-list.component'; 

export const routes: Routes = [
  { path: 'tags', component: TagsComponent },
  { path: 'notes', component: NoteComponent }, 
  { path: 'home', component: NotesListComponent }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/home' } 
];