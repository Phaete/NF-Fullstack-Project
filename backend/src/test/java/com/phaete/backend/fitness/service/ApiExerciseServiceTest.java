package com.phaete.backend.fitness.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.client.RestClient;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;


@SpringBootTest
class ApiExerciseServiceTest {

    @Autowired
    private RestClient.Builder builder=mock(RestClient.Builder.class);



    @Test
    void createSearchString() {
        ApiExerciseService service = new ApiExerciseService("","",builder);
        String expected = "?name=a&type=b&muscle=c&equipment=d&difficulty=e&instructions=f";
        String actual = service.createSearchString("a","b","c","d","e","f");
        assertEquals(expected,actual);
    }
    }
