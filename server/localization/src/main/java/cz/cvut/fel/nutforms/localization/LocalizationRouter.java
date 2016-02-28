package cz.cvut.fel.nutforms.localization;

import cz.cvut.fel.nutforms.localization.exception.BadRequest;

/**
 * @author klimesf
 */
public class LocalizationRouter {


    public static MessageQuery route(String pathInfo) throws BadRequest {

        // (/localization) ... /cs_CZ/cz.cvut.fel.nutforms.example.model.Bug/edit[/message]

        MessageQuery query = new MessageQuery();

        if (pathInfo.startsWith("/")) {
            pathInfo = pathInfo.substring(1);
        }

        String[] parts = pathInfo.split("/");

        if (parts.length < 3) {
            throw new BadRequest("Request must be in format \"/locale/class/context[/message]\"");
        }

        String[] localeParts = parts[0].split("_");
        if (localeParts.length != 2) {
            throw new BadRequest("Locale must be in format \"language_country\"");
        }

        query.setLanguage(localeParts[0]);
        query.setCountry(localeParts[1]);

        query.setClassName(parts[1]);
        query.setContext(parts[2]);

        query.setMessageName(parts.length == 4 ? parts[3] : null);

        return query;
    }

}
