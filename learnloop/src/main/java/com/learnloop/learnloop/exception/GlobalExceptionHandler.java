package com.learnloop.learnloop.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public Map<String, Object> handleAll(Exception ex) {
        ex.printStackTrace(); // ✅ prints full error in terminal

        Map<String, Object> res = new HashMap<>();
        res.put("error", ex.getClass().getSimpleName());
        res.put("message", ex.getMessage());
        return res;
    }
}