package com.phaete.backend.fitness.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public record Exercise(
        String id,
        String name,
        String type,
        String muscle,
        String equipment,
        String difficulty,
        String instructions
) {
    public ExerciseDTO toDTO() {
        return new ExerciseDTO(this.name(), this.type(), this.muscle(),
                this.equipment(), this.difficulty(), this.instructions());
    }

}
