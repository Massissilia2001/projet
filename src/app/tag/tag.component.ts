import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  template: `
    <div [style.background-color]="color" class="tag">
      <span>{{ name }}</span>
      <div>
        <button class="delete" (click)="onDelete()">Supprimer</button>
        <button class="edit" (click)="onEdit()">Modifier</button>
      </div>
    </div>
  `,
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input() id!: string;   
  @Input() name!: string; 
  @Input() color!: string; 

  @Output() delete = new EventEmitter<string>(); 
  @Output() edit = new EventEmitter<string>();   

  onDelete() {
    this.delete.emit(this.id); 
  }

  onEdit() {
    this.edit.emit(this.id); 
  }
}