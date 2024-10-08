package com.phaete.backend.fitness.model;

import java.util.List;

public record WorkoutDTO(String name,
                         List<WorkoutListItem> workoutlist) {

    public Workout fromDTO(String id) {
        return new Workout(id, this.name(), this.workoutlist());
    }

}
