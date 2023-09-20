package com.MyProjects2023.taskflowproject.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
	@JsonIdentityReference(alwaysAsId = true)
	private List<Activity> activitiesCreated;
	
	@ManyToMany(mappedBy = "participants")
	@JsonIdentityReference(alwaysAsId = true)
	private List<Activity> activitiesFollowed;

	
	public User(String firstName, String lastName, String email, String password, String role) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.role = role;
		this.activitiesFollowed = new ArrayList<>();
		this.activitiesCreated = new ArrayList<>(); 
	}
	
	public User() {
		super();
		this.firstName = null;
		this.lastName = null;
		this.email = null;
		this.password = null;
		this.role = "user";
		this.activitiesFollowed = new ArrayList<>();
		this.activitiesCreated = new ArrayList<>(); 
	}
	
	// Méthode pour ajouter une activité à un utilisateur
    public void addActivityFollowed(Activity activity) {
        if (activitiesFollowed == null) {
        	activitiesFollowed = new ArrayList<>();
        }
        activitiesFollowed.add(activity);
        activity.getParticipants().add(this);
    }

    // Méthode pour supprimer une activité d'un utilisateur
    public void removeActivityFollowed(Activity activity) {
        if (activitiesFollowed != null) {
        	activitiesFollowed.remove(activity);
            activity.getParticipants().remove(this);
        }
    }
    
    // Méthode pour s'assurer qu'un rôle est valide
    @JsonIgnore
    public boolean isRoleValid() {
        return this.role.equals("admin") ||  
        		this.role.equals("user");
    }
    
    /*********** getters and setters ***************/
    
	public List<Activity> getActivitiesFollowed() {
		return activitiesFollowed;
	}

	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public String getFirstName() {
		return firstName;
	}
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getRole() {
		return role;
	}

	// Setter pour le rôle avec validation
	public void setRole(String role) {
		if (isRoleValid()) {
			this.role = role;
		} else {
			throw new IllegalArgumentException("Invalid role : " + role);
		}
		this.role = role;
	}

	public List<Activity> getActivitiesCreated() {
		return activitiesCreated;
	}

	public void setActivitiesCreated(List<Activity> activitiesCreated) {
		this.activitiesCreated = activitiesCreated;
	}    

	
}
