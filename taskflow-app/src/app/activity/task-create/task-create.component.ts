import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../activity.service';
import { Activity } from '../../activity/task.model';
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
