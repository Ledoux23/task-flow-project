package com.MyProjects2023.taskflowproject.model;


public enum Role {
    ADMIN("admin"),
    OWNER("owner"),
    PARTICIPANT("participant");

    private final String value;

    Role(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static Role fromValue(String value) {
        for (Role role : Role.values()) {
            if (role.getValue().equalsIgnoreCase(value)) {
                return role;
            }
        }
        return null; // Par défaut, si la valeur fournie ne correspond à aucun rôle.
    }
}

