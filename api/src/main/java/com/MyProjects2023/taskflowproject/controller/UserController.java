package com.MyProjects2023.taskflowproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.MyProjects2023.taskflowproject.model.User;
import com.MyProjects2023.taskflowproject.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Endpoint pour obtenir la liste de tous les utilisateurs
    @GetMapping
    public List<User> getAllUsers() {
        return userService.allUsers();
    }

    // Endpoint pour créer un nouvel utilisateur
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Endpoint pour mettre à jour un utilisateur
    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        // Vous pouvez implémenter la logique pour mettre à jour l'utilisateur avec l'ID spécifié ici
        return userService.updateUser(user);
    }

    // Endpoint pour supprimer un utilisateur par ID
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    // Endpoint pour obtenir le rôle d'un utilisateur par ID
    @GetMapping("/{id}/role")
    public String getUserRole(@PathVariable Long id) {
        return userService.findUserRole(id);
    }

    // Endpoint pour trouver un utilisateur par nom
    @GetMapping("/find")
    public User findUserByName(@RequestParam String firstName, @RequestParam String lastName) {
        return userService.findUserByName(firstName, lastName);
    }

    // Endpoint pour trouver un utilisateur par adresse e-mail
    @GetMapping("/findByMail")
    public User findUserByMail(@RequestParam String mail) {
        return userService.findUserByMail(mail);
    }
}
