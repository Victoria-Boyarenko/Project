import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { ChatMessage } from '../../models/chat-message.model';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class ChatComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage = '';
  errorMessage = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.chatService.getMessages().subscribe({
      next: (data) => {
        this.messages = data;
      },
      error: () => {
        this.errorMessage = 'Please login first';
      }
    });
  }

  sendMessage(): void {
    const text = this.newMessage.trim();
    if (!text) return;

    this.chatService.sendMessage(text).subscribe({
      next: () => {
        this.newMessage = '';
        this.loadMessages();
      },
      error: () => {
        this.errorMessage = 'Message was not sent';
      }
    });
  }
}