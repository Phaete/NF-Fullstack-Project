package com.phaete.backend.fitness.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.Mockito.verify;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.method;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.test.autoconfigure.web.client.AutoConfigureMockRestServiceServer;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureMockRestServiceServer
public class ApiExerciseControllerIntegrationTest {


    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private MockRestServiceServer mockWebServer;


    @Test
    void findAllFiltered() throws Exception {
        mockWebServer.expect(requestTo("https://api.api-ninjas.com/v1/exercises?name=a"))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess("""
                                []
                                """,
                        MediaType.APPLICATION_JSON));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/defaultExercises?name=a"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        []
                        """));
    }
}
