package com.phaete.backend.fitness.repository;

import com.phaete.backend.fitness.model.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseRepository extends MongoRepository<Exercise, String> {
}
