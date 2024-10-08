package com.phaete.backend.fitness.service;

import com.phaete.backend.fitness.model.Workout;
import com.phaete.backend.fitness.model.WorkoutDTO;
import com.phaete.backend.fitness.repository.WorkoutRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class WorkoutService {


    private final WorkoutRepository workoutRepository;

    private final IdService idService;

    public WorkoutService(WorkoutRepository workoutRepository, IdService idService) {
        this.workoutRepository = workoutRepository;
        this.idService = idService;
    }

    public List<Workout> findAll() {
        return workoutRepository.findAll();
    }

    public Workout findById(String id) {
        return workoutRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    public Workout save(WorkoutDTO workoutDTO) {
        return workoutRepository.save(workoutDTO.fromDTO(idService.generateId()));
    }

    public Workout update(WorkoutDTO workoutDTO, String id) {
        findById(id);
        return workoutRepository.save(workoutDTO.fromDTO(id));
    }

    public void deleteById(String id) {
        workoutRepository.deleteById(id);
    }

    public List<Workout> findAllByIds(List<String> ids) {
        return workoutRepository.findAllById(ids);
    }


}
