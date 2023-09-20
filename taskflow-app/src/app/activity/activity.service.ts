import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  getAllActivities(): Observable<any> {
    return this.http.get<any[]>('http://localhost:8080/api/activities');
  }

  // Ajoutez d'autres méthodes pour créer, mettre à jour, supprimer, etc., les activités.
  createActivity(activity: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/activities', activity);
  }

  updateActivity(id: number, activity: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/api/activities/${id}`, activity);
  }

  deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/activities/${id}`);
  }

  getActivityStatus(id: number): Observable<string> {
    return this.http.get<string>(`http://localhost:8080/api/activities/${id}/status`);
  }

  findActivityByName(name: string): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/activities/find?name=${name}`);
  }

  addParticipantToActivity(activityId: number, userId: number): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/activities/${activityId}/addParticipant/${userId}`, {});
  }

  removeParticipantFromActivity(activityId: number, userId: number): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/activities/${activityId}/removeParticipant/${userId}`, {});
  }

  // Récupérer un utilisateur par son ID
  getUserById(userId: number) {
    return this.http.get<any>(`http://localhost:8080/api/users/${userId}`);
  }

  // Récupérer un utilisateur par son prénom et nom de famille
  getUserByName(firstName: string, lastName: string) {
    return this.http.get<any>(`http://localhost:8080/api/users?firstName=${firstName}&lastName=${lastName}`);
  }

  // Récupérer une activité par son ID
  getActivityById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/activities/${id}`);
  }

  // getFormattedCreationDateById(id: number): Observable<string> {
  //   return this.http.get<string>(`http://localhost:8080/api/activities/${id}/formattedCreationDate`);
  // }


}
