// import { Component, OnInit } from '@angular/core';
// import { ActivityService } from '../activity.service';
// import { Activity } from './task.model';
// import { User } from '../../user/user.model';

// @Component({
//   selector: 'app-task-create',
//   templateUrl: './task-create.component.html',
//   styleUrls: ['./task-create.component.css']
// })

// export class TaskCreateComponent implements OnInit {

//   public title = 'Create an activity';
//   public newActivity: Activity = new Activity('', '', { firstName: '', lastName: '' });
//   public errorMessage: string = '';

//   constructor(private activityService: ActivityService) {}

//   ngOnInit() {}

//   // Méthode pour créer une nouvelle activité
//   createActivity() {
//     // S'assurer que les données de la nouvelle activité sont valides ici
//     if (!this.isDataValid()) {
//       this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
//       return;
//     }

//     // Créer un objet d'activité avec les données du formulaire
//     const newActivityData = {
//       name: this.newActivity.name,
//       description: this.newActivity.description,
//       owner: {
//         firstName: this.newActivity.owner.firstName,
//         lastName: this.newActivity.owner.lastName
//       }
//     };

//     // Vérifier d'abord si l'utilisateur existe
//     this.activityService.getUserByName(this.newActivity.owner.firstName, this.newActivity.owner.lastName)
//     .subscribe(
//       (users: User[]) => { // Spécifier explicitement le type de 'users' comme un tableau d'utilisateurs
//         // L'utilisateur existe, on peut maintenant créer l'activité en utilisant les données de this.newActivity
//           console.log('User : ', users);
//           console.log('this.newActivity.owner : ', this.newActivity.owner);
//         // Vérifier si l'utilisateur est dans la liste des utilisateurs retournée par le service
//         // const matchingUser = users.find((user: User) => // Spécifier explicitement le type de 'user' comme un utilisateur
//         //   user.firstName === this.newActivity.owner.firstName && user.lastName === this.newActivity.owner.lastName
//         // );

//         const userKey = `${this.newActivity.owner.firstName}_${this.newActivity.owner.lastName}`;
//         const matchingUser = users[userKey];

//         if (matchingUser) {
//           // L'utilisateur existe dans la liste
//           this.activityService.createActivity(this.newActivity)
//             .subscribe(
//               (response) => {
//                 console.log('Activité créée avec succès :', response);
//                 // Réinitialiser les données du formulaire ou effectuer d'autres actions nécessaires
//                 this.newActivity = new Activity('', '', { firstName: '', lastName: '' });
//                 this.errorMessage = ''; // Réinitialiser également les messages d'erreur
//                 // Possibilité d'ajouter ici du code pour mettre à jour l'affichage ou afficher un message de succès.
//               },
//               (error) => {
//                 console.error('Erreur lors de la création de l\'activité', error);
//                 // Afficher un message d'erreur approprié à l'utilisateur en cas d'échec
//                 this.errorMessage = 'Une erreur s\'est produite lors de la création de l\'activité.';
//               }
//             );
//         } else {
//           // L'utilisateur n'existe pas dans la liste
//           console.error('Utilisateur non trouvé dans la liste');
//           this.errorMessage = 'L\'utilisateur n\'existe pas.';
//         }
//       },
//       (error) => {
//         console.error('Erreur lors de la vérification de l\'utilisateur', error);
//         this.errorMessage = 'Une erreur s\'est produite lors de la vérification de l\'utilisateur.';
//       }
//     );
//   }

//   // Méthode pour vérifier la validité des données (possibilité de personnaliser les règles de validation)
//   isDataValid(): boolean {
//     // Par exemple, vérifier si les champs obligatoires sont remplis
//     return !!this.newActivity.name.trim() && !!this.newActivity.description.trim();
//   }

// }

import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { Activity } from './task.model';
import { User } from '../../user/user.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})

export class TaskCreateComponent implements OnInit {

  public title = 'Create an activity';
  public newActivity: Activity = new Activity('', '', { firstName: '', lastName: '' });
  public errorMessage: string = '';

  constructor(private activityService: ActivityService) {}

  ngOnInit() {}

  // Méthode pour créer une nouvelle activité
  createActivity() {

    if (!this.isDataValid()) {  // S'assurer que les données de la nouvelle activité sont valides
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Obtenir l'ID de l'utilisateur à partir de son nom
    this.activityService.getUserByName(this.newActivity.owner.firstName, this.newActivity.owner.lastName)
    .subscribe(
      (user: User | null) => {
        if (user) {
          // L'utilisateur existe, on peut maintenant créer l'activité en utilisant les données de this.newActivity
          this.newActivity.owner.id = user.id; // Assurez-vous que votre modèle Activity possède une propriété "id" dans owner
          this.activityService.createActivity(this.newActivity)
            .subscribe(
              (response) => {
                console.log('Activité créée avec succès :', response);
                // Réinitialiser les données du formulaire ou effectuer d'autres actions nécessaires
                this.newActivity = new Activity('', '', { firstName: '', lastName: '' });
                this.errorMessage = ''; // Réinitialiser également les messages d'erreur
                // Possibilité d'ajouter ici du code pour mettre à jour l'affichage ou afficher un message de succès.
                window.alert('L\'activité a été créée avec succès!');
              },
              (error) => {
                console.error('Erreur lors de la création de l\'activité', error);
                // Afficher un message d'erreur approprié à l'utilisateur en cas d'échec
                this.errorMessage = 'Une erreur s\'est produite lors de la création de l\'activité.';
              }
            );
        } else {
          // L'utilisateur n'existe pas dans la liste
          console.error('Utilisateur non trouvé dans la liste');
          this.errorMessage = 'L\'utilisateur n\'existe pas.';
        }
      },
      (error) => {
        console.error('Erreur lors de la vérification de l\'utilisateur', error);
        this.errorMessage = 'Une erreur s\'est produite lors de la vérification de l\'utilisateur.';
      }
    );
  }

  // Méthode pour vérifier la validité des données (possibilité de personnaliser les règles de validation)
  isDataValid(): boolean {
    // Par exemple, vérifier si les champs obligatoires sont remplis
    return !!this.newActivity.name.trim() && !!this.newActivity.description.trim();
  }

}
