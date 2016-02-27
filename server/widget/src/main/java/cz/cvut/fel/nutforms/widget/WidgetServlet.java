package cz.cvut.fel.nutforms.widget;

import cz.cvut.fel.nutforms.widget.exceptions.WidgetNotFound;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author klimesf
 */
public class WidgetServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            String widgetName = req.getPathInfo();
            if (widgetName.startsWith("/")) {
                widgetName = widgetName.substring(1);
            }
            WidgetFinder widgetFinder = new WidgetFinder();
            resp.setHeader("Content-type", "text/html;charset=UTF-8");
            resp.getOutputStream().print(widgetFinder.findWidget(widgetName));

        } catch (WidgetNotFound e) {
            resp.setStatus(400);
            resp.getOutputStream().print(e.getMessage());
        }

    }

}
