package com.raaghav.clinic.config;

import com.raaghav.clinic.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StreamUtils;

import javax.sql.DataSource;
import java.nio.charset.StandardCharsets;

@Configuration
@Profile("docker")
public class SqlDatabaseSeeder {

    private static final Logger log = LoggerFactory.getLogger(SqlDatabaseSeeder.class);
    private static final String PASSWORD_PLACEHOLDER = "__BCRYPT_PASSWORD__";

    @Bean
    CommandLineRunner seedDatabaseFromSql(
            UserRepository userRepository,
            DataSource dataSource,
            PasswordEncoder passwordEncoder,
            ResourceLoader resourceLoader) {

        return args -> {
            if (userRepository.count() > 0) {
                log.info("Database already contains users — skipping SQL seed.");
                return;
            }

            var resource = resourceLoader.getResource("classpath:db/seed.sql");
            String sql = StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
            sql = sql.replace(
                    PASSWORD_PLACEHOLDER,
                    passwordEncoder.encode(DataSeeder.DEFAULT_PASSWORD));

            var populator = new ResourceDatabasePopulator();
            populator.addScript(new ByteArrayResource(sql.getBytes(StandardCharsets.UTF_8)));
            populator.setSeparator(";");
            populator.setCommentPrefix("--");
            populator.execute(dataSource);

            log.info("========== SQL SEED COMPLETE ==========");
            log.info("Password for ALL users: {}", DataSeeder.DEFAULT_PASSWORD);
            log.info("Admin:          admin@clinic.com");
            log.info("Receptionist 1: receptionist1@clinic.com");
            log.info("Receptionist 2: receptionist2@clinic.com");
            log.info("Doctor:         ananya.reddy@clinic.com");
            log.info("Patient:        priya.sharma@gmail.com");
            log.info("=======================================");
        };
    }
}
