import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../activity.service';
// import { ITask } from '../task';
// import * as moment from 'moment';



@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})

export class TaskDetailComponent implements OnInit {
  public title = 'Details of activity';
  public task: any = null;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const taskId = params.get('id');
      if (taskId) {
        this.fetchTaskDetail(+taskId);
      }
    });
  }

  fetchTaskDetail(taskId: number) {
    this.activityService.getActivityById(taskId).subscribe(
      (response) => {
        this.task = response;
        if (this.task) {
          console.log('Date d\'origine :', this.task.formattedCreationDate);
          // this.task.formattedCreationDate = moment(this.task.formattedCreationDate, 'DD-MM-YYYY HH:mm').format('DD-MM-YYYY HH:mm');
          console.log('Date formatée :', this.task.formattedCreationDate);

          console.log('Détails de l\'activité récupérés du backend :', this.task);
        }
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'activité depuis le backend', error);
      }
    );
  }
}
