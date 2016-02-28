package cz.cvut.fel.nutforms.layout;

import cz.cvut.fel.nutforms.layout.exceptions.LayoutNotFound;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * @author klimesf
 */
public class LayoutServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        try {
            String layoutName = req.getPathInfo();
            if (layoutName.startsWith("/")) {
                layoutName = layoutName.substring(1);
            }
            LayoutFinder layoutFinder = new LayoutFinder();
            resp.setHeader("Content-type", "text/html;charset=UTF-8");
            resp.getOutputStream().print(layoutFinder.find(layoutName));

        } catch (LayoutNotFound e) {
            resp.setStatus(400);
            resp.getOutputStream().print(e.getMessage());
        }

    }

}
