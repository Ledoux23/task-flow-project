import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {

  public title = 'List of users';
  public users: any[] = [];
  private _userFilter = '';
  public filteredUsers: any[] = [];
  public searchTerm: string = ''; // Initialiser la propriété searchTerm


  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchUsers(); // Appel de la méthode pour récupérer les utilisateurs depuis le backend
    this.userFilter = '';
  }

  fetchUsers() {
    this.userService.getAllUsers()
      .subscribe(
        (response) => {
          this.users = response;
            console.log('Données récupérées du backend :', this.users);
          this.filteredUsers = this.users;   // Rien n'est encore filtré au départ
            console.log('Données du filteredActivities :', this.filteredUsers);
        },
        (error) => {
          console.error('Erreur lors de la récupération des activités depuis le backend', error);
        }
      );
  }


  navigateToCreateUser() {
    this.router.navigate(['/create-user']);
  }

  // getter et setter pour _userFilter
  public get userFilter(): string {
    return this._userFilter;
  }

  public set userFilter(filter: string) {

    this._userFilter = filter;
    this.filteredUsers = this.userFilter ? this.filterUsers(this.userFilter) : this.users;

  }


  filterBy: 'firstName' | 'lastName' = 'firstName'; // Par défaut, filtre par prénom

  private filterUsers(criteria: string): User[] {
    criteria = criteria.toLocaleLowerCase().trim();

    if (!criteria) {
      return this.users;
    }

    return this.users.filter((user: User) => {
      const filterField = this.filterBy === 'firstName' ? user.firstName : user.lastName;
      return filterField.toLocaleLowerCase().includes(criteria);
    });
  }


  applyFilter() {
    this.filteredUsers = this.filterUsers(this.searchTerm);
  }



}
