package com.phaete.backend.fitness.service;

import com.phaete.backend.fitness.model.Exercise;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;

@Service
public class ApiExerciseService {

	private final RestClient restClient;

	public ApiExerciseService(
			@Value("${API_NINJAS_URL:https://api.api-ninjas.com/v1/exercises}") String apiUrl,
			@Value("${API_NINJAS_KEY:0}") String apiKey
	) {
		this.restClient = RestClient.builder()
				.defaultHeader("X-Api-Key", apiKey)
				.baseUrl(apiUrl)
				.build();
	}

	public String createSearchString(String name, String type, String muscle, String equipment, String difficulty, String instructions) {
		StringBuilder sb = new StringBuilder();
		if (!name.isEmpty()) {
			sb.append("&name=").append(name);
		}
		if (!type.isEmpty()) {
			sb.append("&type=").append(type);
		}
		if (!muscle.isEmpty()) {
			sb.append("&muscle=").append(muscle);
		}
		if (!equipment.isEmpty()) {
			sb.append("&equipment=").append(equipment);
		}
		if (!difficulty.isEmpty()) {
			sb.append("&difficulty=").append(difficulty);
		}
		if (!instructions.isEmpty()) {
			sb.append("&instructions=").append(instructions);
		}
		return !sb.isEmpty() ? "?" + sb.substring(1) : "";
	}

	public List<Exercise> findAllFiltered(String searchString) {
		return this.restClient.get()
				.uri(searchString)
				.retrieve()
				.toEntity(new ParameterizedTypeReference<List<Exercise>>() {})
				.getBody();
	}
}
