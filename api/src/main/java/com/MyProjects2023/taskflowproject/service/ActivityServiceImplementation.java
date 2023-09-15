package com.MyProjects2023.taskflowproject.service;

import java.util.List;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MyProjects2023.taskflowproject.model.Activity;
import com.MyProjects2023.taskflowproject.repository.ActivityRepository;

@Service
public class ActivityServiceImplementation implements ActivityService {

	private final ActivityRepository activityRepository;

    @Autowired
    public ActivityServiceImplementation(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }
    
	@Override
	public List<Activity> allActivities() {
		return activityRepository.findAll();
	}

	@Override
	public Activity createActivity(Activity activity) {
//	    // Vérifiez si le statut est valide
//	    if (!activity.isValidStatus()) {
//	        throw new IllegalArgumentException("Statut invalide.");
//	    }
		return activityRepository.save(activity);
	}

	@Override
	public Activity updateActivity(Activity activity) {
		
		Long activityId = activity.getId();

	    if (activityId == null) {
	        throw new IllegalArgumentException("ID of activity not found.");
	    }
	    
	    // Vérifiez si une activité avec cet ID existe dans la base de données
	    Optional<Activity> existingActivity = activityRepository.findById(activityId);
	    
	    if (existingActivity.isPresent()) {
	        // L'activité existe, vous pouvez la mettre à jour
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

}
