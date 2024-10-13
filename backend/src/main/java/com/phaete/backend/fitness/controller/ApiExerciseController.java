package com.phaete.backend.fitness.controller;

import com.phaete.backend.fitness.model.Exercise;
import com.phaete.backend.fitness.service.ApiExerciseService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/defaultExercises")
public class ApiExerciseController {

	
	private final ApiExerciseService apiExerciseService;

	public ApiExerciseController(ApiExerciseService apiExerciseService) {
		this.apiExerciseService = apiExerciseService;
	}

	@GetMapping
	List<Exercise> findAllFiltered(
			@RequestParam(required = false, defaultValue = "") String name,
			@RequestParam(required = false, defaultValue = "") String type,
			@RequestParam(required = false, defaultValue = "") String muscle,
			@RequestParam(required = false, defaultValue = "") String equipment,
			@RequestParam(required = false, defaultValue = "") String difficulty,
			@RequestParam(required = false, defaultValue = "") String instructions
	) {
		return this.apiExerciseService.findAllFiltered(this.apiExerciseService.createSearchString(name, type, muscle, equipment, difficulty, instructions));
	}

}