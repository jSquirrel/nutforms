package cz.cvut.fel.nutforms.localization;

import cz.cvut.fel.nutforms.localization.exception.BundleNotFound;
import cz.cvut.fel.nutforms.localization.exception.ClassNotFound;
import cz.cvut.fel.nutforms.localization.exception.ContextNotFound;
import cz.cvut.fel.nutforms.localization.exception.MessageNotFound;

import java.util.*;

/**
 * @author klimesf
 */
class MessageFinder {

    public Map<String, String> getMessages(MessageQuery query, String bundleName) throws BundleNotFound, ClassNotFound, ContextNotFound {
        ResourceBundle bundle = getResourceBundle(query.getLanguage(), query.getCountry(), bundleName);
        Map<String, String> messages = new HashMap<>();

        int classHits = 0;
        int contextHits = 0;

        for (String key : bundle.keySet()) {
            if (key.startsWith(query.getClassName())) {
                classHits++;
                if (key.startsWith(query.getClassName() + "." + query.getContext())) {
                    contextHits++;
                    messages.put(key.substring(query.getClassName().length() + query.getContext().length() + 2), bundle.getString(key));
                }
            }
        }

        if (classHits == 0) {
            throw new ClassNotFound("Class not found");
        }

        if (contextHits == 0) {
            throw new ContextNotFound("Context not found");
        }

        return messages;
    }

    public String getMessage(MessageQuery query, String bundleName) throws BundleNotFound, MessageNotFound {

        ResourceBundle bundle = getResourceBundle(query.getLanguage(), query.getCountry(), bundleName);

        try {
            return bundle.getString(this.buildMessageName(query.getContext(), query.getClassName(), query.getMessageName()));
        } catch (MissingResourceException e) {
            throw new MessageNotFound("Message not found", e);
        }
    }

    private String buildMessageName(String context, String className, String messageName) {
        return String.join(".", new String[]{className, context, messageName});
    }

    private ResourceBundle getResourceBundle(String language, String country, String bundleName) throws BundleNotFound {
        Locale currentLocale = new Locale(language, country);
        ResourceBundle messages;

        try {
            messages = ResourceBundle.getBundle(bundleName, currentLocale);
        } catch (MissingResourceException e) {
            throw new BundleNotFound("Bundle not found", e);
        }
        return messages;
    }

}
