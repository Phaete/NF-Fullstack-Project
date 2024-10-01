package com.phaete.backend.Fitness;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class ExerciseService {

    private final ExerciseRepository exerciseRepository;


    private final IdService idService;


    public ExerciseService(ExerciseRepository exerciseRepository, IdService idService) {
        this.exerciseRepository = exerciseRepository;
        this.idService = idService;
    }

    public List<Exercise> findAll() {
        return exerciseRepository.findAll();
    }

    public Exercise findById(String id) {
        return exerciseRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Exercise save(ExerciseDTO exerciseDTO) {
        return exerciseRepository.save(Exercise.fromDTO(exerciseDTO, idService.generateId()));
    }

    public Exercise update(ExerciseDTO exerciseDTO, String id) {
        return exerciseRepository.save(Exercise.fromDTO(exerciseDTO, id));
    }

    public void deleteById(String id){
        exerciseRepository.deleteById(id);
    }
}
