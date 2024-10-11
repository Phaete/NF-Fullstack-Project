package com.phaete.backend.fitness.controller;

import com.phaete.backend.fitness.model.Workout;
import com.phaete.backend.fitness.repository.WorkoutRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
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

	@BeforeEach
	public void setUp() {
		Authentication authentication = mock(Authentication.class);
		when(authentication.getName()).thenReturn("");
		SecurityContext securityContext = mock(SecurityContext.class);
		when(securityContext.getAuthentication()).thenReturn(authentication);
		SecurityContextHolder.setContext(securityContext);
	}

	@DirtiesContext
	@Test
	@WithMockUser(username = "t")
	void findAll_getWorkout_withWorkoutInDB() throws Exception {
		workoutRepository.save(new Workout("1", "testname", List.of(),"t"));

		mockMvc.perform((MockMvcRequestBuilders.get("/api/workouts")))
				.andExpect(status().isOk())
				.andExpect(content().json("""
                    [
                        {
                            "id": "1",
                            "name": "testname",
                            "workoutList": []
                        }
                    ]
                    """));}

	@DirtiesContext
	@Test
	@WithMockUser(username = "")
	void findById_shouldThrow_onEmptyDB() throws Exception {
		mockMvc.perform(MockMvcRequestBuilders.get("/api/workouts/1"))
				.andExpect(status().isNotFound());
	}

	@DirtiesContext
	@Test
	@WithMockUser
	void findById_shouldReturnWorkout() throws Exception {
		workoutRepository.save(new Workout("1", "testname", List.of(), ""));

		mockMvc.perform(MockMvcRequestBuilders.get("/api/workouts/1"))
				.andExpect(status().isOk())
				.andExpect(content().json("""
                    {
                        "name": "testname",
                        "workoutList": []
                    }
                    """));
	}

	@DirtiesContext
	@Test
	@WithMockUser
	void createWorkout() throws Exception {
		mockMvc.perform(
						MockMvcRequestBuilders.post("/api/workouts")
							.contentType(MediaType.APPLICATION_JSON)
							.content("""
						  {
							  "name": "testname",
							  "workoutList": []
						  }
						""")
				)
				.andExpect(status().isOk())
				.andExpect(content().json("""
				{
					"name": "testname",
					"workoutList": []
				}
				"""));
	}

	@DirtiesContext
	@Test
	@WithMockUser
	void updateWorkout() throws Exception {
		workoutRepository.save(new Workout("1", "testname", List.of(), ""));

		mockMvc.perform(
						MockMvcRequestBuilders.put("/api/workouts/1")
							.contentType(MediaType.APPLICATION_JSON)
							.content("""
                          {
                              "name": "new name",
                              "workoutList": []
                          }
                        """)
				)
				.andExpect(status().isOk())
				.andExpect(content().json("""
				{
					"name": "new name",
					"workoutList": []
				}
				"""));
	}

	@DirtiesContext
	@Test
	@WithMockUser
	void deleteWorkout() throws Exception{
		workoutRepository.save(new Workout("1", "testname", List.of(), ""));

		mockMvc.perform(MockMvcRequestBuilders.delete("/api/workouts/1"))
				.andExpect(status().isOk());

		assertTrue(workoutRepository.findById("1").isEmpty());
	}

	@DirtiesContext
	@Test
	@WithMockUser
	void findAllByIds() throws Exception {
		workoutRepository.save(new Workout("1", "testname", List.of(), ""));
		workoutRepository.save(new Workout("2", "another testname", List.of(), ""));

		mockMvc.perform(MockMvcRequestBuilders.get("/api/workouts/list")
				.contentType(MediaType.APPLICATION_JSON)
				.content("""
					["1"]
				""")
		)
				.andExpect(status().isOk())
				.andExpect(content().json("""
				[
					{
					"id": "1",
					"name": "testname",
					"workoutList": []
					}
				]
"""));
	}
}