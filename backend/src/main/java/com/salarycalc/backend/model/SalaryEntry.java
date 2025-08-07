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
    private boolean isLeave; // <-- Add this field

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

    public boolean isLeave() { return isLeave; }
    public void setLeave(boolean isLeave) { this.isLeave = isLeave; }
   @Column
private double rate;

public double getRate() { return rate; }
public void setRate(double rate) { this.rate = rate; }

@Column
private String inAmPm;

@Column
private String outAmPm;

public String getInAmPm() {
    return inAmPm;
}

public void setInAmPm(String inAmPm) {
    this.inAmPm = inAmPm;
}

public String getOutAmPm() {
    return outAmPm;
}

public void setOutAmPm(String outAmPm) {
    this.outAmPm = outAmPm;
}


}
