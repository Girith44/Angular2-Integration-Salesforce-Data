import {Component} from 'angular2/core';

import {Account} from './account';
import * as force from './force';

@Component({
    selector: 'account-detail',
    inputs: ['account'],
    template: `
        <div *ngIf="account">
            <h2>{{account.Name}} Details</h2>
            <div>
                <div><label>id: </label>{{account.Id}}</div>
                <div>
                    <label>Name:</label>
                    <input type="text" [(ngModel)]="account.Name"/>
                </div>
                <div>
                    <label>Phone:</label>
                    <input type="text" [(ngModel)]="account.Phone"/>
                </div>
                <div>
                    <button (click)="updateAccount()">Update</button>
                    <button (click)="deleteAccount()">Delete</button>
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

export class AccountDetailComponent {
    public account: Account;

    updateAccount(){
        force.update('account', {Id: this.account.Id, Name: this.account.Name,
                                Phone: this.account.Phone})
        .then(response => {
            console.log(response);
            window.alert('Account Updated');
        })
        .catch(error => {
            console.log(error);
        });
    }

    deleteAccount(){
        force.del('account', this.account.Id)
        .then(response => {
            console.log(response);
            window.alert('Account Deleted');
        })
        .catch(error => {
            console.log(error);
        });
    }
}