package com.phaete.backend.fitness.controller;

import com.phaete.backend.fitness.model.Exercise;
import com.phaete.backend.fitness.repository.ExerciseRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ExerciseControllerIntegrationTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ExerciseRepository exerciseRepository;

	@DirtiesContext
	@Test
	void findAll_returnEmpty_ifDBEmpty() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/exercise"))
				.andExpect(status().isOk())
				.andExpect(content().json("[]"));
	}

	@DirtiesContext
	@Test
	void findAll_getExercise_withExerciseInDB() throws Exception {
		exerciseRepository.save(new Exercise("1", "test", "test", "test", "test", "test", "test"));

		mockMvc.perform(MockMvcRequestBuilders.get("/api/exercise"))
				.andExpect(status().isOk())
				.andExpect(content().json("""
					[
						{
							"id": "1",
							"name": "test"
						}
					]
					"""));
	}

	@DirtiesContext
	@Test
	void save_shouldReturnNewExercise() throws Exception {
		mockMvc.perform(
				MockMvcRequestBuilders.post("/api/exercise")
						.contentType(MediaType.APPLICATION_JSON)
						.content("""
							{
								"name": "test",
								"type": "test",
								"muscle": "test",
								"equipment": "test",
								"difficulty": "test",
								"instructions": "test"
							}
						""")
				)
				.andExpect(status().isOk())
				.andExpect(content().json("""
							{
								"name": "test",
								"type": "test",
								"muscle": "test",
								"equipment": "test",
								"difficulty": "test",
								"instructions": "test"
							}""")
				);
	}

	@DirtiesContext
	@Test
	void findById_shouldThrow_onEmptyDB() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/exercise/1"))
				.andExpect(status().isNotFound());
	}

	@DirtiesContext
	@Test
	void findById_shouldReturnExercise() throws Exception {
		exerciseRepository.save(new Exercise("1", "test", "test", "test", "test", "test", "test"));

		mockMvc.perform(MockMvcRequestBuilders.get("/api/exercise/1"))
				.andExpect(status().isOk())
				.andExpect(content().json("""
							{
								"name": "test",
								"type": "test",
								"muscle": "test",
								"equipment": "test",
								"difficulty": "test",
								"instructions": "test"
							}"""));
	}

	@DirtiesContext
	@Test
	void updateExercise_shouldUpdate_whenExerciseInDB() throws Exception {
		exerciseRepository.save(new Exercise("1", "test", "test", "test", "test", "test", "test"));

		mockMvc.perform(
						MockMvcRequestBuilders.put("/api/exercise/1")
								.contentType(MediaType.APPLICATION_JSON)
								.content("""
							{
								"name": "test",
								"type": "cardio",
								"muscle": "test",
								"equipment": "test",
								"difficulty": "test",
								"instructions": "test"
							}
						""")
				)
				.andExpect(status().isOk())
				.andExpect(content().json("""
							{
								"name": "test",
								"type": "cardio",
								"muscle": "test",
								"equipment": "test",
								"difficulty": "test",
								"instructions": "test"
							}""")
				);
	}

	@DirtiesContext
	@Test
	void deleteExercise_successfullyDeleteExercise() throws Exception {
		exerciseRepository.save(new Exercise("1", "test", "test", "test", "test", "test", "test"));

		mockMvc.perform(MockMvcRequestBuilders.delete("/api/exercise/1"))
				.andExpect(status().isOk());

		assertTrue(exerciseRepository.findById("1").isEmpty());
	}
}
