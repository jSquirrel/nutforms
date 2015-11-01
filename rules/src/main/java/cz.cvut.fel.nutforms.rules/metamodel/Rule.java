package cz.cvut.fel.nutforms.rules.metamodel;

import cz.cvut.fel.nutforms.rules.metamodel.condition.Condition;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * Custom container for data from Drools rules.
 */
public class Rule {

    private String name;
    private String pckg;
    private Set<String> functions = new HashSet<>();
    private Map<String, Declaration> globals = new HashMap<>();
    // toDo: replace with Group in root
    private Set<Condition> conditions = new HashSet<>();
    private Map<String, Declaration> declarations = new HashMap<>();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPckg() {
        return pckg;
    }

    public void setPckg(String pckg) {
        this.pckg = pckg;
    }

    public Set<Condition> getConditions() {
        return conditions;
    }

    public void setConditions(Set<Condition> conditions) {
        this.conditions = conditions;
    }

    public Map<String, Declaration> getGlobals() {
        return globals;
    }

    public void setGlobals(Map<String, Declaration> globals) {
        this.globals = globals;
    }

    public Set<String> getFunctions() {
        return functions;
    }

    public void setFunctions(Set<String> functions) {
        this.functions = functions;
    }

    public Map<String, Declaration> getDeclarations() {
        return declarations;
    }

    public void setDeclarations(Map<String, Declaration> declarations) {
        this.declarations = declarations;
    }

    /**
     * Returns the type of a declared variable (either local, or global), or null if the variable does not exist.
     *
     * @param name variable name
     * @return variable value, or null of it does not exist
     */
    public String getVariableType(String name) {
        // toDo: if there is variable, that is declared both as global and local, do what? Do Drools validate this?
        if (declarations.containsKey(name)) {
            return declarations.get(name).getType();
        } else {
            return globals.containsKey(name) ? globals.get(name).getType() : null;
        }
    }
}