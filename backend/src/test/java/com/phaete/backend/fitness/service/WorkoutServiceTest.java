package com.phaete.backend.fitness.service;

import com.phaete.backend.fitness.model.Exercise;
import com.phaete.backend.fitness.model.Workout;
import com.phaete.backend.fitness.model.WorkoutDTO;
import com.phaete.backend.fitness.model.WorkoutListItem;
import com.phaete.backend.fitness.repository.WorkoutRepository;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class WorkoutServiceTest {

    private final WorkoutRepository workoutRepository = mock(WorkoutRepository.class);
    private final IdService idService = mock(IdService.class);

    @Test
    void findAll() {
        List<Workout> expectedWorkoutList = List.of(new Workout("1", "test",
                List.of(new WorkoutListItem(new Exercise("1", "test", "test",
                        "test", "test", "test", "test"),
                        2, 5,2.5,"kg")), ""));
            when(workoutRepository.findAll()).thenReturn(expectedWorkoutList);

        WorkoutService workoutService = new WorkoutService(workoutRepository, idService);
        List<Workout> actualWorkoutList = workoutService.findAll();
        verify(workoutRepository).findAll();
        assertEquals(actualWorkoutList, expectedWorkoutList);
    }

    @Test
    void findById() {
        Workout expectedWorkout = new Workout("1", "test",
                List.of(new WorkoutListItem(new Exercise("1", "test", "test",
                        "test", "test", "test", "test"),
                        2, 5,2.5,"kg")), "");
        when(workoutRepository.findById("1")).thenReturn(Optional.of(expectedWorkout));

        WorkoutService workoutService = new WorkoutService(workoutRepository, idService);

        Workout actualWorkout = workoutService.findById("1");
        verify(workoutRepository).findById("1");
        assertEquals(actualWorkout, expectedWorkout);
    }

    @Test
    void save() {
        Workout expectedWorkout = new Workout("1", "test",
                List.of(new WorkoutListItem(new Exercise("1", "test", "test",
                        "test", "test", "test", "test"),
                        2, 5,2.5,"kg")), "");
        when(workoutRepository.save(any(Workout.class))).thenReturn(expectedWorkout);
        when(idService.generateId()).thenReturn("1");

        WorkoutService workoutService = new WorkoutService(workoutRepository, idService);
        Workout actualWorkout = workoutService.save(new WorkoutDTO("test",
                List.of(new WorkoutListItem(new Exercise("1", "test", "test",
                        "test", "test", "test", "test"),
                        2, 5,2.5,"kg"))));
        verify(workoutRepository).save(any(Workout.class));
        assertEquals(actualWorkout, expectedWorkout);
    }

    @Test
    void update() {
        Workout expectedWorkout = new Workout("1", "test",
                List.of(new WorkoutListItem(new Exercise("1", "test", "test",
                        "test", "test", "test", "test"),
                        2, 5,2.5,"kg")), "");
        when(workoutRepository.findById("1")).thenReturn(Optional.of(new Workout("1", "test",
                List.of(new WorkoutListItem(new Exercise("1", "test123", "test",
                        "test", "test", "test", "test"),
                        2, 5,2.5,"kg")), "")));
        when(workoutRepository.save(any(Workout.class))).thenReturn(expectedWorkout);

        WorkoutService workoutService = new WorkoutService(workoutRepository, idService);
        Workout actualWorkout = workoutService.update(new WorkoutDTO("test",
                List.of(new WorkoutListItem(new Exercise("1", "test", "test",
                        "test", "test", "test", "test"),
                        2, 5,2.5,"kg"))), "1");
        verify(workoutRepository).save(any(Workout.class));
        assertEquals(actualWorkout, expectedWorkout);
    }

    @Test
    void findAllByIds() {
        List<Workout> expectedWorkoutList = List.of(new Workout("1", "test",
                List.of(new WorkoutListItem(new Exercise("1", "test", "test",
                        "test", "test", "test", "test"),
                        2, 5,2.5,"kg")), ""));
        when(workoutRepository.findAllById(List.of("1"))).thenReturn(expectedWorkoutList);

        WorkoutService workoutService = new WorkoutService(workoutRepository, idService);
        List<Workout> actualWorkoutList = workoutService.findAllByIds(List.of("1"));
        verify(workoutRepository).findAllById(List.of("1"));
        assertEquals(actualWorkoutList, expectedWorkoutList);
    }
}