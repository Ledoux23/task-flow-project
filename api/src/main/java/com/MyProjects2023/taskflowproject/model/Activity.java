package com.MyProjects2023.taskflowproject.model;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
	
	private String description;
	
	//une activité peut avoir plusieurs participants et un participant 
	//peut participer à plusieurs activités
	@ManyToMany	
	@JoinTable(
	    name = "activity_users",
	    joinColumns = @JoinColumn(name = "activity_id"),
	    inverseJoinColumns = @JoinColumn(name = "user_id")
	)
	@JsonIgnoreProperties({"firstName", "lastName", "email", "password", "role", "activitiesCreated", "activitiesFollowed"})
	@JsonIdentityReference(alwaysAsId = true)
	private List<User> participants; 
	//Liste des personnes participant à cette activité

	private String status;
	
	@ManyToOne
	@JoinColumn(name = "owner_id")
	@JsonIgnoreProperties({"email", "password", "role", "activitiesCreated", "activitiesFollowed"})
	@JsonIdentityReference(alwaysAsId = true)
	private User owner;
	
	@Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    @Column(name = "creation_date")
    private LocalDateTime creationDate;

	public Activity(String name, String description, String status, User owner) {
		super();
		this.name = name;
		this.description = description;
		this.participants = new ArrayList<>();
		this.status = status;
		this.owner = owner;
	}
	
	public Activity() {
		super();
		this.name = null;
		this.description = null;
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
	@JsonIgnore
    public boolean isValidStatus() {
        return this.status.equals("waiting") ||
        		this.status.equals("inprogress") || 
        		this.status.equals("finished");
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
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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
    
    //@JsonIgnore
    public String getFormattedCreationDate() {
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
//        return creationDate.format(formatter);
    	if (creationDate != null) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
            return creationDate.format(formatter);
        } else {
            return "N/A"; // ou tout autre texte que vous souhaitez afficher pour les dates null
        }
    }
    
    @PrePersist
    protected void onCreate() {
        this.creationDate = LocalDateTime.now();
    }

    @JsonIgnore
	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime now) {
		this.creationDate = now;	
	}

	
}
