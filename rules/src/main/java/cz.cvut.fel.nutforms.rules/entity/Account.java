package cz.cvut.fel.nutforms.rules.entity;

//import javax.persistence.*;

/**
 * An entity representing a bank account.
 */
//@Entity
public class Account {

//    @Id
//    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
//    @ManyToOne
    private Person owner;
    private int balance;
    private int yearOfCreation;
    private String mode;

    public Long getId() {
        return id;
    }

    public Person getOwner() {
        return owner;
    }

    public void setOwner(Person owner) {
        this.owner = owner;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }

    public int getYearOfCreation() {
        return yearOfCreation;
    }

    public void setYearOfCreation(int yearOfCreation) {
        this.yearOfCreation = yearOfCreation;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }
}
