package com.MyProjects2023.taskflowproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.MyProjects2023.taskflowproject.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

}
