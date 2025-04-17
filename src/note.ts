export class Note {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
  
    constructor(id: number, title: string, content: string, createdAt: Date) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.createdAt = createdAt;
    }
  
    updateContent(newContent: string) {
      this.content = newContent;
    }
    formatCreationDate(): string {
        return this.createdAt.toLocaleDateString();
    
  }} 