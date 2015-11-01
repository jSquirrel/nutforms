package cz.cvut.fel.nutforms.rules.functions;

/**
 * Defines a set of general static functions for usage in Drools rules.
 */
public class GeneralFunctions {

    /**
     * Returns true if given String is null, or equal to empty String.
     *
     * @param value
     * @return
     */
    public static boolean isVoid(String value) {
        return value == null || value.equals("");
    }

    /**
     * Return true if given object is null.
     *
     * @param value
     * @return
     */
    public static boolean isNull(Object value) {
        return value == null;
    }
}
