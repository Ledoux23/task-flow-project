package com.MyProjects2023.taskflowproject.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	private String email;
	
	private String password;
	
	private String role;
	
	@OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Activity> activitiesCreated;
	
	@ManyToMany(mappedBy = "participants")
	private List<Activity> activities;

	
	public User(String firstName, String lastName, String email, String password, String role) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.role = role;
		this.activities = new ArrayList<>();
		this.activitiesCreated = new ArrayList<>(); 
	}
	
	public User() {
		super();
		this.firstName = null;
		this.lastName = null;
		this.email = null;
		this.password = null;
		this.role = null;
		this.activities = new ArrayList<>();
		this.activitiesCreated = new ArrayList<>(); 
	}
	
	// Méthode pour ajouter une activité à un utilisateur
    public void addActivity(Activity activity) {
        if (activities == null) {
            activities = new ArrayList<>();
        }
        activities.add(activity);
        activity.getParticipants().add(this);
    }

    // Méthode pour supprimer une activité d'un utilisateur
    public void removeActivity(Activity activity) {
        if (activities != null) {
            activities.remove(activity);
            activity.getParticipants().remove(this);
        }
    }

	public List<Activity> getActivities() {
		return activities;
	}

    

	
}
