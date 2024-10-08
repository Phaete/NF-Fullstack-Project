package com.phaete.backend.fitness.model;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public record Workout(
        String id,
        String name,
        List<WorkoutListItem> workoutList
) {
    public WorkoutDTO toDTO() {
        return new WorkoutDTO(this.name(), this.workoutList());
    }
}
