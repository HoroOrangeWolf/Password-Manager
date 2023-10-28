package com.password.manager.core.security;

import jakarta.servlet.http.Cookie;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.RememberMeAuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.RememberMeAuthenticationFilter;
import org.springframework.security.web.authentication.rememberme.TokenBasedRememberMeServices;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Slf4j
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class GlobalSecurityConfig {

    @Bean
    @SneakyThrows
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity, CorsConfigurationSource corsConfigurationSource, RememberMeServices rememberMeServices, RememberMeAuthenticationFilter authenticationFilter) {
        return httpSecurity
                .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .cors(cors -> {
                    cors.configurationSource(corsConfigurationSource);
                })
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .rememberMe(remember -> remember.rememberMeServices(rememberMeServices))
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(login -> login.loginProcessingUrl("/login").successHandler((request, response, authentication) -> {
                        })
                        .failureHandler(((request, response, exception) -> {
                            response.setStatus(400);
                        })))
                .logout(httpSecurityLogoutConfigurer -> httpSecurityLogoutConfigurer.logoutUrl("/logout")
                        .logoutSuccessHandler(((request, response, authentication) -> {
                        }))
                        .clearAuthentication(true)
                        .deleteCookies("rememberMe")
                )
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.applyPermitDefaultValues();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedOrigins(Collections.singletonList("http://localhost:3000"));
        corsConfiguration.setAllowedMethods(List.of("POST", "GET", "PATCH", "DELETE", "PUT", "OPTIONS", "HEAD"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public RememberMeServices rememberMeServices(UserDetailsService userDetailsService, @Value("${security.key}") String key) {
        TokenBasedRememberMeServices.RememberMeTokenAlgorithm tokenAlgorithm = TokenBasedRememberMeServices.RememberMeTokenAlgorithm.SHA256;

        TokenBasedRememberMeServices tokenBasedRememberMeServices = new TokenBasedRememberMeServices(key, userDetailsService, tokenAlgorithm);

        tokenBasedRememberMeServices.setMatchingAlgorithm(TokenBasedRememberMeServices.RememberMeTokenAlgorithm.MD5);

        tokenBasedRememberMeServices.setCookieName("rememberMe");


        tokenBasedRememberMeServices.setAlwaysRemember(true);

        tokenBasedRememberMeServices.setUseSecureCookie(true);

        tokenBasedRememberMeServices.setTokenValiditySeconds(60 * 60 * 24 * 7);

        return tokenBasedRememberMeServices;
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider(PasswordEncoder encoder, UserDetailsService userDetailsService) {
        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider(encoder);

        daoAuthenticationProvider.setUserDetailsService(userDetailsService);

        return daoAuthenticationProvider;
    }

    @Bean
    @Primary
    public AuthenticationManager authenticationManager(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class).build();
    }

    @Bean
    public RememberMeAuthenticationFilter rememberMeAuthenticationFilter(
            AuthenticationManager authenticationManager,
            RememberMeServices rememberMeServices
    ) {
        return new RememberMeAuthenticationFilter(authenticationManager, rememberMeServices);
    }

    @Bean
    public RememberMeAuthenticationProvider rememberMeAuthenticationProvider(@Value("${security.key}") String key) {
        return new RememberMeAuthenticationProvider(key);
    }
}
