package cz.cvut.fel.nutforms.rules.metamodel;

/**
 * Represents Drools variable declaration.
 */
public class Declaration {

    private String name;

    private String entity;

    private String field;

    private String type;

    /**
     * Get name of the variable
     *
     * @return
     */
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get name of entity, where the field is declared (null if the variable is not a field
     * of an entity)
     *
     * @return
     */
    public String getEntity() {
        return entity;
    }

    public void setEntity(String entity) {
        this.entity = entity;
    }

    /**
     * Get name of the field from which the value of this variable is taken (null if the variable is not a field
     * of an entity)
     *
     * @return
     */
    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    /**
     * Data type of the variable
     *
     * @return
     */
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
