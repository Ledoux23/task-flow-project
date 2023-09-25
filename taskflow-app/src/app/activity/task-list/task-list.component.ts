import { Component, OnInit } from '@angular/core';
import { ActivityService } from './../activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public title = 'To do-list';
  public tasks: any[] = [];
   // public showBadge: boolean = false; // '!' to ensure that is not 'null' or 'undefined'
  public showBadge!: boolean;
  public colors = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"]; // Tableau de couleurs
  private _activityFilter = 'word';
  public filteredActivities: any[] = [];

  public receivedRating: string = '';

  constructor(
    private activityService: ActivityService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchTasks(); // Appel de la méthode pour récupérer les tâches depuis le backend
    this.activityFilter = '';
  }

  fetchTasks() {
    this.activityService.getAllActivities()
      .subscribe(
        (response) => {
          this.tasks = response;
            console.log('Données récupérées du backend :', this.tasks);
          this.filteredActivities = this.tasks;   // Rien n'est encore filtré au départ
            console.log('Données du filteredActivities :', this.filteredActivities);
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


  // getter et setter pour _activityFilter
  public get activityFilter(): string {
    return this._activityFilter;
  }

  public set activityFilter(filter: string) {

    this._activityFilter = filter;

    this.filteredActivities = this.activityFilter ? this.filterActivities(this.activityFilter) : this.tasks;

  }

  private filterActivities(criteria: string): string[] {

    criteria = criteria.toLocaleLowerCase();

    // Retourner toutes les activités si le filtre est une chaîne vide ou ne contient que des espaces.
    if (criteria.trim() === '') {
      return this.tasks;
    }

    const res = this.tasks.filter(
      (task: any) => task.name.toLocaleLowerCase().indexOf(criteria) != -1
    );

    return res;

  }


  public receiveRatingClicked(message: string): void {
    this.receivedRating = message;
  }

}

/**
 * Utilisez le module HttpClient d'Angular pour effectuer des requêtes HTTP vers le backend Java.
 */
