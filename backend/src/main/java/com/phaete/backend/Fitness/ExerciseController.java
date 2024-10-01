package com.phaete.backend.Fitness;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fitness")
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
        return ExerciseDTO.toDTO(newExercise);
    }

    @GetMapping("{id}")
    ExerciseDTO findById(@PathVariable String id){
        Exercise exercise = exerciseService.findById(id);
        return ExerciseDTO.toDTO(exercise);
    }

}
