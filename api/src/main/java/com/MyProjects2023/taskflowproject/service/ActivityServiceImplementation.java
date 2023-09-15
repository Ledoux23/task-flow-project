package com.MyProjects2023.taskflowproject.service;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MyProjects2023.taskflowproject.model.Activity;
import com.MyProjects2023.taskflowproject.model.User;
import com.MyProjects2023.taskflowproject.repository.ActivityRepository;
import com.MyProjects2023.taskflowproject.repository.UserRepository;

@Service
public class ActivityServiceImplementation implements ActivityService {

	private final ActivityRepository activityRepository;
	private final UserRepository userRepository;

    @Autowired
    public ActivityServiceImplementation(ActivityRepository activityRepository, UserRepository userRepository) {
        this.activityRepository = activityRepository;
		this.userRepository = userRepository;
    }
    
	@Override
	public List<Activity> allActivities() {
		return activityRepository.findAll();
	}

	@Override
	public Activity createActivity(Activity activity) {
	    // Vérifier si le statut est valide
	    if (!activity.isValidStatus()) {
	        throw new IllegalArgumentException("Invalid status.");
	    }
		return activityRepository.save(activity);
	}

	@Override
	public Activity updateActivity(Activity activity) {
		
		Long activityId = activity.getId();

	    if (activityId == null) {
	        throw new IllegalArgumentException("ID of activity not found.");
	    }
	    
	    // Vérifier si une activité avec cet ID existe dans la base de données
	    Optional<Activity> existingActivity = activityRepository.findById(activityId);
	    
	    if (existingActivity.isPresent()) {
	        // L'activité existe, on peut la mettre à jour
	        return activityRepository.save(activity);
	    } else {
	        throw new IllegalArgumentException("No activity found with ID: " + activityId);
	    }
	}

	@Override
	public void deleteActivity(Long id) {
		activityRepository.deleteById(id);
	}

	@Override
	public String findActivityStatus(Long id) {
		// Use repository method "findActivityStatusById(Long id)"
		return activityRepository.findActivityStatusById(id);
	}

	@Override
	public Activity findActivityByName(String name) {
		// Use repository method "findByName(String name)"
		return activityRepository.findByName(name);
	}

	@Override
	public void addParticipantToActivity(Long activityId, Long userId) {
		// Vérifier si l'activité et l'utilisateur existent
	    Activity activity = activityRepository.findById(activityId)
	            .orElseThrow(() -> new IllegalArgumentException("Activity not found with ID : " + activityId));
	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new IllegalArgumentException("User not found with ID : " + userId));
	    // Ajouter l'utilisateur à la liste des participants de l'activité
	    activity.addParticipant(user);
	    // Mettre à jour l'activité dans la base de données
	    activityRepository.save(activity);
		
	}

	@Override
	public void removeParticipantFromActivity(Long activityId, Long userId) {
		// Vérifier si l'activité existe
	    Activity activity = activityRepository.findById(activityId)
	            .orElseThrow(() -> new IllegalArgumentException("Activity not found with ID : " + activityId));
	    // Rechercher l'utilisateur dans la liste des participants de l'activité
	    Optional<User> userOptional = activity.getParticipants().stream()
	            .filter(user -> user.getId().equals(userId))
	            .findFirst();

	    if (userOptional.isPresent()) {
	        User userToRemove = userOptional.get();
	        // Supprimer l'utilisateur de la liste des participants de l'activité
	        activity.removeParticipant(userToRemove);
	        // Mettre à jour l'activité dans la base de données
	        activityRepository.save(activity);
	    } else {
	        throw new IllegalArgumentException("User not found with ID : " + userId + " in activity with ID : " + activityId);
	    }	
	}
	

}
