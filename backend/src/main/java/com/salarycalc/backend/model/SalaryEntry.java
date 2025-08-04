package com.salarycalc.backend.model;

import jakarta.persistence.*;

@Entity
public class SalaryEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String day;
    private String inTime;
    private String outTime;
    private double totalHours;
    private double salary;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }

    public String getInTime() { return inTime; }
    public void setInTime(String inTime) { this.inTime = inTime; }

    public String getOutTime() { return outTime; }
    public void setOutTime(String outTime) { this.outTime = outTime; }

    public double getTotalHours() { return totalHours; }
    public void setTotalHours(double totalHours) { this.totalHours = totalHours; }

    public double getSalary() { return salary; }
    public void setSalary(double salary) { this.salary = salary; }
}
