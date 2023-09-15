package com.MyProjects2023.taskflowproject.service;

import java.util.List;

import com.MyProjects2023.taskflowproject.model.Activity;

public interface ActivityService {

	List<Activity> allActivities();
	Activity createActivity(Activity activity);
	Activity updateActivity(Activity activity);
	void deleteActivity(Long id);
	String findActivityStatus(Long id);
	Activity findActivityByName(String name);
	
}
