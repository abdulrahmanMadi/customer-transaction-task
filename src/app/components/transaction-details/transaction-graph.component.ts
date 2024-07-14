import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent {
  @Input() customer!: any;
  @Input() transactions: any[] = [];

  getCustomerTransactions() {
    return this.transactions.filter(transaction => transaction.customer_id === this.customer.id);
  }
}
