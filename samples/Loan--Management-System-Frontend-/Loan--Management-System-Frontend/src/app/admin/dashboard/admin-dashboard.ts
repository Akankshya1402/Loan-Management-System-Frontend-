import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { DashboardResponse } from '../../models/dashboard.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('pieCanvas') pieCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barCanvas') barCanvas!: ElementRef<HTMLCanvasElement>;

  dashboard!: DashboardResponse;
  loading = true;

  private viewReady = false;
  private dataReady = false;

  ngOnInit(): void {
    // FAKE DATA LOAD
    setTimeout(() => {
      this.dashboard = {
        totalLoans: 13,
        approvedLoans: 8,
        pendingLoans: 1,
        rejectedLoans: 4,
        totalDisbursedAmount: 12400000,
        activeCustomers: 17,
        totalEmiCollected: 273090
      };

      this.loading = false;
      this.dataReady = true;
      this.tryRenderCharts();
    }, 500);
  }

  ngAfterViewInit(): void {
    this.viewReady = true;
    this.tryRenderCharts();
  }

  private tryRenderCharts(): void {
    if (this.viewReady && this.dataReady) {
      this.renderCharts();
    }
  }

  private renderCharts(): void {
    this.createPieChart();
    this.createBarChart();
  }

  private createPieChart(): void {
    new Chart(this.pieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [{
          data: [
            this.dashboard.approvedLoans,
            this.dashboard.pendingLoans,
            this.dashboard.rejectedLoans
          ],
          backgroundColor: ['#22c55e', '#facc15', '#ef4444']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  private createBarChart(): void {
    new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Approved', 'Pending', 'Rejected'],
        datasets: [{
          data: [
            this.dashboard.approvedLoans,
            this.dashboard.pendingLoans,
            this.dashboard.rejectedLoans
          ],
          backgroundColor: ['#22c55e', '#facc15', '#ef4444']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}
