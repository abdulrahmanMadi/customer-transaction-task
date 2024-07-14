import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnChanges {
  @Input() customers: any[] = [];
  @Input() transactions: any[] = [];
  @Output() customerSelected = new EventEmitter<any>();

  filteredCustomers: any[] = [];

  ngOnInit() {
    this.filteredCustomers = this.mapCustomersWithTransactions(this.customers, this.transactions);
    console.log('ngOnInit: filteredCustomers:', this.filteredCustomers);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['customers'] || changes['transactions']) {
      this.filteredCustomers = this.mapCustomersWithTransactions(this.customers, this.transactions);
      console.log('ngOnChanges: filteredCustomers:', this.filteredCustomers);
    }
  }

  mapCustomersWithTransactions(customers: any[], transactions: any[]) {
    console.log('mapCustomersWithTransactions: customers:', customers);
    console.log('mapCustomersWithTransactions: transactions:', transactions);

    return customers.map(customer => {
      const customerTransactions = transactions.filter(transaction => transaction.customer_id === customer.id);
      console.log(`Customer ID ${customer.id} transactions:`, customerTransactions);

      return {
        ...customer,
        transactions: customerTransactions,
        totalTransaction: customerTransactions.reduce((sum, transaction) => sum + transaction.amount, 0)
      };
    });
  }

  openTransactionDetails(customerId: number) {
    const selectedCustomer = this.customers.find(customer => customer.id === customerId);
    this.customerSelected.emit(selectedCustomer);
  }
}
