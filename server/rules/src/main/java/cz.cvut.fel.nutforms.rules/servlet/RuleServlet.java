package cz.cvut.fel.nutforms.rules.servlet;

import com.google.gson.Gson;
import cz.cvut.fel.nutforms.rules.inspection.Inspector;
import cz.cvut.fel.nutforms.rules.metamodel.Rule;
import org.kie.api.KieBase;
import org.kie.api.KieServices;
import org.kie.api.runtime.KieSession;
import org.kie.api.runtime.StatelessKieSession;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import java.util.Set;

/**
 * Servlet handling request on the /rule path
 *
 * @author Ondřej Kratochvíl
 */
public class RuleServlet extends HttpServlet {

    private final Map<String, Set<Rule>> rules;

    public RuleServlet() {
        Inspector inspector = new Inspector();
        KieServices kieServices = KieServices.Factory.get();
        // returns default session
        StatelessKieSession kieSession = kieServices.getKieClasspathContainer().newStatelessKieSession();
        KieBase kieBase = kieSession.getKieBase();
        this.rules = inspector.inspectBase(kieBase);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String context = req.getPathInfo();
        if (context == null || context.isEmpty()) {
            resp.getWriter().write("Please specify a package/context.");
        } else {
            Set<Rule> requestedRules = rules.get(context.substring(1).replaceAll("/", "."));
            resp.getWriter().write(requestedRules == null ?
                    String.format("No rules found in package %s", context) : new Gson().toJson(requestedRules));
        }
    }
}
