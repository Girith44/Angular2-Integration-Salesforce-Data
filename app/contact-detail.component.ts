import {Component} from 'angular2/core';

import {Contact} from './contact';
import * as force from './force';
@Component({
    selector: 'contact-detail',
    inputs: ['contact'],
    templateUrl: '/detail',
    template: `
        <div *ngIf="contact">
            <h2>{{contact.FirstName}} {{contact.LastName}} Details</h2>
            <div>
                <div><label>id: </label>{{contact.Id}}</div>
                <div>
                    <label>First Name:</label>
                    <input type="text" [(ngModel)]="contact.FirstName"/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input type="text" [(ngModel)]="contact.LastName"/>
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" [(ngModel)]="contact.Phone"/>
                </div>
                <div>
                <button (click)="updateContact()">Update</button>
                <button (click)="deleteContact()">Delete</button>
                </div>

            
            </div>
        </div>
    `,
    styles:[`
        label {display:inline-block; width:100px; padding:8px}
        h2 {margin-top:0; font-weight:300}
        input[type=text] {-webkit-appearance:none; width:150px; height:24px; padding:4px 8px; font-size:14px; line-height:1.42857143; border:1px solid #ccc; border-radius:2px;-webkit-box-shadow:none; box-shadow:none}
    `],
})

export class ContactDetailComponent {
    public contact: Contact;
    
    updateContact(){
        force.update('contact', {Id: this.contact.Id, FirstName: this.contact.FirstName, LastName: this.contact.LastName,
                                Phone: this.contact.Phone})
        .then(response => {
            console.log(response);
            window.alert('Contact Updated');
        })
        .catch(error => {
            console.log(error);
        });
    }

    deleteContact(){
        force.del('contact', this.contact.Id)
        .then(response => {
            console.log(response);
            window.alert('Contact Deleted');
        })
        .catch(error => {
            console.log(error);
        });
    }


}

    

 