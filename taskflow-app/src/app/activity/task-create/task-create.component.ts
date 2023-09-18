import { Component, OnInit } from '@angular/core';
import { ActivityService } from './../activity.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})

export class TaskCreateComponent implements OnInit {
  public title = 'Créer une activité';
  public newActivity: any = {
    name: '', // Initialisez le nom de l'activité
    description: '', // Initialisez la description de l'activité
    // status: 'waiting', // Initialisez le statut de l'activité
    owner: {
      // id: null,
      firstName: '',
      lastName: ''
    }

  }; // Propriété pour stocker les données de la nouvelle activité

  public errorMessage: string = ''; // Propriété pour afficher les messages d'erreur, le cas échéant


  constructor(private activityService: ActivityService) {}

  ngOnInit() {}

  // Méthode pour créer une nouvelle activité
  createActivity() {
    // Assurez-vous que les données de la nouvelle activité sont valides ici (vous pouvez ajouter des vérifications)
    if (!this.isDataValid()) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    // Appelez le service pour créer l'activité
    this.activityService.createActivity(this.newActivity)
      .subscribe(
        (response) => {
          // Traitement de la réponse réussie
          console.log('Activité créée avec succès :', response);
          // Réinitialisez les données du formulaire ou effectuez d'autres actions nécessaires
          this.newActivity = {};
          this.errorMessage = ''; // Réinitialisez également les messages d'erreur
          // Vous pouvez ajouter ici du code pour mettre à jour l'affichage ou afficher un message de succès.
        },
        (error) => {
          console.error('Erreur lors de la création de l\'activité', error);
          // Affichez un message d'erreur approprié à l'utilisateur en cas d'échec
          this.errorMessage = 'Une erreur s\'est produite lors de la création de l\'activité.';
        }
      );
  }

  // Méthode pour vérifier la validité des données (vous pouvez personnaliser les règles de validation)
  isDataValid(): boolean {
    // Par exemple, vous pouvez vérifier si les champs obligatoires sont remplis
    return !!this.newActivity.name && !!this.newActivity.description;
  }
}
