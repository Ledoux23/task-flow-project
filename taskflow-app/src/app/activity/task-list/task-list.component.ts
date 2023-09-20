import { Component, OnInit } from '@angular/core';
import { ActivityService } from './../activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public title = 'Liste des tâches';
  public tasks: any[] = [];
   // public showBadge: boolean = false; // '!' to ensure that is not 'null' or 'undefined'
  public showBadge!: boolean;
  public colors = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"]; // Tableau de couleurs

  constructor(
    private activityService: ActivityService,
    private router: Router
  ) {}

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


  public toggleIsNewBadge():void {
    this.showBadge = !this.showBadge;
  }

  // constructor(private router: Router) {}

  navigateToCreateTask() {
    this.router.navigate(['/create-task']);
  }

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

/**
 * Utilisez le module HttpClient d'Angular pour effectuer des requêtes HTTP vers le backend Java.
 */
