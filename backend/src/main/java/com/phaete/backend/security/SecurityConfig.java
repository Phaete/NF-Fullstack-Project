package com.phaete.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Value("${APP_URL}")
	private String appUrl;

	/**
	 * The security filter chain for the application. This handles all the
	 * security-related configuration for the application. This is a bean so that
	 * it can be autowired into the test classes.
	 *
	 * @param httpSecurity The {@link HttpSecurity} object to configure.
	 * @return The security filter chain.
	 * @throws Exception If there is an error while building the security filter
	 * chain.
	 */
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
		httpSecurity
				.csrf(AbstractHttpConfigurer::disable)
				.authorizeHttpRequests(r -> r
						.requestMatchers("/api/workouts").permitAll()
						.requestMatchers("/api/exercises").permitAll()
						// Add all other endpoints that you want handled
						.anyRequest().permitAll() // This will handle all endpoints NOT specified, might be a security risk!
				)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
				.logout(logout -> logout.logoutSuccessUrl(appUrl).logoutUrl("/api/auth/logout"))
				.oauth2Login(login -> login.defaultSuccessUrl(appUrl+"/dashboard"));

		return httpSecurity.build();
	}
}

