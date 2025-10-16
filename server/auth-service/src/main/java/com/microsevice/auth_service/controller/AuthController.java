package com.microsevice.auth_service.controller;


import com.microsevice.auth_service.Exception.UserAlredyExistException;
import com.microsevice.auth_service.dto.AuthRequest;
import com.microsevice.auth_service.dto.AuthResponse;
import com.microsevice.auth_service.model.User;
import com.microsevice.auth_service.repository.UserRepository;
import com.microsevice.auth_service.service.AuthService;
import com.microsevice.auth_service.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private UserRepository repository;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody User user) {
        Map<String, String> response = new HashMap<>();
        try {
            User newuser = service.saveUser(user);
            return ResponseEntity.ok(newuser);
        } catch (UserAlredyExistException e) {
            response.put("error", "user already exist");
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request, HttpServletResponse response) {

        System.out.println("received email :" + request.getEmail());
        System.out.println("received password:" + request.getPassword());
        return service.login(request, response);
    }

    @PostMapping("/admin-login")
    public ResponseEntity<?> adminLogin(@RequestBody AuthRequest request, HttpServletResponse response) {

        System.out.println("received email :" + request.getEmail());
        System.out.println("received password:" + request.getPassword());
        return service.adminLogin(request, response);
    }



    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
        return ResponseEntity.ok(service.logout(response));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request,HttpServletResponse response) throws IOException{
        service.refreshToken(request,response);
    }

    @GetMapping("/current-user")
    public ResponseEntity<String> getCurrentUser(@CookieValue(name = "jwt", required = false) String token) {
        if (token == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("no token found");
        }
        return ResponseEntity.ok(service.extractEmailFromToken(token));
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<User> getUserDetails(@PathVariable String email){
        User user = repository.findByEmail(email).orElseThrow(
                ()-> new RuntimeException("user not found")
        );
        return ResponseEntity.ok(user);
    }

    @GetMapping("/userbyid/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId){
        User user = repository.findById(userId).orElseThrow(
                ()-> new RuntimeException("user not found")
        );
        return ResponseEntity.ok(user);
    }

    @GetMapping("/freelancer/{userID}")
    public ResponseEntity<User> getFreelancerDetails(@PathVariable Long userID){
        User user = repository.findById(userID).orElseThrow(
                ()-> new RuntimeException("user not found")
        );
        return ResponseEntity.ok(user);
    }

    @PutMapping("/user/profile/{id}")
    public ResponseEntity<User> updateProfile(@PathVariable Long id,@RequestParam String picture){
        return ResponseEntity.ok(service.updateProfile(id,picture));
    }

    @GetMapping("/{id}")
    public boolean doesUserExist(@PathVariable Long id) {
        return service.existsById(id);
    }

    @GetMapping("/validate")
    public ResponseEntity<?> ValidteToken(@CookieValue(value = "refreshToken" , required = false) String refreshToken){
        if (refreshToken == null || refreshToken.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No refresh token found.");
        }

        return ResponseEntity.ok("Refresh token is valid.");
    }

}
