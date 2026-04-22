import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatMessage } from '../models/chat-message.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private api = 'http://127.0.0.1:8000/api/chat/messages/';

  constructor(private http: HttpClient) {}

  getMessages(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(this.api);
  }

  sendMessage(text: string): Observable<ChatMessage> {
    return this.http.post<ChatMessage>(this.api, { text });
  }
}