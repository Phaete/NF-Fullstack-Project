package com.phaete.backend.Fitness;

public record ExerciseDTO(String name,
                          String typ,
                          String muscle,
                          String equipment,
                          String difficulty,
                          String instructions) {

    public static ExerciseDTO toDTO(Exercise exercise) {
        return new ExerciseDTO(exercise.name(), exercise.typ(), exercise.muscle(), exercise.equipment(), exercise.difficulty(), exercise.instructions());
    }
}
