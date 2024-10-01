package com.phaete.backend.fitness;

public record ExerciseDTO(String name,
                          String type,
                          String muscle,
                          String equipment,
                          String difficulty,
                          String instructions) {

    public Exercise fromDTO(String id) {
        return new Exercise(id, this.name(), this.type(),
                this.muscle(), this.equipment(), this.difficulty(), this.instructions());
    }
}
