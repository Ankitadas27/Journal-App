package com.ankita.Myfirstspringproject.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class JournalEntry {

    private long id;

    @NotBlank(message = "Title cannot be empty")
    @Size(min = 3, max = 100, message = "Title must be between 3 and 100 characters")
    private String title;

    @NotBlank(message = "Content cannot be empty")
    @Size(max = 5000, message = "Content cannot exceed 5000 characters")
    private String content;

    public long getId() { return id; }
    public void setId(long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}