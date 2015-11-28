package cz.cvut.fel.nutforms.meta;

import cz.cvut.fel.adaptiverestfulapi.core.ApplicationContext;
import cz.cvut.fel.adaptiverestfulapi.meta.model.Entity;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author klimesf
 */
public class MetadataServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        MetadataRouter metadataRouter = MetadataRouter.createRouter(req.getRequestURL().toString());
        if (metadataRouter == null) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.setHeader("Content-type", "text/plain");
            resp.getWriter().print("Your request is invalid.");
            return;
        }

        ApplicationContext applicationContext = ApplicationContext.getInstance();
        Entity entity = applicationContext.getModel().entityForName(metadataRouter.getEntityName());

        if (entity == null) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.setHeader("Content-type", "text/plain");
            resp.getWriter().print("Entity with name " + metadataRouter.getEntityName() + " does not exist.");
            return;
        }

        EntityMetadataJsonSerializer serializer = new EntityMetadataJsonSerializer();
        resp.setHeader("Content-type", "application/json");
        resp.getWriter().print(serializer.serialize(entity));
    }

}
