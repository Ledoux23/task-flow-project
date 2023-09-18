// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-task-list',
//   templateUrl: './task-list.component.html',
//   styleUrls: ['./task-list.component.css']
// })

// export class TaskListComponent {
//   public title = 'Liste des tâches';

//   public tasks: any[] = [
//     {
//       taskId:1,
//       taskName:'Faire du jardinage',
//       imageUrl:'../../assets/jardinage.jpg',
//       description:'Jardiner permet de brûler des calories sans y penser (les anglo-saxons parlent de « green gym »). Biner, bêcher, tondre la pelouse ou même désherber permettent de vous dépenser.',
//       taskItems: ['Quel mois pour faire le jardin ?', 'Quels sont les bienfaits du jardinage ?', 'Activité physique douce']
//     },
//     {
//       taskId: 2,
//       taskName: 'Aller à la salle de sport',
//       imageUrl:'../../assets/jardinage.jpg',
//       description: 'Faites de l\'exercice régulièrement pour rester en forme et en bonne santé. Vous pouvez faire de la musculation, du cardio, du yoga, etc.',
//       taskItems: ['Planifiez votre routine d\'entraînement', 'Apportez de l\'eau et une serviette', 'Échauffez-vous avant l\'exercice']
//     },
//     {
//       taskId: 3,
//       taskName: 'Lire un livre',
//       imageUrl:'../../assets/jardinage.jpg',
//       description: 'La lecture est une excellente façon de s\'instruire, de se divertir et de se détendre. Choisissez un livre qui vous passionne.',
//       taskItems: ['Trouvez un endroit calme pour lire', 'Marquez votre progression avec des signets', 'Discutez du livre avec des amis']
//     },
//     {
//       taskId: 4,
//       taskName: 'Cuisiner un nouveau plat',
//       imageUrl:'../../assets/jardinage.jpg',
//       description: 'Explorez de nouvelles recettes et améliorez vos compétences en cuisine. Épatez vos amis et votre famille avec un délicieux repas.',
//       taskItems: ['Trouvez une recette intéressante', 'Achetez les ingrédients nécessaires', 'Suivez les étapes de la recette']
//     },
//     {
//       taskId: 5,
//       taskName: 'Apprendre une nouvelle langue',
//       imageUrl:'../../assets/jardinage.jpg',
//       description: "L'apprentissage d'une nouvelle langue ouvre de nouvelles portes et offre de nombreuses opportunités. Pratiquez tous les jours.",
//       taskItems: ['Utilisez des applications d\'apprentissage des langues', 'Trouvez un partenaire linguistique', 'Regardez des films dans la langue cible']
//     }
//   ];

//   // public showBadge: boolean = false;
//   public showBadge!: boolean;
//   // '!' to ensure that is not 'null' or 'undefined'

//   public toggleIsNewBadge():void {
//     this.showBadge = !this.showBadge;
//   }

// }



import { Component, OnInit } from '@angular/core';
import { ActivityService } from './../activity.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  public title = 'Liste des tâches';
  public tasks: any[] = [];

  constructor(private activityService: ActivityService) {}

  ngOnInit() {
    this.fetchTasks(); // Appel de la méthode pour récupérer les tâches depuis le backend
  }

  fetchTasks() {
    this.activityService.getAllActivities()
      .subscribe(
        (response) => {
          this.tasks = response;
          console.log('Données récupérées du backend :', this.tasks);
        },
        (error) => {
          console.error('Erreur lors de la récupération des activités depuis le backend', error);
        }
      );
  }


  // updateActivity(activity: any) {
  //   this.activityService.updateActivity(activity.id, activity)
  //     .subscribe(
  //       (response) => {
  //         // Traitement de la réponse réussie
  //         console.log('Activité mise à jour avec succès :', response);
  //         // Vous pouvez ajouter ici du code pour mettre à jour l'affichage ou afficher un message de succès.
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la mise à jour de l\'activité', error);
  //         // Vous pouvez ajouter ici du code pour afficher un message d'erreur à l'utilisateur.
  //       }
  //     );
  // }

  // deleteActivity(id: number) {
  //   this.activityService.deleteActivity(id)
  //     .subscribe(
  //       () => {
  //         // L'activité a été supprimée avec succès
  //         console.log('Activité supprimée avec succès');
  //         // Vous pouvez ajouter ici du code pour mettre à jour l'affichage ou afficher un message de succès.
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la suppression de l\'activité', error);
  //         // Vous pouvez ajouter ici du code pour afficher un message d'erreur à l'utilisateur.
  //       }
  //     );
  // }

  // getActivityStatus(id: number) {
  //   this.activityService.getActivityStatus(id)
  //     .subscribe(
  //       (status) => {
  //         console.log('Statut de l\'activité :', status);
  //         // Vous pouvez ajouter ici du code pour afficher le statut à l'utilisateur.
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la récupération du statut de l\'activité', error);
  //         // Vous pouvez ajouter ici du code pour afficher un message d'erreur à l'utilisateur.
  //       }
  //     );
  // }

  // findActivityByName(name: string) {
  //   this.activityService.findActivityByName(name)
  //     .subscribe(
  //       (activity) => {
  //         console.log('Activité trouvée :', activity);
  //         // Vous pouvez ajouter ici du code pour afficher l'activité à l'utilisateur.
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la recherche de l\'activité par nom', error);
  //         // Vous pouvez ajouter ici du code pour afficher un message d'erreur à l'utilisateur.
  //       }
  //     );
  // }

  // addParticipantToActivity(activityId: number, userId: number) {
  //   this.activityService.addParticipantToActivity(activityId, userId)
  //     .subscribe(
  //       (response) => {
  //         // Traitement de la réponse réussie
  //         console.log('Participant ajouté à l\'activité avec succès :', response);
  //         // Vous pouvez ajouter ici du code pour mettre à jour l'affichage ou afficher un message de succès.
  //       },
  //       (error) => {
  //         console.error('Erreur lors de l\'ajout de participant à l\'activité', error);
  //         // Vous pouvez ajouter ici du code pour afficher un message d'erreur à l'utilisateur.
  //       }
  //     );
  // }

  // removeParticipantFromActivity(activityId: number, userId: number) {
  //   this.activityService.removeParticipantFromActivity(activityId, userId)
  //     .subscribe(
  //       (response) => {
  //         // Traitement de la réponse réussie
  //         console.log('Participant supprimé de l\'activité avec succès :', response);
  //         // Vous pouvez ajouter ici du code pour mettre à jour l'affichage ou afficher un message de succès.
  //       },
  //       (error) => {
  //         console.error('Erreur lors de la suppression du participant de l\'activité', error);
  //       }
  //     );
  // }

  // public showBadge: boolean = false;
  public showBadge!: boolean;
  // '!' to ensure that is not 'null' or 'undefined'

  public toggleIsNewBadge():void {
    this.showBadge = !this.showBadge;
  }

}


/**
 * Utilisez le module HttpClient d'Angular pour effectuer des requêtes HTTP vers votre backend Java.
 */
