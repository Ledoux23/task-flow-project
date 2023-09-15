package com.MyProjects2023.taskflowproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.MyProjects2023.taskflowproject.model.User;
import com.MyProjects2023.taskflowproject.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService {

	private final UserRepository userRepository;

    @Autowired
    public UserServiceImplementation(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
	@Override
	public List<User> allUsers() {
		return userRepository.findAll();
	}

	@Override
	public User createUser(User user) {
	    if (userRepository.findUserByMail(user.getEmail()) == null && user.isRoleValid()) {
	        return userRepository.save(user);
	    } else {
	        throw new IllegalArgumentException("Email already exists or invalid role.");
	    }
	}

	@Override
	public User updateUser(User user) {
	    User existingUser = userRepository.findById(user.getId()).orElse(null);
	    if (existingUser != null && user.isRoleValid()) {
	        existingUser.setFirstName(user.getFirstName());
	        existingUser.setLastName(user.getLastName());
	        existingUser.setEmail(user.getEmail());
	        existingUser.setPassword(user.getPassword());
	        existingUser.setRole(user.getRole());
	        return userRepository.save(existingUser);
	    } else {
	        throw new IllegalArgumentException("User not found or invalid role.");
	    }
	}

	@Override
	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}

	@Override
	public String findUserRole(Long id) {
		// Use repository method "String findUserRoleById(Long id)"
		return userRepository.findUserRoleById(id);
	}

	@Override
	public User findUserByName(String firstName, String lastName) {
		return userRepository.findUserByName(firstName, lastName);
	}

	@Override
	public User findUserByMail(String mail) {
		return userRepository.findUserByMail(mail);
	}

    
}