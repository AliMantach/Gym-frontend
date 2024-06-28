import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  standalone : true,
  imports: [FormsModule , CommonModule]
})
export class ContactsComponent implements OnInit {
  contacts: any[] = [];
  errorMessage: string = '';
  isAddingNewContact: boolean = false;
  newContact: any = { name: '', email: '', phone: '' };
  editingContact: any = null;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.apiService.getContacts().subscribe(
      response => {
        this.contacts = response;
        this.errorMessage = '';
      },
      error => {
        console.error('Error loading contacts:', error);
        this.errorMessage = error.error.message || 'An error occurred while loading contacts';
      }
    );
  }

  addContact() {
    this.apiService.addContact(this.newContact).subscribe(
      response => {
        this.contacts.push(response);
        this.isAddingNewContact = false;
        this.newContact = { name: '', email: '', phone: '' };
      },
      error => {
        console.error('Error adding contact:', error);
        this.errorMessage = error.error.message || 'An error occurred while adding the contact';
      }
    );
  }

  editContact(contact: any) {
    this.editingContact = { ...contact };
  }

  updateContact(contactId: string) {
    this.apiService.updateContact(contactId, this.editingContact).subscribe(
      response => {
        const index = this.contacts.findIndex(contact => contact._id === contactId);
        if (index !== -1) {
          this.contacts[index] = response;
        }
        this.editingContact = null;
      },
      error => {
        console.error('Error updating contact:', error);
        this.errorMessage = error.error.message || 'An error occurred while updating the contact';
      }
    );
  }

  deleteContact(contactId: string) {
    this.apiService.deleteContact(contactId).subscribe(
      response => {
        this.contacts = this.contacts.filter(contact => contact._id !== contactId);
      },
      error => {
        console.error('Error deleting contact:', error);
        this.errorMessage = error.error.message || 'An error occurred while deleting the contact';
      }
    );
  }

  openNewContactForm() {
    this.isAddingNewContact = true;
  }

  cancelNewContact() {
    this.isAddingNewContact = false;
    this.newContact = { name: '', email: '', phone: '' };
  }

  cancelEdit() {
    this.editingContact = null;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
