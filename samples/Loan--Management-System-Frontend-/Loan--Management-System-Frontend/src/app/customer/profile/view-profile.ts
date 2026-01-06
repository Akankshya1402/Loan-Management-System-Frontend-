import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-profile.html',
  styleUrls: ['./view-profile.css']
})
export class ViewProfileComponent implements OnInit {

  profile: any;
  loading = true;
  error = '';

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe({
      next: (res) => {
        this.profile = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load profile';
        this.loading = false;
      }
    });
  }
}
