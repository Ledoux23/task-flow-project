package com.MyProjects2023.taskflowproject.model;

public enum Status {

	WAITING("waiting"),
	INPROGRESS("inprogress"),
	FINISHED("finished");
	
	private final String value;
	
	Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Status fromValue(String value) {
        for (Status status : Status.values()) {
            if (status.getValue() == value) {
                return status;
            }
        }
        return null; //Par défaut, si la valeur fournie ne correspond à aucun status.
    } 

}
