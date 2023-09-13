package com.MyProjects2023.taskflowproject.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

/*
 * mise en œuvre pour une relation Many-to-Many entre Activity et User, 
 * où une activité peut avoir plusieurs participants et un participant 
 * peut participer à plusieurs activités.
 */

@Data
@Entity
@Table(name = "activities")
public class Activity {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	//une activité peut avoir plusieurs participants et un participant 
	//peut participer à plusieurs activités
	@ManyToMany
	@JoinTable(
	    name = "activity_users",
	    joinColumns = @JoinColumn(name = "activity_id"),
	    inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	private List<User> participants; 
	//Liste des personnes participant à cette activité

	private String status; //0=en attente, 1=en cours, 2=fini
	
	@ManyToOne
	@JoinColumn(name = "owner_id")
	private User owner;

	public Activity(String name, String status, User owner) {
		super();
		this.name = name;
		this.participants = new ArrayList<>();
		this.status = status;
		this.owner = owner;
	}
	
	public Activity() {
		super();
		this.name = null;
		this.participants = new ArrayList<>();
		this.status = null;
		this.owner = null;
	}
	
	public void addParticipant(User user) {   
	    if (participants == null) {
	    	participants = new ArrayList<>();
        }
	    participants.add(user);
	    user.getActivities().add(this);
	}

	public void removeParticipant(User user) {
	    if (participants != null) {
	    	participants.remove(user);
		    user.getActivities().remove(this);
        }
	}

	public List<User> getParticipants() {
	    return participants;
	}


	
}
