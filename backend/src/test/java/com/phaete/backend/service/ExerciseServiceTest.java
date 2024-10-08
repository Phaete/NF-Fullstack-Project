package com.phaete.backend.service;

import com.phaete.backend.fitness.model.Exercise;
import com.phaete.backend.fitness.model.ExerciseDTO;
import com.phaete.backend.fitness.repository.ExerciseRepository;
import com.phaete.backend.fitness.service.ExerciseService;
import com.phaete.backend.fitness.service.IdService;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ExerciseServiceTest {

    private final ExerciseRepository exerciseRepository = mock(ExerciseRepository.class);
    private final IdService idService = mock(IdService.class);

    @Test
    void findAll() {
        List<Exercise> expectedExerciseList = List.of(new Exercise("1", "test", "test", "test", "test", "test", "test"));
        when(exerciseRepository.findAll()).thenReturn(expectedExerciseList);

        ExerciseService exerciseService = new ExerciseService(exerciseRepository, idService);

        List<Exercise> actualExerciseList = exerciseService.findAll();
        verify(exerciseRepository).findAll();
        assertEquals(actualExerciseList, expectedExerciseList);
    }

    @Test
    void findById() {
        Exercise expectedExercise = new Exercise("1", "test", "test", "test", "test", "test", "test");
        when(exerciseRepository.findById("1")).thenReturn(Optional.of(expectedExercise));

        ExerciseService exerciseService = new ExerciseService(exerciseRepository, idService);

        Exercise actualExercise = exerciseService.findById("1");
        verify(exerciseRepository).findById("1");
        assertEquals(actualExercise, expectedExercise);
    }

    @Test
    void save() {
        Exercise expectedExercise = new Exercise("1", "test", "test", "test", "test", "test", "test");
        when(exerciseRepository.save(any(Exercise.class))).thenReturn(expectedExercise);
        when(idService.generateId()).thenReturn("1");

        ExerciseService exerciseService = new ExerciseService(exerciseRepository, idService);

        Exercise actualExercise = exerciseService.save(new ExerciseDTO("test", "test", "test", "test", "test", "test"));
        verify(exerciseRepository).save(any(Exercise.class));
        assertEquals(actualExercise, expectedExercise);
    }

    @Test
    void update() {
        Exercise expectedExercise = new Exercise("1", "test", "test", "test", "test", "test", "test");
        when(exerciseRepository.findById("1")).thenReturn(Optional.of(new Exercise("1", "test123", "test", "test", "test", "test", "test")));
        when(exerciseRepository.save(any(Exercise.class))).thenReturn(expectedExercise);

        ExerciseService exerciseService = new ExerciseService(exerciseRepository, idService);

        Exercise actualExercise = exerciseService.update(new ExerciseDTO("test", "test", "test", "test", "test", "test"), "1");
        verify(exerciseRepository).save(any(Exercise.class));
        assertEquals(actualExercise, expectedExercise);
    }
}
