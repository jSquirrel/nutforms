package cz.cvut.fel.nutforms.widget;

import cz.cvut.fel.nutforms.widget.exceptions.WidgetNotFound;

import java.io.InputStream;

/**
 * @author klimesf
 */
public class WidgetFinder {

    public String findWidget(String widgetName) throws WidgetNotFound {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        InputStream is = classloader.getResourceAsStream("widget/" + widgetName + ".html");
        if (is == null) {
            throw new WidgetNotFound("Widget with name \"" + widgetName + "\" not found.");
        }
        java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }

}
