import { Component } from '@angular/core';
import { Subscription } from '../modules/interface_sub';
import { SubscriptionService } from '../services/subscription.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.css'
})
export class SubscriptionComponent {
  subscriptions: Subscription[] = [];
  selectedSubscription: Subscription | null = null;

  constructor(private SubscriptionService: SubscriptionService) { }
  ngOnInit(): void {
    this.loadSubscriptions();
  }

  loadSubscriptions(): void {
    this.SubscriptionService.getSubscriptions().subscribe(data => {
      this.subscriptions = data;
    });
  }

  selectSubscription(subscription: Subscription): void {
    this.selectedSubscription = subscription;
  }
  Cancel(): void {
    this.selectedSubscription = null;
  }

  addSubscription(subscription: Subscription): void {
    this.SubscriptionService.addSubscription(subscription).subscribe(() => {
      this.loadSubscriptions();
    });
  }

  updateSubscription(subscription: Subscription): void {
    if (this.selectedSubscription) {
      this.SubscriptionService.updateSubscription(this.selectedSubscription._id!, subscription).subscribe(() => {
        this.loadSubscriptions();
        this.selectedSubscription = null;  // Deselect after update
      });
    }
  }

  deleteSubscription(id: string): void {
    this.SubscriptionService.deleteSubscription(id).subscribe(() => {
      this.loadSubscriptions();
      this.selectedSubscription = null;  // Deselect after deletion
    });
  }
}
