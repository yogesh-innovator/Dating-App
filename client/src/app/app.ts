import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [JsonPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private http = inject(HttpClient);
  protected title = 'Dating App';
  members = signal<any>([]);
  error: any = '';
  complete: any = '';
  url = 'https://localhost:5001/api/members';
  async ngOnInit() {

     this.members.set(await this.getMembers());
    // this.http.get(this.url).subscribe({
    //   next: response => this.members.set(response),
    //   error: error => this.error = error,
    //   complete: () => console.log('Completed the http request')
    // })


  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get(this.url))
    }
    catch (error) {
      throw error;
    }
  }
}
