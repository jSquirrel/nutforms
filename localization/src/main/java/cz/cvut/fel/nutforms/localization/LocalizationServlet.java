package cz.cvut.fel.nutforms.localization;

import com.google.gson.Gson;
import cz.cvut.fel.nutforms.localization.exception.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

/**
 * @author klimesf
 */
public class LocalizationServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        MessageQuery query = null;
        try {
            query = LocalizationRouter.route(req.getPathInfo());
            MessageFinder messageFinder = new MessageFinder();

            if (query.hasMessageName()) {
                String message = messageFinder.getMessage(query, "FormBundle");
                resp.setHeader("Content-type", "text/plain;charset=UTF-8");
                resp.getOutputStream().print(message);
                return;
            }

            Gson gson = new Gson();
            Map<String, String> messages = messageFinder.getMessages(query, "FormBundle");
            resp.setHeader("Content-type", "application/json;charset=UTF-8");
            resp.getOutputStream().print(gson.toJson(messages));

        } catch (BadRequest | ClassNotFound | ContextNotFound | MessageNotFound e) {
            resp.setStatus(400);
            resp.getOutputStream().print(e.getMessage());

        } catch (BundleNotFound e) {
            resp.setStatus(500);
            resp.getOutputStream().print(e.getMessage());
        }

    }


}
