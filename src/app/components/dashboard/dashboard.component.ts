import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  trainees: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadTrainees();
  }

  loadTrainees(): void {
    this.apiService.getTrainees().subscribe(
      (data) => {
        this.trainees = data;
      },
      (error) => {
        console.error('Failed to load trainees', error);
      }
    );
  }
}
