package com.MyProjects2023.taskflowproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.MyProjects2023.taskflowproject.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long>{

	@Query("SELECT a.status FROM Activity a WHERE a.id = ?1")
	String findActivityStatusById(Long id);
	
	Activity findByName(String name);


}
