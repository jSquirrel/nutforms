package cz.cvut.fel.nutforms.widget;

import cz.cvut.fel.nutforms.widget.exceptions.WidgetMappingNotFound;
import cz.cvut.fel.nutforms.widget.exceptions.WidgetNotFound;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

/**
 * @author klimesf
 */
public class WidgetMappingServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            resp.setHeader("Content-type", "application/javascript;charset=UTF-8");
            resp.getOutputStream().print(this.loadMappingFunction());

        } catch (WidgetMappingNotFound e) {
            resp.setStatus(400);
            resp.getOutputStream().print(e.getMessage());
        }

    }

    private String loadMappingFunction() throws WidgetMappingNotFound {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        InputStream is = classloader.getResourceAsStream("widget/mapping/function.js");
        if (is == null) {
            throw new WidgetMappingNotFound("Widget mapping function not found.");
        }
        java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }

}
