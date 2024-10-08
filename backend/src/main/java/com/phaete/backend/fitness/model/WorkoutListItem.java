package com.phaete.backend.fitness.model;

public record WorkoutListItem(
        Exercise exercise,
        int sets,
        int reps,
        double amount,
        String unit
) {
}
