package com.phaete.backend.fitness.service;

import com.phaete.backend.fitness.model.Exercise;
import com.phaete.backend.fitness.model.ExerciseDTO;
import com.phaete.backend.fitness.repository.ExerciseRepository;
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
        return exerciseRepository.save(exerciseDTO.fromDTO(idService.generateId()));
    }

    public Exercise update(ExerciseDTO exerciseDTO, String id) {
        findById(id);
        return exerciseRepository.save(exerciseDTO.fromDTO(id));
    }

    public void deleteById(String id){
        exerciseRepository.deleteById(id);
    }
}
