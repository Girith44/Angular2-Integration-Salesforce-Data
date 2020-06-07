import {Component} from 'angular2/core';

import {Account} from './account';
import{AccountDetailComponent} from './account-detail.component';

import {Contact} from './contact';
import {ContactDetailComponent} from './contact-detail.component';

import * as force from './force';

@Component({
    selector: 'my-app',
    template: `
        <header *ngIf="notLogged == false"><h1>Salesforce Accounts</h1></header>
        <div class="content">
            <ul class="accounts">
                <li *ngFor="#account of accounts" (click)="onSelectAcc(account)" [class.selected]="account === selectedAccount">
                    {{account.Name}}
                </li>
                <button *ngIf="notLogged == false" (click)="onSelectNewAccount()">Create New Account</button>
            </ul>
            <div *ngIf="newAccountInfo">
                <h2>Enter New Account Details</h2>
                <div> 
                    <div>
                        <label>Account Name*:</label>
                        <input type="text" [(ngModel)]="Name" />
                    </div>
                    <div>
                        <label>First Name*:</label>
                        <input type="text" [(ngModel)]="AccFirstName" />
                    </div>
                    <div>
                        <label>Last Name*:</label>
                        <input type="text" [(ngModel)]="AccLastName" />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="text" [(ngModel)]="AccPhone"/>
                    </div>
                    <div>
                        <button (click)="createAccount()">Done</button>
                        <h4>(*) Required Fields</h4>
                    </div>
                </div>
            </div>
            <account-detail [account]="selectedAccount"></account-detail>
            <button class="btn-slt" (click)="onSelectBackAcc()" *ngIf="backButtonAcc">Back</button>
        </div>
        <header *ngIf="notLogged == false"><h1>Salesforce Contacts</h1></header>
        <div class="content">
            <ul class="contacts">
                <li *ngFor="#contact of contacts" (click)="onSelect(contact)" [class.selected]="contact === selectedContact">
                    {{contact.FirstName}} {{contact.LastName}}
                </li>
                <button *ngIf="notLogged == false" (click)="onSelectNewContact()">Create New Contact</button>
            </ul>
            <div *ngIf="newContactInfo">
                <h2>Enter New Contact Details</h2>
                <div> 
                    <div>
                        <label>First Name:</label>
                        <input type="text" [(ngModel)]="FirstName" />
                    </div>
                    <div>
                        <label>Last Name*:</label>
                        <input type="text" [(ngModel)]="LastName"/>
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="text" [(ngModel)]="Phone"/>
                    </div>
                    <div>
                        <button (click)="createContact()">Done</button>
                        <h4>(*) Required Fields</h4>
                    </div>
                </div>
            </div>
            
            <contact-detail [contact]="selectedContact"></contact-detail>
            <button class="btn-slt" (click)="onSelectBack()" *ngIf="backButton">Back</button>
        </div>
        <div *ngIf="notLogged" class="login">
            <button class="col" color="primary" (click)="logIn()">Log in to Salesforce</button>
        <div>
        
        `,
    styles:[`
        header {background-color:#03A9F4; padding:14px; margin-bottom:12px; box-shadow:0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)}
        h1 {font-weight:300}
        header > h1 {font-weight:300; font-size:24px; margin:0; color: #FFFFFF}
        .content {display:flex}
        .contacts {list-style-type: none; width: 220px; margin: 0 24px 0 -24px}
        .contacts li {padding:4px 8px; cursor:pointer}
        .contacts li:hover {color:#369; background-color:#EEE}

        .accounts {list-style-type: none; width: 220px; margin: 0 24px 0 -24px}
        .accounts li {padding:4px 8px; cursor:pointer}
        .accounts li:hover {color:#369; background-color:#EEE}

        .selected { background-color:#EEE; color:#369}
        label {display:inline-block; width:150px; padding:8px}
        h2 {margin-top:0; font-weight:300}
        input[type=text] {-webkit-appearance:none; width:150px; height:24px; padding:4px 8px; font-size:14px; line-height:1.42857143; border:1px solid #ccc; border-radius:2px;-webkit-box-shadow:none; box-shadow:none}
    
        .login {padding-left:20px; margin-top:20; height: 150px; width: 120px;}
        .btn-slt { height: 30px;}
    `],
    directives: [ContactDetailComponent, AccountDetailComponent]
    
})

export class AppComponent {

    public contacts:Contact[];
    public accounts:Account[];
    public selectedContact:Contact;
    public selectedAccount:Account;

    private newContactInfo:Boolean = false;
    private newAccountInfo:Boolean = false;
    private notLogged:Boolean = true;
    private isContactSelected = false;
    private isAccountSelected = false;
    private backButton = false;
    private backButtonAcc = false;
    
    FirstName;
    LastName;
    Phone;
    Name;
    AccPhone;
    AccFirstName;
    AccLastName;



    constructor() {

        force.init({
            appId: "3MVG9sG9Z3Q1Rlbc4tkIx2fI3ZUDVyYt86Ypl8ZqBXTpzPbQNHxq7gpwKcN75BB.fpgHxzSWgwgRY6nVfvBUe",
            proxyURL: "https://dev-cors-proxy.herokuapp.com/"
        });
        
    }

    logIn(){
        force.login().then(() => {
            force.query("select id, firstname, lastname, phone from contact").then(result => this.contacts = (<any>result).records);
            force.query("select id, name, phone from account").then(result => this.accounts = (<any>result).records);
            this.notLogged = false;
        });
        
    }

    onSelect(contact: Contact) {
        this.selectedContact = contact;
        this.newContactInfo = false;
        this.backButton = true;
    }
    onSelectAcc(account: Account) {
        this.selectedAccount = account;
        this.newAccountInfo = false;
        this.backButtonAcc = true;
    }
    onSelectNewAccount(account: Account) {
        this.selectedAccount = null;
        this.newAccountInfo = true;
        this.backButtonAcc = true;
    }
    onSelectNewContact(){
        this.selectedContact = null;
        this.newContactInfo = true;
        this.backButton = true;
    }

    onSelectBack(){
        this.selectedContact = null;
        this.newContactInfo = false;
        this.backButton = false;
        force.query("select id, firstname, lastname, phone from contact").then(result => this.contacts = (<any>result).records);
    }

    onSelectBackAcc(){
        this.selectedAccount = null;
        this.newAccountInfo = false;
        this.backButtonAcc = false;
        force.query("select id, name, phone from account").then(result => this.accounts = (<any>result).records);
    }
    
    createAccount(){
        force.create('account', {Name: this.Name, First_Name__c: this.AccFirstName, Last_Name__c: this.AccLastName,  Phone: this.AccPhone
                    })
        .then(response => {
            console.log(response);
            window.alert('Account Created');
            force.query("select id, name, phone from account").then(result => this.accounts = (<any>result).records);
        })
        .catch(error => {
            console.log(error);
        });
    }
    

    createContact(){
        force.create('contact', {FirstName: this.FirstName, LastName: this.LastName, Phone: this.Phone
                    })
    .then(response => {
        console.log(response);
        window.alert('Contact Created');
        force.query("select id, firstname, lastname, phone from contact").then(result => this.contacts = (<any>result).records);
    })
    .catch(error => {
        console.log(error);
    });
    }

}