import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../activity.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  public title = 'Edit Activity';
  public editedTask: any = null;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const taskId = params.get('id');
      if (taskId) {
        this.fetchTaskToEdit(+taskId);
      }
    });
    console.log('editedTask.id:', this.editedTask.id);
  }

  fetchTaskToEdit(taskId: number) {
    this.activityService.getActivityById(taskId).subscribe(
      (response) => {
        this.editedTask = response;
      },
      (error) => {
        console.error('Error fetching task for editing', error);
      }
    );
  }

  saveActivity() {
    // Appeler le service pour mettre à jour l'activité
    this.activityService.updateActivity(this.editedTask.id, this.editedTask).subscribe(
      (response) => {
        console.log('Activité mise à jour avec succès :', response);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'activité', error);
      }
    );
    console.log('Méthode saveActivity() appelée. ' + 'ID de l\'activité :' + this.editedTask.id);

  }

}
