package com.MyProjects2023.taskflowproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.MyProjects2023.taskflowproject.model.User;

public interface UserRepository extends JpaRepository<User, Long>{
	
	// Des méthodes de requête personnalisées
    @Query("SELECT u.role FROM User u WHERE u.id = :userId")
    String findUserRoleById(Long userId);

    @Query("SELECT u FROM User u WHERE u.firstName = :firstName AND u.lastName = :lastName")
    User findUserByName(String firstName, String lastName);

    @Query("SELECT u FROM User u WHERE u.email = :mail")
    User findUserByMail(String mail);

//    @Query("SELECT u FROM users WHERE u.id = :id")
	User findUserById(Long id);

}
