package com.phaete.backend.controller;

import com.phaete.backend.fitness.model.Workout;
import com.phaete.backend.fitness.repository.WorkoutRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class WorkoutControllerIntegrationTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private WorkoutRepository workoutRepository;

	@DirtiesContext
	@Test
	void findAll_returnEmpty_ifDBEmpty() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/workouts"))
				.andExpect(status().isOk())
				.andExpect(content().json("[]"));
	}

	@DirtiesContext
	@Test
	void findAll_getWorkout_withWorkoutInDB() throws Exception {
		workoutRepository.save(new Workout("1", "testname", List.of()));

		mockMvc.perform((MockMvcRequestBuilders.get("/api/workouts")))
				.andExpect(status().isOk())
				.andExpect(content().json("""
                    [
                        {
                            "id": "1",
                            "name": "testname",
                            "workoutlist": []
                        }
                    ]
                    """));}

	@DirtiesContext
	@Test
	void findById_shouldThrow_onEmptyDB() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/workouts/1"))
				.andExpect(status().isNotFound());
	}

	@DirtiesContext
	@Test
	void findById_shouldReturnWorkout() throws Exception {
		workoutRepository.save(new Workout("1", "testname", List.of()));

		mockMvc.perform(MockMvcRequestBuilders.get("/api/workouts/1"))
				.andExpect(status().isOk())
				.andExpect(content().json("""
                    {
                        "name": "testname",
                        "workoutlist": []
                    }
                    """));
	}
	@DirtiesContext
	@Test
	void updateWorkout() throws Exception {
		workoutRepository.save(new Workout("1", "testname", List.of()));

		mockMvc.perform(
						MockMvcRequestBuilders.put("/api/workouts/1")
							.contentType(MediaType.APPLICATION_JSON)
							.content("""
                          {
                              "name": "new name",
                              "workoutlist": []
                          }
                        """)
				)
				.andExpect(status().isOk())
				.andExpect(content().json("""
				{
					"name": "new name",
					"workoutlist": []
				}
				"""));
	}

	@DirtiesContext
	@Test
	void deleteWorkout() throws Exception{
		workoutRepository.save(new Workout("1", "testname", List.of()));

		mockMvc.perform(MockMvcRequestBuilders.delete("/api/workouts/1"))
				.andExpect(status().isOk());

		assertTrue(workoutRepository.findById("1").isEmpty());
	}

	@DirtiesContext
	@Test
	void findAllByIds() throws Exception {
		workoutRepository.save(new Workout("1", "testname", List.of()));
		workoutRepository.save(new Workout("2", "another testname", List.of()));

		mockMvc.perform(MockMvcRequestBuilders.get("/list")
				.contentType(MediaType.APPLICATION_JSON)
				.content("""
					{
						"ids": ["1"]
					}
				""")
		)
				.andExpect(status().isOk())
				.andExpect(content().json("""
				[
					{
					"id": "1",
					"name": "testname",
					"workoutlist": []
					}
				]
"""));
	}
}