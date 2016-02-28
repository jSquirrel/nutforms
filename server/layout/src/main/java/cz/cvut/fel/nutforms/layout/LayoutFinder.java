package cz.cvut.fel.nutforms.layout;

import cz.cvut.fel.nutforms.layout.exceptions.LayoutNotFound;

import java.io.InputStream;

/**
 * @author klimesf
 */
public class LayoutFinder {

    public String find(String layoutName) throws LayoutNotFound {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        InputStream is = classloader.getResourceAsStream("layout/" + layoutName + ".html");
        if (is == null) {
            throw new LayoutNotFound("Layout with name \"" + layoutName + "\" not found.");
        }
        java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }

}
