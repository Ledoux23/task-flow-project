package com.MyProjects2023.taskflowproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MyProjects2023.taskflowproject.model.Activity;

public interface ActivityRepository extends JpaRepository<Activity, Long>{

}
