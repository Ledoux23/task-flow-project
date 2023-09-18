// import { Component, OnInit } from '@angular/core';
// import { UserService } from './../user.service';

// @Component({
//   selector: 'app-user-details',
//   templateUrl: './user-details.component.html',
//   styleUrls: ['./user-details.component.css']
// })
// export class UserDetailsComponent implements OnInit {
//   public user: any = {}; // Initialisez l'utilisateur récupéré

//   constructor(private userService: UserService) {}

//   ngOnInit() {
//     // Exemple d'utilisation de la méthode pour récupérer un utilisateur par prénom et nom de famille
//     const firstName = 'John';
//     const lastName = 'Doe';

//     this.userService.getUserByName(firstName, lastName)
//       .subscribe(
//         (user) => {
//           this.user = user;
//           console.log('Utilisateur récupéré :', this.user);
//         },
//         (error) => {
//           console.error('Erreur lors de la récupération de l\'utilisateur', error);
//         }
//       );
//   }
// }
