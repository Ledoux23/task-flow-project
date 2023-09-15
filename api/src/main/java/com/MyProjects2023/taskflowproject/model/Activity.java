package com.MyProjects2023.taskflowproject.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
	@JsonIgnoreProperties({"firstName", "lastName", "email", "password", "role", "activitiesCreated", "activitiesFollowed"})
	@JsonIdentityReference(alwaysAsId = true)
	private User owner;

	public Activity(String name, String status, User owner) {
		super();
		this.name = name;
		this.participants = new ArrayList<>();
//		this.status = (status != null) ? status : "waiting"; // Utiliser "waiting" comme valeur par défaut si status est null
		this.status = status;
//		setStatus(status); // Utiliser la méthode setStatus pour valider le statut
		this.owner = owner;
	}
	
	public Activity() {
		super();
		this.name = null;
		this.participants = new ArrayList<>();
		this.status = "waiting";
		this.owner = null;
	}
	
	public void addParticipant(User user) {   
	    if (participants == null) {
	    	participants = new ArrayList<>();
        }
	    participants.add(user);
	    user.getActivitiesFollowed().add(this);
	}

	public void removeParticipant(User user) {
	    if (participants != null) {
	    	participants.remove(user);
		    user.getActivitiesFollowed().remove(this);
        }
	}
	
	// Méthode pour s'assurer qu'un statut est valide
    public boolean isValidStatus() {
        return this.status == "waiting" || 
        		this.status == "inprogress" || 
        		this.status == "finished";
//        		this.status.equals("waiting") ||
//        		this.status.equals("inprogress") || 
//        		this.status.equals("finished");
    }

    
	/****************** getters et setters *********************/
	
	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public User getOwner() {
		return owner;
	}

	public void setOwner(User owner) {
		this.owner = owner;
	}

	public List<User> getParticipants() {
	    return participants;
	}
	
	public void setParticipants(List<User> participants) {
		this.participants = participants;
	}

	public String getStatus() {
		return status;
	}
	
	// Setter pour le statut avec validation
    public void setStatus(String status) {
        if (isValidStatus()) {
            this.status = status;
        } else {
            throw new IllegalArgumentException("Invalide status : " + status);
        }
    	this.status = status;
    }


	
}
