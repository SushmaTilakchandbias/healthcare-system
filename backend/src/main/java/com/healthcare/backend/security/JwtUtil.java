package com.healthcare.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.healthcare.backend.model.User;
import com.healthcare.backend.repository.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    private final Key key;
    private final UserRepository userRepository;

    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs;

    @Autowired
    public JwtUtil(@Value("${app.jwtSecret}") String secret, UserRepository userRepository) {
        byte[] decodedKey = Base64.getDecoder().decode(secret);
        this.key = Keys.hmacShaKeyFor(decodedKey);
        this.userRepository = userRepository;
    }

    public String generateToken(UserDetails userDetails) {
        User user = userRepository.findByUsername(userDetails.getUsername())
                                  .orElseThrow(() -> new RuntimeException("User not found"));

        return Jwts.builder()
                .setSubject(String.valueOf(user.getId())) // ✅ Store user ID in "sub"
                .claim("username", user.getUsername())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return parseClaims(token).getBody().get("username", String.class);
    }

    public String extractUserId(String token) {
        return parseClaims(token).getBody().getSubject(); // "sub" claim = user ID
    }

    public String extractRole(String token) {
        return parseClaims(token).getBody().get("role", String.class);
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        final Date expiration = parseClaims(token).getBody().getExpiration();
        return expiration.before(new Date());
    }

    private Jws<Claims> parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
    }
}
