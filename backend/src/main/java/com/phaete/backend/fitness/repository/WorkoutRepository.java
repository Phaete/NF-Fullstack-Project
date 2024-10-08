package com.phaete.backend.fitness.repository;

import com.phaete.backend.fitness.model.Workout;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WorkoutRepository extends MongoRepository<Workout, String> {
}
