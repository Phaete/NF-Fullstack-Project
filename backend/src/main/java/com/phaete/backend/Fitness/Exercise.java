package com.phaete.backend.Fitness;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public record Exercise(
        String id,
        String name,
        String typ,
        String muscle,
        String equipment,
        String difficulty,
        String instructions
) {
    public static Exercise fromDTO(ExerciseDTO exerciseDTO, String id) {
        return new Exercise(id, exerciseDTO.name(), exerciseDTO.typ(), exerciseDTO.muscle(), exerciseDTO.equipment(), exerciseDTO.difficulty(), exerciseDTO.instructions());
    }
}
