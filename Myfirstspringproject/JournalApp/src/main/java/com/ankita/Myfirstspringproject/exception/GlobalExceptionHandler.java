package com.ankita.Myfirstspringproject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

/**
 * GLOBAL EXCEPTION HANDLER
 *
 * @RestControllerAdvice means: "Watch all controllers for exceptions."
 *
 * WHY do we need this?
 * When @Valid fails, Spring throws MethodArgumentNotValidException.
 * Without this handler, the user gets a huge ugly error JSON.
 * With this handler, we return a clean, readable error response.
 *
 * Example response when title is blank:
 * {
 *   "title": "Title cannot be empty",
 *   "id": "ID must be a positive number"
 * }
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();

        // Loop through each field that failed validation
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors); // 400 Bad Request
    }

    // Catch-all for any other unexpected exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception ex) {
        ex.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Something went wrong: " + ex.getMessage()); // 500
    }
}