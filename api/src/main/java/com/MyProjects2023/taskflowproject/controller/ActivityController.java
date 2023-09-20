package com.MyProjects2023.taskflowproject.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MyProjects2023.taskflowproject.model.Activity;
import com.MyProjects2023.taskflowproject.model.User;
import com.MyProjects2023.taskflowproject.service.ActivityService;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final ActivityService activityService;

    @Autowired
    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    // Endpoint pour obtenir la liste de toutes les activités
    @GetMapping
    public List<Activity> getAllActivities() {
        return activityService.allActivities();
    }

//    // Endpoint pour créer une nouvelle activité
//    @PostMapping
//    public Activity createActivity(@RequestBody Activity activity) {
//    	// Assurez-vous que la date de création est définie
//        activity.setCreationDate(LocalDateTime.now());
//        return activityService.createActivity(activity);
//    }
 // Endpoint pour créer une nouvelle activité
    @PostMapping
    public ResponseEntity<Object> createActivity(@RequestBody Activity activity) {
        try {
            // Vérifier si l'utilisateur propriétaire existe
            User owner = activity.getOwner();
            if (owner != null && owner.getId() == null) {
                // L'utilisateur propriétaire n'existe pas encore dans la base de données
                return ResponseEntity.badRequest().body("L'utilisateur propriétaire doit être enregistré avant de créer l'activité.");
            }
            // S'assurer que la date de création est définie
            activity.setCreationDate(LocalDateTime.now());
            return ResponseEntity.ok(activityService.createActivity(activity));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la création de l'activité.");
        }
    }

    // Endpoint pour mettre à jour une activité par ID
    @PutMapping("/{id}")
    public Activity updateActivity(@PathVariable Long id, @RequestBody Activity activity) {
        // Vous pouvez implémenter la logique pour mettre à jour l'activité avec l'ID spécifié ici
        return activityService.updateActivity(activity);
    }

    // Endpoint pour supprimer une activité par ID
    @DeleteMapping("/{id}")
    public void deleteActivity(@PathVariable Long id) {
        activityService.deleteActivity(id);
    }

    // Endpoint pour obtenir le statut d'une activité par ID
    @GetMapping("/{id}/status")
    public String getActivityStatus(@PathVariable Long id) {
        return activityService.findActivityStatus(id);
    }

    // Endpoint pour trouver une activité par nom
    @GetMapping("/find/{name}")
    public Activity findActivityByName(@RequestParam String name) {
        return activityService.findActivityByName(name);
    }
    
    // Endpoint pour trouver une activité par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Activity> findActivityById(@PathVariable Long id) {
        try {
            Activity activity = activityService.findActivityById(id);
            return ResponseEntity.ok(activity);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }

    
    // Endpoint pour ajouter un participant à une activité
    @PostMapping("/{activityId}/addParticipant/{userId}")
    public ResponseEntity<String> addParticipantToActivity(
            @PathVariable Long activityId,
            @PathVariable Long userId
    ) {
        try {
            activityService.addParticipantToActivity(activityId, userId);
            return ResponseEntity.status(HttpStatus.OK).body("Participant added to activity successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding participant to activity.");
        }
    }

    // Endpoint pour supprimer un participant d'une activité
    @PostMapping("/{activityId}/removeParticipant/{userId}")
    public ResponseEntity<String> removeParticipantFromActivity(
            @PathVariable Long activityId,
            @PathVariable Long userId
    ) {
        try {
            activityService.removeParticipantFromActivity(activityId, userId);
            return ResponseEntity.status(HttpStatus.OK).body("Participant removed from activity successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error removing participant from activity.");
        }
    }
    
 // Endpoint pour obtenir l'heure de création d'une activité par ID
    @GetMapping("/{id}/creationDate")
    public ResponseEntity<String> getActivityCreationDate(@PathVariable Long id) {
        try {
            String creationDate = activityService.findActivityCreationDate(id);
            return ResponseEntity.ok(creationDate);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }


}