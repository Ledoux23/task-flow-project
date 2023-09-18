package com.MyProjects2023.taskflowproject.service;

import java.util.List;

import com.MyProjects2023.taskflowproject.model.User;

public interface UserService {
	
	List<User> allUsers();
	User createUser(User user);
	User updateUser(User user);
	void deleteUser(Long id);
	String findUserRole(Long id);
	User findUserByName(String firstName,String lastName);
	User findUserByMail(String mail);
	User findUser(Long id);

}
