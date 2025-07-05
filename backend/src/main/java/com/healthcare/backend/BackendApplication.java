package com.healthcare.backend;

import com.healthcare.backend.model.User;
import com.healthcare.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    // Insert default admin user at startup (only if it doesn't exist)
    @Bean
    CommandLineRunner runner(UserRepository repo, PasswordEncoder encoder) {
        return args -> {
            if (repo.findByUsername("admin").isEmpty()) {
                User user = new User();
                user.setUsername("admin");
                user.setPassword(encoder.encode("admin123")); // ✅ password will be hashed
                user.setRole("ADMIN");
                repo.save(user);
                System.out.println("✅ Admin inserted");
            } else {
                System.out.println("⚠️ Admin user already exists.");
            }
        };
    }

}
