package com.phaete.backend.fitness.controller;


import com.phaete.backend.fitness.model.Workout;
import com.phaete.backend.fitness.model.WorkoutDTO;
import com.phaete.backend.fitness.service.WorkoutService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/workouts")
public class WorkoutController {

    private final WorkoutService workoutService;

    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @GetMapping
    List<Workout> findAll() {
        return workoutService.findAll();
    }

    @GetMapping("/{id}")
    WorkoutDTO findById(@PathVariable String id) {
        Workout workout = workoutService.findById(id);
        return workout.toDTO();
    }

    @PutMapping("/{id}")
    WorkoutDTO updateWorkout(@RequestBody WorkoutDTO workoutDTO, @PathVariable String id) {
        Workout updatedWorkout = workoutService.update(workoutDTO, id);
        return updatedWorkout.toDTO();
    }

    @DeleteMapping("/{id}")
    void deleteWorkout(@PathVariable String id) {
        workoutService.deleteById(id);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNotFoundException(NoSuchElementException exception) {
        return exception.getMessage();
    }

    @GetMapping("/list")
    List<Workout> findAllByIds(@RequestBody List<String> ids) {
        return workoutService.findAllByIds(ids);
    }


}
