package com.phaete.backend.fitness.controller;

import com.phaete.backend.fitness.model.Exercise;
import com.phaete.backend.fitness.model.ExerciseDTO;
import com.phaete.backend.fitness.service.ExerciseService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/exercise")
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    @GetMapping
    List<Exercise> findAll() {
        return exerciseService.findAll();
    }

    @PostMapping
    ExerciseDTO saveExercise(@RequestBody ExerciseDTO exerciseDTO) {
        Exercise newExercise = exerciseService.save(exerciseDTO);
        return newExercise.toDTO();
    }

    @GetMapping("/{id}")
    ExerciseDTO findById(@PathVariable String id) {
        Exercise exercise = exerciseService.findById(id);
        return exercise.toDTO();
    }

    @PutMapping("/{id}")
    ExerciseDTO updateExercise(@RequestBody ExerciseDTO exerciseDTO, @PathVariable String id) {
        Exercise updatedExercise = exerciseService.update(exerciseDTO, id);
        return updatedExercise.toDTO();
    }

    @DeleteMapping("/{id}")
    void deleteExercise(@PathVariable String id) {
        exerciseService.deleteById(id);
    }

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String handleNotFoundException(NoSuchElementException exception) {
        return exception.getMessage();
    }
}
