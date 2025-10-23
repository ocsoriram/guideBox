package com.portfolio.app.guidebox.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Hello World Controller.
 */

@RestController
public class HelloController {
  /**
   * Hello World Method.
   */
  @CrossOrigin(origins = {"http://localhost:3000"})
  @GetMapping("/hello")
  public String hello() {
    return "Hello, World! (By Spring Boot)";
  }
}
