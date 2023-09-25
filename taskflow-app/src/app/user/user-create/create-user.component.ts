import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})

export class CreateUserComponent implements OnInit {

  public title = 'Create an user';
  public newUser: User = new User(null, '', '', '', ''); // ID initialisé à null
  public errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  // Méthode pour créer une nouvelle activité
  createUser() {

    if (!this.isDataValid()) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.userService.createUser(this.newUser)
      .subscribe(
        (response: User) => {
          console.log('Utilisateur créé avec succès :', response);
          // Réinitialiser les données du formulaire ou effectuer d'autres actions nécessaires
          this.newUser = new User(null, '', '', '', ''); // ID réinitialisé à null
          this.errorMessage = ''; // Réinitialiser également les messages d'erreur
          // Possibilité d'ajouter ici du code pour mettre à jour l'affichage ou afficher un message de succès.
          window.alert('L\'utilisateur a été créé avec succès !');
          this.router.navigate(['/users']); // Rediriger vers la liste des utilisateurs après la création
        },
        (error) => {
          console.error('Erreur lors de la création de l\'utilisateur', error);
          // Afficher un message d'erreur approprié à l'utilisateur en cas d'échec
          this.errorMessage = 'Une erreur s\'est produite lors de la création de l\'utilisateur.';
        }
      );
  }

  // Méthode pour vérifier la validité des données (possibilité de personnaliser les règles de validation)
  isDataValid(): boolean {
    // Par exemple, vérifier si les champs obligatoires sont remplis
    return !!this.newUser.firstName.trim() &&
            !!this.newUser.lastName.trim() &&
            !!this.newUser.email.trim() &&
            !!this.newUser.password.trim();
  }

}
