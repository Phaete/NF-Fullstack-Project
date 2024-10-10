package com.phaete.backend.fitness.model;

import java.util.List;

public record WorkoutDTO(
        String name,
        List<WorkoutListItem> workoutList
) {

    public Workout fromDTO(String id, String username) {
        return new Workout(id, this.name(), this.workoutList(), username);
    }

}
