package cz.cvut.fel.nutforms.rules.servlet;

import com.google.gson.Gson;
import cz.cvut.fel.nutforms.rules.inspection.Inspector;
import cz.cvut.fel.nutforms.rules.metamodel.Rule;
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

    private final Inspector inspector;
    private final KieServices kieServices;
    private final StatelessKieSession kieSession;

    public RuleServlet() {
        this.inspector = new Inspector();
        this.kieServices = KieServices.Factory.get();
        // toDo: temporal hardcoded session name (bound to Drools)
        this.kieSession = kieServices.getKieClasspathContainer().newStatelessKieSession("globalsession");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String context = req.getPathInfo();
        if (context == null) {
            resp.getWriter().write("Please specify a package.");
        } else {
            // toDo: make this more effective
            Map<String, Set<Rule>> baseRules = inspector.inspectBase(kieSession.getKieBase());
            Set<Rule> requestedRules = baseRules.get(context.substring(1).replaceAll("/", "."));
            resp.getWriter().write(requestedRules == null ?
                    String.format("No rules found in package %s", context) : new Gson().toJson(requestedRules));
        }
    }
}
